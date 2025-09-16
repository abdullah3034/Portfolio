const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  longDescription: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  technologies: [{
    type: String,
    trim: true
  }],
  githubUrl: {
    type: String,
    required: true,
    trim: true
  },
  liveUrl: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);

