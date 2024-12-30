import mongoose from "mongoose";

const { Schema, model } = mongoose;

const City = new Schema({
  cityName: String,
  districtId: String,
});

City.set("autoIndex", true);

const CityDb = model("city", City);
CityDb.createIndexes();

export default CityDb;
