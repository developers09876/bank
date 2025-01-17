import User from "../model/signupModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create a new user
export const registerUser = async (req, res) => {
  const {
    userid,
    userType,
    empno,
    firstname,
    lastname,
    email,
    // password,
    // confirmPassword,
    contactNumber,
    dateOfJoining,
    manager,
    branch,
    employeeCategory,
    subCategory
  } = req.body;

  // if (password !== confirmPassword) {
  //   return res.status(400).json({ error: "Passwords do not match" });
  // }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userid,
      userType,
      empno,
      firstname,
      lastname,
      email,
      // password: hashedPassword,
      contactNumber,
      manager,
      dateOfJoining,
      branch,
      employeeCategory,
      subCategory
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
  }
};

//login
export async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    // Validate email format
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Password mismatch" });
    }
    // Create JWT token
    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
export const getByUserType = async (req, res) => {
  try {
    const { userType } = req.params;

    const application = await User.find({ userType });
    if (!application) {
      return res.status(404).json({ message: "User Type not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export async function updateUserDetails(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    const children = Array.isArray(data.children)
      ? data.children.map((child) => ({
          gender: child.gender,
          name: child.name,
          age: child.age,
          schoolName: child.schoolName,
        }))
      : [];

    const updatedDetails = {
      // fullName: data.fullName,
      firstname: data.firstname,
      lastname: data.lastname,
      dob: data.dob,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      nationality: data.nationality,
      contactNumber: data.contactNumber,
      address: data.address,
      pinCode: data.pinCode,
      city: data.city,
      state: data.state,
      district: data.district,
      country: data.country,
      totalChildren: data.totalChildren,
      children: children,
      spouseName: data.spouseName,
      spouseOccupation: data.spouseOccupation,
      spouseIncome: data.spouseIncome,
      spouseDesignation: data.spouseDesignation,
      coApplicantDocs: data.coApplicantDocs,
      photographs: data.photographs,
      userFeedback: data.userFeedback,
    };

    const updatedLoanApplication = await User.findByIdAndUpdate(
      id,
      { $set: updatedDetails },
      { new: true, runValidators: true }
    );

    if (updatedLoanApplication) {
      return res.status(200).json({
        message: "User details updated successfully",
        data: updatedLoanApplication,
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    console.error("Error updating loan details:", err);
    res.status(500).json({
      message: "An error occurred while updating the details.",
      error: err.message,
    });
    next(err);
  }
}

export async function updateKYCDetails(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedKYCDetails = {
      panCardNumber: data.panCardNumber,
      GSTNumber: data.GSTNumber,
      accountNumber: data.accountNumber,
      IFSCCode: data.IFSCCode,
      bankName: data.bankName,
      bankBranch: data.bankBranch,
      panOrAdharUpload: data.panOrAdharUpload,
      voterIdUpload: data.voterIdUpload,
    };

    const updatedKYCApplication = await User.findByIdAndUpdate(
      id,
      { $set: updatedKYCDetails },
      { new: true, runValidators: true }
    );

    if (updatedKYCApplication) {
      return res.status(200).json({
        message: "User's KYC details updated successfully",
        data: updatedKYCApplication,
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    console.error("Error updating KYC details:", err);
    res.status(500).json({
      message: "An error occurred while updating the KYC details.",
      error: err.message,
    });
    next(err);
  }
}
