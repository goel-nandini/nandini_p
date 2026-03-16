import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import SectionWrapper from '../components/SectionWrapper';
import ParticleBackground from '../components/ParticleBackground';

const rotatingTexts = [
  "React Developer",
  "AI-ML Student",
  "Hackathon Enthusiast"
];

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper id="home" className="flex-col !pt-0 justify-center h-screen relative overflow-hidden">
      <ParticleBackground />
      {/* Ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 mt-20">
        <GlassCard className="text-center py-12 md:py-20 flex flex-col items-center justify-center relative overflow-hidden">
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4"
          >
            Hi, I'm <span className="text-gradient-animate bg-gradient-to-r from-primary via-white to-secondary glow-text inline-block">Nandini</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl font-semibold text-gray-200 mb-2"
          >
            Frontend & Full Stack Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-xl text-secondary mb-8 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]"
          >
            Smart India Hackathon Winner
          </motion.p>

          {/* Rotating Text */}
          <div className="h-8 md:h-12 mb-10 overflow-hidden relative w-full flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={textIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-2xl font-mono text-gray-400 absolute w-full text-center"
              >
                &gt; <span className="text-white">{rotatingTexts[textIndex]}</span> <span className="animate-pulse text-primary font-bold">_</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
          >
            <Button variant="primary" className="px-8 w-full sm:w-auto">View Projects</Button>
            <Button variant="outline" className="px-8 w-full sm:w-auto">Download Resume</Button>
            <Button variant="ghost" className="px-8 border border-glassBorder hover:border-primary w-full sm:w-auto">Contact Me</Button>
          </motion.div>

        </GlassCard>
      </div>
    </SectionWrapper>
  );
};

export default Hero;
