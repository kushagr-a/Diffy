import { GoogleGenerativeAI } from '@google/generative-ai';
import { configs } from './src/utils/config/config.js';

async function test() {
    const genAI = new GoogleGenerativeAI(configs.GEMINI_API_KEY);
    const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'];

    for (const modelName of models) {
        try {
            console.log(`Testing model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("test");
            console.log(`✅ Success with ${modelName}: ${result.response.text().substring(0, 20)}...`);
            return;
        } catch (err) {
            console.log(`❌ Failed with ${modelName}: ${err.message}`);
        }
    }
    console.log("No models worked. Please check your API key in .env");
}

test();
