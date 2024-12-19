import applyjob from "../model/JobRequestModel.js";

export async function createJobRequest(req, res, next) {
  try {
    const data = req.body;
    const details = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      jobtitle: data.jobtitle,
      resume: data.resume,
    };
    const jobrequest = await applyjob.create(details);
    if (jobrequest) {
      res.status(201).json({
        message: "Applied Successfully",
        data: jobrequest,
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}
