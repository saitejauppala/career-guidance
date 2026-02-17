const express = require('express');
const router = express.Router();
const { getPathways, createPathway, getPathwayById } = require('../controllers/pathwayController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getPathways).post(protect, admin, createPathway);
router.route('/:id').get(getPathwayById);

module.exports = router;
