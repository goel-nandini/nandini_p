import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, animate } from 'framer-motion';
import aboutImg from '../assets/about.jpeg';

/* ─── Floating decorative icons ─────────────────────────────── */
const FLOATERS = [
  { icon: '⚛️', top: '-18px', left: '-10px',  delay: 0,   dur: 3.2 },
  { icon: '🤖', top: '10px',  right: '-18px', delay: 0.8, dur: 4.0 },
  { icon: '✨', bottom: '0px',  left: '-20px', delay: 1.4, dur: 3.6 },
  { icon: '💻', bottom: '-14px',right: '-6px', delay: 0.4, dur: 4.4 },
  { icon: '🚀', top: '42%',   left: '-30px',  delay: 1.0, dur: 5.0 },
];

/* ─── Cycling keywords ───────────────────────────────────────── */
const ROLES = ['Full Stack Developer', 'AI / ML Enthusiast', 'UI Craftsperson', 'Hackathon Winner'];

/* ─── Tabs ───────────────────────────────────────────────────── */
const TABS = [
  {
    label: 'Developer',
    icon: '⚙️',
    text: 'I architect clean, scalable web applications from pixel-perfect frontends to robust backend APIs. I thrive on turning complex requirements into elegant code.',
  },
  {
    label: 'Designer',
    icon: '🎨',
    text: 'I obsess over every visual detail — typography, spacing, micro-interactions, and motion design — creating interfaces that feel premium and intentional.',
  },
  {
    label: 'Learner',
    icon: '📚',
    text: `From competitive hackathons to self-driven projects, I'm constantly pushing into new domains — AI/ML, systems design, open-source, and beyond.`,
  },
];

/* ─── Stats ──────────────────────────────────────────────────── */
const STATS = [
  { icon: '🏆', num: 10, suffix: '+', label: 'Projects Built' },
  { icon: '⚡', num: 3,  suffix: '+', label: 'Hackathons Won' },
  { icon: '📅', num: 2,  suffix: '+', label: 'Years Coding'   },
];

/* ─── Count-up hook ──────────────────────────────────────────── */
function useCountUp(target, inView) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) { setVal(Math.floor(v)); },
    });
    return controls.stop;
  }, [inView, target]);
  return val;
}

/* ─── Stat Card ──────────────────────────────────────────────── */
const StatCard = ({ stat, inView, delay }) => {
  const count = useCountUp(stat.num, inView);
  return (
    <motion.div
      className="ab-stat-card"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.06 }}
    >
      <span className="ab-stat-icon">{stat.icon}</span>
      <span className="ab-stat-num">
        {count}{stat.suffix}
      </span>
      <span className="ab-stat-label">{stat.label}</span>
    </motion.div>
  );
};

/* ─── Cycling Role Text ──────────────────────────────────────── */
const CyclingRole = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="ab-role-cycle-wrap" aria-live="polite">
      <motion.span
        key={idx}
        className="ab-role-cycle"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {ROLES[idx]}
      </motion.span>
    </div>
  );
};

/* ─── Visual Card (Left) ─────────────────────────────────────── */
const VisualCard = () => {
  const cardRef = useRef(null);
  const rotateX = useSpring(0, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 18 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    rotateX.set(-(cy / rect.height) * 14);
    rotateY.set((cx / rect.width) * 14);
  }, [rotateX, rotateY]);

  const handleMouseLeave = () => { rotateX.set(0); rotateY.set(0); };

  return (
    <motion.div
      className="ab-visual-wrap"
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow orbs behind card */}
      <div className="ab-glow-orb ab-glow-orb-1" />
      <div className="ab-glow-orb ab-glow-orb-2" />

      {/* 3D tilt card */}
      <motion.div
        ref={cardRef}
        className="ab-profile-card"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Animated gradient border */}
        <div className="ab-card-border" />

        {/* Avatar */}
        <div className="ab-avatar-wrap">
          <img
            src={aboutImg}
            alt="Nandini Goel"
            className="ab-avatar-img"
          />
          {/* Inner glow ring */}
          <div className="ab-avatar-ring" />
        </div>

        {/* Name badge */}
        <div className="ab-name-badge">
          <span className="ab-name-badge-dot" />
          <span>Nandini Goel</span>
        </div>

        {/* Floating decorative icons */}
        {FLOATERS.map((f, i) => (
          <motion.span
            key={i}
            className="ab-floater"
            style={{ top: f.top, left: f.left, right: f.right, bottom: f.bottom }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut', delay: f.delay }}
          >
            {f.icon}
          </motion.span>
        ))}

        {/* Corner sparkle */}
        <motion.div
          className="ab-sparkle"
          animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Location chip */}
      <motion.div
        className="ab-location-chip"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <span>📍</span>
        <span>Ghaziabad, India</span>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main About Section ─────────────────────────────────────── */
