const Project = require('../models/Project');

// @desc    Get all projects (Admin)
// @route   GET /api/v1/projects
// @access  Private/Admin
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).populate('client', 'name email').populate('service', 'name price');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user projects
// @route   GET /api/v1/projects/my
// @access  Private/Client
const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({ client: req.user._id }).populate('service', 'name price');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single project
// @route   GET /api/v1/projects/:id
// @access  Private
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('client', 'name email')
            .populate('service', 'name price');

        if (project) {
            // Check if user is admin or the client who owns the project
            if (req.user.role === 'admin' || project.client._id.toString() === req.user._id.toString()) {
                res.json(project);
            } else {
                res.status(403).json({ message: 'Not authorized to view this project' });
            }
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a project
// @route   POST /api/v1/projects
// @access  Private/Admin
const createProject = async (req, res) => {
    const { title, client, service, value, milestones, deadline } = req.body;

    try {
        const project = await Project.create({
            title,
            client,
            service,
            value,
            milestones,
            deadline
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update project status
// @route   PUT /api/v1/projects/:id/status
// @access  Private/Admin
const updateProjectStatus = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            project.status = req.body.status || project.status;
            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update milestones
// @route   PUT /api/v1/projects/:id/milestones
// @access  Private/Admin
const updateMilestones = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            project.milestones = req.body.milestones || project.milestones;
            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    getMyProjects,
    getProjectById,
    createProject,
    updateProjectStatus,
    updateMilestones
};
