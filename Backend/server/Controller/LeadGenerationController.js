import Lead from "../model/LeadGeneration.js";

export async function createLead(req, res, next) {
  try {
    const data = req.body;
    const details = {
      firstname: data.firstname,
      lastname: data.lastname,
      userId: data.userId,
      contactNumber: data.contactNumber,
      email: data.email,
      aadhar: data.aadhar,
      purpose: data.purpose,
      amount: data.amount,
      howimidiate: data.howimidiate,
      previouslyapplied: data.previouslyapplied,
      panno: data.panno,
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
          age: child.age,
          status: child.status,
        }))
      : [];

    const updatedDetails = {
      firstname: data.firstname,
      lastname: data.lastname,
      userId: data.userId,
      contactNumber: data.contactNumber,
      email: data.email,
      aadhar: data.aadhar,
      purpose: data.purpose,
      amount: data.amount,
      howimidiate: data.howimidiate,
      previouslyapplied: data.previouslyapplied,
      panno: data.panno,
      addremarks: addremarks,
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
