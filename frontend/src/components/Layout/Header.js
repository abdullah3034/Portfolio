import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import {
  FaSun, FaMoon, FaBars, FaTimes, FaHome, FaUser,
  FaCode, FaProjectDiagram, FaGraduationCap, FaEnvelope
} from 'react-icons/fa';

const navItems = [
  { name: 'Home', href: 'home', icon: FaHome },
  { name: 'About', href: 'about', icon: FaUser },
  { name: 'Skills', href: 'skills', icon: FaCode },
  { name: 'Projects', href: 'projects', icon: FaProjectDiagram },
  { name: 'Education', href: 'education', icon: FaGraduationCap },
  { name: 'Contact', href: 'contact', icon: FaEnvelope },
];

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Intersection Observer for active section tracking
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.href);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-4 left-0 right-0 z-50 px-4 transition-all duration-500`}
    >
      <nav
        className={`mx-auto transition-all duration-500 rounded-2xl overflow-hidden border ${scrolled
          ? 'max-w-4xl bg-white/70 dark:bg-dark-900/70 backdrop-blur-xl shadow-2xl border-primary-100 dark:border-primary-900/30 p-2'
          : 'max-w-7xl bg-transparent border-transparent p-4'
          }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary-500/20 transition-all duration-300">
                <span className="text-white font-black text-lg">A</span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-1 border border-primary-500/30 rounded-xl -z-10"
              />
            </div>
            <div className="hidden lg:block leading-none">
              <span className="text-lg font-bold text-gray-900 dark:text-white block">
                Abdullah
              </span>
              <span className="text-[10px] uppercase tracking-widest text-primary-600 font-bold">
                Portfolio
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-gray-100/50 dark:bg-dark-800/50 rounded-xl p-1 relative">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 z-10 flex items-center space-x-2 ${activeSection === item.href
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {activeSection === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg shadow-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-dark-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-dark-700 transition-all duration-300 border border-transparent hover:border-primary-200 dark:hover:border-primary-800 shadow-sm"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ y: 20, opacity: 0, rotate: 45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <FaSun className="w-5 h-5 text-yellow-500" /> : <FaMoon className="w-5 h-5 text-primary-600" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-500/20"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 shadow-2xl overflow-hidden"
            >
              <div className="p-3 grid grid-cols-2 gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${activeSection === item.href
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 font-bold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-800'
                      }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;

