import express from "express"
import authRoutes from "./routes/auth.js"
const apiRoutes = express.Router()

// Define your API routes here
// Auth Routes 

apiRoutes.use("/auth", authRoutes)
export default apiRoutes