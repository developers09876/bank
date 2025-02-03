import { Router } from "express";
import {
  createTaxManagementDb,
  getallTaxManagement,
  getTaxManagementUserId,
  updateTaxManagementDb,
  getTaxManagementEmployeeId,
  getByTaxId,
} from "../Controller/TaxManagementController.js";

const router = Router();

router.post("/createTaxManagement", createTaxManagementDb);
router.put("/updateTaxManagement/:id", updateTaxManagementDb);
router.get("/getbyEmployeeid/:employeeId", getTaxManagementEmployeeId);
router.get("/getAllTaxManagement", getallTaxManagement);
router.get("/getByIdTaxManagement/:userId", getTaxManagementUserId);
router.get("/getByTaxId/:id", getByTaxId);

export default router;
