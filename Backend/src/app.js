import express from "express"
import morm from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
// import multer from "multer"

import apiRoute from "./apiRoutes.js"
import webHooks from "./hooks/webhookRoutes.js"

const app = express()

app.use((req, res, next) => {
    console.log(`>>> [SYSTEM LOG] ${new Date().toISOString()} | ${req.method} ${req.url}`);
    console.log(`>>> [HEADERS] event: ${req.headers['x-github-event']}`);
    next();
});

app.use(morm("dev"))

// Webhook route must be BEFORE express.json() to capture raw body for signature verification
app.use("/api/webhooks", webHooks)

// Middleware (Global for other routes)
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true, limit: "10kb" }))
app.use(cookieParser())


// cors configuration
app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

// Api Routes
app.use("/api", apiRoute)

// Server check
app.get("/", (req, res) => {
    res.status(201).json({
        status: "true",
        message: "Server is up and running!",
    })
})

export default app