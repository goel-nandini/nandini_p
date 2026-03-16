import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-glassBorder mt-24 py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-400 font-medium mb-2">
          &copy; {new Date().getFullYear()} Nandini. All rights reserved.
        </p>
        <p className="text-gray-500 text-sm">
          Built with <span className="text-[#61DAFB] font-semibold">React</span> and <span className="text-[#38B2AC] font-semibold">TailwindCSS</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
