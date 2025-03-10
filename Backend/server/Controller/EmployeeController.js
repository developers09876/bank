import User from "../model/signupModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const AddEmployee = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    contactNumber,
    userType,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      contactNumber,
      userType,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
  }
};

export async function EmployeeLogin(req, res, next) {
  const { email, password } = req.body;
  console.log("re", req.body);
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

export const getAll = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const employeegetById = async (req, res) => {
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
export const getReportingManagerId= async (req, res) => {
  try {
    const {report_Manager} = req.params;
    const users = await User.find({  report_Manager});
    if (! users) {
      return res.status(404).json({ message: "User id not found" });
    }
    res.status(200).json( users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
