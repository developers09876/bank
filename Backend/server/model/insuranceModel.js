// /models/insuranceModel.js
import mongoose from 'mongoose';

const insuranceSchema = new mongoose.Schema({
  vendorName: { type: String, required: true },
  templeName: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  alternateNumber: { type: String },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  language: { type: [String], required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  type: { type: String, required: true },
  yearofExperience: { type: String, required: true },
  poojaCounts: { type: Number, required: true },
}, { timestamps: true });

const Insurance = mongoose.model('Insurance', insuranceSchema);

export default Insurance;
