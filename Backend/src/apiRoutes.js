import express from "express"
import authRoutes from "./github/userRoutes.js"
import webHooks from "./hooks/webhookRoutes.js"

const apiRoutes = express.Router()

// Define your API routes here
// Auth Routes 
apiRoutes.use("/auth", authRoutes)

// webHooks Routes
apiRoutes.use("/webhooks", webHooks) // /api/webhooks/github

export default apiRoutes