const express = require('express');
const router = express.Router();
const { getPlacements, createPlacement, updatePlacementStatus } = require('../controllers/placementController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getPlacements).post(protect, admin, createPlacement);
router.route('/:id').put(protect, admin, updatePlacementStatus);

module.exports = router;
