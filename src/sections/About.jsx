import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import GlassCard from '../components/GlassCard';

const About = () => {
  return (
    <SectionWrapper id="about">
      <AnimatedHeading subtitle="Get to know me" title="About Me" />
      
      <div className="flex flex-col md:flex-row gap-8 items-center max-w-5xl mx-auto">
        {/* Profile Image Space */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/3 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full p-2 bg-gradient-to-br from-primary to-secondary group">
            <div className="w-full h-full rounded-full bg-background/80 glass-panel flex items-center justify-center overflow-hidden">
              <span className="text-gray-500 font-mono flex flex-col items-center">
                <svg className="w-16 h-16 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Image Placeholder
              </span>
            </div>
            {/* Glow effect behind image */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl -z-10 group-hover:bg-primary/40 transition-colors duration-500"></div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-2/3"
        >
          <GlassCard className="h-full flex flex-col justify-center space-y-6">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              Hello! I'm <span className="font-semibold text-white">Nandini</span>, a Computer Science (AI & ML) student at <span className="text-primary">ABES Engineering College</span> with experience in modern web development.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              I specialize in building responsive web applications using <span className="text-secondary font-semibold">React, Next.js, and TailwindCSS</span>, while also integrating robust backend APIs using <span className="text-primary font-semibold">Node.js</span>.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              My passion lies in crafting beautiful, dynamic user interfaces and solving complex problems with efficient, scalable code.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default About;
