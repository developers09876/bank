import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobTitle: { type: String},
    jobType: { type: String },
    company: { type: String },
    location: { type: String },
    description: { type: String },
    designation: { type: String},
    requirements: { type: String},
    salary: { type: String},
});

const career = mongoose.model("JobList", jobSchema);
export default career;