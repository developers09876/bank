// models/Referral.js
import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
  {
    subCategory: { type: String, required: true },
    reward: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user
  },
  { timestamps: true }
);

const Referral = mongoose.model("Referral", referralSchema);

export default Referral;
