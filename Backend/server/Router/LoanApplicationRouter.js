import { Router } from "express";
import multer from "multer"
import { createLoanApplication, getAllLoanApplications, updateLoanApplication, deleteLoanApplication } from '../Controller/LoanApplicationController.js';


const upload = multer();
const router = Router();


router.post(
  '/',
  upload.fields([
    { name: 'addressProof', maxCount: 1 },
    { name: 'coApplicantDocs', maxCount: 1 },
    { name: 'financialProof', maxCount: 1 },
    { name: 'identityProof', maxCount: 1 },
    { name: 'photographs', maxCount: 1 },
    { name: 'propertyOwnershipProof', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
  ]),
  createLoanApplication
);
router.post('/createloan',createLoanApplication)
router.get('/getloan', getAllLoanApplications);
router.put('/:id', updateLoanApplication);
router.delete('/:id', deleteLoanApplication);

export default router;

