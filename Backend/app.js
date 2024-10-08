import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(
  json({
    limit: "25mb",
  })
);
import signup from "./server/Router/SignupRouter.js"


app.use("/signup",signup);




export default app;
