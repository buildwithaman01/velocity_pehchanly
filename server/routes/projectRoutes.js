const express = require('express');
const router = express.Router();
const {
    getProjects,
    getMyProjects,
    getProjectById,
    createProject,
    updateProjectStatus,
    updateMilestones
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

router.get('/', protect, isAdmin, getProjects);
router.get('/my', protect, getMyProjects);
router.get('/:id', protect, getProjectById);
router.post('/', protect, isAdmin, createProject);
router.put('/:id/status', protect, isAdmin, updateProjectStatus);
router.put('/:id/milestones', protect, isAdmin, updateMilestones);

module.exports = router;
