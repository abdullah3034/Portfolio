const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  degree: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  field: {
    type: String,
    trim: true,
    maxlength: 200
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Education', educationSchema);

