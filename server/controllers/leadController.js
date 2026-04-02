const Lead = require('../models/Lead');
const User = require('../models/User');
const Project = require('../models/Project');

// @desc    Submit a lead form
// @route   POST /api/v1/leads
// @access  Public
const submitLead = async (req, res) => {
    const { name, email, phone, serviceInterest, message } = req.body;

    try {
        const lead = await Lead.create({
            name,
            email,
            phone,
            serviceInterest,
            message
        });
        res.status(201).json(lead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all leads
// @route   GET /api/v1/leads
// @access  Private/Admin
const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find({}).populate('serviceInterest', 'name');
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update lead status
// @route   PUT /api/v1/leads/:id
// @access  Private/Admin
const updateLeadStatus = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (lead) {
            lead.status = req.body.status || lead.status;
            const updatedLead = await lead.save();
            res.json(updatedLead);
        } else {
            res.status(404).json({ message: 'Lead not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Convert lead to client + project
// @route   POST /api/v1/leads/:id/convert
// @access  Private/Admin
const convertLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ message: 'Lead not found' });

        // Check if user already exists
        let user = await User.findOne({ email: lead.email });
        if (!user) {
            user = await User.create({
                name: lead.name,
                email: lead.email,
                password: 'Password@123', // Default password
                role: 'client'
            });
        }

        // Create project with service fallback
        let serviceId = lead.serviceInterest;
        if (!serviceId) {
            const Service = require('../models/Service');
            const defaultService = await Service.findOne({ isActive: true });
            if (!defaultService) return res.status(400).json({ message: 'No active services available for conversion.' });
            serviceId = defaultService._id;
        }

        await Project.create({
            title: `${lead.name}'s Project`,
            client: user._id,
            service: serviceId,
            value: 0,
            status: 'Pending',
            milestones: [
                { title: 'Project Discovery', status: 'In Progress' },
                { title: 'Design/Planning', status: 'Pending' },
                { title: 'Development', status: 'Pending' },
                { title: 'Final Review', status: 'Pending' }
            ]
        });

        lead.status = 'Converted';
        await lead.save();

        res.status(201).json({ 
            message: 'Lead converted successfully',
            credentials: {
                email: user.email,
                password: 'Password@123'
            }
        });
    } catch (error) {
        console.error('Conversion Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    submitLead,
    getLeads,
    updateLeadStatus,
    convertLead
};
