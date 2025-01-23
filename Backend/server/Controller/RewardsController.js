// controllers/ReferralController.js
import Referral from "../model/RewardModel.js";

// Add a new referral
export const addReferral = async (req, res) => {
  try {
    const { subCategory, reward, userId } = req.body;

    if (!subCategory || !reward || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const referral = new Referral({ subCategory, reward, userId });
    await referral.save();

    res.status(201).json({ message: "Referral added successfully", referral });
  } catch (error) {
    res.status(500).json({ message: "Error adding referral", error });
  }
};

// Get all referrals for a user
export const getReferralsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const referrals = await Referral.find({ userId });
    res.status(200).json({ referrals });
  } catch (error) {
    res.status(500).json({ message: "Error fetching referrals", error });
  }
};

// Get all referrals
export const getAllReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find();
    res.status(200).json({ referrals });
  } catch (error) {
    res.status(500).json({ message: "Error fetching referrals", error });
  }
};
