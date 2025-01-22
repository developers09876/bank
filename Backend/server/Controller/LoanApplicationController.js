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

    const children = Array.isArray(data.children)
      ? data.children.map((child) => ({
          gender: child.gender,
          name: child.name,
          age: child.age,
          schoolName: child.schoolName,
        }))
      : [];

    const details = {
      userid: data.userid,
      firstname: data.firstname,
      lastname: data.lastname,
      // fullName: data.fullName,
      dob: data.dob,
      gender: data.gender,
      maritalStatus: data.maritalStatus || data.MaritalStatus,
      nationality: data.nationality,
      contact: data.contact,
      contactNumber: data.contactNumber,
      address: data.address,
      pinCode: data.pinCode,
      city: data.city,
      state: data.state,
      district: data.district,
      country: data.country,
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

    const loanApplication = await LoanApplication.create(details);

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
export async function updateLoanDetails(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedDetails = {
      loanAgentName: data.loanAgentName,
      loanAgentContactNumber: data.loanAgentContactNumber,
      identityProof: data.identityProof,
      addressProof: data.addressProof,
      annualIncome: data.annualIncome,
      nomineeDocs: data.nomineeDocs,
      creditScore: data.creditScore,
      employmentStatus: data.employmentStatus,
      existingLoans: data.existingLoans,
      financialProof: data.financialProof,
      incomeDetails: data.incomeDetails,
      loanAmount: data.loanAmount,
      loanPurpose: data.loanPurpose,
      nomineeName: data.nomineeName,
      nomineeAddress: data.nomineeAddress,
      nomineeRelationship: data.nomineeRelationship,
      propertyDetails: data.propertyDetails,
      propertyOwnershipProof: data.propertyOwnershipProof,
      signature: data.signature,
      employeePayslipProof: data.employeePayslipProof,
      businessOwnerStatementProof: data.businessOwnerStatementProof,
      panCardNumber: data.panCardNumber,
      GSTNumber: data.GSTNumber,
      accountNumber: data.accountNumber,
      IFSCCode: data.IFSCCode,
      bankName: data.bankName,
      aadhaarNumber: data.aadhaarNumber,
      bankBranch: data.bankBranch,
      panImageUpload: data.panImageUpload,
      aadharImageUpload: data.aadharImageUpload,
    };

    console.log("Updated Details:", updatedDetails);

    const updatedLoanApplication = await LoanApplication.findByIdAndUpdate(
      id,
      { $set: updatedDetails },
      { new: true, runValidators: true }
    );

    if (updatedLoanApplication) {
      return res.status(200).json({
        message: "Loan details updated successfully",
        data: updatedLoanApplication,
      });
    } else {
      return res.status(404).json({
        message: "Loan application not found",
      });
    }
  } catch (err) {
    console.error("Error updating loan details:", err);
    res.status(500).json({
      message: "An error occurred while updating the loan details.",
      error: err.message,
    });
    next(err);
  }
}

export async function updateLoanApplicationStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { action , reason } = req.body;
    console.log("object", action);
    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({
        message: "Invalid action. Allowed actions are 'approve' or 'reject'.",
      });
    }

    const status = action === "approve" ? "1" : "2";

    if (action === "reject" && !reason) {
      return res.status(400).json({
        message: "Rejection reason is required when rejecting the loan.",
      });
    }
    const updatedLoanApplication = await LoanApplication.findByIdAndUpdate(
      id,
      { status,
        rejectionReason: action === "reject" ? reason : null, 
       },
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
  }
  catch (err) {
    console.log(err);
    next();
  }
};

export async function updateLoan(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log("data", data);
    const updateDetails = {
      AdminId: data.AdminId,
      description: data.description,
      employeeId: data.employeeId,
      employeeType: data.employeeType,
      employeeList: data.employeeList,
      loanType: data.loanType,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      // dob: data.dob || null,
    };
    console.log("Update Details:", updateDetails);

    const updatedRecord = await LoanApplication.findByIdAndUpdate(
      id,
      updateDetails,
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatedRecord) {
      res.status(200).json({
        message: "Updated Successfully",
        data: updatedRecord,
      });
    } else {
      res.status(404).json({
        message: "Record not found",
      });
    }
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(500).json({
      message: "Failed to update record",
    });
    next(err);
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
    const { userid } = req.params;

    const application = await LoanApplication.find({userid});
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
