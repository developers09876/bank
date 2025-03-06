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
export async function updateLoanApplication(req, res, next) {
  try {
    const applicationId = req.params.id;

    if (!applicationId) {
      return res.status(400).json({
        message: "Application ID is required.",
      });
    }

    console.log("Application ID:", applicationId);

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
      referCode: data.referCode,
    };

    console.log("Prepared Details:", details);

    const loanApplication = await LoanApplication.findByIdAndUpdate(
      applicationId,
      details,
      { new: true } // Return the updated document
    );

    if (!loanApplication) {
      return res.status(404).json({
        message: "Loan application not found.",
      });
    }

    return res.status(200).json({
      message: "Updated Successfully",
      data: loanApplication,
    });
  } catch (err) {
    console.error("Error updating loan application:", err);
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
    console.log("updateLoanDetailsid", id);
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
      loanType: data.loanType,
      vehicleType: data.vehicleType,
      referCode: data.referCode,
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
      panImageUpload: data.panUpload,
      aadharImageUpload: data.AdharUpload,
      voterIdUpload: data.voterIdUpload,
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
    const { action, reason } = req.body;
    console.log("object", action);
    if (!["approve", "reject", "Pending"].includes(action)) {
      return res.status(400).json({
        message:
          "Invalid action. Allowed actions are 'approve' or 'reject' or 'Pending'.",
      });
    }

    const status =
      action === "approve" ? "1" : action === "reject" ? "2" : "Pending";

    if ((action === "reject" || action === "Pending") && !reason) {
      return res.status(400).json({
        message: "Reason is required when marking the loan as '${action}'",
      });
    }
    const updatedLoanApplication = await LoanApplication.findByIdAndUpdate(
      id,
      {
        status,
        rejectionReason: action === "reject" ? reason : null,
        pendingReason: action === "Pending" ? reason : null,
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
        action === "approve"
          ? "approved"
          : action === "reject"
          ? "rejected"
          : "marked as Pending"
      } successfully.`,
      data: updatedLoanApplication,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function updateLoanRemarks(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log("data", data);
    const addremarks = Array.isArray(data.addremarks)
      ? data.addremarks.map((child) => ({
          date: child.date,
          remarks: child.remarks,
          status: child.status,
          isApproved: child.isApproved,
          // notiFicatioinStauts: child.notiFicatioinStauts,
        }))
      : [];
    const updateDetails = {
      addremarks: addremarks,
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
      employeeCategory: data.employeeCategory,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      state: data.state,
      district: data.district,
      Branch: data.Branch,
      report_Manager: data.report_Manager,
      sale_Manager:data.sale_Manager,
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

    const application = await LoanApplication.find({ userid });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getOneLoanApplicationById = async (req, res) => {
  try {
    const id = req.params.id;
    const oneLoanManagement = await LoanApplication.findById(id);
    if (!oneLoanManagement) {
      return res.status(404).json({ message: "User id not found" });
    }
    res.status(200).json(oneLoanManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLoanByEmpId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const loanManagement = await LoanApplication.find({ employeeId });
    if (!loanManagement) {
      return res.status(404).json({ message: "User id not found" });
    }
    res.status(200).json(loanManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getbyReferCode = async (req, res) => {
  try {
    const { referCode } = req.params;
    const loanApplications = await LoanApplication.find({ referCode });

    if (!loanApplications.length) {
      return res
        .status(404)
        .json({ message: "No records found for this referCode" });
    }

    res.status(200).json(loanApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const calculateReferralEarnings = async (req, res) => {
//   try {
//     const { referCode } = req.params;
//     const loanApplications = await LoanApplication.find({ referCode });

//     if (!loanApplications.length) {
//       return res
//         .status(404)
//         .json({ message: "No records found for this referCode" });
//     }

//     let homeLoanCount = 0;
//     let vehicleLoanCount = 0;
//     let businessLoanCount = 0;
//     let personalLoanCount = 0;
//     // Count referrals for each loan type
//     loanApplications.forEach((loan) => {
//       const loanType = loan.loanType;
//       if (loanType === "Home Loan") {
//         homeLoanCount++;
//       } else if (loanType === "Vehicle Loan") {
//         vehicleLoanCount++;
//       } else if (loanType === "Business Loan") {
//         businessLoanCount++;
//       } else if (loanType === "Personal Loan") {
//         personalLoanCount++;
//       }
//     });

//     // Calculate earnings
//     const homeLoanEarnings = homeLoanCount * 5;
//     const vehicleLoanEarnings = vehicleLoanCount * 10;
//     const businessLoanEarnings = businessLoanCount * 15;
//     const personalLoanEarnings = personalLoanCount * 20;

//     const totalEarnings =
//       homeLoanEarnings +
//       vehicleLoanEarnings +
//       businessLoanEarnings +
//       personalLoanEarnings;

//     res.status(200).json({
//       referCode,
//       homeLoanCount,
//       vehicleLoanCount,
//       businessLoanCount,
//       homeLoanEarnings,
//       vehicleLoanEarnings,
//       personalLoanEarnings,
//       businessLoanEarnings,
//       totalEarnings,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const calculateReferralEarnings = async (req, res) => {
  try {
    const { referCode } = req.params;
    const loanApplications = await LoanApplication.find({ referCode });

    if (!loanApplications.length) {
      return res
        .status(404)
        .json({ message: "No records found for this referCode" });
    }

    let homeLoanCount = 0;
    let vehicleLoanCount = 0;
    let businessLoanCount = 0;
    let personalLoanCount = 0;

    let homeLoanEarnings = 0;
    let vehicleLoanEarnings = 0;
    let businessLoanEarnings = 0;
    let personalLoanEarnings = 0;

    // Loop through loan applications and calculate referral earnings based on conditions
    loanApplications.forEach((loan) => {
      const { loanType, loanAmount } = loan;
      const commission = loanAmount * 0.005; // 0.5% of loan amount

      if (loanType === "Business Loan") {
        businessLoanCount++;
        if (businessLoanCount >= 2) {
          businessLoanEarnings += commission;
        }
      } else if (loanType === "Home Loan") {
        homeLoanCount++;
        if (homeLoanCount >= 3) {
          homeLoanEarnings += commission;
        }
      } else if (loanType === "Vehicle Loan") {
        vehicleLoanCount++;
        if (vehicleLoanCount >= 4) {
          vehicleLoanEarnings += commission;
        }
      } else if (loanType === "Personal Loan") {
        personalLoanCount++;
        if (personalLoanCount >= 10) {
          personalLoanEarnings += commission;
        }
      }
    });

    // Calculate total earnings
    const totalEarnings =
      homeLoanEarnings +
      vehicleLoanEarnings +
      businessLoanEarnings +
      personalLoanEarnings;

    res.status(200).json({
      referCode,
      homeLoanCount,
      vehicleLoanCount,
      businessLoanCount,
      personalLoanCount,
      homeLoanEarnings: homeLoanEarnings.toFixed(2),
      vehicleLoanEarnings: vehicleLoanEarnings.toFixed(2),
      personalLoanEarnings: personalLoanEarnings.toFixed(2),
      businessLoanEarnings: businessLoanEarnings.toFixed(2),
      totalEarnings: totalEarnings.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentMonthIncome = async (req, res) => {
  try {
    const { referCode } = req.params;

    // Get the current month and year
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-based index (January = 0)
    const currentYear = now.getFullYear();

    // Fetch all referrals with the given referCode
    const loanApplications = await LoanApplication.find({ referCode });

    if (!loanApplications.length) {
      return res.status(404).json({
        message: "No referrals found for this referCode.",
        totalIncome: 0,
      });
    }

    // Referral thresholds for eligibility
    const referralThresholds = {
      "Business Loan": 2,
      "Home Loan": 3,
      "Vehicle Loan": 4,
      "Personal Loan": 10,
    };

    let totalIncome = 0;
    let loanTypeCounts = {}; // To count loans per loan type
    let currentMonthLoans = []; // To store loans for the current month

    // Process loan applications to count and filter by current month
    loanApplications.forEach((loan) => {
      const { loanType, loanAmount, createdAt } = loan;
      const loanDate = new Date(createdAt);
      const isCurrentMonth =
        loanDate.getMonth() === currentMonth &&
        loanDate.getFullYear() === currentYear;

      if (isCurrentMonth) {
        currentMonthLoans.push(loan);

        // Count referrals per loan type
        if (!loanTypeCounts[loanType]) {
          loanTypeCounts[loanType] = 0;
        }
        loanTypeCounts[loanType]++;
      }
    });

    // Log the loanTypeCounts and currentMonthLoans for debugging

    // Calculate income based on referral count and loan amount
    currentMonthLoans.forEach((loan) => {
      const { loanType, loanAmount } = loan;

      // Check if the loan type meets the threshold for income calculation
      if (loanType) {
        const income = loanAmount * 0.005; // 0.5% of loan amount
        console.log("loan", loanAmount);

        totalIncome += income;
      }
    });

    res.status(200).json({ referrals: currentMonthLoans, totalIncome });
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
