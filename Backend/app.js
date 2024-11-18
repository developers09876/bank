import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(
  json({
    limit: "25mb",
  })
);
import signup from "./server/Router/SignupRouter.js";
import loanform from "./server/Router/LoanApplicationRouter.js";
import employeeSignup from "./server/Router/EmployeeRouter.js";

app.use("/signup", signup);
app.use("/employeesignup", employeeSignup);
app.use("/loanform", loanform);

export default app;
