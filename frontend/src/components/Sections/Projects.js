import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../../contexts/DataContext';
import { FaGithub, FaExternalLinkAlt, FaCode, FaLayerGroup, FaTimes, FaTools, FaCheckCircle } from 'react-icons/fa';

// 3D Tilt Card Component
const ProjectCard = ({ project, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      onClick={() => onClick(project)}
      className="relative group cursor-pointer perspective-2000"
    >
      <div className="card h-full overflow-hidden flex flex-col bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-2xl">
        {/* Project Visual Header */}
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 opacity-90 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8 translate-z-20">
            <div className="text-center text-white">
              <FaCode className="w-16 h-16 mx-auto mb-4 opacity-50 group-hover:scale-125 transition-transform duration-500" />
              <h3 className="text-2xl font-black tracking-tight leading-tight">{project.title}</h3>
            </div>
          </div>

          {/* Top Tech Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 2).map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/30">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="p-8 flex-1 flex flex-col">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium line-clamp-3 mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex space-x-3">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-3 bg-gray-100 dark:bg-dark-800 rounded-xl hover:bg-primary-500 hover:text-white transition-all duration-300">
                <FaGithub className="w-4 h-4" />
              </a>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-3 bg-primary-600 text-white rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300">
                  <FaExternalLinkAlt className="w-4 h-4" />
                </a>
              )}
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-primary-600 dark:text-primary-400 group-hover:translate-x-2 transition-transform">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Projects Component
const Projects = () => {
  const { projects, loading } = useData();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Dynamically extract categories from technologies or use predefined ones
  const categories = ['All', 'Web', 'MERN', 'Spring', 'Hardware'];

  const filteredProjects = projects.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Web') return p.technologies.some(t => ['React.js', 'Angular 18', 'JavaScript', 'TypeScript'].includes(t));
    if (filter === 'MERN') return p.technologies.some(t => ['MongoDB', 'Express.js', 'React.js', 'Node.js'].includes(t));
    if (filter === 'Spring') return p.technologies.some(t => t.includes('Spring'));
    if (filter === 'Hardware') return p.technologies.some(t => ['Arduino', 'Embedded Systems'].includes(t));
    return true;
  });

  if (loading) {
    return (
      <section id="projects" className="section-padding flex items-center justify-center min-h-screen">
        <div className="loading-dots"><div></div><div></div><div></div><div></div></div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-500/5 blur-[120px] pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-[10px] xs:text-xs font-bold tracking-[0.2em] text-primary-600 dark:text-primary-400 uppercase bg-primary-100/50 dark:bg-primary-900/30 rounded-full border border-primary-200/50 dark:border-primary-800/50">
            Selected Work
          </span>
          <h2 className="text-4xl xs:text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            Featured <span className="gradient-text">Creations</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            A deep dive into the systems I've architected, from enterprise management platforms to embedded hardware solutions.
          </p>
        </motion.div>

        {/* Modern Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 border-2 ${filter === cat
                ? 'bg-primary-600 border-primary-600 text-white shadow-xl'
                : 'bg-white dark:bg-dark-900 border-gray-100 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:border-primary-500/30'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modern Project Modal (Full Page Design) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 backdrop-blur-2xl bg-black/60"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-dark-900 w-full max-w-5xl max-h-[90vh] md:max-h-full overflow-y-auto rounded-[1.5rem] md:rounded-[2.2rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
              <div className="flex flex-col md:flex-row h-full">
                {/* Visual Side */}
                <div className="md:w-5/12 bg-gradient-to-br from-primary-600 to-purple-700 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full"></div>
                    <div className="absolute bottom-20 right-10 w-60 h-60 border border-white rounded-full"></div>
                  </div>
                  <FaCode className="text-white/20 text-7xl md:text-9xl absolute -bottom-8 md:-bottom-10 -left-8 md:-left-10" />

                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6 md:mb-8">
                      {selectedProject.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                      {selectedProject.technologies.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Details Side */}
                <div className="md:w-7/12 p-8 md:p-16 relative">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 p-2 md:p-3 bg-gray-100 dark:bg-dark-800 rounded-full hover:bg-red-500 hover:text-white transition-all z-10"
                  >
                    <FaTimes />
                  </button>

                  <div className="space-y-10">
                    <section>
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 mb-4 flex items-center">
                        <FaLayerGroup className="mr-2" /> Project Overview
                      </h4>
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 mb-6 flex items-center">
                        <FaTools className="mr-2" /> Technical Stack
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedProject.technologies.map((t, i) => (
                          <div key={i} className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-white/5">
                            <FaCheckCircle className="text-primary-500" />
                            <span className="font-bold text-gray-900 dark:text-white text-sm">{t}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    <div className="flex gap-4 pt-6">
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary group !py-4 flex-1 text-center">
                        <span>Source Code</span>
                      </a>
                      {selectedProject.liveUrl && (
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary !py-4 flex-1 text-center font-black">
                          Review Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
