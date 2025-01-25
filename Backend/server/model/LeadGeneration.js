import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  userId: { type: String },
  userType: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  contactNumber: { type: String },
  email: { type: String },
  aadhar: { type: String },
  purpose: { type: String },
  amount: { type: String },
  howimidiate: { type: String },
  previouslyapplied: { type: String },
  panno: { type: String },
  insuranceType: { type: String },
      PolicyTerm:{ type: String },
      sumAssured: { type: String },
      incomeTaxStatus: { type: String },
      taxType: { type: String },
      businessType: { type: String },
      serviceType:{ type: String },
  addremarks: [
    {
      date: { type: String },
      remarks: { type: String },
      status: { type: String },
      notiFicatioinStauts: { type: String },
    },
  ],
});

const Lead = mongoose.model("leadlist", LeadSchema);
export default Lead;
