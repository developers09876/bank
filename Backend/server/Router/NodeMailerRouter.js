import express from "express";
import {
  checkVerifivationCode,
  forgetPassword,
} from "../Controller/NodeMailerController.js";

const router = express.Router();

router.post("/forgetpassword", forgetPassword);
router.post("/checkverification", checkVerifivationCode);

export default router;
