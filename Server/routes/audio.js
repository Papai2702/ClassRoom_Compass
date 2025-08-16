const express = require('express');
const router = express.Router();
const AudioSnapshot = require('../models/AudioSnapshot');

router.post('/', async (req, res) => {
  const { studentId, image, audio } = req.body;

  if (!studentId || !image || !audio) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const record = new AudioSnapshot({ studentId, image, audio });
    await record.save();
    console.log(`🎵 + 📸 Audio + Snapshot saved for ${studentId}`);
    res.json({ status: 'success', message: 'Audio + snapshot saved' });
  } catch (err) {
    console.error('❌ Error saving audio + snapshot:', err);
    res.status(500).json({ status: 'error', message: 'Failed to save audio snapshot' });
  }
});

module.exports = router;
