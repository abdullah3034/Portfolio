const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  category: {
    type: String,
    required: true,
    enum: ['languages', 'frontend', 'backend', 'databases', 'tools', 'languages_spoken'],
    trim: true
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  icon: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);

