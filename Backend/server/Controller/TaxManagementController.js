import taxManagementDb from "../model/TaxManagementModel.js";

export async function createTaxManagementDb(req, res, next) {
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
      taxType: data.taxType,
      subCategory: data.subCategory,
      // incomeTaxStatus: data.incomeTaxStatus,
      businessType: data.businessType,
      annualIncome: data.annualIncome,
    };
    const taxManagement = await taxManagementDb.create(details);
    if (taxManagement) {
      res.status(201).json({
        message: "Tax ManagementCreated Successfully",
        data: taxManagement,
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function updateTaxApplicationDetails(req, res, next) {
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
      taxType: data.taxType,
      subCategory: data.subCategory,
      incomeTaxStatus: data.incomeTaxStatus,
      businessType: data.businessType,
      annualIncome: data.annualIncome,
    };

    console.log("Prepared Details:", details);

    const loanApplication = await taxManagementDb.findByIdAndUpdate(
      applicationId,
      details,
      { new: true } // Return the updated document
    );

    if (!loanApplication) {
      return res.status(404).json({
        message: "Tax application not found.",
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

export async function updateTaxManagementDb(req, res, next) {
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
      statename: data.statename,
      districtname: data.districtname,
      Branch: data.Branch,
      report_Manager: data.report_Manager,
      sale_Manager: data.sale_Manager,
    };

    const updatedRecord = await taxManagementDb.findByIdAndUpdate(
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
export async function updateTaxApplicationStatus(req, res, next) {
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
        message: "Reason is required when marking the tax as '${action}'",
      });
    }
    const updatedTaxApplication = await taxManagementDb.findByIdAndUpdate(
      id,
      {
        status,
        rejectionReason: action === "reject" ? reason : null,
        pendingReason: action === "Pending" ? reason : null,
      },
      { new: true }
    );

    if (!updatedTaxApplication) {
      return res.status(404).json({
        message: "Tax application not found.",
      });
    }

    res.status(200).json({
      message: `Tax application ${
        action === "approve"
          ? "approved"
          : action === "reject"
          ? "rejected"
          : "marked as Pending"
      } successfully.`,
      data: updatedTaxApplication,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function getallTaxManagement(req, res, next) {
  try {
    const TaxManagement = await taxManagementDb.find();
    res.status(200).json(TaxManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getTaxManagementUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("object", userId);
    const taxManagement = await taxManagementDb.find({ userId });
    if (!taxManagement) {
      return res.status(404).json({ message: "User id not found" });
    }
    res.status(200).json(taxManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getSalesManagerId = async (req, res) => {
  try {
    const { sale_Manager } = req.params;
    const taxManagement = await taxManagementDb.find({ sale_Manager });
    if (!taxManagement) {
      return res.status(404).json({ message: "User id not found" });
    }
    res.status(200).json(taxManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTaxManagementEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const taxManagement = await taxManagementDb.find({ employeeId });
    if (!taxManagement) {
      return res.status(404).json({ message: "User id not found" });
    }
    res.status(200).json(taxManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function getByTaxId(req, res, next) {
  try {
    const { id } = req.params;
    const leads = await taxManagementDb.find({ _id: id });

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

export async function updateTaxRemarks(req, res, next) {
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

    const updatedRecord = await taxManagementDb.findByIdAndUpdate(
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
