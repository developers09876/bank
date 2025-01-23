// import mongoose from "mongoose";

// const loanApplicationSchema = new mongoose.Schema(
//   {
//     userid: { type: String },
//     aadhaar: { type: String },
//     address: { type: String },
//     addressProof: { type: String },
//     annualIncome: { type: String },
//     bankAccountDetails: { type: String },
//     contact: { type: String },
//     creditScore: { type: String },
//     dob: { type: Date },
//     downPayment: { type: String },
//     employerDetails: { type: String },
//     employmentStatus: { type: String },
//     existingLoans: { type: String },
//     fullName: { type: String },
//     gender: { type: String, enum: ["Male", "Female", "Other"] },
//     identityProof: { type: String },
//     incomeDetails: { type: String },
//     loanAmount: { type: String },
//     loanPurpose: { type: String },
//     maritalStatus: {
//       type: String,
//       enum: ["Married", "Single", "Other"],
//     },
//     nationality: { type: String },
//     pan: { type: String },
//     photographs: { type: String },
//     propertyDetails: { type: String },
//     propertyOwnershipProof: { type: String },
//     signature: { type: String },
//     status: { type: String, default: "0" },
//   },
//   {
//     timestamps: true,
//   }
// );

// const LoanApplication = mongoose.model(
//   "LoanApplication",
//   loanApplicationSchema
// );
// export default LoanApplication;

import mongoose from "mongoose";

const loanApplicationSchema = new mongoose.Schema(
  {
    userid: { type: String },
    aadhaar: { type: String },
    address: { type: String },
    pinCode: { type: String },
 
    city: { type: String },
    state: { type: String },
    district: { type: String },
    country: { type: String },
    addressProof: { type: String },
    annualIncome: { type: Number },
    contact: { type: String },
    contactNumber:{ type: String },
    creditScore: { type: Number },
    dob: { type: Date },
    downPayment: { type: Number },
    employerDetails: { type: String },
    existingLoans: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    identityProof: { type: String },
    incomeDetails: { type: String },
    loanAmount: { type: Number },
    loanPurpose: { type: String },
    loanAgentName: { type: String },
    loanAgentContactNumber: { type: String },

    employmentStatus: { type: String },
    maritalStatus: {
      type: String,
      enum: ["Married", "Single", "Other"],
      required: true,
    },
    nationality: { type: String },
    pan: { type: String },
    photographs: { type: String },
    financialProof: [{ type: String }],
    propertyDetails: { type: String },
    employeePayslipProof: { type: String },
    businessOwnerStatementProof: { type: String },
    propertyOwnershipProof: { type: String },
    coApplicantDocs: { type: String },
    nomineeName: { type: String },
    nomineeRelationship: { type: String },
    nomineeAddress: { type: String },
    nomineeDocs: { type: String },
    signature: { type: String },
    spouseName: { type: String },
    spouseOccupation: { type: String },
    spouseIncome: { type: Number },
    spouseDesignation: { type: String },
    totalChildren: { type: String },
    panCardNumber: { type: String },
    GSTNumber: { type: String },
    accountNumber: { type: String },
    IFSCCode: { type: String },
    bankName: { type: String },
    bankBranch: { type: String },
    panImageUpload: { type: String },
    aadharImageUpload: { type: String },
    aadhaarNumber: { type: String },
    loanType:{ type: String },
    employeeId: { type: String },
    employeeType: { type: String },     
    employeeList:{ type: String }, 
    startDate: { type: Date},
    endDate: { type: Date},
    dob: { type: Date},          
    description:{ type: String },  

    children: [
      {
        name: { type: String },
        gender: { type: String, enum: ["Male", "Female", "Other"] },
        age: { type: Number },
        schoolName: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    rejectionReason: { type: String},
    
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
