import { GoogleGenerativeAI } from '@google/generative-ai';
import { configs } from './src/utils/config/config.js';

async function listAllModels() {
    try {
        const genAI = new GoogleGenerativeAI(configs.GEMINI_API_KEY);
        // There is no listModels in the main SDK but we can fetch it via raw fetch if needed.
        // However, let's try a few more.
        const models = [
            "gemini-1.5-flash",
            "gemini-1.5-pro",
            "gemini-pro",
            "gemini-1.0-pro",
            "gemini-2.0-flash-exp"
        ];

        for (const m of models) {
            try {
                console.log(`Testing ${m}...`);
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("Hi");
                console.log(`SUCCESS with ${m}`);
                break;
            } catch (e) {
                console.log(`FAILED with ${m}: ${e.message}`);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

listAllModels();
