const express = require('express');
const router = express.Router();
const { getAdminStats } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

router.get('/', protect, isAdmin, getAdminStats);

module.exports = router;
