import React, { useState, useEffect } from 'react';

const roles = [
  'React Developer',
  'AI / ML Enthusiast',
  'Hackathon Winner 🏆',
  'Problem Solver',
  'Creative Coder',
];

const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), 60);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), 35);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx(r => (r + 1) % roles.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="home">
      {/* Ambient orbs */}
      <div className="hero-orb1" />
      <div className="hero-orb2" />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(108,99,255,0.1) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        pointerEvents: 'none',
        opacity: 0.7
      }} />

      <div className="hero-content">
        <p className="hero-greeting" style={{ animationDelay: '0.1s' }}>
          ✦ Welcome to my Portfolio
        </p>

        <h1 className="hero-name" style={{ animation: 'fadeInUp 0.8s ease 0.2s both' }}>
          Hi, I'm <span className="grad">Nandini Goel</span>
        </h1>

        <p className="hero-subtitle" style={{ animation: 'fadeInUp 0.8s ease 0.4s both' }}>
          Creative Developer · Problem Solver · Innovator
        </p>

        {/* Typing animation */}
        <div className="hero-typed-wrap" style={{ animation: 'fadeInUp 0.8s ease 0.5s both' }}>
          &gt;&nbsp;
          <span>{displayed}</span>
          <span style={{
            display: 'inline-block',
            width: '2px',
            height: '1.1em',
            background: 'var(--grad-end)',
            marginLeft: '2px',
            verticalAlign: 'middle',
            animation: 'pulse 1s step-start infinite',
          }} />
        </div>

        {/* Buttons */}
        <div className="hero-buttons" style={{ animation: 'fadeInUp 0.8s ease 0.7s both' }}>
          <button id="view-projects-btn" className="btn btn-primary" onClick={scrollToProjects}>
            View Projects ↗
          </button>
          <button id="contact-me-btn" className="btn btn-outline" onClick={scrollToContact}>
            Contact Me
          </button>
          <a
            id="download-resume-btn"
            className="btn btn-outline"
            href="#"
            onClick={e => e.preventDefault()}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            ⬇ Download Resume
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint">
        <div className="arrow" />
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
