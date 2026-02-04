import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/abdullah3034', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/abdullah-m-i-8905182b0', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: FaEnvelope, href: 'mailto:abdullahishak3034@gmail.com', label: 'Email', color: 'hover:text-primary-600' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-white dark:bg-dark-950 border-t border-gray-100 dark:border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>

      <div className="container-custom px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & About */}
          <div className="md:col-span-2 space-y-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 dark:text-white">
                ABDULLAH<span className="text-primary-600">.</span>
              </h2>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-sm">
              Architecting high-performance digital experiences with a focus on technical excellence and premium design interfaces.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 bg-gray-50 dark:bg-dark-900 rounded-2xl flex items-center justify-center text-gray-500 dark:text-gray-400 ${social.color} transition-all duration-300 shadow-sm hover:shadow-xl border border-transparent hover:border-primary-500/10`}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 font-bold transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[2px] bg-primary-500 mr-0 group-hover:mr-2 transition-all"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability Block */}
          <div>
            <div className="glass-card p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary-500/5 blur-2xl group-hover:bg-primary-500/10 transition-colors"></div>
              <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-4">Current Status</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-bold leading-relaxed mb-6">
                I am currently looking for a job and open for full-time or remote opportunities.
              </p>
              <div className="flex items-center text-primary-600 dark:text-primary-400 font-black text-xs uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Online Now
              </div>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-10 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-gray-500 dark:text-gray-500 text-sm font-bold uppercase tracking-widest">
            © {currentYear} ABDULLAHISHAK. ALL RIGHTS RESERVED.
          </p>

          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="p-4 bg-primary-600 text-white rounded-2xl shadow-xl hover:shadow-primary-500/40 transition-shadow"
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
