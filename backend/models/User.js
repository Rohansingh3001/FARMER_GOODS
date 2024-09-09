const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['farmer', 'customer'], required: true },
  productType: { type: String }, // Optional for farmers
  confirmPassword: { type: String } // Optional, used only for validation
});

// Pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = undefined; // Do not store confirmPassword
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Model - avoid redefinition
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
