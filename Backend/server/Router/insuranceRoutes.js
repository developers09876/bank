// /routes/insuranceRoutes.js
import express from 'express';
import {
  createInsurance,
  getAllInsurance,
  getInsuranceById,
  updateInsurance,
  deleteInsurance,
} from '../Controller/insuranceController.js';

const router = express.Router();

router.post('/create', createInsurance);
router.get('/get', getAllInsurance);
router.get('/:id', getInsuranceById);
router.put('/:id', updateInsurance);
router.delete('/:id', deleteInsurance);

export default router;
