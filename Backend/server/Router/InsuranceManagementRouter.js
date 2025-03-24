import { Router } from "express";
import {
  createInsuranceManagementDb,
  getallInsuranceManagement,
  getInsuranceManagementEmployeeId,
  getInsuranceManagementUserId,
  updateInsuranceManagementDb,
  getbyReferCode,
  calculateReferralEarnings,
  getCurrentMonthIncome,
  getByInsuranceId,
  updateInsApplicationStatus,
  updateInsuranceRemarks,
  updateInsuranceDetails,
  getSalesManagerId,
} from "../Controller/InsuranceManagementController.js";

const router = Router();

router.post("/createinsuranceManagement", createInsuranceManagementDb);
router.get("/referCode/:referCode", getbyReferCode);
router.get("/calculateEarnings/:referCode", calculateReferralEarnings);
router.get("/currentMonthIncome/:referCode", getCurrentMonthIncome);
router.get("/getByInsurance/:id", getByInsuranceId);
router.put("/updateInsapplicationsStaus/:id", updateInsApplicationStatus);
router.put("/updateInsuranceManagement/:id", updateInsuranceManagementDb);
router.get("/getbyEmployeeid/:employeeId", getInsuranceManagementEmployeeId);
router.get("/getAllInsuranceManagement", getallInsuranceManagement);
router.get("/getByIdInsuranceManagement/:userId", getInsuranceManagementUserId);
router.get("/getByIdSalesManagerId/:report_Manager", getSalesManagerId);

router.put("/updateInsuranceremarks/:id", updateInsuranceRemarks);
router.put("/updateInsurancedetails/:id", updateInsuranceDetails);

export default router;
