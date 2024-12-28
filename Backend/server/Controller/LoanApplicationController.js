import LoanApplication from "../model/LoanApplicationModel.js";

// export async function createLoanApplication(req, res, next) {
//   try {
//     const data = req.body;
//     console.log("data", data);
//     const details = {
//       userid: data.userid,
//       fullName: data.fullName,
//       dob: data.dob,
//       gender: data.gender,
//       maritalStatus: data.MaritalStatus,
//       nationality: data.nationality,
//       pan: data.pan,
//       aadhaar: data.aadhaar,
//       contact: data.contact,
//       address: data.address,
//       annualIncome: data.annualIncome,
//       bankAccountDetails: data.bankAccountDetails,
//       creditScore: data.creditScore,
//       downPayment: data.downPayment,
//       employerDetails: data.employerDetails,
//       employmentStatus: data.employmentStatus,
//       existingLoans: data.existingLoans,
//       incomeDetails: data.incomeDetails,
//       loanAmount: data.loanAmount,
//       loanPurpose: data.loanPurpose,
//       propertyDetails: data.propertyDetails,
//       identityProof: data.identityProof,
//       addressProof: data.addressProof,
//       photographs: data.photographs,
//       propertyOwnershipProof: data.propertyOwnershipProof,
//       signature: data.signature,
//     };
//     const loanApplication = await LoanApplication.create(details);
//     if (loanApplication) {
//       res.status(201).json({
//         message: "Submitted Successfully",
//         data: loanApplication,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     next();
//   }
// }

export async function createLoanApplication(req, res, next) {
  try {
    const data = req.body;
    console.log("Request Data:", data);

    // Process children information
    const children = Array.isArray(data.children)
      ? data.children.map((child) => ({
          gender: child.gender,
          name: child.name,
          age: child.age,
          schoolName: child.schoolName,
        }))
      : [];

    // Construct the details object
    const details = {
      // userid: data.userid,
      fullName: data.fullName,
      dob: data.dob,
      gender: data.gender,
      maritalStatus: data.maritalStatus || data.MaritalStatus,
      nationality: data.nationality,
      contact: data.contact,
      address: data.address,
      city: data.city,
      state: data.state,
      district: data.district,
      totalChildren: data.totalChildren,
      children: children,
      spouseName: data.spouseName,
      spouseOccupation: data.spouseOccupation,
      spouseIncome: data.spouseIncome,
      spouseDesignation: data.spouseDesignation,
      coApplicantDocs: data.coApplicantDocs,
      photographs: data.photographs,
    };

    console.log("Prepared Details:", details);

    // Save loan application to the database
    const loanApplication = await LoanApplication.create(details);

    // Respond to the client
    if (loanApplication) {
      return res.status(201).json({
        message: "Submitted Successfully",
        data: loanApplication,
      });
    } else {
      return res.status(400).json({
        message: "Failed to create loan application. Please try again.",
      });
    }
  } catch (err) {
    console.error("Error creating loan application:", err);
    res.status(500).json({
      message: "An error occurred while processing your request.",
      error: err.message,
    });
    next(err);
  }
}

export async function updateLoanApplicationStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { action } = req.body;
    console.log("object", action);
    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({
        message: "Invalid action. Allowed actions are 'approve' or 'reject'.",
      });
    }

    const status = action === "approve" ? "1" : "2";

    const updatedLoanApplication = await LoanApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLoanApplication) {
      return res.status(404).json({
        message: "Loan application not found.",
      });
    }

    res.status(200).json({
      message: `Loan application ${
        action === "approve" ? "approved" : "rejected"
      } successfully.`,
      data: updatedLoanApplication,
    });
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
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLoanApplication = async (req, res) => {
  try {
    const deletedApplication = await LoanApplication.findByIdAndDelete(
      req.params.id
    );
    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
