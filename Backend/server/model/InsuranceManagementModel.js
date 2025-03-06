import mongoose from "mongoose";

const insuranceManagementSchema = new mongoose.Schema(
  {
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
    VehicleType: { type: String },
    referCode: { type: String, unique: true },
    employeeCategory: { type: String },
    annualIncome: { type: String },
    policyAmount: { type: String },
    sumAssured: { type: String },
    description: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    employeeId: { type: String },
    employeeType: { type: String },
    employeeList: { type: String },
    policyAmount: { type: String },
    report_Manager: { type: String },
    sale_Manager: { type: String },
    Branch: { type: String },
    state: { type: String },
    district: { type: String },
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
  },
  {
    timestamps: true,
  }
);
const insuranceManagementDb = mongoose.model(
  "insuranceManagementdb",
  insuranceManagementSchema
);

export default insuranceManagementDb;
