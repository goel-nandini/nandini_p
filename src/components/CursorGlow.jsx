import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Spring animations for a smoother trailing effect
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfigCursor = { damping: 25, stiffness: 700, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfigCursor);
  const cursorYSpring = useSpring(cursorY, springConfigCursor);

  const springConfigRing = { damping: 30, stiffness: 200, mass: 0.8 };
  const ringXSpring = useSpring(ringX, springConfigRing);
  const ringYSpring = useSpring(ringY, springConfigRing);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 4); // 4 is half of dot width
      cursorY.set(e.clientY - 4);
      ringX.set(e.clientX - 16); // 16 is half of ring width
      ringY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  return (
    <div className="hidden md:block">
      {/* Inner Neon Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-[60] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          boxShadow: '0 0 10px 2px #00ffcc'
        }}
      />

      {/* Trailing Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full border border-primary z-[60] mix-blend-screen"
        style={{
          x: ringXSpring,
          y: ringYSpring,
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Giant underlying blurred aura */}
      <motion.div
        className="fixed top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] z-0 pointer-events-none"
        animate={{
          x: mousePosition.x - 144,
          y: mousePosition.y - 144,
        }}
        transition={{
          type: 'tween',
          ease: 'circOut',
          duration: 0.15,
        }}
      />
    </div>
  );
};

export default CursorGlow;
