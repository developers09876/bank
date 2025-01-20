// /controllers/insuranceController.js
import Insurance from '../model/insuranceModel.js';

// Create a new insurance entry
export const createInsurance = async (req, res) => {
  try {
    const insurance = new Insurance(req.body);
    const createdInsurance = await insurance.save();
    res.status(201).json(createdInsurance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all insurance entries
export const getAllInsurance = async (req, res) => {
  try {
    const insuranceList = await Insurance.find();
    res.status(200).json(insuranceList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get insurance by ID
export const getInsuranceById = async (req, res) => {
  try {
    const insurance = await Insurance.findById(req.params.id);
    if (insurance) {
      res.status(200).json(insurance);
    } else {
      res.status(404).json({ message: 'Insurance not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update insurance by ID
export const updateInsurance = async (req, res) => {
  try {
    const updatedInsurance = await Insurance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedInsurance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete insurance by ID
export const deleteInsurance = async (req, res) => {
  try {
    await Insurance.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Insurance entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
