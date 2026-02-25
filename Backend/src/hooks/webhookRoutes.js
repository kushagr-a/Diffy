import express from "express";

import { githubWebhook } from "./githubWebhook.js"

const webHooks = express.Router()

webHooks.route("/github").post(
    express.raw({ type: "application/json" }),
    githubWebhook
)

export default webHooks