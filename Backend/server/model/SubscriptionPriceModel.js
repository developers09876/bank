import mongoose from "mongoose";

const subscriptionPriceSchema = new mongoose.Schema({
    subsriptionPrice: {type:String},
    offerPrice: {type: String},
})

const subscriptionPriceDb = mongoose.model("subscriptionPrice", subscriptionPriceSchema);

export default subscriptionPriceDb;