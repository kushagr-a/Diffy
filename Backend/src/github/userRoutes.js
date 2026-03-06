import { Router } from "express";
import { reditectUrl, callBackUrl, logout } from "../github/userController.js"

const githubRoutes = Router()

githubRoutes.route("/github").get(reditectUrl)
githubRoutes.route("/github/callback").get(callBackUrl)
githubRoutes.route("/logout").get(logout)

export default githubRoutes