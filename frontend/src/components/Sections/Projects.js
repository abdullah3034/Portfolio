import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../../contexts/DataContext';
import { FaGithub, FaExternalLinkAlt, FaCode, FaServer, FaDatabase, FaReact } from 'react-icons/fa';

const Projects = () => {
  const { projects, loading } = useData();
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react')) return FaReact;
    if (techLower.includes('node') || techLower.includes('express')) return FaServer;
    if (techLower.includes('mongodb') || techLower.includes('database')) return FaDatabase;
    return FaCode;
  };

  if (loading) {
    return (
      <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-900">
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
    <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-900">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work and projects that demonstrate my skills and passion for development
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {projects
            .filter(project => project.featured)
            .map((project, index) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -10 }}
                className="card overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image/Icon */}
                <div className="h-48 bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <FaCode className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-300"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span className="text-sm font-medium">Code</span>
                    </motion.a>
                    
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        <span className="text-sm font-medium">Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Other Projects */}
        {projects.filter(project => !project.featured).length > 0 && (
          <>
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Other Projects
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full"></div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects
                .filter(project => !project.featured)
                .map((project, index) => (
                  <motion.div
                    key={project._id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="card p-6 group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                        <FaCode className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {project.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {project.technologies.slice(0, 2).join(', ')}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex space-x-2">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-300"
                      >
                        <FaGithub className="w-4 h-4" />
                      </motion.a>
                      
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300"
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </>
        )}

        {/* Project Statistics */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl text-white"
            >
              <div className="text-3xl font-bold mb-2">{projects.length}</div>
              <div className="text-sm opacity-90">Total Projects</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white"
            >
              <div className="text-3xl font-bold mb-2">
                {projects.filter(p => p.featured).length}
              </div>
              <div className="text-sm opacity-90">Featured Projects</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white"
            >
              <div className="text-3xl font-bold mb-2">
                {new Set(projects.flatMap(p => p.technologies)).size}
              </div>
              <div className="text-sm opacity-90">Technologies Used</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white"
            >
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">MERN Stack</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-dark-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FaExternalLinkAlt className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span>View Code</span>
                  </motion.a>
                  
                  {selectedProject.liveUrl && (
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary inline-flex items-center space-x-2"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;

