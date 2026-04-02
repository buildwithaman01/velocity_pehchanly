const express = require('express');
const router = express.Router();
const {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');
const { validate, serviceRules } = require('../middleware/validationMiddleware');

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', protect, isAdmin, serviceRules, validate, createService);
router.put('/:id', protect, isAdmin, serviceRules, validate, updateService);
router.delete('/:id', protect, isAdmin, deleteService);

module.exports = router;
