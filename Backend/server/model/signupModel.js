import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String },
  userType: { type: String },
  empno: { type: String },
  manager: { type: String },
  branch: { type: String },
  dateOfJoining: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  // fullName: { type: String },
  email: { type: String, unique: true },
  // password: { type: String,},
  contactNumber: { type: String, unique: true },
  forgetPasswordCode: { type: String, default: null },
  address: { type: String },
  pinCode: { type: String },

  city: { type: String },
  state: { type: String },
  district: { type: String },
  country: { type: String },
  nationality: { type: String },

  dob: { type: Date },
  maritalStatus: {
    type: String,
    enum: ["Married", "Single", "Other"],
    required: true,
  },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  addressProof: { type: String },
  annualIncome: { type: Number },
  // contact: { type: String },
  signature: { type: String },
  spouseName: { type: String },
  spouseOccupation: { type: String },
  spouseIncome: { type: Number },
  spouseDesignation: { type: String },
  totalChildren: { type: String },
  coApplicantDocs: { type: String },
  photographs: { type: String },
  children: [
    {
      name: { type: String },
      gender: { type: String, enum: ["Male", "Female", "Other"] },
      age: { type: Number },
      schoolName: { type: String },
    },
  ],
  panCardNumber: { type: String },
  GSTNumber: { type: String },
  accountNumber: { type: Number },
  IFSCCode: { type: String },
  bankName: { type: String },
  bankBranch: { type: String },
  panOrAdharUpload: { type: String },
  voterIdUpload: { type: String },
});

const User = mongoose.model("UserList", userSchema);
export default User;
