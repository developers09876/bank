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
import Adminlogin from "./server/Router/Adminroutes.js";
import nodemailer from "./server/Router/NodeMailerRouter.js";
import job from "./server/Router/JobPostRouter.js"
import jobrequest from "./server/Router/JobRequestRouter.js"

app.use("/admin", Adminlogin);
app.use("/signup", signup);
app.use("/employeesignup", employeeSignup);
app.use("/loanform", loanform);
app.use("/nodemailer", nodemailer);
app.use("/job",job);
app.use("/jobrequest",jobrequest)

export default app;
