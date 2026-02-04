import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane, FaCheck, FaArrowRight } from 'react-icons/fa';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/contact', data);
      toast.success('Professional message received. I will respond shortly.');
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Transmission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactOptions = [
    { icon: FaEnvelope, label: 'Direct Email', value: 'abdullahishak3034@gmail.com', href: 'mailto:abdullahishak3034@gmail.com', color: 'bg-blue-500' },
    { icon: FaPhone, label: 'Voice / WhatsApp', value: '+94 750510789', href: 'tel:+94750510789', color: 'bg-green-500' },
    { icon: FaLinkedin, label: 'Professional Profile', value: 'abdullah-m-i-8905182b0', href: 'https://linkedin.com', color: 'bg-blue-600' }
  ];

  return (
    <section id="contact" className="section-padding bg-white dark:bg-dark-950 relative overflow-hidden">
      {/* Background Decorative Mesh */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary-500/5 to-transparent pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-24">

          {/* Info Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] text-primary-600 dark:text-primary-400 uppercase bg-primary-100/50 dark:bg-primary-900/30 rounded-full border border-primary-200/50 dark:border-primary-800/50">
                Career Opportunities
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] mb-8">
                Let's Build a <span className="gradient-text">Future Together.</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-lg">
                I’m ready to bring my technical expertise, problem-solving mindset, and execution skills to a forward-thinking team. Let’s talk about how I can contribute to building your next success story.
              </p>
            </div>

            <div className="grid gap-6">
              {contactOptions.map((opt, i) => (
                <motion.a
                  key={i}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 15 }}
                  className="flex items-center space-x-6 p-6 glass-card hover:border-primary-500/40 transition-all group"
                >
                  <div className={`w-14 h-14 ${opt.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <opt.icon className="text-2xl" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">{opt.label}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{opt.value}</span>
                  </div>
                  <FaArrowRight className="ml-auto text-gray-300 dark:text-gray-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card p-10 md:p-14 relative overflow-hidden">
              {/* Form Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-[80px]"></div>

              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-10">Send a Detailed Inquiry</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Full Name</label>
                    <input
                      type="text"
                      {...register('name', { required: true })}
                      className="w-full bg-gray-50 dark:bg-dark-800/50 border-2 border-transparent focus:border-primary-500/50 rounded-2xl p-4 text-gray-900 dark:text-white font-bold transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Email Address</label>
                    <input
                      type="email"
                      {...register('email', { required: true })}
                      className="w-full bg-gray-50 dark:bg-dark-800/50 border-2 border-transparent focus:border-primary-500/50 rounded-2xl p-4 text-gray-900 dark:text-white font-bold transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Subject</label>
                  <input
                    type="text"
                    {...register('subject', { required: true })}
                    className="w-full bg-gray-50 dark:bg-dark-800/50 border-2 border-transparent focus:border-primary-500/50 rounded-2xl p-4 text-gray-900 dark:text-white font-bold transition-all outline-none"
                    placeholder="Project Opportunity"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Your Message</label>
                  <textarea
                    rows={5}
                    {...register('message', { required: true })}
                    className="w-full bg-gray-50 dark:bg-dark-800/50 border-2 border-transparent focus:border-primary-500/50 rounded-2xl p-4 text-gray-900 dark:text-white font-bold transition-all outline-none resize-none"
                    placeholder="Describe your vision..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary !py-5 flex items-center justify-center space-x-3 text-lg"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span>Send Professional Inquiry</span>
                    </>
                  )}
                </button>
              </form>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-20 flex items-center justify-center p-10 bg-white dark:bg-dark-900 text-center"
                  >
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-xl">
                        <FaCheck />
                      </div>
                      <h4 className="text-3xl font-black text-gray-900 dark:text-white">Message Dispatched!</h4>
                      <p className="text-gray-500 dark:text-gray-400 font-bold">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
