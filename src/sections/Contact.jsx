import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import SectionWrapper from '../components/SectionWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const Contact = () => {
  return (
    <SectionWrapper id="contact" className="min-h-0 py-24 object-cover">
      <AnimatedHeading subtitle="Get in touch" title="Contact Me" />
      
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-2/3"
        >
          <GlassCard className="h-full">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="John Doe"
                  className="bg-transparent border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors hover:border-white/30" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="john@example.com"
                  className="bg-transparent border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors hover:border-white/30" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                <textarea 
                  id="message"
                  rows={5}
                  placeholder="Say hello!"
                  className="bg-transparent border border-glassBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors hover:border-white/30 resize-none" 
                />
              </div>

              <Button variant="primary" className="w-full mt-2">Send Message</Button>
            </form>
          </GlassCard>
        </motion.div>

        {/* Social Links & Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/3 flex flex-col gap-6"
        >
          <GlassCard className="h-full flex flex-col justify-center gap-8 py-10">
            <h3 className="text-2xl font-bold text-white mb-2 text-center md:text-left">Let's Connect</h3>
            
            <a href="https://github.com/nandini" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white group">
              <div className="w-12 h-12 rounded-full border border-glassBorder flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all duration-300 shadow-none group-hover:shadow-[0_0_15px_rgba(0,255,204,0.6)]">
                <FiGithub className="w-5 h-5" />
              </div>
              <span className="text-lg font-medium group-hover:text-primary transition-colors">GitHub</span>
            </a>

            <a href="https://linkedin.com/in/nandini" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white group">
              <div className="w-12 h-12 rounded-full border border-glassBorder flex items-center justify-center group-hover:bg-[#0077b5] group-hover:border-[#0077b5] group-hover:text-white transition-all duration-300 shadow-none group-hover:shadow-[0_0_15px_rgba(0,119,181,0.6)]">
                <FiLinkedin className="w-5 h-5" />
              </div>
              <span className="text-lg font-medium group-hover:text-[#0077b5] transition-colors">LinkedIn</span>
            </a>

            <a href="mailto:nandini@example.com" className="flex items-center gap-4 text-gray-300 hover:text-white group">
              <div className="w-12 h-12 rounded-full border border-glassBorder flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary group-hover:text-white transition-all duration-300 shadow-none group-hover:shadow-[0_0_15px_rgba(255,0,255,0.6)]">
                <FiMail className="w-5 h-5" />
              </div>
              <span className="text-lg font-medium group-hover:text-secondary transition-colors">Email</span>
            </a>
          </GlassCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
