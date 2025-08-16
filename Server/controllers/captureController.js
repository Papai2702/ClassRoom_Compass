const Capture = require('../models/Capture');
const ClassSession = require('../models/ClassSession');
const fs = require('fs');
const path = require('path');

// Configure storage
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = file.fieldname === 'image' ? 'uploads/images/' : 'uploads/audio/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.fieldname === 'image' ? '.png' : '.wav';
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage }).fields([
  { name: 'image', maxCount: 1 },
  { name: 'audio', maxCount: 1 }
]);

// Handle file upload and create capture
exports.createCapture = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const { classSessionId, duration } = req.body;
      const imageFile = req.files['image'][0];
      const audioFile = req.files['audio'][0];

      if (!imageFile || !audioFile) {
        return res.status(400).json({ error: 'Both image and audio files are required' });
      }

      const capture = new Capture({
        classSession: classSessionId,
        imagePath: imageFile.path,
        audioPath: audioFile.path,
        duration: duration || 0
      });

      await capture.save();

      // Add capture to class session
      await ClassSession.findByIdAndUpdate(
        classSessionId,
        { $push: { captures: capture._id } }
      );

      res.status(201).json(capture);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

// Get all captures for a class session
exports.getCaptures = async (req, res) => {
  try {
    const captures = await Capture.find({ classSession: req.params.sessionId })
      .sort({ timestamp: -1 });
    res.json(captures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};