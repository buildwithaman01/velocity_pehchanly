const Project = require('../models/Project');
const Lead = require('../models/Lead');

// @desc    Get admin dashboard stats
// @route   GET /api/v1/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
    try {
        const stats = await Project.aggregate([
            {
                $facet: {
                    totalRevenue: [
                        { $match: { status: { $ne: 'Cancelled' } } },
                        { $group: { _id: null, total: { $sum: '$value' } } }
                    ],
                    activeProjects: [
                        { $match: { status: 'In Progress' } },
                        { $count: 'count' }
                    ],
                    statusBreakdown: [
                        { $group: { _id: '$status', count: { $sum: 1 } } }
                    ]
                }
            }
        ]);

        const leadCount = await Lead.countDocuments({ status: 'New' });

        res.json({
            revenue: stats[0].totalRevenue[0] ? stats[0].totalRevenue[0].total : 0,
            activeCount: stats[0].activeProjects[0] ? stats[0].activeProjects[0].count : 0,
            statusBreakdown: stats[0].statusBreakdown,
            pendingLeads: leadCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAdminStats };
