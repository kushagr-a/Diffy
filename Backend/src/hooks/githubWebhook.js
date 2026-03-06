import crypto from 'node:crypto';
import { configs } from '../utils/config/config.js';
import { User } from '../github/userModel.js';
import { analyzePullRequest } from '../feature/aiReviewService.js';


import fs from 'node:fs';
import path from 'node:path';

export const githubWebhook = async (req, res) => {
    try {
        const logFile = path.join(process.cwd(), 'webhook-debug.log');
        const timestamp = new Date().toISOString();

        const signature = req.headers['x-hub-signature-256'];
        const event = req.headers['x-github-event'];

        const payload = JSON.parse(req.body.toString());

        const debugInfo = `\n[${timestamp}] EVENT: ${event} | ACTION: ${payload.action}\n` +
            `KEYS: ${Object.keys(payload).join(', ')}\n` +
            `SENDER: ${payload.sender?.login}\n` +
            `-------------------------------------------\n`;

        fs.appendFileSync(logFile, debugInfo);
        console.log(debugInfo);

        // Handle Pull request events
        if (event === "pull_request") {
            const { action, pull_request, repository } = payload;

            // Trigger on PR creation or when the code is pushed
            if (action === "opened" || action === "synchronize" || action === "reopened") {
                const ownerUsername = repository.owner.login;
                const senderUsername = payload.sender.login;
                const prNumber = pull_request.number;

                const logMsg = `\n[REVIEW TRIGGER] PR #${prNumber} triggered by ${senderUsername}\n`;
                fs.appendFileSync(logFile, logMsg);
                console.log(logMsg);

                const user = await User.findOne({ username: senderUsername });

                if (user && user.accessToken) {
                    const statusMsg = `>>> User found! Starting AI analysis...\n`;
                    fs.appendFileSync(logFile, statusMsg);
                    console.log(statusMsg);

                    analyzePullRequest(
                        ownerUsername,
                        repository.name,
                        prNumber,
                        user.accessToken
                    ).catch(err => {
                        const errMsg = `>>> AI Error: ${err.message}\n`;
                        fs.appendFileSync(logFile, errMsg);
                        console.error(errMsg);
                    });
                } else {
                    const failMsg = `>>> ABORT: No user/token found for "${ownerUsername}" in DB.\n`;
                    fs.appendFileSync(logFile, failMsg);
                    console.error(failMsg);
                }
            }
        }

        return res.status(200).json({
            success: true,
            message: "Webhook Processed (v2-debug)",
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("Webhook route error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};