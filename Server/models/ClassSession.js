const mongoose = require('mongoose');

const ClassSessionSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  duration: Number, // in seconds
  captures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Capture'
  }]
});

module.exports = mongoose.model('ClassSession', ClassSessionSchema);