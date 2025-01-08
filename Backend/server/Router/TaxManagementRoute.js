import { Router } from "express";
import { createTaxManagementDb } from "../Controller/TaxManagementController.js";

const router = Router();

router.post("/createTaxManagement", createTaxManagementDb);

export default router;
