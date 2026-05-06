import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.jpg';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLink = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src={logoImg} alt="Logo" className="navbar-logo-img" />
      </div>

      {/* Links */}
      <ul className={`navbar-links${open ? ' open' : ''}`}>
        {navLinks.map(link => (
          <li key={link.href}>
            <a href={link.href} onClick={(e) => handleLink(e, link.href)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="navbar-actions">
        {/* Theme toggle */}
        <button
          id="theme-toggle-btn"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Resume button - desktop */}
        <button
          className="btn btn-primary"
          style={{ display: 'none', fontSize: '13px', padding: '0.5rem 1.2rem' }}
          id="desktop-resume-btn"
          onClick={(e) => {
            e.preventDefault();
            navigate('/resume-download');
          }}
        >
          Resume
        </button>

        {/* Hamburger */}
        <button
          className="hamburger"
          id="hamburger-btn"
          onClick={() => setOpen(p => !p)}
          aria-label="Open menu"
        >
          <span style={{ transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
