import insuranceManagementDb from "../model/InsuranceManagementModel.js";

export async function createInsuranceManagementDb(req, res, next) {
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
      annualIncome: data.annualIncome,
      sumAssured: data.sumAssured,
      referCode: data.referCode,
    };
    const taxManagement = await insuranceManagementDb.create(details);
    if (taxManagement) {
      res.status(201).json({
        message: "Insurance Management Created Successfully",
        data: taxManagement,
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}

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

export const getInsuranceManagementUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("object", userId);
    const taxManagement = await insuranceManagementDb.find({ userId });
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

    // Count referrals for each loan type
    loanApplications.forEach((loan) => {
      const loanType = loan.PolicyType;
      if (loanType === "Life Insurance") {
        lifeInsuranceCount++;
      } else if (loanType === "Health Insurance") {
        healthInsuranceCount++;
      } else if (loanType === "Vehicle Insurance") {
        vehicleInsuranceCount++;
      }
    });

    // Calculate earnings
    const lifeInsuranceEarnings = lifeInsuranceCount * 5;
    const healthInsuranceEarnings = healthInsuranceCount * 10;
    const vehicleInsuranceEarnings = vehicleInsuranceCount * 2.5;
    const totalEarnings =
      lifeInsuranceEarnings +
      healthInsuranceEarnings +
      vehicleInsuranceEarnings;

    res.status(200).json({
      referCode,
      lifeInsuranceCount,
      healthInsuranceCount,
      vehicleInsuranceCount,
      lifeInsuranceEarnings,
      healthInsuranceEarnings,
      vehicleInsuranceEarnings,
      totalEarnings,
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
    const currentMonth = now.getMonth(); // 0-based index (Jan = 0, Feb = 1, ...)
    const currentYear = now.getFullYear();

    // Fetch all referrals with the given referCode
    const loanApplications = await insuranceManagementDb.find({ referCode });

    // Define income per loan type
    const incomeRates = {
      "Life Insurance": 5,
      "Health Insurance": 10,
      "Vehicle Insurance": 2.5,
    };

    // Filter and calculate income
    let totalIncome = 0;
    const currentMonthLoans = loanApplications.filter((loan) => {
      const createdAt = new Date(loan.createdAt);
      const isCurrentMonth =
        createdAt.getMonth() === currentMonth &&
        createdAt.getFullYear() === currentYear;

      if (isCurrentMonth && incomeRates[loan.PolicyType]) {
        totalIncome += incomeRates[loan.PolicyType];
      }

      return isCurrentMonth;
    });

    if (currentMonthLoans.length === 0) {
      return res.status(404).json({
        message: "No referrals found for this month.",
        totalIncome: 0,
      });
    }

    res.status(200).json({ referrals: currentMonthLoans, totalIncome });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
