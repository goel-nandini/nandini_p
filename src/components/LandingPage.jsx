import React, { useState, useEffect } from 'react';

const words = ['Welcome', 'नमस्ते', 'Hola', 'Bonjour', 'こんにちは', '안녕하세요'];

const LandingPage = ({ onEnter }) => {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx(prev => (prev + 1) % words.length);
        setVisible(true);
      }, 300);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page" style={{ background: 'var(--bg)' }}>
      {/* Background orbs */}
      <div className="landing-orb1" />
      <div className="landing-orb2" />
      <div className="landing-orb3" />
      <div className="landing-bg" />

      {/* Particle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(108,99,255,0.15) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.6
      }} />

      <div className="landing-content">
        {/* Rotating welcome word */}
        <div className="welcome-text">
          {visible && (
            <span className="welcome-word">{words[wordIdx]}</span>
          )}
        </div>

        {/* Main headline */}
        <h1 className="landing-title">
          Hi, I'm <span className="grad-text">Nandini</span>
        </h1>

        <p className="landing-subtitle">
          Creative Developer · Problem Solver · Innovator
        </p>

        {/* Divider */}
        <div style={{ width: 60, height: 3, background: 'var(--gradient)', borderRadius: 2, margin: '0.25rem 0' }} />

        {/* CTA Button */}
        <button
          id="enter-portfolio-btn"
          className="btn btn-enter"
          onClick={onEnter}
          style={{ marginTop: '0.5rem' }}
        >
          Enter Portfolio ✦
        </button>

        {/* Scroll hint text */}
        <p style={{
          fontSize: 'var(--fs-small)',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-secondary)',
          marginTop: '0.5rem',
          opacity: 0.7
        }}>
          React · Vite · Premium UI
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
