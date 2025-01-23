import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  userId: { type: String },
  userType: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  contactNumber: { type: String },
  email: { type: String },
  aadhaarNumber: { type: String },
  purpose: { type: String },
  amount: { type: String },
  howimidiate: { type: String },
  previouslyapplied: { type: String },
  panCardNumber: { type: String },
  loanType:{ type: String },
  employeeId: { type: String },
  employeeType: { type: String },     
  employeeList:{ type: String }, 
  startDate: { type: Date},
  endDate: { type: Date},
  dob: { type: Date},          
  description:{ type: String },  
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
