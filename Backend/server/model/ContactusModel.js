import mongoose from "mongoose";

const { Schema, model } = mongoose;
const contactusSchema = new Schema({
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    serviceType:{ type: String}

})

contactusSchema.set("autoIndex", true);

const contactusDb = model("contactus", contactusSchema);
contactusDb.createIndexes();

export default contactusDb;