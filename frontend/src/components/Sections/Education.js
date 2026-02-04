import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../../contexts/DataContext';
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaUniversity, FaAward, FaBookReader } from 'react-icons/fa';

const Education = () => {
  const { education, loading } = useData();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  if (loading) {
    return (
      <section id="education" className="section-padding bg-gray-50 dark:bg-dark-900 flex items-center justify-center min-h-[400px]">
        <div className="loading-dots"><div></div><div></div><div></div><div></div></div>
      </section>
    );
  }

  return (
    <section id="education" className="section-padding bg-gray-50 dark:bg-dark-950 relative overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 opacity-50"></div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-[0.2em] text-primary-600 dark:text-primary-400 uppercase bg-primary-100/50 dark:bg-primary-900/30 rounded-full border border-primary-200/50 dark:border-primary-800/50">
            Academic Path
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            Educational <span className="gradient-text">Milestones</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Building a strong theoretical foundation to complement my hands-on engineering expertise.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Guide */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-dark-800 -translate-x-1/2 hidden md:block opacity-30"></div>

          <div className="space-y-16">
            {education.map((edu, index) => (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center justify-between relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-dark-900 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20 -translate-x-1/2 hidden md:block"></div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass-card p-8 md:p-10 hover:border-primary-500/30 transition-all duration-500 group">
                    <div className={`flex items-center space-x-4 mb-6 ${index % 2 === 0 ? 'md:flex-row-reverse md:space-x-reverse' : ''}`}>
                      <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/50 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <FaGraduationCap className="text-2xl" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-black text-primary-500 uppercase tracking-widest leading-none block mb-1">
                          {formatDate(edu.startDate)} — {edu.current ? 'Present' : formatDate(edu.endDate)}
                        </span>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                          {edu.degree}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className={`flex items-center text-gray-700 dark:text-gray-300 font-bold ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <FaUniversity className="mr-2" />
                        <span>{edu.institution}</span>
                      </div>

                      {edu.description && (
                        <p className="text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed">
                          {edu.description}
                        </p>
                      )}

                      {/* Achievement Badge (Simulated for aesthetics) */}
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-black uppercase tracking-tighter rounded-full border border-green-500/20">
                          Academic Excellence
                        </span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-tighter rounded-full border border-blue-500/20">
                          Research Focused
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Label (Desktop only side indicator) */}
                <div className="hidden md:block w-[45%]">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                    <div className="px-6 py-3 bg-white dark:bg-dark-900 rounded-3xl shadow-xl border border-gray-100 dark:border-white/5 font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest text-xs">
                      {edu.current ? "Ongoing Journey" : "Historical Milestone"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Global Academic Summary */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div whileHover={{ y: -5 }} className="glass-card p-10 flex items-start space-x-6">
            <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-2xl text-orange-600 dark:text-orange-400">
              <FaAward className="text-3xl" />
            </div>
            <div>
              <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2">Technical Foundations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Solid grounding in Software Engineering principles, Data Structures, and Algorithmic Complexity.</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="glass-card p-10 flex items-start space-x-6">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400">
              <FaBookReader className="text-3xl" />
            </div>
            <div>
              <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2">Continuous Learning</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Actively expanding expertise in Distributed Systems, Cloud Architecture, and Machine Learning.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
