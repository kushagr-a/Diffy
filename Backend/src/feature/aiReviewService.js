import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { configs } from "../utils/config/config.js";
import fs from 'node:fs';
import path from 'node:path';

const genAI = new GoogleGenerativeAI(configs.GEMINI_API_KEY);

const logFile = path.join(process.cwd(), 'webhook-debug.log');
const log = (msg) => {
    const timestamp = new Date().toISOString();
    const formattedMsg = `[${timestamp}] AI_SERVICE: ${msg}\n`;
    fs.appendFileSync(logFile, formattedMsg);
    console.log(formattedMsg);
};

// Logic to fetch diff, analyze with gemini, and post to Github
export const analyzePullRequest = async (owner, repo, pull_number, accessToken) => {
    try {
        log(`Fetching diff for PR #${pull_number} in ${owner}/${repo}...`);
        const { data: rawDiff } = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}`,
            {
                headers: {
                    Authorization: `token ${accessToken}`,
                    Accept: `application/vnd.github.v3.diff`,
                },
            }
        );

        log(`Received diff (${rawDiff.length} chars). Cleaning...`);
        // Cleaning the diff: Ignore lock files and limit size
        const cleanDiff = rawDiff.split('\n')
            .filter(line => !line.includes('package-lock.json') && !line.includes('yarn.lock'))
            .join('\n')
            .substring(0, 25000);

        if (!cleanDiff || cleanDiff.trim().length === 0) {
            log("Empty diff, skipping review.");
            return;
        }

        log("Sending diff to Gemini AI...");
        // Setup Gemini
        const modelName = "gemini-2.5-flash";
        const model = genAI.getGenerativeModel({ model: modelName });

        const systemPrompt = `
        You are a Senior Backend Engineer and AI Security Specialist.
        Analyze the following git diff and provide a code review.
        Focus on:
        - Critical bugs & Logic Errors
        - Security (SQLi, XSS, Secret Exposure)
        - Performance (N+1 queries, memory leaks)
        - Readability & DRY Principles

        Formatting: Use Markdown. Be concise but rigorous.
        If you find critical Security issues, start your review with "Critical Security ALERT".
        `;

        let result;
        try {
            result = await model.generateContent([systemPrompt, cleanDiff]);
        } catch (genError) {
            log(`AI generation failed for model ${modelName}. Error: ${genError.message}`);
            if (genError.stack) log(`Stack: ${genError.stack}`);
            throw genError;
        }

        const aiFeedback = result.response.text();

        log(`AI generated feedback (${aiFeedback.length} chars). Posting to GitHub...`);

        // Post the AI response as a Review Comment on GitHub
        await axios.post(
            `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/reviews`,
            {
                body: aiFeedback,
                event: 'COMMENT'
            },
            {
                headers: {
                    Authorization: `token ${accessToken}`,
                    Accept: `application/vnd.github.v3+json`,
                },
            }
        );

        log(`Successfully posted AI review for PR #${pull_number}`);

    } catch (error) {
        const errorMsg = `AI review Service Error: ${error.response?.data?.message || error.message}`;
        log(errorMsg);
        if (error.response?.data) {
            log(`GitHub Error Detail: ${JSON.stringify(error.response.data)}`);
        }
    }
};