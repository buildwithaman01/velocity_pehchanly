const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Note = require('../models/Note');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany();
        await Service.deleteMany();
        await Project.deleteMany();
        await Note.deleteMany();

        // 1. Create Admin
        const admin = await User.create({
            name: 'Pehchanly Admin',
            email: 'admin@pehchanly.com',
            password: 'Admin@123',
            role: 'admin'
        });

        // 2. Create Services
        const services = await Service.insertMany([
            {
                name: 'GMB Optimization',
                description: 'Complete Google Business Profile optimization for maximum local visibility.',
                price: 299,
                category: 'GMB',
                techStack: ['Google Maps', 'Post Scheduling', 'Review Management']
            },
            {
                name: 'Custom Web App',
                description: 'Full-stack MERN or Next.js web application built for scale.',
                price: 1499,
                category: 'Web',
                techStack: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind']
            },
            {
                name: 'SEO Package',
                description: 'Advanced on-page and technical SEO for authority growth.',
                price: 499,
                category: 'SEO',
                techStack: ['Ahrefs', 'Search Console', 'Schema Markup']
            },
            {
                name: 'Social Media Management',
                description: 'Strategic content and community management across platforms.',
                price: 399,
                category: 'Social',
                techStack: ['Instagram', 'LinkedIn', 'Canva']
            }
        ]);

        // 3. Create Client
        const client = await User.create({
            name: 'Demo Client',
            email: 'client@demo.com',
            password: 'Client@123',
            role: 'client'
        });

        // 4. Create Project for Client
        const project = await Project.create({
            title: 'Velocity Web App Build',
            client: client._id,
            service: services[1]._id,
            status: 'In Progress',
            value: 1499,
            milestones: [
                { title: 'Project Kickoff', status: 'Done', dueDate: new Date() },
                { title: 'UX/UI Design', status: 'Done', dueDate: new Date() },
                { title: 'Platform Development', status: 'In Progress', dueDate: new Date() },
                { title: 'Quality Assurance', status: 'Pending', dueDate: new Date() }
            ],
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });

        // 5. Create Note for Project
        await Note.create({
            project: project._id,
            author: client._id,
            content: 'Excited to see the progress! The design looks amazing.'
        });

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error(`Seeding error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
