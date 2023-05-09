const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: false,
  },
  signature: {
    type: String,
    default: ""
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetToken: String,
  resetTokenExpiration: Date,
  timestamp: {
    type: Date,
    default: Date.now
},
});

module.exports = mongoose.model('User', userSchema);
