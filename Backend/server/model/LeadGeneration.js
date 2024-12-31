import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
    userId: {type : String},
    firstname: {type : String},
    lastname: {type : String},
    phone: {type: String},
    email: {type:String},
    aadhar: {type:String},
    purpose: {type:String},
    amount: {type:String},
    howimidiate: {type:String},
    previouslyapplied: {type:String},
    panno: {type:String},
    addremarks:[{
    date: {type:String},
    remarks: {type:String},
    status: {type:String},
    }]


})

const Lead = mongoose.model("leadlist",LeadSchema);
export default Lead;