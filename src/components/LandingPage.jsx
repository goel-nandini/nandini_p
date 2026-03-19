import React from 'react';
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";

const LandingPage = ({ onEnter }) => {
  return (
    <div className="landing-page" style={{ background: 'var(--bg)' }}>
      {/* Background orbs for minimal ambiance */}
      <motion.div 
        className="landing-orb1"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="landing-orb2" 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Minimal subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(var(--text-secondary) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        opacity: 0.1
      }} />

      <div className="landing-content" style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, color: 'var(--text-primary)', height: '120px', display: 'flex', alignItems: 'center' }}
        >
          <ReactTyped
            strings={[
              "Welcome", 
              "नमस्ते", 
              "Hola", 
              "Bonjour", 
              "こんにちは", 
              "안녕하세요",
              "Ciao",
              "Willkommen"
            ]}
            typeSpeed={80}
            backSpeed={50}
            backDelay={1500}
            loop
            className="grad-text"
            style={{ 
              background: 'var(--gradient)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(108,99,255,0.3))'
            }}
          />
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          id="enter-portfolio-btn"
          className="btn btn-enter"
          onClick={onEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '1.2rem 3rem',
            fontSize: '1.2rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            borderRadius: '50px',
            fontFamily: 'var(--font-secondary)'
          }}
        >
          Enter Portfolio
        </motion.button>
      </div>
    </div>
  );
};

export default LandingPage;
