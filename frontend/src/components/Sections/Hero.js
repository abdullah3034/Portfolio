import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaCode, FaRocket } from 'react-icons/fa';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ['Fullstack Developer',  'Fullstack Developer'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const [profileImageError, setProfileImageError] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900"></div>
      
      {/* Floating Shapes */}
      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20"
      />
      <motion.div
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 1 }}
        className="absolute top-40 right-20 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20"
      />
      <motion.div
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 2 }}
        className="absolute bottom-40 left-20 w-12 h-12 bg-primary-300 dark:bg-primary-700 rounded-full opacity-20"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-custom text-center relative z-10"
      >
        {/* Profile Image */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            {!profileImageError ? (
              <img
                src={process.env.PUBLIC_URL + '/profile.jpg'}
                alt="Profile"
                onError={() => setProfileImageError(true)}
                className="w-56 h-56 mx-auto object-cover rounded-full shadow-2xl border-4 border-primary-200 dark:border-primary-800"
              />
            ) : (
              <div className="w-56 h-56 mx-auto bg-gradient-to-br from-primary-400 to-purple-600 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                A
              </div>
            )}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border-4 border-primary-200 dark:border-primary-800 rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="gradient-text">Abdullah</span>
        </motion.h1>

        {/* Dynamic Role */}
        <motion.div
          variants={itemVariants}
          className="mb-8 h-16 flex items-center justify-center"
        >
          <motion.h2
            key={currentRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300"
          >
            {roles[currentRole]}
          </motion.h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Undergraduate in Information Technology at the University of Moratuwa, specializing in building scalable and user-friendly web applications with experience in front-end and back-end development
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <FaRocket className="w-5 h-5" />
            <span>Get In Touch</span>
          </motion.a>
          
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <FaCode className="w-5 h-5" />
            <span>View Projects</span>
          </motion.a>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"
        >
          <motion.a
            href="mailto:abdullahishak3034@gmail.com"
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <FaEnvelope className="w-4 h-4" />
            <span>abdullahishak3034@gmail.com</span>
          </motion.a>
          
          <motion.a
            href="tel:+94750510789"
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <FaPhone className="w-4 h-4" />
            <span>+94 750510789</span>
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-6 mt-8"
        >
          <motion.a
            href="https://github.com/abdullah3034"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaGithub className="w-6 h-6" />
          </motion.a>
          
          <motion.a
            href="https://www.linkedin.com/in/abdullah-m-i-8905182b0"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaLinkedin className="w-6 h-6" />
          </motion.a>
          
          
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-600 dark:border-primary-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary-600 dark:bg-primary-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

