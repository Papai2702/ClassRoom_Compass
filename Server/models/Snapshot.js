// models/Snapshot.js
const mongoose = require('mongoose');

const snapshotSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  image: { type: String, required: true }, // base64 string
}, { timestamps: true });

module.exports = mongoose.model('Snapshot', snapshotSchema);
