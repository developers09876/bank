// const LoanApplication = require('../model/LoanApplicationModel.js');
import Loan from '../model/LoanApplicationModel.js';
import multer from "multer"

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Set upload destination
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname), // Unique file name
});
const upload = multer({ storage });

// Create a new loan application
export const createLoanApplication = async (req, res) => {
  try {
    const { maritalStatus, aadhaar, address, annualIncome, bankAccountDetails, contact, creditScore, dob, downPayment, employerDetails, employmentStatus, existingLoans, fullName, gender, incomeDetails, loanAmount, loanPurpose, nationality, pan, propertyDetails } = req.body;

    const documents = {
      addressProof: req.files.addressProof[0].path,
      coApplicantDocs: req.files.coApplicantDocs[0].path,
      financialProof: req.files.financialProof[0].path,
      identityProof: req.files.identityProof[0].path,
      photographs: req.files.photographs[0].path,
      propertyOwnershipProof: req.files.propertyOwnershipProof[0].path,
      signature: req.files.signature[0].path,
    };

    const loanApplication = new Loan({
      maritalStatus,
      aadhaar,
      address,
      annualIncome,
      bankAccountDetails,
      contact,
      creditScore,
      dob,
      downPayment,
      employerDetails,
      employmentStatus,
      existingLoans,
      fullName,
      gender,
      incomeDetails,
      loanAmount,
      loanPurpose,
      nationality,
      pan,
      propertyDetails,
      documents,
    });

    await loanApplication.save();
    res.status(201).json({ message: 'Loan application created successfully', loanApplication });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all loan applications
export const getAllLoanApplications = async (req, res) => {
  try {
    const loanApplications = await Loan.find();
    res.status(200).json(loanApplications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a loan application
export const updateLoanApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLoanApplication = await Loan.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedLoanApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a loan application
export const deleteLoanApplication = async (req, res) => {
  try {
    const { id } = req.params;
    await Loan.findByIdAndDelete(id);
    res.status(200).json({ message: 'Loan application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
