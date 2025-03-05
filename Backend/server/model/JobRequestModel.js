import mongoose from "mongoose";

const jobRequestSchema = new mongoose.Schema({
    userId: { type: String },
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    jobTitle: { type: String },
    resume: { type: String },
    status: { type: String },

});
const applyjob = mongoose.model("jobRequest", jobRequestSchema);

export default applyjob;