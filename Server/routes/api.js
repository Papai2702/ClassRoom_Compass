const express = require('express');
const router = express.Router();
const captureController = require('../controllers/captureController');

// Capture routes
router.post('/captures', captureController.createCapture);
router.get('/sessions/:sessionId/captures', captureController.getCaptures);

module.exports = router;