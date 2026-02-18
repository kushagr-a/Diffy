import { Router } from "express";
import { reditectUrl, callBackUrl } from "../github/userController.js"

import { authenticateUsers } from "../middlewares/auth.js"

const githubRoutes = Router()

githubRoutes.route("/github").get(reditectUrl)

githubRoutes.route("/github/callback").get(callBackUrl)

export default githubRoutes