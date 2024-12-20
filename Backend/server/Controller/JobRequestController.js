import applyjob from "../model/JobRequestModel.js";

export async function createJobRequest(req, res, next) {
  try {
    const data = req.body;
    const details = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      jobTitle: data.jobTitle,
      resume: data.resume,
    };
    console.log('details', details.jobTitle)
    const jobrequest = await applyjob.create(details);
    if (jobrequest) {
      res.status(201).json({
        message: "Applied Successfully",
        data: jobrequest,
      });
    }
  } catch (err) {
    console.log("error", err);
    next();
  }
}


export async function getallJobRequests(req, res, next) {
  try {
    const jobs = await applyjob.find();
    res.status(200).json(jobs);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}
