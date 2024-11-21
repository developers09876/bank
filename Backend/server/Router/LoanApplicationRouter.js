import { Router } from "express";
import {
  createLoanApplication,
  getAllLoanApplications,
  getLoanApplicationById,
  updateLoanApplication,
  deleteLoanApplication,
} from "../Controller/LoanApplicationController.js";

const router = Router();

router.post("/loanapplications", createLoanApplication);

router.get("/loanapplications", getAllLoanApplications);

router.get("/loanapplications/:id", getLoanApplicationById);

router.put("/loanapplications/:id", updateLoanApplication);

router.delete("/loanapplications/:id", deleteLoanApplication);

export default router;
