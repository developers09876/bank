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
  updateTaxApplicationDetails,
  getSalesManagerId,
} from "../Controller/TaxManagementController.js";

const router = Router();

router.post("/createTaxManagement", createTaxManagementDb);
router.put("/updateTaxManagement/:id", updateTaxManagementDb);
router.put("/updateTaxAplicationDetails/:id", updateTaxApplicationDetails);
router.put("/updateTaxapplicationsStaus/:id", updateTaxApplicationStatus);
router.get("/getbyEmployeeid/:employeeId", getTaxManagementEmployeeId);
router.get("/getAllTaxManagement", getallTaxManagement);
router.get("/getByIdTaxManagement/:userId", getTaxManagementUserId);
router.get("/getByTaxId/:id", getByTaxId);
router.put("/updateTaxremarks/:id", updateTaxRemarks);
router.get("/getByIdSalesManagerId/:sale_Manager", getSalesManagerId);

export default router;
