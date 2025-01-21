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
      incomeTaxStatus: data.incomeTaxStatus,
      businessType: data.businessType,
      annualIncome: data.annualIncome,
      taxPaid: data.taxPaid,
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
