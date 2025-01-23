import { Router } from "express";
import {
  createLoanApplication,
  getAllLoanApplications,
  getLoanApplicationById,
  updateLoanApplicationStatus,
  deleteLoanApplication,
  updateLoanDetails,
  updateLoan,
} from "../Controller/LoanApplicationController.js";

const router = Router();

router.post("/createloanapplications", createLoanApplication);
router.put("/updateloanapplications/:id", updateLoanDetails);

router.get("/getall", getAllLoanApplications);

router.get("/getbyid/:userid", getLoanApplicationById);

router.put("/updateloanapplicationsStaus/:id", updateLoanApplicationStatus);
router.put("/updateloan/:id", updateLoan );

router.delete("/deleteloanapplications/:id", deleteLoanApplication);

export default router;
