import { Router } from "express";
import { getAllUsers, getUserById, loginUser, registerUser, updateKYCDetails, updateUserDetails } from "../Controller/SignupController.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getall").get(getAllUsers)
router.route("/getby/:id").get(getUserById)


router.route("/update/:id").put(updateUserDetails)
router.route("/updateKYC/:id").put(updateKYCDetails)

export default router;
