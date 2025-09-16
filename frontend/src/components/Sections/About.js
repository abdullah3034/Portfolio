import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode,  FaUsers, FaLightbulb } from 'react-icons/fa';

const About = () => {
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

  const values = [
    {
      icon: FaCode,
      title: 'Technical Excellence',
      description: 'Committed to writing clean, efficient, and maintainable code using modern technologies and best practices.',
    },
    // {
    //   icon: FaRocket,
    //   title: 'Innovation',
    //   description: 'Always exploring new technologies and approaches to solve complex problems and create better user experiences.',
    // },
    {
      icon: FaUsers,
      title: 'Collaboration',
      description: 'Strong believer in teamwork and effective communication to deliver exceptional results in collaborative environments.',
    },
    {
      icon: FaLightbulb,
      title: 'Continuous Learning',
      description: 'Passionate about expanding technical expertise and staying updated with the latest industry trends and technologies.',
    }
  ];

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-dark-900">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I am a motivated undergraduate pursuing B.Sc. (Hons) in Information Technology at the University of Moratuwa, with strong skills in React.js for front-end development and Node.js for back-end applications.
              </p>
              <br/>
              
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
               I have hands-on experience working with both relational databases (MySQL, PostgreSQL) and non-relational databases, enabling me to design and manage versatile, data-driven applications. My focus is on building scalable, reliable, and user-friendly web solutions by combining clean front-end interfaces with robust back-end systems.
              </p>

              <br/>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
               Passionate about leveraging technology to solve real-world problems, I continuously seek opportunities to learn, experiment, and expand my expertise. I enjoy working on challenging projects that push me to grow as a developer while creating meaningful solutions for users.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white dark:bg-dark-800 rounded-lg shadow-md"
              >
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">2+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white dark:bg-dark-800 rounded-lg shadow-md"
              >
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white dark:bg-dark-800 rounded-lg shadow-md"
              >
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white dark:bg-dark-800 rounded-lg shadow-md"
              >
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Dedicated</div>
              </motion.div> */}
            </div>
          </motion.div>

          {/* Values/Principles */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              What Drives Me
            </h3>
            
            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-4 bg-white dark:bg-dark-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Let's Work Together</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;

