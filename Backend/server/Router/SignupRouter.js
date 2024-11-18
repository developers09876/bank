import { Router } from "express";
import { getAllUsers, getUserById, loginUser, registerUser } from "../Controller/SignupController.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getall").get(getAllUsers)
router.route("/getby/:id").get(getUserById)

export default router;