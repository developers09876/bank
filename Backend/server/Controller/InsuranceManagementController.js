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