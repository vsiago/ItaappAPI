const mongoose = require('mongoose');

// Enum para representar os papéis disponíveis
const roles = ['admin', 'client']

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    emum: roles,
    default: 'client'
  }
});

module.exports = mongoose.model('User', userSchema);