const About = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });
  const [activeTab, setActiveTab] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section className="section ab-section" id="about" ref={sectionRef}>
      {/* Parallax background */}
      <motion.div className="ab-bg-parallax" style={{ y: bgY }} />
      <div className="ab-bg-grid" />
      <div className="ab-bg-radial" />

      <div className="ab-inner">
        {/* ── LEFT: Visual ─────────────────────── */}
        <VisualCard />

        {/* ── RIGHT: Content ───────────────────── */}
        <motion.div
          className="ab-content"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Section label */}
          <motion.span
            className="ab-label"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="ab-label-dot" />
            ABOUT ME
          </motion.span>

          {/* Main heading */}
          <motion.h2
            className="ab-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Who I <span className="ab-heading-accent">Am</span>
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            className="ab-heading-line"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.38, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Cycling role */}
          <CyclingRole />

          {/* Bio paragraphs */}
          <div className="ab-bio">
            {[
              <>I'm a passionate developer from India pursuing B.Tech in Computer Science <em className="ab-em">(AIML)</em> at ABES Engineering College — building elegant, <em className="ab-em">high-performance</em> web applications while exploring the frontiers of <em className="ab-em">Artificial Intelligence</em>.</>,
              <>I love transforming complex problems into simple, intuitive solutions. From platforms like <em className="ab-em">Mentor Map</em> &amp; <em className="ab-em">TES-4.0</em> to winning the <em className="ab-em">Smart India Hackathon 2024</em>, I strive to create measurable <em className="ab-em">impact</em> through technology.</>,
              <>When I'm not coding, I'm sketching UI concepts, deep-diving into new frameworks, or competing in hackathons where I thrive under <em className="ab-em">pressure</em>.</>,
            ].map((para, i) => (
              <motion.p
                key={i}
                className="ab-para"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.12, duration: 0.55 }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Interactive Tabs */}
          <div className="ab-tabs">
            {TABS.map((tab, i) => (
              <motion.button
                key={tab.label}
                className={`ab-tab ${activeTab === i ? 'ab-tab--active' : ''}`}
                onClick={() => setActiveTab(i)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                id={`about-tab-${i}`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            className="ab-tab-content"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
          >
            {TABS[activeTab].text}
          </motion.div>

          {/* Stats */}
          <div className="ab-stats" ref={statsRef}>
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} inView={statsInView} delay={0.1 + i * 0.12} />
            ))}
          </div>

          {/* CTAs */}
          <div className="ab-ctas">
            <motion.button
              className="ab-btn ab-btn--primary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(108,99,255,0.65)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              id="about-view-projects"
            >
              <span>View Projects</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            <motion.a
              href="#"
              className="ab-btn ab-btn--glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={e => e.preventDefault()}
              id="about-download-cv"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              <span>Download CV</span>
            </motion.a>

            {/* Social icons */}
            <div className="ab-socials">
              {[
                { href: 'https://github.com/goel-nandini', title: 'GitHub', svg: <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="currentColor" /> },
                { href: 'https://linkedin.com', title: 'LinkedIn', svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor" /> },
                { href: 'mailto:nandini@example.com', title: 'Email', svg: <><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="2" /></> },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  title={s.title}
                  className="ab-social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  id={`about-social-${i}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">{s.svg}</svg>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
