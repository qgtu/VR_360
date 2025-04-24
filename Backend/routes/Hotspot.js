const express = require('express');
const router = express.Router();
const hotspotController = require('../Controllers/hotspotController');

// Hotspot routes
router.route('/:id/hotspots')
    .get(hotspotController.getPanoramaHotspots)
    .post(hotspotController.addHotspot);

router.route('/:panoramaId/hotspots/:hotspotId')
    .delete(hotspotController.deleteHotspot);

module.exports = router;