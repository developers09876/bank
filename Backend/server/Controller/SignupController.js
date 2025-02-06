import User from "../model/signupModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateReferralCode = async () => {
  let unique = false;
  let referralCode;

  while (!unique) {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    referralCode = `VGCR${randomNum}`;

    const existingUser = await User.findOne({ referralCode });
    if (!existingUser) unique = true;
  }
  return referralCode;
};
const generateEmployeeCode = async () => {
  let unique = false;
  let empno;

  while (!unique) {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    empno = `VGEM${randomNum}`;

    const existingUser = await User.findOne({ empno });
    if (!existingUser) unique = true;
  }
  return empno;
};

// export const registerUser = async (req, res) => {
//   const {
//     userid,
//     userType,
//     firstname,
//     lastname,
//     email,
//     contactNumber,
//     dateOfJoining,
//     services,
//     categoryTitle,
//     subCategory,
//     manager,
//     branch,
//     employeeCategory,
//     empCreatedBy,
//     userId,
//     referCode, // Manually entered code
//     referType,
//     loanType,
//   } = req.body;

//   try {
//     // Check if the email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email is already in use" });
//     }

//     // Auto-generate referralCode only for users with userType "user"
//     let referralCode = "";
//     if (userType === "user") {
//       referralCode = await generateReferralCode();
//     }
//     let empno = "";
//     if (userType === "employee") {
//       empno = await generateEmployeeCode();
//     }

//     // Create a new user
//     const newUser = new User({
//       userid,
//       userType,
//       empno,
//       firstname,
//       lastname,
//       email,
//       contactNumber,
//       manager,
//       dateOfJoining,
//       services,
//       category: categoryTitle,
//       subCategory: subCategory?.title,
//       reward: subCategory?.rewards,
//       branch,
//       employeeCategory,
//       empCreatedBy,
//       referralCode, // Auto-generated referral code
//       referCode, // Manually entered referral code
//       userId,
//       referType,
//       loanType,
//     });

//     // Save the user to the database
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully", newUser });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };
export const registerUser = async (req, res) => {
  const {
    userid,
    userType,
    firstname,
    lastname,
    email,
    contactNumber,
    dateOfJoining,
    services,
    categoryTitle,
    subCategory,
    manager,
    branch,
    employeeCategory,
    empCreatedBy,
    userId,
    referCode, // Manually entered code
    referType,
    loanType,
  } = req.body;

  try {
    // Check if the email or contact number already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { contactNumber }],
    });

    if (existingUser) {
      let errorMessage = "";
      if (
        existingUser.email === email &&
        existingUser.contactNumber === contactNumber
      ) {
        errorMessage = "Email and Contact Number are already in use";
      } else if (existingUser.email === email) {
        errorMessage = "Email is already in use";
      } else if (existingUser.contactNumber === contactNumber) {
        errorMessage = "Contact Number is already in use";
      }
      return res.status(400).json({ error: errorMessage });
    }

    // Auto-generate referralCode only for users with userType "user"
    let referralCode = "";
    if (userType === "user") {
      referralCode = await generateReferralCode();
    }
    let empno = "";
    if (userType === "employee") {
      empno = await generateEmployeeCode();
    }

    // Create a new user
    const newUser = new User({
      userid,
      userType,
      empno,
      firstname,
      lastname,
      email,
      contactNumber,
      manager,
      dateOfJoining,
      services,
      category: categoryTitle,
      subCategory: subCategory?.title,
      reward: subCategory?.rewards,
      branch,
      employeeCategory,
      empCreatedBy,
      referralCode, // Auto-generated referral code
      referCode, // Manually entered referral code
      userId,
      referType,
      loanType,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Password mismatch" });
    }
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

export const getUserCreatedById = async (req, res) => {
  const { empCreatedBy } = req.params;
  try {
    const usersList = await User.find({ empCreatedBy }).select("-password");

    if (!usersList) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(usersList);
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
      aadhaarNumber: data.aadhaarNumber,
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
