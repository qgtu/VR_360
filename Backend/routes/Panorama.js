const express = require('express');
const router = express.Router();
const panoramaController = require('../Controllers/panoramaController');

// Panorama routes
router.route('/list')
    .get(panoramaController.getAllPanoramas);

router.route('/create')
    .post(panoramaController.uploadPanorama);

router.route('/:id')
    .get(panoramaController.getPanoramaById);

router.route('/delete/:id')
    .delete(panoramaController.deletePanorama);

// Search routes
router.get('/nearby', panoramaController.getNearbyPanoramas);
router.get('/category/:category', panoramaController.getPanoramasByCategory);

module.exports = router;