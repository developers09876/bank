import { Router } from "express";
import { loginUser, registerUser } from "../Controller/SignupController.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

export default router;