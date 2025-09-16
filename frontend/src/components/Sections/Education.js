import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../../contexts/DataContext';
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaUniversity } from 'react-icons/fa';

const Education = () => {
  const { education, loading } = useData();
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const getDuration = (startDate, endDate, current) => {
    if (current) {
      return `${formatDate(startDate)} - Present`;
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  if (loading) {
    return (
      <section id="education" className="section-padding bg-white dark:bg-dark-800">
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
    <section id="education" className="section-padding bg-white dark:bg-dark-800">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My academic journey and educational background that shaped my foundation in technology
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-primary-600"></div>

          <motion.div variants={containerVariants} className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={edu._id}
                variants={itemVariants}
                className="timeline-item relative"
              >
                <div className="flex items-start space-x-6">
                  {/* Timeline Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex-shrink-0 w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center border-4 border-white dark:border-dark-800 shadow-lg"
                  >
                    <FaGraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </motion.div>

                  {/* Education Content */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                            {edu.field}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <FaUniversity className="w-4 h-4" />
                            <span>{edu.institution}</span>
                          </div>
                          {edu.location && (
                            <div className="flex items-center space-x-1">
                              <FaMapMarkerAlt className="w-4 h-4" />
                              <span>{edu.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="mt-4 lg:mt-0"
                      >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900 rounded-full">
                          <FaCalendarAlt className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                            {getDuration(edu.startDate, edu.endDate, edu.current)}
                          </span>
                          {edu.current && (
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
                              Current
                            </span>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {edu.description && (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {edu.description}
                      </p>
                    )}

                    {/* Progress Indicator for Current Education */}
                    {edu.current && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Progress
                          </span>
                          <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                            {Math.round((new Date() - new Date(edu.startDate)) / (4 * 365 * 24 * 60 * 60 * 1000) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${Math.min(Math.round((new Date() - new Date(edu.startDate)) / (4 * 365 * 24 * 60 * 60 * 1000) * 100), 100)}%` } : { width: 0 }}
                            transition={{ duration: 2, delay: index * 0.2, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl text-white"
            >
              <div className="text-3xl font-bold mb-2">
                {education.filter(edu => edu.current).length > 0 ? 'Current' : 'Completed'}
              </div>
              <div className="text-sm opacity-90">Status</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white"
            >
              <div className="text-3xl font-bold mb-2">
                {new Date().getFullYear() - new Date(education[0]?.startDate || new Date()).getFullYear() + 1}
              </div>
              <div className="text-sm opacity-90">Years of Study</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white"
            >
              <div className="text-3xl font-bold mb-2">IT</div>
              <div className="text-sm opacity-90">Field of Study</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Academic Focus
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              My academic journey at the University of Moratuwa has provided me with a strong foundation in Information Technology,
              covering areas such as software engineering, database management, system design, and emerging technologies.
              This education has been instrumental in developing my analytical thinking and problem-solving skills.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Education;

