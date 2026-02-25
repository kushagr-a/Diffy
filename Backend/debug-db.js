import mongoose from 'mongoose';
import { configs } from './src/utils/config/config.js';
import { User } from './src/github/userModel.js';

async function checkUsers() {
    try {
        await mongoose.connect(configs.DB_URL);
        const users = await User.find({});
        console.log('--- USER DATABASE CONTENT ---');
        console.log(JSON.stringify(users, null, 2));
        console.log('-----------------------------');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkUsers();
