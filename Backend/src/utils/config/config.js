import { config as config } from "dotenv"
config()

const _config = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGO_URI,
    PRIVATE_KEY: process.env.IMAGE_KIT_PRIVATE,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || "http://localhost:3000/api/auth/github/callback",
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    GITHUB_WEBHOOK_SECRET: process.env.GITHUB_WEBHOOK_SECRET,
}


export const configs = Object.freeze(_config)