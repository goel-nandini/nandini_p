import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Designed & Built with ♥ by <span>Nandini Goel</span> · {new Date().getFullYear()}
      </p>
      <p style={{ marginTop: '0.4rem', opacity: 0.6, fontSize: '12px' }}>
        React · Vite · Pure CSS · No heavy frameworks
      </p>
    </footer>
  );
};

export default Footer;
