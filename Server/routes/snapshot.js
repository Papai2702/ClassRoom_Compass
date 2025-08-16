const express = require('express');
const router = express.Router();
const Snapshot = require('../models/Snapshot');

// Save snapshot
router.post('/', async (req, res) => {
  const { image, studentId } = req.body;

  try {
    const snapshot = new Snapshot({ studentId, image });
    await snapshot.save();
    console.log('📸 Snapshot saved to MongoDB!');
    res.json({ status: 'success', message: 'Snapshot stored in DB' });
  } catch (err) {
    console.error('❌ Error saving snapshot:', err);
    res.status(500).json({ status: 'error', message: 'Failed to save snapshot' });
  }
});

// Fetch all snapshots
router.get('/', async (req, res) => {
  try {
    const snapshots = await Snapshot.find().sort({ createdAt: -1 }); // latest first
    res.json(snapshots);
  } catch (err) {
    console.error('❌ Error fetching snapshots:', err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch snapshots' });
  }
});

module.exports = router;
