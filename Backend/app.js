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
import country from "./server/Router/countryRoute/Country.js";
import state from "./server/Router/stateRoute/State.js";
import district from "./server/Router/districtRoute/District.js";
import city from "./server/Router/cityRoute/City.js";
import area from "./server/Router/areaRoute/Area.js";

import loanform from "./server/Router/LoanApplicationRouter.js";
import employeeSignup from "./server/Router/EmployeeRouter.js";
import Adminlogin from "./server/Router/Adminroutes.js";
import nodemailer from "./server/Router/NodeMailerRouter.js";
import job from "./server/Router/JobPostRouter.js";
import jobrequest from "./server/Router/JobRequestRouter.js";
import lead from "./server/Router/LeadGenerationRouter.js";
import Contactus from "./server/Router/ContactusRoutes.js";
import taxManagement from "./server/Router/TaxManagementRoute.js";
import insuranceManagement from "./server/Router/InsuranceManagementRouter.js";
import SubscriptionPrice from "./server/Router/SubscriptionPriceRoutes.js";
// import notificationRoutes from "./server/Router/NotificationRoutes.js";

app.use("/country", country);
app.use("/state", state);
app.use("/district", district);
app.use("/city", city);
app.use("/area", area);
app.use("/taxManagement", taxManagement);
app.use("/insuranceManagement", insuranceManagement);
// app.use("/api/notifications", notificationRoutes);

app.use("/admin", Adminlogin);
app.use("/signup", signup);
app.use("/employeesignup", employeeSignup);
app.use("/loanform", loanform);
app.use("/nodemailer", nodemailer);
app.use("/job", job);
app.use("/jobrequest", jobrequest);
app.use("/lead", lead);
app.use("/contactus", Contactus);
app.use("/subscription", SubscriptionPrice);
export default app;
