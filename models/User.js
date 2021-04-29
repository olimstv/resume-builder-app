const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide your first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password cannot be less than 6 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your valid email'],
    unique: [true, 'User with this email address is already exists']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
