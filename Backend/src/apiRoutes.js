import express from "express"
import authRoutes from "./github/userRoutes.js"
import { authenticateUsers } from "./middlewares/auth.js"
import { getDashboardData, toggleProject, getRepoAnalytics } from "./github/userDashboardController.js"

const apiRoutes = express.Router()

// Auth Routes 
apiRoutes.use("/auth", authRoutes)

// Dashboard data
apiRoutes.get("/dashboard-data", authenticateUsers, getDashboardData)
apiRoutes.post("/toggle-project", authenticateUsers, toggleProject)

// Repo Analytics
// Using catch-all to handle full repo names like "owner/repo"
apiRoutes.get("/repo-analytics/:owner/:repo", authenticateUsers, (req, res) => {
    req.params.repoFullName = `${req.params.owner}/${req.params.repo}`;
    getRepoAnalytics(req, res);
})

export default apiRoutes