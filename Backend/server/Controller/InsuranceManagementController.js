import insuranceManagementDb from "../model/InsuranceManagementModel.js";

// export async function createInsuranceManagementDb(req, res, next) {
//   try {
//     const data = req.body;
//     const details = {
//       userId: data.userId,
//       userType: data.userType,
//       firstname: data.firstname,
//       lastname: data.lastname,
//       contactNumber: data.contactNumber,
//       email: data.email,
//       aadhar: data.aadhar,
//       panno: data.panno,
//       gst: data.gst,
//       policyTerm: data.policyTerm,
//       PolicyType: data.PolicyType,
//       VehicleType: data.VehicleType,
//       policyAmount: data.policyAmount,
//       annualIncome: data.annualIncome,
//       sumAssured: data.sumAssured,
//       referCode: data.referCode,
//     };
//     const taxManagement = await insuranceManagementDb.create(details);
//     if (taxManagement) {
//       res.status(201).json({
//         message: "Insurance Management Created Successfully",
//         data: taxManagement,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     next();
//   }
// }
export const getInsuranceManagementUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("Fetching insurance for userId:", userId);
    const insuranceManagement = await insuranceManagementDb.find({ userId });
    if (!insuranceManagement || insuranceManagement.length === 0) {
      return res.status(404).json({ message: "Insurance records not found for user" });
    }
    res.status(200).json(insuranceManagement);
  } catch (error) {
    console.error("Error fetching insurance data:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createInsuranceManagementDb = async (req, res, next) => {
  try {
    const data = req.body;
    const details = {
      userId: data.userId,
      userType: data.userType,
      firstname: data.firstname,
      lastname: data.lastname,
      contactNumber: data.contactNumber,
      email: data.email,
      aadhar: data.aadhar,
      panno: data.panno,
      gst: data.gst,
      policyTerm: data.policyTerm,
      PolicyType: data.PolicyType,
      VehicleType: data.VehicleType,
      policyAmount: data.policyAmount,
      annualIncome: data.annualIncome,
      sumAssured: data.sumAssured,
      referCode: data.referCode,
    };
    const insuranceManagement = await insuranceManagementDb.create(details);
    res.status(201).json({
      message: "Insurance Management Created Successfully",
      data: insuranceManagement,
    });
  } catch (err) {
    console.error("Error creating insurance record:", err);
    res.status(500).json({ message: err.message });
  }
};
export async function updateInsuranceManagementDb(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log("data", data);
    const updateDetails = {
      AdminId: data.AdminId,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      employeeId: data.employeeId,
      employeeType: data.employeeType,
      employeeCategory: data.employeeCategory,
      employeeList: data.employeeList,
      state: data.state,
      district: data.district,
      Branch: data.Branch,
      report_Manager: data.report_Manager,
      report_ManagerName: data.  report_ManagerName,
      sale_Manager: data.sale_Manager,
      sale_ManagerName:data.sale_ManagerName,
    };

    const updatedRecord = await insuranceManagementDb.findByIdAndUpdate(
      id,
      updateDetails,
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatedRecord) {
      res.status(200).json({
        message: "Tax Management Updated Successfully",
        data: updatedRecord,
      });
    } else {
      res.status(404).json({
        message: "Record not found",
      });
    }
  } catch (err) {
    console.error("Error updating tax management record:", err);
    res.status(500).json({
      message: "Failed to update tax management record",
    });
    next(err);
  }
}

