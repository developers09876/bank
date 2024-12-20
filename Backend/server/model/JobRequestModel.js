import mongoose from "mongoose";

const jobRequestSchema = new mongoose.Schema({
    name:{type : String},
    phone:{type : String},
    email:{type : String},
    jobtitle:{type : String},
    resume:{type : String},

});
const applyjob = mongoose.model("jobRequest",jobRequestSchema);

export default applyjob;