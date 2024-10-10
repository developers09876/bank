import User from "../model/signupModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    contactNumber,
  } = req.body;


  // if (password !== confirmPassword) {
  //   return res.status(400).json({ error: "Passwords do not match" });
  // }

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
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}
