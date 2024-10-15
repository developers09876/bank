import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userType: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

const User = mongoose.model("UserList", userSchema);
export default User;
