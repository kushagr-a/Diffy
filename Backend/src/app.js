import express from "express"
import morm from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
// import multer from "multer"

import apiRoute from "./apiRoutes.js"

const app = express()

// Middleware
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true, limit: "10kb" }))
app.use(morm("dev"))
app.use(cookieParser())

// const upload = multer({ storage: multer.memoryStorage() })


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