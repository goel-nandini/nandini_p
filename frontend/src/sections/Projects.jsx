import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';

/* ─── Project Data ───────────────────────────────────────────── */
const projects = [
  {
    id: 0,
    icon: '🏥',
    title: 'MediFlow-AI',
    tagline: 'AI-driven healthcare ecosystem for intelligent triage.',
    desc: 'An intelligent healthcare platform featuring AI symptom triage, personalized care plans, and health analytics. Built with the MERN stack and integrated with Gemini/OpenAI for advanced medical insights.',
    tech: ['React', 'Node.js', 'MongoDB', 'OpenAI', 'Framer Motion'],
    gradFrom: '#FF4D4D',
    gradMid: '#F97316',
    gradTo: '#8B5CF6',
    glowColor: 'rgba(255,77,77,0.5)',
    live: '#',
    github: 'https://github.com/goel-nandini',
    featured: true,
  },
  {
    id: 1,
    icon: 'MAP',
    title: 'Mentor Map',
    tagline: 'Connecting students with the right mentors, instantly.',
    desc: 'Built responsive and accessible UI components with TailwindCSS, dynamically converting Figma designs into pixel‑perfect interfaces. Integrated REST APIs for real‑time mentor recommendations and discovery flows.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'REST APIs', 'Figma'],
    gradFrom: '#6C63FF',
    gradMid: '#8B5CF6',
    gradTo: '#06B6D4',
    glowColor: 'rgba(108,99,255,0.55)',
    live: '#',
    github: 'https://github.com/goel-nandini',
    featured: true,
  },
  {
    id: 2,
    icon: '🚀',
    title: 'TES-4.0',
    tagline: 'Modern web experience for a technical events platform.',
    desc: 'Developed and deployed TES v4, a fully responsive web application using modern frontend technologies, hosted on Vercel. Implemented clean UI design and optimised user experience with efficient component structure.',
    tech: ['React', 'JavaScript', 'TailwindCSS', 'Vercel', 'CI/CD'],
    gradFrom: '#00D4FF',
    gradMid: '#06B6D4',
    gradTo: '#6C63FF',
    glowColor: 'rgba(0,212,255,0.5)',
    live: '#',
    github: 'https://github.com/goel-nandini',
    featured: false,
  },
];

/* ─── Animated gradient angle (CSS custom property trick) ───── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── 3D Tilt + Cursor Glow Card ────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showSweep, setShowSweep] = useState(false);

  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
  const scale   = useSpring(1, { stiffness: 200, damping: 18 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const hw = rect.width / 2;
    const hh = rect.height / 2;

    rotateY.set(((cx - hw) / hw) * 10);
    rotateX.set(-((cy - hh) / hh) * 8);
    setCursor({ x: cx, y: cy });
  }, [rotateX, rotateY]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.03);
    setShowSweep(true);
    setTimeout(() => setShowSweep(false), 700);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      variants={cardVariants}
      className="proj-card-wrapper"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        className={`proj-card ${isHovered ? 'proj-card--hovered' : ''}`}
        style={{
          rotateX,
          rotateY,
          scale,
          '--glow': project.glowColor,
          '--grad-a': project.gradFrom,
          '--grad-b': project.gradMid,
          '--grad-c': project.gradTo,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id={`project-card-${index}`}
      >
        {/* Animated gradient border */}
        <div className="proj-border-glow" />

        {/* Cursor radial spotlight */}
        <div
          className="proj-spotlight"
          style={{
            background: `radial-gradient(500px circle at ${cursor.x}px ${cursor.y}px, ${project.glowColor}, transparent 55%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Light sweep on enter */}
        <div className={`proj-sweep ${showSweep ? 'proj-sweep--active' : ''}`} />

        {/* Card header banner */}
        <div
          className="proj-banner"
          style={{
            background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradMid}, ${project.gradTo})`,
          }}
        >
          {/* Noise overlay */}
          <div className="proj-banner-noise" />

          <motion.div
            className="proj-icon"
            animate={isHovered ? { rotate: [0, -10, 10, -5, 0], scale: [1, 1.25, 1.15, 1.2, 1.1] } : {}}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {project.icon}
          </motion.div>

          {project.featured && (
            <span className="proj-featured-badge">★ Featured</span>
          )}

          {/* Floating orbs */}
          <div className="proj-orb proj-orb-1" />
          <div className="proj-orb proj-orb-2" />
        </div>

        {/* Card body */}
        <div className="proj-body">
          <div className="proj-header-row">
            <h3 className="proj-title">{project.title}</h3>
            <span className="proj-number">0{index + 1}</span>
          </div>

          <p className="proj-tagline">{project.tagline}</p>

          <motion.p
            className="proj-desc"
            initial={{ opacity: 0, height: 0 }}
            animate={isHovered ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {project.desc}
          </motion.p>

          {/* Tech badges */}
          <div className="proj-badges">
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                className="proj-badge"
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.3 }}
                style={{
                  '--badge-glow': project.gradFrom,
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="proj-actions">
            <motion.a
              href={project.live}
              className="proj-btn proj-btn--primary"
              id={`proj-live-${index}`}
              onClick={(e) => e.preventDefault()}
              whileHover={{ scale: 1.05, boxShadow: `0 6px 30px ${project.glowColor}` }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradTo})`,
              }}
            >
              <span>View Project</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10"/>
              </svg>
            </motion.a>

            <motion.a
              href={project.github}
              className="proj-btn proj-btn--ghost"
              id={`proj-github-${index}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, borderColor: project.gradFrom, color: '#fff' }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Section Header ─────────────────────────────────────────── */
const SectionHeader = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="proj-section-header"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="proj-section-tag"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <span className="proj-tag-dot" />
        FEATURED WORK
      </motion.span>

      <h2 className="proj-section-title">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="proj-title-word"
        >
          Projects
        </motion.span>
        <motion.span
          className="proj-title-accent"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {' '}that Matter
        </motion.span>
      </h2>

      {/* Animated underline */}
      <motion.div
        className="proj-underline"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.p
        className="proj-section-sub"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Carefully crafted digital experiences — from idea to deployment.
      </motion.p>
    </motion.div>
  );
};

/* ─── Main Projects Section ──────────────────────────────────── */
const Projects = () => {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section className="section proj-section" id="projects">
      {/* Animated BG grid */}
      <div className="proj-bg-grid" aria-hidden="true" />
      <div className="proj-bg-orb proj-bg-orb-1" aria-hidden="true" />
      <div className="proj-bg-orb proj-bg-orb-2" aria-hidden="true" />

      <SectionHeader />

      <motion.div
        ref={gridRef}
        className="proj-grid"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </motion.div>

      {/* View all CTA */}
      <motion.div
        className="proj-view-all"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <motion.a
          href="https://github.com/goel-nandini"
          target="_blank"
          rel="noopener noreferrer"
          className="proj-view-all-btn"
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(108,99,255,0.45)' }}
          whileTap={{ scale: 0.97 }}
          id="proj-view-all"
        >
          <span>View All Projects</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Projects;
