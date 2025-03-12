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
  // incomeTaxStatus: { type: String },
  businessType: { type: String },
  annualIncome: { type: String },
  taxType: { type: String },
  subCategory: { type: String },
  employeeCategory: { type: String },
  statename: { type: String },
  districtname: { type: String },
  Branch:{ type: String },
  report_Manager: { type: String },
  report_ManagerName:{ type: String },
  sale_Manager: { type: String },
  sale_ManagerName: { type: String },
  description: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  employeeId: { type: String },
  employeeType: { type: String },
  addremarks: [
    {
      date: { type: String },
      remarks: { type: String },
      status: { type: String },
      notiFicatioinStauts: { type: String },
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  rejectionReason: { type: String },
  pendingReason: { type: String },
});
const taxManagementDb = mongoose.model("taxManagementdb", taxManagementSchema);

export default taxManagementDb;
