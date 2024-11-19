import express from 'express';
import Admin from '../model/Adminlogin.js'; // Import the Admin model
import bcrypt from 'bcrypt';
import pkg from 'jsonwebtoken';

const { sign } = pkg; // Import `sign` for JWT token generation

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Register Admin
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create new admin
    const admin = new Admin({ email, password });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Login
router.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Match password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password Mismatch' });
    }

    // Generate JWT token
    const token = sign({ id: admin._id, role: admin.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
