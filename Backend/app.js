import express, { json } from "express";
import cors from "cors";
import signup from "./server/Router/SignupRouter.js";
import insuranceRoutes from "./server/Router/insuranceRoutes.js";

const app = express();
app.use(cors());
app.use(
  json({
    limit: "25mb",
  })
);
import loanform from "./server/Router/LoanApplicationRouter.js";
import employeeSignup from "./server/Router/EmployeeRouter.js";

app.use("/signup", signup);
app.use("/employeesignup", employeeSignup);
app.use("/loanform", loanform);

export default app;
