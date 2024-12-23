import { Router } from "express";
import { createLead } from "../Controller/LeadGenerationController.js";

const router = Router();

router.post("/createlead",createLead);

export default router;