import { Router } from "express";
import {
  createTaxManagementDb,
  getallTaxManagement,
  getTaxManagementUserId,
} from "../Controller/TaxManagementController.js";

const router = Router();

router.post("/createTaxManagement", createTaxManagementDb);
router.get("/getAllTaxManagement", getallTaxManagement);
router.get("/getByIdTaxManagement/:userId", getTaxManagementUserId);

export default router;
