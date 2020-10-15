const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Users', Schema, 'Users');
