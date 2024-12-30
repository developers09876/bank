import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Area = new Schema({
  areaName: String,
  cityId: String,
});

Area.set("autoIndex", true);

const AreaDb = model("Area", Area);
AreaDb.createIndexes();

export default AreaDb;
