import mongoose from "mongoose";

const taxManagementSchema = new mongoose.Schema({
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
  incomeTaxStatus: { type: String },
  businessType: { type: String },
  annualIncome: { type: String },
  taxPaid: { type: String },
  description: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  employeeId: { type: String },
  employeeType: { type: String },
});
const taxManagementDb = mongoose.model("taxManagementdb", taxManagementSchema);

export default taxManagementDb;
