import { Router } from "express";
import {
  createTaxManagementDb,
  getallTaxManagement,
} from "../Controller/TaxManagementController.js";

const router = Router();

router.post("/createTaxManagement", createTaxManagementDb);
router.get("/getAllTaxManagement", getallTaxManagement);

export default router;
