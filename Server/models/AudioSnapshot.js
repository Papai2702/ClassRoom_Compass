const mongoose = require('mongoose');

const audioSnapshotSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  image: { type: String, required: true },   // base64 image
  audio: { type: String, required: true },   // base64 audio
}, { timestamps: true });

module.exports = mongoose.model('AudioSnapshot', audioSnapshotSchema);
