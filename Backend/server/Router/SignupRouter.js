import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
  updateKYCDetails,
  updateUserDetails,
  getByUserType,
  getUserCreatedById,
} from "../Controller/SignupController.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getall").get(getAllUsers);
router.route("/getbyUserType/:userType").get(getByUserType);
router.route("/getby/:id").get(getUserById);
router.route("/getCreatedbyId/:empCreatedBy").get(getUserCreatedById);
router.route("/update/:id").put(updateUserDetails);
router.route("/updateKYC/:id").put(updateKYCDetails);

export default router;
