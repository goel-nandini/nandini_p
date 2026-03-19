import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className="section" id="about" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background Blobs */}
      <motion.div
        style={{
          position: 'absolute', top: '10%', left: '-5%', width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)', y: blob1Y
        }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        style={{
          position: 'absolute', bottom: '10%', right: '-5%', width: 350, height: 350,
          background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)', y: blob2Y
        }}
        animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <p className="section-tag">— About Me</p>
        <h2 className="section-title">Who I Am</h2>
        <div className="section-divider" />
      </motion.div>

      <div className="about-grid" style={{ position: 'relative', zIndex: 2 }}>
        {/* Interactive 3D Avatar/Card */}
        <motion.div
          className="about-img-wrap"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="about-img-ring"
            whileHover={{ scale: 1.05, rotateY: 15, rotateX: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ perspective: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="about-avatar-placeholder" style={{ 
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              zIndex: 3
            }}>
              N
            </div>
            {/* 3D floating subtle particles around avatar */}
            <motion.div style={{ position: 'absolute', top: -20, left: 20, fontSize: '2rem' }} animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>✨</motion.div>
            <motion.div style={{ position: 'absolute', bottom: 10, right: -10, fontSize: '1.5rem' }} animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>💻</motion.div>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 whileHover={{ x: 5, color: 'var(--grad-end)' }} transition={{ duration: 0.2 }}>
            Nandini Goel — Full Stack Developer & AI/ML Enthusiast
          </motion.h3>
          <p>
            I'm a passionate developer from India, currently pursuing my B.Tech in Computer Science (AIML) at ABES Engineering College. I have a deep interest in building elegant, high-performance web applications and exploring the frontiers of Artificial Intelligence.
          </p>
          <p>
            I love transforming complex problems into simple, beautiful, and intuitive solutions. From developing platforms like Mentor Map and TES-4.0 to winning the Smart India Hackathon 2024, I constantly strive to make a measurable impact through technology.
          </p>
          <p>
            When I'm not coding, you'll find me sketching designs, exploring new frameworks, or participating in competitive hackathons where I thrive under pressure.
          </p>

          {/* Stats */}
          <div className="about-stats" style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { num: '10+', label: 'Projects' },
              { num: '3+', label: 'Hackathons' },
              { num: '2+', label: 'Years Coding' }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="about-stat"
                whileHover={{ y: -5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="about-stat-num">{stat.num}</span>
                <span className="about-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary" 
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </motion.button>
            <motion.a 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="btn btn-outline" 
              onClick={e => e.preventDefault()}
            >
              ⬇ Download CV
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
