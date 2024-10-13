import User from '../model/signupModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Create a new user
export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, contactNumber } = req.body;

  try {
    // Check for existing email or contact number manually (for better control)
    const existingUser = await User.findOne({
      $or: [{ email }, { contactNumber }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email is already taken." });
      }
      if (existingUser.contactNumber === contactNumber) {
        return res.status(400).json({ message: "Contact number is already taken." });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      contactNumber,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    // Handle MongoDB duplicate key error (E11000)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `Duplicate field error: The ${field} already exists.`,
      });
    }
    // Generic error handler
    res.status(500).json({ message: "Server error", error: error.message });
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
   const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
    expiresIn: '1h',
  });
  res.json({ token });
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server error');
}
}