import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  const [profileImageError, setProfileImageError] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex flex-col items-center pt-32 md:pt-40 pb-20 relative overflow-hidden bg-mesh">
      {/* Dynamic Background Accents */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-custom relative z-10 px-6"
      >
        <div className="flex flex-col items-center text-center">
          {/* Profile Image Section */}
          <motion.div
            variants={itemVariants}
            className="relative mb-12"
          >
            {/* Outer Decorative Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-10 border border-primary-500/20 rounded-full opacity-50"
            ></motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-14 border border-purple-500/10 rounded-full opacity-30"
            ></motion.div>

            {/* Glowing Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow opacity-60 blur-xl"></div>

            {/* Profile Frame */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] border-white dark:border-dark-900 shadow-2xl z-10 bg-white dark:bg-dark-900">
              {!profileImageError ? (
                <img
                  src={process.env.PUBLIC_URL + '/Profile.png'}
                  alt="Profile"
                  onError={() => setProfileImageError(true)}
                  className="w-full h-full object-cover scale-[2] transition-transform duration-700 hover:scale-[2.15]"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
                  A
                </div>
              )}
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white dark:border-dark-900 rounded-full z-20"
            >
              <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
            </motion.div>
          </motion.div>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center space-x-2 px-4 py-2 mb-6 text-xs font-bold tracking-[0.2em] text-primary-600 dark:text-primary-400 uppercase bg-primary-100/50 dark:bg-primary-900/30 rounded-full backdrop-blur-md border border-primary-200/50 dark:border-primary-800/50">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                <span>Crafting Digital Excellence</span>
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight">
                Software <span className="gradient-text">Developer</span> & <br className="hidden md:block" /> Creative Engineer
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              Hi, I’m <span className="text-gray-900 dark:text-white font-bold border-b-2 border-primary-500/30">Abdullah</span> — a passionate software developer dedicated to creating high-quality, maintainable, and user-centric applications.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
            >
              <a href="#projects" className="btn-primary group w-full sm:w-auto">
                <span className="flex items-center space-x-2">
                  <span>Explore My Work</span>
                  <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <a href="#contact" className="btn-secondary w-full sm:w-auto">
                Discuss a Project
              </a>
            </motion.div>

            {/* Social & Contact Quick Links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-8 pt-12 border-t border-gray-200/50 dark:border-white/5"
            >
              <a href="mailto:abdullahishak3034@gmail.com" className="group flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-800 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                  <FaEnvelope className="w-3.5 h-3.5" />
                </div>
                <span>Email Me</span>
              </a>
              <a href="https://github.com/abdullah3034" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-dark-700 transition-colors">
                  <FaGithub className="w-3.5 h-3.5" />
                </div>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 transition-colors">
                  <FaLinkedin className="w-3.5 h-3.5" />
                </div>
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Modern Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="w-6 h-10 border-2 border-gray-400/30 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-primary-500 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
