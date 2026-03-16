import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import SectionWrapper from './components/SectionWrapper';
import AnimatedHeading from './components/AnimatedHeading';
import GlassCard from './components/GlassCard';
import Button from './components/Button';
import LandingPage from './components/LandingPage';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="animated-bg min-h-screen relative text-white antialiased selection:bg-primary selection:text-black">
      <CursorGlow />
      <ScrollProgress />
      
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <LandingPage key="landing" onEnter={() => setHasEntered(true)} />
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full relative min-h-screen"
          >
            <Navbar />

            <main className="relative z-10 pt-20">
              <Hero />

              <About />
              <Skills />
              <Experience />
              <Projects />
              <Achievements />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
