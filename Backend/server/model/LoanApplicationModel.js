import mongoose from "mongoose";

const loanApplicationSchema = new mongoose.Schema(
  {
    userid: { type: String },
    aadhaar: { type: String },
    address: { type: String },
    addressProof: { type: String },
    annualIncome: { type: String },
    bankAccountDetails: { type: String },
    contact: { type: String },
    creditScore: { type: String },
    dob: { type: Date },
    downPayment: { type: String },
    employerDetails: { type: String },
    employmentStatus: { type: String },
    existingLoans: { type: String },
    fullName: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    identityProof: { type: String },
    incomeDetails: { type: String },
    loanAmount: { type: String },
    loanPurpose: { type: String },
    maritalStatus: {
      type: String,
      enum: ["Married", "Single", "Other"],
    },
    nationality: { type: String },
    pan: { type: String },
    photographs: { type: String },
    propertyDetails: { type: String },
    propertyOwnershipProof: { type: String },
    signature: { type: String },
    status: { type: String, default: "0" },
  },
  {
    timestamps: true,
  }
);

const LoanApplication = mongoose.model(
  "LoanApplication",
  loanApplicationSchema
);
export default LoanApplication;
