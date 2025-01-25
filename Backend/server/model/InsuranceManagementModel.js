import mongoose from "mongoose";

const insuranceManagementSchema = new mongoose.Schema({
  AdminId: { type: String },
  userId: { type: String },
  userType: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  contactNumber: { type: String },
  email: { type: String },
  aadhar: { type: String },
  panno: { type: String },
  gst: { type: String },
  policyTerm: { type: String },
  PolicyType: { type: String },
  annualIncome: { type: String },
  sumAssured: { type: String },
  description: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  employeeId: { type: String },
  employeeType: { type: String },
});
const insuranceManagementDb = mongoose.model("insuranceManagementdb", insuranceManagementSchema);

export default insuranceManagementDb;
