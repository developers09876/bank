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
      status: data.status,
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
export async function updateJobRequestStatus(req, res, next) {
  try {
    const applicationId = req.params.id;

    if (!applicationId) {
      return res.status(400).json({
        message: "Job application ID is required.",
      });
    }

    console.log("Job Application ID:", applicationId);

    const { name, phone, email, jobTitle, resume, status } = req.body;

    const updateData = {
      name,
      phone,
      email,
      jobTitle,
      resume,
      status,
    };

    console.log("Update Data:", updateData);

    const updatedApplication = await applyjob.findByIdAndUpdate(
      applicationId,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedApplication) {
      return res.status(404).json({
        message: "Job application not found.",
      });
    }

    return res.status(200).json({
      message: "Job request status updated successfully",
      data: updatedApplication,
    });
  } catch (err) {
    console.error("Error updating job request status:", err);
    res.status(500).json({
      message: "An error occurred while processing your request.",
      error: err.message,
    });
    next(err);
  }
}
export const deleteJobRequestStatus = async (req, res) => {
  try {
    const deletedJobRequest = await applyjob.findByIdAndDelete(
      req.params.id
    );
    if (!deletedJobRequest) {
      return res.status(404).json({ message: "JobRequest not found" });
    }
    res.status(200).json({ message: "JobRequest deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
