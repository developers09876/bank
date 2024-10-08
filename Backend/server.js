import app from "./app.js";
import mongoose from "mongoose";
import { config } from "dotenv";

const { connect } = mongoose;

config({
  path: "./.env",
});

const database = process.env.DATABASE;
const port = process.env.PORT;

connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB Connected");
}).catch((err) => {
  console.error("DB Connection Error:", err);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
