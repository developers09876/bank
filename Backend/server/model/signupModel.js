import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String},
  userType: { type: String,},
  empno: { type: String },
  manager: { type: String },
  branch: { type: String },
  dateOfJoining: { type: String },
  firstname: { type: String,},
  lastname: { type: String,},
  email: { type: String,  unique: true },
  // password: { type: String,},
  contactNumber: { type: String,  unique: true },
  forgetPasswordCode: { type: String, default: null },
});

const User = mongoose.model("UserList", userSchema);
export default User;
