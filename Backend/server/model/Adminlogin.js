import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define Admin schema
const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

// Pre-save hook to hash password
AdminSchema.pre('save', async function (next) {
  try {
    // Only hash the password if it's new or modified
    if (!this.isModified('password')) return next();

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err); // Pass error to Mongoose
  }
});

// Method to compare passwords
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Export the Admin model
export default mongoose.model('Admin', AdminSchema);
