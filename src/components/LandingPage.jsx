import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const greetings = [
  "Welcome",
  "नमस्ते",
  "Hola",
  "Bonjour",
  "こんにちは",
  "안녕하세요",
  "Hello World"
];

import ParticleBackground from './ParticleBackground';

const TypewriterText = () => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = greetings[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % greetings.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight h-24 flex items-center justify-center">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary">
        {text}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[3px] md:w-[4px] h-10 md:h-16 bg-primary ml-2 rounded shadow-[0_0_10px_#00ffcc]"
      />
    </h1>
  );
};

const LandingPage = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col justify-center items-center animated-bg"
    >
      <ParticleBackground />
      
      <div className="relative z-10 flex flex-col items-center gap-12">
        <TypewriterText />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Button variant="primary" onClick={onEnter} className="text-lg px-10 py-4 uppercase tracking-widest text-sm">
            Enter Portfolio
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
