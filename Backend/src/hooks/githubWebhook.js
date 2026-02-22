import crypto from "node:crypto"
import { configs } from "../utils/config/config.js"

// Verify webhook signature
export const githubWebhook = async (req, res) => {
    try {
        const singnature = req.headers["x-hub-signature-256"]
        const event = req.headers["x-github-event"]

        const hmac = crypto.createHmac("sha256", configs.GITHUB_WEBHOOK_SECRET)
        const digest = "sha256=" + hmac.update(req.body).digest("hex")

        if (singnature !== digest) {
            return res.status(401).json({
                success: false,
                message: "Invalid singnature"
            })
        }

        const payload = JSON.parse(req.body.toString())

        if (event === "pull_request") {
            const action = payload.action;

            if (action === "opened" || action === "synchronize") {
                console.log("PR event received:", payload.pull_request.number)

                // Yaha tum AI review trigger karoge
                // 1. Get PR details
                // 2. Get files changed
                // 3. Get diff
                // 4. Send to AI
                // 5. ai review post comment
                // 6. ready to merge -> agar AI ko lga ki sab correct hai to merge rok dega.


            }
        }

        return res.status(200).json({
            success: true,
            message: "Webhook received successfully"
        })

    } catch (error) {
        console.log("Webhook error:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}