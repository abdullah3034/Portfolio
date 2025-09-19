import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../../contexts/DataContext';
import { 
  FaJs, FaReact, FaNodeJs, FaJava, FaHtml5, FaCss3Alt, 
  FaDatabase, FaGitAlt, FaDocker, FaAws, FaBootstrap,
  FaLanguage, FaCode, FaServer, FaTools
} from 'react-icons/fa';

const Skills = () => {
  const { skills, loading } = useData();
  const [activeCategory, setActiveCategory] = useState('languages');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const categories = [
    { id: 'languages', name: 'Languages', icon: FaLanguage },
    { id: 'frontend', name: 'Frontend', icon: FaHtml5 },
    { id: 'backend', name: 'Backend', icon: FaServer },
    { id: 'databases', name: 'Databases', icon: FaDatabase },
    { id: 'tools', name: 'Tools', icon: FaTools },
  ];

  const getSkillIcon = (skillName) => {
    const name = skillName.toLowerCase();
    if (name.includes('javascript') || name.includes('js')) return FaJs;
    if (name.includes('react')) return FaReact;
    if (name.includes('node') || name.includes('express')) return FaNodeJs;
    if (name.includes('java')) return FaJava;
    if (name.includes('html')) return FaHtml5;
    if (name.includes('css') || name.includes('tailwind') || name.includes('bootstrap')) return FaCss3Alt;
    if (name.includes('mongodb') || name.includes('postgresql') || name.includes('mysql')) return FaDatabase;
    if (name.includes('git')) return FaGitAlt;
    if (name.includes('docker')) return FaDocker;
    if (name.includes('aws')) return FaAws;
    if (name.includes('bootstrap')) return FaBootstrap;
    return FaCode;
  };

  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  if (loading) {
    return (
      <section id="skills" className="section-padding">
        <div className="container-custom text-center">
          <div className="loading-dots mx-auto">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="section-padding bg-white dark:bg-dark-800">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and expertise across different domains
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => {
            const IconComponent = getSkillIcon(skill.name);
            return (
              <motion.div
                key={skill._id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="card p-6 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {skill.category.replace('_', ' ')}
                    </p>
                  </div>
                </div>

                {/* Progress Bar for technical skills */}
                {skill.category !== 'languages_spoken' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Proficiency
                      </span>
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )}

                {/* Level indicator for spoken languages */}
                {skill.category === 'languages_spoken' && (
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < Math.floor(skill.level / 20)
                              ? 'bg-primary-600 dark:bg-primary-400'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.level === 100 ? 'Native' : 
                       skill.level >= 80 ? 'Fluent' : 
                       skill.level >= 60 ? 'Conversational' : 'Basic'}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl text-white"
            >
              <div className="text-3xl font-bold mb-2">
                {skills.filter(s => s.category === 'languages').length}
              </div>
              <div className="text-sm opacity-90">Programming Languages</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white"
            >
              <div className="text-3xl font-bold mb-2">
                {skills.filter(s => s.category === 'frontend').length}
              </div>
              <div className="text-sm opacity-90">Frontend Technologies</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white"
            >
              <div className="text-3xl font-bold mb-2">
                {skills.filter(s => s.category === 'backend').length}
              </div>
              <div className="text-sm opacity-90">Backend Technologies</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white"
            >
              <div className="text-3xl font-bold mb-2">
                {skills.filter(s => s.category === 'tools').length}
              </div>
              <div className="text-sm opacity-90">Tools & Technologies</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;

