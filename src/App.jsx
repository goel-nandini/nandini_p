import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Achievements from './sections/Achievements';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [entered, setEntered] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (loading) return <LoadingScreen />;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative' }}>
      <CustomCursor />
      <ScrollProgress />

      {!entered ? (
        <LandingPage onEnter={() => setEntered(true)} />
      ) : (
        <div>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Education />
            <Achievements />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
