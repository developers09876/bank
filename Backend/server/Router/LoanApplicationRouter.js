import { Router } from "express";
import {
  createLoanApplication,
  updateLoanApplication,
  getAllLoanApplications,
  getLoanApplicationById,
  updateLoanApplicationStatus,
  deleteLoanApplication,
  updateLoanDetails,
  updateLoan,
  getLoanByEmpId,
  getOneLoanApplicationById,
  getbyReferCode,
  calculateReferralEarnings,
  getCurrentMonthIncome,
} from "../Controller/LoanApplicationController.js";

const router = Router();

router.post("/createloanapplications", createLoanApplication);
router.put("/updateloanapplication/:id", updateLoanApplication);
router.put("/updateloanapplications/:id", updateLoanDetails);
router.get("/getall", getAllLoanApplications);
router.get("/getbyid/:userid", getLoanApplicationById);
router.get("/getby/:id", getOneLoanApplicationById);
router.get("/getbyEmployeeid/:employeeId", getLoanByEmpId);
router.get("/referCode/:referCode", getbyReferCode);
router.get("/calculateEarnings/:referCode", calculateReferralEarnings);
router.get("/currentMonthIncome/:referCode", getCurrentMonthIncome);
router.put("/updateloanapplicationsStaus/:id", updateLoanApplicationStatus);
router.put("/updateloan/:id", updateLoan);
router.delete("/deleteloanapplications/:id", deleteLoanApplication);

export default router;
