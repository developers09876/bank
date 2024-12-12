import LoanApplication from '../model/LoanApplicationModel.js';

export async function createLoanApplication(req, res, next) {
  try {
    const data = req.body;
    console.log('data', data)
    const details = {
      userid:data.userid,
      fullName: data.fullName,
      dob: data.dob,
      gender: data.gender,
      maritalStatus: data.MaritalStatus,
      nationality: data.nationality,
      pan: data.pan,
      aadhaar: data.aadhaar,
      contact: data.contact,
      address: data.address,
      annualIncome: data.annualIncome,
      bankAccountDetails: data.bankAccountDetails,
      creditScore: data.creditScore,
      downPayment: data.downPayment,
      employerDetails: data.employerDetails,
      employmentStatus: data.employmentStatus,
      existingLoans: data.existingLoans,
      incomeDetails: data.incomeDetails,
      loanAmount: data.loanAmount,
      loanPurpose: data.loanPurpose,
      propertyDetails: data.propertyDetails,
      identityProof: data.identityProof,
      addressProof: data.addressProof,
      photographs: data.photographs,
      propertyOwnershipProof: data.propertyOwnershipProof,
      signature: data.signature,
    };
    const loanApplication = await LoanApplication.create(details);
    if (loanApplication) {
      res.status(201).json({
        message: "Submitted Successfully",
        data: loanApplication,
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}
export const getAllLoanApplications = async (req, res) => {
  try {
    const applications = await LoanApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLoanApplicationById = async (req, res) => {
  try {
    const application = await LoanApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a loan application
export const updateLoanApplication = async (req, res) => {
  try {
    const updatedApplication = await LoanApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a loan application
export const deleteLoanApplication = async (req, res) => {
  try {
    const deletedApplication = await LoanApplication.findByIdAndDelete(req.params.id);
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};