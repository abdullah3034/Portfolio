const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Education = require('./models/Education');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});

    // Create admin user
    const adminUser = new User({
      email: process.env.ADMIN_EMAIL || 'abdullahishak3034@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'abdullahmi',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    // Create projects
    const projects = [
      {
        title: 'Task Management System',
        description: 'MERN stack project with task creation, assignment, progress tracking, prioritization, status updates, and real-time team coordination.',
        longDescription: 'A comprehensive task management system built with the MERN stack. Features include user authentication, role-based access control, real-time updates, task assignment, progress tracking, and team collaboration tools.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'Tailwind CSS'],
        githubUrl: 'https://github.com/abdullah3034/Task-Management-System',
        liveUrl: '',
        featured: true,
        order: 1
      },
      {
        title: 'Hotel Management System',
        description: 'Full-stack MERN project with Tailwind CSS UI, secure JWT authentication, role-based access control, and cart/package booking workflows.',
        longDescription: 'A complete hotel management system developed as a 2nd year university project. Includes room booking, package management, user authentication, and admin dashboard.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS', 'Bootstrap'],
        githubUrl: 'https://github.com/abdullah3034/2nd_Year_Proj',
        liveUrl: '',
        featured: true,
        order: 2
      }
    ];

    for (const project of projects) {
      const newProject = new Project(project);
      await newProject.save();
    }
    console.log('Projects created');

    // Create skills
    const skills = [
      // Languages
      { name: 'JavaScript (ES6+)', category: 'languages', level: 90, order: 1 },
      { name: 'TypeScript', category: 'languages', level: 80, order: 2 },
      { name: 'Java', category: 'languages', level: 75, order: 3 },
      { name: 'C', category: 'languages', level: 70, order: 4 },

      // Frontend
      { name: 'React.js', category: 'frontend', level: 90, order: 1 },
      { name: 'Next.js', category: 'frontend', level: 80, order: 2 },
      { name: 'Redux', category: 'frontend', level: 85, order: 3 },
      { name: 'Redux Toolkit', category: 'frontend', level: 85, order: 4 },
      { name: 'Tailwind CSS', category: 'frontend', level: 90, order: 5 },
      { name: 'Bootstrap', category: 'frontend', level: 80, order: 6 },
      // { name: 'Responsive Design', category: 'frontend', level: 95, order: 7 },

      // Backend
      { name: 'Node.js', category: 'backend', level: 85, order: 1 },
      { name: 'Express.js', category: 'backend', level: 85, order: 2 },
      { name: 'RESTful APIs', category: 'backend', level: 90, order: 3 },
      { name: 'Microservices', category: 'backend', level: 70, order: 4 },

      // Databases
      { name: 'MongoDB', category: 'databases', level: 85, order: 1 },
      { name: 'PostgreSQL', category: 'databases', level: 75, order: 2 },
      { name: 'MySQL', category: 'databases', level: 70, order: 3 },

      // Tools & DevOps
      { name: 'Git & GitHub', category: 'tools', level: 90, order: 1 },
      { name: 'Docker', category: 'tools', level: 70, order: 2 },
      { name: 'Postman', category: 'tools', level: 85, order: 3 },
      { name: 'VS Code', category: 'tools', level: 95, order: 4 },
      { name: 'Agile/Scrum', category: 'tools', level: 80, order: 5 },

      // Languages (Spoken)
     
    ];

    for (const skill of skills) {
      const newSkill = new Skill(skill);
      await newSkill.save();
    }
    console.log('Skills created');

    // Create education
    const education = [
      {
        institution: 'University of Moratuwa',
        degree: 'B.Sc. (Hons) in Information Technology',
        field: 'Information Technology',
        startDate: new Date('2023-01-01'),
        endDate: null,
        current: true,
        description: 'Pursuing Bachelor of Science (Honours) in Information Technology with focus on software development, system design, and emerging technologies.',
        location: 'Sri Lanka',
        order: 1
      }
    ];

    for (const edu of education) {
      const newEducation = new Education(edu);
      await newEducation.save();
    }
    console.log('Education created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();

