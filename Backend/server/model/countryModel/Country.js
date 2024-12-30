import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Country = new Schema({
  countryName: String,
});

Country.set("autoIndex", true);

const CountryDb = model("country", Country);
CountryDb.createIndexes();

export default CountryDb;
