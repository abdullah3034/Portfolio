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
        title: 'Automobile Service Management System',
        description: 'Enterprise application with Spring Security 6 JWT authentication and a React-based management client.',
        longDescription: 'A full-stack system featuring role-based route protection, OTP-based password recovery, and email notifications. Includes an automated dashboard for profile management and auditing.',
        technologies: ['Spring Boot', 'React.js', 'PostgreSQL', 'Spring Security 6', 'Tailwind CSS', 'Axios'],
        githubUrl: 'https://github.com/abdullah3034/automobile_service_management',
        liveUrl: '',
        featured: true,
        order: 1
      },
      {
        title: 'Hotel Management System',
        description: 'Full-stack MERN project with Tailwind CSS UI, secure JWT authentication, role-based access control, and cart/package booking workflows.',
        longDescription: 'A complete hotel management system developed as a 2nd year university project. Includes room booking, package management, user authentication, and admin dashboard.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS', 'Bootstrap'],
        githubUrl: 'https://github.com/abdullah3034/HMS_Project',
        liveUrl: '',
        featured: true,
        order: 2
      },
      {
        title: 'Hackathon Registration & Project Competition App',
        description: 'Angular 18 application with robust role-based access control for organizers and participants.',
        longDescription: 'A scalable competition management platform featuring user authentication, secure session handling, and an end-to-end submission workflow. Includes an administrative dashboard for evaluating uploads and declaring winners.',
        technologies: ['Angular 18', 'Bootstrap 5', 'TypeScript', 'REST APIs'],
        githubUrl: 'https://github.com/abdullah3034/HackethonRegistrationAPP',
        liveUrl: '',
        featured: true,
        order: 3
      },
      {
        title: 'Student Management System',
        description: 'Full-stack MERN project with automated student ID generation and real-time regex-based search capabilities.',
        longDescription: 'A modern, type-safe management platform built with TypeScript and MERN. It features automated data processing using Mongoose middleware for age calculation and unique ID generation (e.g., STU_0001). The system includes a high-fidelity dashboard with a robust search engine for real-time discovery across student records.',
        technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Mongoose', 'Lucide React'],
        githubUrl: 'https://github.com/abdullah3034/StudentManagementSystem',
        liveUrl: 'https://student-management-system-s4t4.vercel.app/',
        featured: true,
        order: 4
      },
      {
        title: 'Automated Potato Sorting Machine',
        description: 'Hardware-software integration project using Arduino to grade produce by size.',
        longDescription: 'An automated grading system that categorizes potatoes into small, medium, and large sizes. Developed using Arduino programming to control stepper and wiper motors.',
        technologies: ['Arduino', 'C++', 'Stepper Motors', 'Embedded Systems'],
        githubUrl: 'https://github.com/abdullah3034',
        liveUrl: '',
        featured: false,
        order: 5
      },
      {
        title: 'Gas Delivery Driver App',
        description: 'Offline-first LPG delivery driver app with end-to-end order flow, payment handling, and inventory tracking.',
        longDescription: 'Built with React Native (Expo), TypeScript, and SQLite for reliable field operations without internet. Includes delivery workflow (vehicle selection -> assigned orders -> delivery confirmation -> payment -> receipt), partial-delivery support, secure cash/cheque/credit payment handling, vehicle-level inventory load/return checks, and KPI dashboards for commission, payments, inventory mix, and delivery progress.',
        technologies: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Mobile App Development', 'Offline-first'],
        githubUrl: 'https://github.com/abdullah3034/Gas-Delivery-Driver-App',
        liveUrl: '',
        featured: true,
        order: 6
      },

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
      { name: 'Angular', category: 'frontend', level: 75, order: 3 },
      { name: 'Redux', category: 'frontend', level: 85, order: 4 },
      { name: 'Redux Toolkit', category: 'frontend', level: 85, order: 5 },
      { name: 'Tailwind CSS', category: 'frontend', level: 90, order: 6 },
      { name: 'Bootstrap', category: 'frontend', level: 80, order: 7 },

      // Backend
      { name: 'Node.js', category: 'backend', level: 85, order: 1 },
      { name: 'Express.js', category: 'backend', level: 85, order: 2 },
      { name: 'Java', category: 'backend', level: 80, order: 3 },
      { name: 'Spring Boot', category: 'backend', level: 75, order: 4 },
      { name: 'RESTful APIs', category: 'backend', level: 90, order: 5 },
      { name: 'Microservices', category: 'backend', level: 70, order: 6 },

      // Databases
      { name: 'MongoDB', category: 'databases', level: 85, order: 1 },
      { name: 'PostgreSQL', category: 'databases', level: 75, order: 2 },
      { name: 'MySQL', category: 'databases', level: 70, order: 3 },

      // Tools & DevOps
      { name: 'Git & GitHub', category: 'tools', level: 90, order: 1 },
      { name: 'Docker', category: 'tools', level: 70, order: 2 },
      { name: 'Postman', category: 'tools', level: 85, order: 3 },
      // { name: 'VS Code', category: 'tools', level: 95, order: 4 },
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

