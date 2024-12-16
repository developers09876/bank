import { Router } from "express";
import {
  createLoanApplication,
  getAllLoanApplications,
  getLoanApplicationById,
  updateLoanApplicationStatus,
  deleteLoanApplication,
} from "../Controller/LoanApplicationController.js";

const router = Router();

router.post("/createloanapplications", createLoanApplication);

router.get("/getall", getAllLoanApplications);

router.get("/getbyid/:id", getLoanApplicationById);

router.put("/updateloanapplications/:id", updateLoanApplicationStatus);

router.delete("/deleteloanapplications/:id", deleteLoanApplication);

export default router;
