import { Router } from "express";
import {
  createLoanApplication,
  getAllLoanApplications,
  getLoanApplicationById,
  updateLoanApplication,
  deleteLoanApplication,
} from "../Controller/LoanApplicationController.js";

const router = Router();

router.post("/createloanapplications", createLoanApplication);

router.get("/getall", getAllLoanApplications);

router.get("/gatbyid/:id", getLoanApplicationById);

router.put("/updateloanapplications/:id", updateLoanApplication);

router.delete("/deleteloanapplications/:id", deleteLoanApplication);

export default router;
