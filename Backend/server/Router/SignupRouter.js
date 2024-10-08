import { Router } from "express";
import { createLoginFields, createSignupFields } from "../Controller/SignupController.js";

const router = Router();

router.route("/createSignupfields").post(createSignupFields)
router.route("/createLoginfield").post(createLoginFields)

export default router;