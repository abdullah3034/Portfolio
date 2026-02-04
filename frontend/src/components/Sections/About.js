import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaRocket, FaHandshake, FaTerminal } from 'react-icons/fa';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      icon: FaTerminal,
      title: 'Reliable Architect',
      description: 'Building foundations that scale. I prioritize system stability and code maintainability over quick fixes.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaHandshake,
      title: 'Problem Solver',
      description: 'Translating complex business requirements into elegant technical solutions with a focus on user impact.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaRocket,
      title: 'Future Focused',
      description: 'Continuously integrating emerging technologies like AI and Cloud-native architectures into my workflow.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="about" className="section-padding bg-white dark:bg-dark-950 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Visual Side: The "Professional Persona" */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 glass-card p-1">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 rounded-[2rem] overflow-hidden flex items-center justify-center p-12">
                <div className="text-center">
                  <FaCode className="text-white text-8xl mb-8 opacity-20" />
                  <h3 className="text-3xl font-black text-white mb-4 italic tracking-tight">"Code is temporary, Architecture is forever."</h3>
                  <div className="w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>
            {/* Decorative Background Accents */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </motion.div>

          {/* Text Side: Narrative Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] text-primary-600 dark:text-primary-400 uppercase bg-primary-100/50 dark:bg-primary-900/30 rounded-full border border-primary-200/50 dark:border-primary-800/50">
                The Narrative
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] mb-8">
                Turning Visions into <span className="gradient-text">Engineered</span> Reality
              </h2>
              <div className="prose prose-xl dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-6">
                  I am a passionate software engineer currently pursuing my B.Sc. (Hons) in Information Technology at the <span className="text-primary-600 font-bold">University of Moratuwa</span>. My journey is defined by a relentless drive to bridge the gap between complex logic and seamless user experience.
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                  Leveraging modern frameworks such as Angular, React, Spring Boot, and the MERN stack, I’ve built end-to-end software systems during my academic years that prioritize clean architecture, scalability, and secure design.
                </p>
              </div>
            </div>

            {/* Values / Principles Bento Blocks */}
            <div className="grid gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-6 p-6 bg-gray-50 dark:bg-dark-900/50 rounded-2xl border border-gray-100 dark:border-white/5 group transition-all"
                >
                  <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    <value.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-6">
              <a href="#contact" className="btn-primary group !py-4 px-10">
                Let's Build Something Together
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
