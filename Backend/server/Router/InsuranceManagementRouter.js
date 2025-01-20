import { Router } from "express";
import { createInsuranceManagementDb, getallInsuranceManagement, getInsuranceManagementEmployeeId, getInsuranceManagementUserId, updateInsuranceManagementDb } from "../Controller/InsuranceManagementController.js";


const router = Router();

router.post("/createinsuranceManagement", createInsuranceManagementDb);
router.put("/updateInsuranceManagement/:id", updateInsuranceManagementDb);
router.get("/getbyEmployeeid/:employeeId", getInsuranceManagementEmployeeId);
router.get("/getAllInsuranceManagement", getallInsuranceManagement);
router.get("/getByIdInsuranceManagement/:userid", getInsuranceManagementUserId);

export default router;
