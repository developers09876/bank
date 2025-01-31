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
} from "../Controller/InsuranceManagementController.js";

const router = Router();

router.post("/createinsuranceManagement", createInsuranceManagementDb);
router.get("/referCode/:referCode", getbyReferCode);
router.get("/calculateEarnings/:referCode", calculateReferralEarnings);
router.get("/currentMonthIncome/:referCode", getCurrentMonthIncome);

router.put("/updateInsuranceManagement/:id", updateInsuranceManagementDb);
router.get("/getbyEmployeeid/:employeeId", getInsuranceManagementEmployeeId);
router.get("/getAllInsuranceManagement", getallInsuranceManagement);
router.get("/getByIdInsuranceManagement/:userid", getInsuranceManagementUserId);

export default router;
