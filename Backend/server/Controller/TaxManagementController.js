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
