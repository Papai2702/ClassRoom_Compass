const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { audio, classDuration } = req.body;

  try {
    console.log('Received audio of duration (seconds):', classDuration);
    console.log('Audio data (first 100 chars):', audio.slice(0, 100));

    // TODO: Save to DB or file if needed

    res.json({ status: 'success', message: 'Audio received!' });
  } catch (err) {
    console.error('Error saving audio:', err);
    res.status(500).json({ status: 'error', message: 'Failed to save audio' });
  }
});

module.exports = router;
