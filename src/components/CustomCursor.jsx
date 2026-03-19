import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Mouse coordinates mapped to springs for smooth trailing
  const cursorX = useSpring(-100, { damping: 25, stiffness: 700, mass: 0.5 });
  const cursorY = useSpring(-100, { damping: 25, stiffness: 700, mass: 0.5 });

  const trailingX = useSpring(-100, { damping: 20, stiffness: 300, mass: 0.8 });
  const trailingY = useSpring(-100, { damping: 20, stiffness: 300, mass: 0.8 });

  useEffect(() => {
    // Hide on mobile or touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsHidden(true);
      return;
    }

    const mouseMove = (e) => {
      cursorX.set(e.clientX - 4); // center dot (8px)
      cursorY.set(e.clientY - 4);
      trailingX.set(e.clientX - 22); // center ring (44px)
      trailingY.set(e.clientY - 22);
    };

    const mouseEnter = () => setIsHidden(false);
    const mouseLeave = () => setIsHidden(true);
    
    // Add hover effect to all interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseenter', mouseEnter);
    window.addEventListener('mouseleave', mouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseenter', mouseEnter);
      window.removeEventListener('mouseleave', mouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, trailingX, trailingY]);

  if (isHidden) return null;

  return (
    <>
      {/* Small fast dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: 8,
          height: 8,
          background: 'var(--accent)',
          boxShadow: '0 0 10px var(--accent)',
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Smooth trailing ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99998] rounded-full border-2 mix-blend-difference"
        style={{
          x: trailingX,
          y: trailingY,
          width: 44,
          height: 44,
          borderColor: 'var(--grad-end)',
          backdropFilter: 'blur(2px)',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          borderColor: isHovered ? 'var(--accent)' : 'var(--grad-end)',
          backgroundColor: isHovered ? 'rgba(255, 107, 107, 0.1)' : 'rgba(0, 212, 255, 0.05)',
          boxShadow: isHovered ? '0 0 20px rgba(255, 107, 107, 0.3)' : '0 0 10px rgba(0, 212, 255, 0.1)'
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </>
  );
};

export default CustomCursor;
