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
} from "../Controller/LoanApplicationController.js";

const router = Router();

router.post("/createloanapplications", createLoanApplication);
router.put("/updateloanapplication/:id", updateLoanApplication);
router.put("/updateloanapplications/:id", updateLoanDetails);
router.get("/getall", getAllLoanApplications);
router.get("/getbyid/:userid", getLoanApplicationById);
router.get("/getbyEmployeeid/:employeeId", getLoanByEmpId);
router.put("/updateloanapplicationsStaus/:id", updateLoanApplicationStatus);
router.put("/updateloan/:id", updateLoan );
router.delete("/deleteloanapplications/:id", deleteLoanApplication);

export default router;
