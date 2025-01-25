// routes/ReferralRoutes.js
import { Router } from "express";
import {
  addReferral,
  getReferralsByUser,
  getAllReferrals,
} from "../Controller/RewardsController.js";

const router = Router();

router.route("/add").post(addReferral);
router.route("/user/:userId").get(getReferralsByUser);
router.route("/all").get(getAllReferrals);

export default router;
