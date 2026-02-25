import { GoogleGenerativeAI } from '@google/generative-ai';
import { configs } from './src/utils/config/config.js';

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(configs.GEMINI_API_KEY);
        // There is no direct listModels in the client SDK like this usually, 
        // but we can try a simple generation with a very basic model name.
        console.log("Testing with gemini-1.5-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash:", result.response.text());
    } catch (err) {
        console.error("Error with gemini-1.5-flash:", err.message);

        try {
            const genAI = new GoogleGenerativeAI(configs.GEMINI_API_KEY);
            console.log("Testing with gemini-1.5-pro...");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            const result = await model.generateContent("Hello");
            console.log("Success with gemini-1.5-pro:", result.response.text());
        } catch (err2) {
            console.error("Error with gemini-1.5-pro:", err2.message);
        }
    }
}

listModels();
