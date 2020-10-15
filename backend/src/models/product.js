const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 1
  },
  details: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Products', Schema, 'Products');
