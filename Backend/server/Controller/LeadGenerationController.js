import Lead from "../model/LeadGeneration.js";

export async function createLead(req, res, next) {
  try {
    const data = req.body;
    const details = {
      userType: data.userType,
      firstname: data.firstname,
      lastname: data.lastname,
      userId: data.userId,
      contactNumber: data.contactNumber,
      alternumber: data.alternumber,
      email: data.email,
      aadhar: data.aadhar,
      purpose: data.purpose,
      amount: data.amount,
      howimidiate: data.howimidiate,
      previouslyapplied: data.previouslyapplied,
      panno: data.panno,
      insuranceType: data.insuranceType,
      PolicyTerm: data.PolicyTerm,
      sumAssured: data.sumAssured,
      incomeTaxStatus: data.incomeTaxStatus,
      taxType: data.taxType,
      businessType: data.businessType,
      serviceType: data.serviceType,
      subCategory: data.subCategory,
      VehicleType: data.VehicleType,
      panCardNumber: data.panCardNumber,
    };
    const lead = await Lead.create(details);
    if (lead) {
      res.status(201).json({
        message: "Lead created Successfully",
        data: lead,
      });
    }
  } catch (err) {
    console.log("error", err);
    next();
  }
}

export async function updateLead(req, res, next) {
  try {
    const leadId = req.params.id;
    const data = req.body;

    const addremarks = Array.isArray(data.addremarks)
      ? data.addremarks.map((child) => ({
          date: child.date,
          remarks: child.remarks,
          status: child.status,
          isApproved: child.isApproved,
          notiFicatioinStauts: child.notiFicatioinStauts,
        }))
      : [];
    console.log("addremarks", addremarks);
    const updatedDetails = {
      firstname: data.firstname,
      lastname: data.lastname,
      userId: data.userId,
      contactNumber: data.contactNumber,
      email: data.email,
      aadhaarNumber: data.aadhaarNumber,
      purpose: data.purpose,
      amount: data.amount,
      howimidiate: data.howimidiate,
      previouslyapplied: data.previouslyapplied,
      panCardNumber: data.panCardNumber,
      addremarks: addremarks,
      isApproved: data.isApproved,
    };

    const updatedLead = await Lead.findByIdAndUpdate(leadId, updatedDetails, {
      new: true,
      runValidators: true,
    });

    if (updatedLead) {
      res.status(200).json({
        message: "Lead updated successfully",
        data: updatedLead,
      });
    } else {
      res.status(404).json({
        message: "Lead not found",
      });
    }
  } catch (err) {
    console.log("error", err);
    next(err);
  }
}

export const updateNotificationStatus = async (req, res) => {
  const { leadId } = req.params; // ID of the lead to update
  console.log("object", leadId);
  try {
    const updatedLead = await Lead.updateOne(
      { _id: leadId },
      { $set: { "addremarks.$[].notiFicatioinStauts": "true" } }
    );

    if (updatedLead.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Lead not found or already updated" });
    }

    res
      .status(200)
      .json({ message: "Notification status updated successfully" });
  } catch (error) {
    console.error("Error updating notification status:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating notification status" });
  }
};

export async function getallLead(req, res, next) {
  try {
    const jobs = await Lead.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const leads = await Lead.find({ userId: id });

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

export async function getByLeadDetailsID(req, res, next) {
  try {
    const { id } = req.params;
    const leads = await Lead.find({ _id: id });

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
// export const getByLeadEmployeeID= async (req, res) => {
//   try {
//     const { employeeId } = req.params;
//     const lead = await Lead.find({ employeeId });
//     if (!lead) {
//       return res.status(404).json({ message: "User id not found" });
//     }
//     res.status(200).json(lead);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export async function getByLeadId(req, res, next) {
  try {
    const { id } = req.params;
    const leads = await Lead.find({ _id: id });

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
export const getByUserId = async (req, res) => {
  try {
    const { email } = req.params;

    // Query the database for a record matching the provided email
    const employee = await Lead.findOne({ email });

    if (!employee) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.status(200).json({
      message: "Lead retrieved successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteRemark = async (req, res) => {
  try {
    const { leadId, remarkId } = req.params; // Extract lead ID and remark ID from parameters

    // Find the lead and remove the remark by its _id
    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      { $pull: { addremarks: { _id: remarkId } } },
      { new: true } // Return the updated document
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({
      message: "Remark deleted successfully",
      data: updatedLead,
    });
  } catch (error) {
    console.error("Error deleting remark:", error);
    res.status(500).json({ message: error.message });
  }
};
export async function updateLeadAssign(req, res, next) {
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
      state: data.state,
      district: data.district,
      Branch: data.Branch,
      report_Manager: data.report_Manager,
      sale_Manager: data?.sale_Manager ,

      // dob: data.dob || null,
    };
    console.log("Update Details:", updateDetails);

    const updatedRecord = await Lead.findByIdAndUpdate(id, updateDetails, {
      new: true,
      runValidators: true,
    });

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
// export const getByEmployeeId = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const lead = await Lead.findById(id);

//     if (!lead) {
//       return res.status(404).json({ message: "Lead not found" });
//     }

//     res.status(200).json({
//       message: "Lead assignment retrieved successfully",
//       data: lead,
//     });
//   } catch (error) {
//     console.error("Error fetching lead assignment:", error);
//     res.status(500).json({ message: error.message });
//   }
// };
export const getByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const lead = await Lead.find({ employeeId });
    if (!lead) {
      return res.status(404).json({ message: "User id not found" });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
