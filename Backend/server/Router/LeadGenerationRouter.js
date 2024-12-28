import { Router } from "express";
import { createLead, getallLead, getById } from "../Controller/LeadGenerationController.js";

const router = Router();

router.post("/createlead",createLead);
router.get("/getall",getallLead);
router.get("/getById/:id", getById)

export default router;