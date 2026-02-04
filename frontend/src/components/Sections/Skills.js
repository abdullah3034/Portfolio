import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../../contexts/DataContext';
import {
  FaJs, FaReact, FaNodeJs, FaJava, FaHtml5, FaCss3Alt,
  FaDatabase, FaGitAlt, FaDocker, FaAws, FaBootstrap,
  FaLanguage, FaCode, FaServer, FaTools, FaTerminal, FaLayerGroup,
  FaAngular
} from 'react-icons/fa';
import { SiSpringboot } from 'react-icons/si';

const Skills = () => {
  const { skills, loading } = useData();
  const [activeCategory, setActiveCategory] = useState('languages');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    if (name.includes('spring')) return SiSpringboot;
    if (name.includes('java')) return FaJava;
    if (name.includes('html')) return FaHtml5;
    if (name.includes('css') || name.includes('tailwind') || name.includes('bootstrap')) return FaCss3Alt;
    if (name.includes('mongodb') || name.includes('postgresql') || name.includes('mysql')) return FaDatabase;
    if (name.includes('git')) return FaGitAlt;
    if (name.includes('docker')) return FaDocker;
    if (name.includes('aws')) return FaAws;
    if (name.includes('angular')) return FaAngular;
    return FaTerminal;
  };

  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  if (loading) {
    return (
      <section id="skills" className="section-padding bg-mesh min-h-screen flex items-center justify-center">
        <div className="loading-dots"><div></div><div></div><div></div><div></div></div>
      </section>
    );
  }

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-white dark:bg-dark-950">
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase bg-primary-100/50 dark:bg-primary-900/30 rounded-full border border-primary-200/50 dark:border-primary-800/50">
            Expertise & Capabilities
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            Technical <span className="gradient-text">Mastery</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            A specialized collection of technologies I use to build robust, scalable, and high-performance digital solutions.
          </p>
        </motion.div>

        {/* Professional Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all duration-500 border-2 ${activeCategory === category.id
                ? 'bg-primary-600 border-primary-600 text-white shadow-[0_10px_20px_-5px_rgba(59,130,246,0.5)]'
                : 'bg-white dark:bg-dark-800 border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:border-primary-500/30'
                }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm">{category.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Bento Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const IconComponent = getSkillIcon(skill.name);
              return (
                <motion.div
                  key={skill._id || skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div className="card h-full p-8 flex flex-col items-center justify-center text-center group-hover:border-primary-500/50 transition-colors">
                    {/* Floating Background Glow */}
                    <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 rounded-2xl transition-colors duration-500"></div>

                    {/* Icon with Ring */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gray-50 dark:bg-dark-800 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <IconComponent className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors" />
                      </div>
                      <div className="absolute -inset-2 border border-primary-500/0 group-hover:border-primary-500/20 rounded-2xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      {skill.category}
                    </p>

                    {/* Minimalist Progress Meter */}
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-dark-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                    <span className="mt-2 text-xs font-black text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {skill.level}% Proficiency
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Core Expertise Summary (Professional Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {[
            {
              title: 'Frontend Mastery',
              desc: 'Architecting high-performance, accessible interfaces using React, Next.js, and Angular, with a focus on modern design systems and seamless UX.',
              icon: FaLayerGroup,
              color: 'from-blue-500/20'
            },
            {
              title: 'Backend Systems',
              desc: 'Building robust, scalable server-side architectures using Node.js, Java, and Spring Boot, specializing in microservices and secure data management.',
              icon: FaServer,
              color: 'from-green-500/20'
            },
            {
              title: 'DevOps & Tooling',
              desc: 'Optimizing development lifecycles with Git, Docker, and CI/CD strategies to ensure high-velocity, reliable software delivery.',
              icon: FaTools,
              color: 'from-purple-500/20'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-10 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
              <item.icon className="w-12 h-12 text-gray-900 dark:text-white mb-8 group-hover:text-primary-500 transition-colors" />
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
