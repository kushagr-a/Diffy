import { GoogleGenerativeAI } from '@google/generative-ai';
import { configs } from './src/utils/config/config.js';

async function test() {
    const genAI = new GoogleGenerativeAI(configs.GEMINI_API_KEY);
    // Using the models we saw in the models.json earlier
    const models = ['gemini-2.0-flash-lite', 'gemini-1.5-flash', 'gemini-pro'];

    for (const modelName of models) {
        try {
            console.log(`Testing model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("test");
            console.log(`✅ Success with ${modelName}: ${result.response.text().substring(0, 20)}...`);
            return;
        } catch (err) {
            console.log(`❌ Failed with ${modelName}:`);
            console.log(`   Message: ${err.message}`);
            if (err.stack) console.log(`   Stack includes fetch: ${err.stack.includes('fetch')}`);
        }
    }
    console.log("No models worked. Please check your network or API key.");
}

test();
