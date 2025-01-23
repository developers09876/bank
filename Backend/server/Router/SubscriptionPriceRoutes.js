import { Router } from "express";
import { createSubscriptionPrice, getAllSubscriptionPrice, updateSubscriptionPrice } from "../Controller/SubscriptionPriceController.js";
const router = Router();

router.post("/createSubscription", createSubscriptionPrice);
router.put("/update/:id", updateSubscriptionPrice);
router.get("/getall", getAllSubscriptionPrice);


export default router;
