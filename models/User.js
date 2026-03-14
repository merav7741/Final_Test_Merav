const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { 
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  password: { 
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'viewer'],
    default: 'viewer'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User; 
