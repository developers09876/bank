import { Router } from "express";
import {
  AddEmployee,
  employeegetById,
  EmployeeLogin,
  getAll,
  getReportingManagerId,
} from "../Controller/EmployeeController.js";

const router = Router();

router.route("/register").post(AddEmployee);
router.route("/login").post(EmployeeLogin);
router.route("/getall").get(getAll);
router.route("/getby/:id").get(employeegetById);
router.route("/getByIdReportingManagerId/:report_Manager").get(getReportingManagerId);
export default router;
