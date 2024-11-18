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

app.use("/signup", signup);
app.use("/loanform", loanform);

app.use("/insurance", insuranceRoutes);

export default app;
