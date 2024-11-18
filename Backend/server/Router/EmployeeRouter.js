import { Router } from "express";
import {
  AddEmployee,
  employeegetById,
  EmployeeLogin,
  getAll,
} from "../Controller/EmployeeController.js";

const router = Router();

router.route("/register").post(AddEmployee);
router.route("/login").post(EmployeeLogin);
router.route("/getall").get(getAll);
router.route("/getby/:id").get(employeegetById);

export default router;
