import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaGithub,
      href: 'https://github.com/abdullah3034',
      label: 'GitHub',
      color: 'hover:text-gray-900 dark:hover:text-white',
    },
    {
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/abdullah-m-i-8905182b0',
      label: 'LinkedIn',
      color: 'hover:text-blue-600',
    },
    
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-800 dark:bg-dark-900 text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">Abdullah</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Passionate about building scalable, reliable, and user-friendly web applications with React, Node.js, and modern databases.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-dark-600`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <motion.a
                href="mailto:abdullahishak3034@gmail.com"
                whileHover={{ x: 5 }}
                className="block text-gray-400 hover:text-primary-400 transition-colors duration-300"
              >
                abdullahishak3034@gmail.com
              </motion.a>
              <motion.a
                href="tel:+94750510789"
                whileHover={{ x: 5 }}
                className="block text-gray-400 hover:text-primary-400 transition-colors duration-300"
              >
                +94 750510789
              </motion.a>
              <p className="text-gray-400">
                Sri Lanka
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-dark-700 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
            <p>© {currentYear}  Abdullah. All rights reserved.</p>
              <motion.div
                // animate={{ scale: [1, 1.2, 1] }}
                // transition={{ duration: 1, repeat: Infinity }}
              >
                {/* <FaHeart className="w-4 h-4 text-red-500" /> */}
              </motion.div>
              {/* <span>and</span>
              <FaCode className="w-4 h-4 text-primary-400" /> */}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Built with React & Node.js</span>
              <span>•</span>
              <span></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
        aria-label="Back to top"
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↑
        </motion.div>
      </motion.button>
    </footer>
  );
};

export default Footer;

