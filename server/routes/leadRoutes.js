const express = require('express');
const router = express.Router();
const {
    submitLead,
    getLeads,
    updateLeadStatus,
    convertLead
} = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');
const { validate, leadRules } = require('../middleware/validationMiddleware');

router.post('/', leadRules, validate, submitLead); // Public
router.get('/', protect, isAdmin, getLeads);
router.post('/:id/convert', protect, isAdmin, convertLead);
router.put('/:id', protect, isAdmin, updateLeadStatus);

module.exports = router;
