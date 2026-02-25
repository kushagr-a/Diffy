import mongoose from 'mongoose';
import { configs } from './src/utils/config/config.js';
import { User } from './src/github/userModel.js';

async function checkUser() {
    try {
        await mongoose.connect(configs.DB_URL);
        const user = await User.findOne({ username: 'atulkr20' });
        if (user) {
            console.log('USER FOUND:');
            console.log('Username:', user.username);
            console.log('GitHub ID:', user.githubId);
            console.log('Has Token:', !!user.accessToken);
            if (user.accessToken) {
                console.log('Token Start:', user.accessToken.substring(0, 5) + '...');
            }
        } else {
            console.log('USER NOT FOUND in DB');
            const all = await User.find({}, { username: 1 });
            console.log('Available usernames:', all.map(u => u.username));
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkUser();
