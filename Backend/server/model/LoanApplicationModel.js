import mongoose from "mongoose";


const loanApplicationSchema = new mongoose.Schema({
  maritalStatus: String,
  aadhaar: String,
  address: String,
  annualIncome: String,
  bankAccountDetails: String,
  contact: String,
  creditScore: String,
  dob: Date,
  downPayment: String,
  employerDetails: String,
  employmentStatus: String,
  existingLoans: String,
  fullName: String,
  gender: String,
  incomeDetails: String,
  loanAmount: String,
  loanPurpose: String,
  nationality: String,
  pan: String,
  propertyDetails: String,
  documents: {
    addressProof: String,
    coApplicantDocs: String,
    financialProof: String,
    identityProof: String,
    photographs: String,
    propertyOwnershipProof: String,
    signature: String,
  },
});

const Loan = mongoose.model('LoanApplication', loanApplicationSchema);
export default Loan;