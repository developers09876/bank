import { Router } from "express";
import {
  createTaxManagementDb,
  getallTaxManagement,
  getTaxManagementUserId,
  updateTaxManagementDb,
  getTaxManagementEmployeeId,
  getByTaxId,
  updateTaxApplicationStatus,
  updateTaxRemarks,
} from "../Controller/TaxManagementController.js";

const router = Router();

router.post("/createTaxManagement", createTaxManagementDb);
router.put("/updateTaxManagement/:id", updateTaxManagementDb);
router.put("/updateTaxapplicationsStaus/:id", updateTaxApplicationStatus);
router.get("/getbyEmployeeid/:employeeId", getTaxManagementEmployeeId);
router.get("/getAllTaxManagement", getallTaxManagement);
router.get("/getByIdTaxManagement/:userId", getTaxManagementUserId);
router.get("/getByTaxId/:id", getByTaxId);
router.put("/updateTaxremarks/:id", updateTaxRemarks);

export default router;
