import mongoose from "mongoose";

const { Schema, model } = mongoose;

const District = new Schema({
  districtName: String,
  state_id: Number,
});

District.set("autoIndex", true);

const DistrictDb = model("district", District);
DistrictDb.createIndexes();

export default DistrictDb;
