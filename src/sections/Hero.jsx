import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Lazy load 3D background for performance
const Hero3D = React.lazy(() => import('../components/Hero3D'));

const roles = [
  'Full Stack Developer',
  'Problem Solver',
  'Tech Enthusiast'
];

const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), 60);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), 30);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx(r => (r + 1) % roles.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  // Mobile detection for 3D elements
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Interactive mouse tilt effect
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const childVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="hero-section" id="home" style={{ position: 'relative' }}>
      
      {/* 3D Animated Background - Lazy Loaded */}
      {!isMobile && (
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      )}

      {/* Ambient orbs mapped with framer emotion to add slight parallax */}
      <motion.div 
        className="hero-orb1"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="hero-orb2" 
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(108,99,255,0.1) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        pointerEvents: 'none',
        opacity: 0.7
      }} />

      {/* Interactive Glassmorphism Card Wrapper */}
      <motion.div 
        ref={cardRef}
        className="hero-content"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: isMobile ? "2rem 1.5rem" : "4rem",
          borderRadius: "32px",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          zIndex: 10
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <motion.p variants={childVariant} className="hero-greeting" style={{ translateZ: 20 }}>
            ✦ Welcome to my Portfolio
          </motion.p>

          <motion.h1 variants={childVariant} className="hero-name" style={{ translateZ: 40 }}>
            Hi, I'm <span className="grad">Nandini Goel</span>
          </motion.h1>

          <motion.p variants={childVariant} className="hero-subtitle" style={{ translateZ: 30 }}>
            Creative Developer · Problem Solver · Innovator
          </motion.p>

          <motion.div variants={childVariant} className="hero-typed-wrap" style={{ translateZ: 20, marginBottom: '1.5rem' }}>
            &gt;&nbsp;
            <span>{displayed}</span>
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              style={{
                display: 'inline-block',
                width: '3px',
                height: '1.1em',
                background: 'var(--grad-end)',
                marginLeft: '4px',
                verticalAlign: 'middle',
              }} 
            />
          </motion.div>

          <motion.div variants={childVariant} className="hero-buttons" style={{ translateZ: 50 }}>
            <motion.button 
              id="view-projects-btn" 
              className="btn btn-primary" 
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(108, 99, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects ↗
            </motion.button>
            <motion.button 
              id="contact-me-btn" 
              className="btn btn-outline" 
              onClick={scrollToContact}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(108, 99, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
            <motion.a
              id="download-resume-btn"
              className="btn btn-outline"
              href="/Nandini_Goel_Resume.pdf"
              download="Nandini_Goel_Resume.pdf"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(108, 99, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              ⬇ Download Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div 
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="arrow" />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
