import { Router } from "express";
import { createLead, getallLead } from "../Controller/LeadGenerationController.js";

const router = Router();

router.post("/createlead",createLead);
router.get("/getall",getallLead)

export default router;