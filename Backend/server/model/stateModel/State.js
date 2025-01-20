import mongoose from "mongoose";

const { Schema, model } = mongoose;

const State = new Schema({
  name: String,
  country_id: Number,
});

State.set("autoIndex", true);

const StateDb = model("state", State);
StateDb.createIndexes();

export default StateDb;
