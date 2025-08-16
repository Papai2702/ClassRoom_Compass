const mongoose = require('mongoose');

const CaptureSchema = new mongoose.Schema({
  classSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassSession',
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  audioPath: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number, // in seconds
    required: true
  }
});

module.exports = mongoose.model('Capture', CaptureSchema);