export async function getallInsuranceManagement(req, res, next) {
  try {
    const TaxManagement = await insuranceManagementDb.find();
    res.status(200).json(TaxManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// export const getInsuranceManagementUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     console.log("object", userId);
//     const taxManagement = await insuranceManagementDb.find({ userId });
//     if (!taxManagement) {
//       return res.status(404).json({ message: "User id not found" });
//     }
//     res.status(200).json(taxManagement);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const getSalesManagerId = async (req, res) => {
  try {
    const { report_Manager } = req.params;

    const taxManagement = await insuranceManagementDb.find({ report_Manager});
    if (!taxManagement) {
      return res.status(404).json({ message: "User id not found" });
    }
    res.status(200).json(taxManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getInsuranceManagementEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const taxManagement = await insuranceManagementDb.find({ employeeId });
    if (!taxManagement) {
      return res.status(404).json({ message: "User id not found" });
    }
    res.status(200).json(taxManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getbyReferCode = async (req, res) => {
  try {
    const { referCode } = req.params;
    const InsuranceManagement = await insuranceManagementDb.find({ referCode });

    if (!InsuranceManagement.length) {
      return res
        .status(404)
        .json({ message: "No records found for this referCode" });
    }

    res.status(200).json(InsuranceManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const calculateReferralEarnings = async (req, res) => {
  try {
    const { referCode } = req.params;
    const loanApplications = await insuranceManagementDb.find({ referCode });

    if (!loanApplications.length) {
      return res
        .status(404)
        .json({ message: "No records found for this referCode" });
    }

    let lifeInsuranceCount = 0;
    let healthInsuranceCount = 0;
    let vehicleInsuranceCount = 0;
    let travelInsuranceCount = 0;

    let lifeInsuranceAmount = 0;
    let healthInsuranceAmount = 0;
    let vehicleInsuranceAmount = 0;
    let travelInsuranceAmount = 0;

    // Count referrals and accumulate policy amounts for each loan type
    loanApplications.forEach((loan) => {
      const loanType = loan.PolicyType;

      // Log raw policyAmount to debug
      console.log(
        "Raw policyAmount:",
        loan.policyAmount,
        "Type:",
        typeof loan.policyAmount
      );

      // Ensure policyAmount is a valid number
      let policyAmount = parseFloat(
        loan.policyAmount?.toString().trim() || "0"
      );

      // Log the parsed value
      console.log(
        "Parsed policyAmount:",
        policyAmount,
        "Final Type:",
        typeof policyAmount
      );

      if (isNaN(policyAmount)) {
        policyAmount = 0; // Set to 0 if NaN
      }

      if (loanType === "Life Insurance") {
        lifeInsuranceCount++;
        lifeInsuranceAmount += policyAmount;
      } else if (loanType === "Health Insurance") {
        healthInsuranceCount++;
        healthInsuranceAmount += policyAmount;
      } else if (loanType === "Vehicle Insurance") {
        vehicleInsuranceCount++;
        vehicleInsuranceAmount += policyAmount;
      } else if (loanType === "Travel Insurance") {
        travelInsuranceCount++;
        travelInsuranceAmount += policyAmount;
      }
    });

    // Calculate earnings based on referral count and policy amount
    const lifeInsuranceEarnings =
      lifeInsuranceCount >= 2
        ? lifeInsuranceAmount * Math.min(lifeInsuranceCount * 0.01, 0.25) // 2 referrals = 2% up to 25%
        : 0;

    const healthInsuranceEarnings =
      healthInsuranceCount >= 5
        ? healthInsuranceAmount * 0.15 // 5 referrals = 15% of the total amount
        : 0;

    const vehicleInsuranceEarnings =
      vehicleInsuranceCount >= 9
        ? vehicleInsuranceAmount * 0.2 // 9 referrals = 10% of the total amount
        : 0;

    const travelInsuranceEarnings =
      travelInsuranceCount >= 9
        ? travelInsuranceAmount * 0.2 // 9 referrals = 10% of the total amount
        : 0;

    const totalEarnings =
      lifeInsuranceEarnings +
      healthInsuranceEarnings +
      vehicleInsuranceEarnings +
      travelInsuranceEarnings;

    res.status(200).json({
      referCode,
      lifeInsuranceCount,
      healthInsuranceCount,
      vehicleInsuranceCount,
      travelInsuranceCount,
      lifeInsuranceEarnings: lifeInsuranceEarnings || 0, // Default to 0 if null
      healthInsuranceEarnings,
      vehicleInsuranceEarnings,
      travelInsuranceEarnings,
      totalEarnings: totalEarnings || 0, // Default to 0 if null
    });
  } catch (error) {
    console.error("Error in calculating referral earnings:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// export const getCurrentMonthIncome = async (req, res) => {
//   try {
//     const { referCode } = req.params;

//     // Get the current month and year
//     const now = new Date();
//     const currentMonth = now.getMonth(); // 0-based index (Jan = 0, Feb = 1, ...)
//     const currentYear = now.getFullYear();

//     // Fetch all referrals with the given referCode
//     const loanApplications = await insuranceManagementDb.find({ referCode });

//     // Define income per loan type
//     const incomeRates = {
//       "Life Insurance": 5,
//       "Health Insurance": 10,
//       "Vehicle Insurance": 2.5,
//       "Travel Insurance": 3.5,
//     };

//     // Filter and calculate income
//     let totalIncome = 0;
//     const currentMonthLoans = loanApplications.filter((loan) => {
//       const createdAt = new Date(loan.createdAt);
//       const isCurrentMonth =
//         createdAt.getMonth() === currentMonth &&
//         createdAt.getFullYear() === currentYear;

//       if (isCurrentMonth && incomeRates[loan.PolicyType]) {
//         totalIncome += incomeRates[loan.PolicyType];
//       }

//       return isCurrentMonth;
//     });

//     if (currentMonthLoans.length === 0) {
//       return res.status(404).json({
//         message: "No referrals found for this month.",
//         totalIncome: 0,
//       });
//     }

//     res.status(200).json({ referrals: currentMonthLoans, totalIncome });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getCurrentMonthIncome = async (req, res) => {
  try {
    const { referCode } = req.params;

    // Get the current month and year
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-based index (January = 0)
    const currentYear = now.getFullYear();

    // Fetch all insurance policies with the given referCode
    const insurancePolicies = await insuranceManagementDb.find({ referCode });

    if (!insurancePolicies.length) {
      return res.status(404).json({
        message: "No insurance policies found for this referCode.",
        totalIncome: 0,
      });
    }

    let totalIncome = 0;
    let policyTypeCounts = {}; // To count policies per insurance type
    let currentMonthPolicies = []; // To store policies for the current month

    // Process insurance policies to count and filter by current month
    insurancePolicies.forEach((policy) => {
      const { PolicyType, policyAmount, createdAt } = policy;
      const policyDate = new Date(createdAt);
      const isCurrentMonth =
        policyDate.getMonth() === currentMonth &&
        policyDate.getFullYear() === currentYear;

      if (isCurrentMonth) {
        currentMonthPolicies.push(policy);

        // Count referrals per insurance type
        if (!policyTypeCounts[PolicyType]) {
          policyTypeCounts[PolicyType] = 0;
        }
        policyTypeCounts[PolicyType]++;
      }
    });

    // Calculate income based on referral count and policy amount
    currentMonthPolicies.forEach((policy) => {
      const { PolicyType, policyAmount } = policy;

      // Check if the policy type meets the threshold for income calculation
      if (PolicyType) {
        const income = policyAmount * 0.005; // 0.5% of policy amount
        console.log("policy", policyAmount);

        totalIncome += income;
      }
    });

    res.status(200).json({ referrals: currentMonthPolicies, totalIncome });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function getByInsuranceId(req, res, next) {
  try {
    const { id } = req.params;
    const leads = await insuranceManagementDb.find({ _id: id });

    if (leads && leads.length > 0) {
      res.status(200).json({
        message: "Leads fetched successfully",
        data: leads,
      });
    } else {
      res.status(404).json({
        message: "No leads found for the given user ID",
      });
    }
  } catch (error) {
    console.error("Error fetching leads by ID:", error);
    res.status(500).json({
      message: "An error occurred while fetching leads",
      error: error.message,
    });
  }
}

export async function updateInsApplicationStatus(req, res, next) {
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
        message: "Reason is required when marking the Insurance as '${action}'",
      });
    }
    const updatedInsuranceApplication =
      await insuranceManagementDb.findByIdAndUpdate(
        id,
        {
          status,
          rejectionReason: action === "reject" ? reason : null,
          pendingReason: action === "Pending" ? reason : null,
        },
        { new: true }
      );

    if (!updatedInsuranceApplication) {
      return res.status(404).json({
        message: "Insurance application not found.",
      });
    }

    res.status(200).json({
      message: `Insurance application ${
        action === "approve"
          ? "approved"
          : action === "reject"
          ? "rejected"
          : "marked as Pending"
      } successfully.`,
      data: updatedInsuranceApplication,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function updateInsuranceRemarks(req, res, next) {
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

    const updatedRecord = await insuranceManagementDb.findByIdAndUpdate(
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
export async function updateInsuranceDetails(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    console.log("Received Data:", data);

    // Ensure all fields are properly retrieved from `data`
    const updateDetails = {
      firstname: data.firstname,
      lastname: data.lastname,
      contactNumber: data.contactNumber,
      email: data.email,
      aadhar: data.aadhar,
      panno: data.panno,
      gst: data.gst,
      policyTerm: data.policyTerm,
      PolicyType: data.PolicyType,
      VehicleType: data.VehicleType,
      policyAmount: data.policyAmount,
      annualIncome: data.annualIncome,
      sumAssured: data.sumAssured,
      // addremarks: data.addremarks,
    };

    console.log("Update Details:", updateDetails);

    // Ensure `id` is valid before querying
    if (!id) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // Update the record in the database
    const updatedRecord = await insuranceManagementDb.findByIdAndUpdate(
      id,
      updateDetails,
      {
        new: true, // Return the updated record
        runValidators: true, // Ensure validation
      }
    );

    if (updatedRecord) {
      return res.status(200).json({
        message: "Updated Successfully",
        data: updatedRecord,
      });
    } else {
      return res.status(404).json({
        message: "Record not found",
      });
    }
  } catch (err) {
    console.error("Error updating record:", err);
    return res.status(500).json({
      message: "Failed to update record",
      error: err.message, // Return detailed error message
    });
  }
}
