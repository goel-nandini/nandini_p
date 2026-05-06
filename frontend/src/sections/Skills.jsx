import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ─── Skill Data ─────────────────────────────────────────────── */
const CATEGORIES = [
  { key: 'Languages',         emoji: '{ }' },
  { key: 'Frontend',          emoji: '🎨' },
  { key: 'Backend',           emoji: '⚙️' },
  { key: 'Databases & DevOps',emoji: '🗄️' },
  { key: 'Tools',             emoji: '🔧' },
];

const SKILLS = {
  Languages: [
    {
      name: 'Python',
      icon: '🐍',
      color: '#3776AB',
      level: 'Advanced',
      desc: 'Backend APIs, automation scripts, and ML model pipelines.',
      tags: ['APIs', 'ML / AI', 'Automation'],
      projects: ['Mentor Map backend', 'SIH 2024 AI module'],
    },
    {
      name: 'JavaScript',
      icon: 'JS',
      color: '#F7DF1E',
      level: 'Advanced',
      desc: 'Full-stack development, browser-side logic, and Node runtimes.',
      tags: ['Web', 'Node.js', 'DOM APIs'],
      projects: ['TES-4.0', 'Mentor Map UI', 'Portfolio'],
    },
    {
      name: 'TypeScript',
      icon: 'TS',
      color: '#3178C6',
      level: 'Intermediate',
      desc: 'Type-safe React components, interfaces, and API contracts.',
      tags: ['Type Safety', 'React', 'Refactoring'],
      projects: ['Mentor Map (frontend)'],
    },
    {
      name: 'C++',
      icon: '＋＋',
      color: '#00599C',
      level: 'Intermediate',
      desc: 'DSA problem-solving and competitive programming.',
      tags: ['DSA', 'Competitive', 'OOP'],
      projects: ['LeetCode 300+', 'SIH Algorithm'],
    },
    {
      name: 'C',
      icon: 'C',
      color: '#A8B9CC',
      level: 'Familiar',
      desc: 'Systems programming fundamentals and OS coursework.',
      tags: ['Systems', 'OS', 'Pointers'],
      projects: ['OS Lab Projects'],
    },
  ],
  Frontend: [
    {
      name: 'React.js',
      icon: '⚛',
      color: '#61DAFB',
      level: 'Advanced',
      desc: 'Component architecture, hooks, context, and performance optimization.',
      tags: ['SPA', 'Hooks', 'State Mgmt'],
      projects: ['TES-4.0', 'Mentor Map', 'Portfolio'],
    },
    {
      name: 'Next.js',
      icon: '▲',
      color: '#FFFFFF',
      level: 'Intermediate',
      desc: 'SSR, SSG, API routes, and edge-ready web apps.',
      tags: ['SSR', 'SSG', 'Full-Stack'],
      projects: ['Ongoing projects'],
    },
    {
      name: 'Tailwind CSS',
      icon: '🌊',
      color: '#06B6D4',
      level: 'Advanced',
      desc: 'Utility-first responsive design with custom design systems.',
      tags: ['Responsive', 'Design Systems', 'Theming'],
      projects: ['All React projects'],
    },
    {
      name: 'HTML & CSS',
      icon: '🌐',
      color: '#E34F26',
      level: 'Advanced',
      desc: 'Semantic HTML5, CSS Grid/Flexbox, animations, and accessibility.',
      tags: ['Semantic', 'A11y', 'Animations'],
      projects: ['Every web project'],
    },
    {
      name: 'Redux',
      icon: '🔄',
      color: '#764ABC',
      level: 'Intermediate',
      desc: 'Global state management with slices, thunks, and selectors.',
      tags: ['State', 'Async', 'DevTools'],
      projects: ['Mentor Map'],
    },
    {
      name: 'Framer Motion',
      icon: '✦',
      color: '#BB4B96',
      level: 'Intermediate',
      desc: 'Declarative animations, gestures, and layout transitions.',
      tags: ['Animation', 'Gestures', 'UI Polish'],
      projects: ['Portfolio', 'TES-4.0'],
    },
  ],
  Backend: [
    {
      name: 'Node.js',
      icon: '🟢',
      color: '#339933',
      level: 'Intermediate',
      desc: 'Event-driven servers, REST APIs, middleware pipelines.',
      tags: ['REST', 'Event Loop', 'Middleware'],
      projects: ['Mentor Map API', 'SIH backend'],
    },
    {
      name: 'Express.js',
      icon: 'Ex',
      color: '#CCCCCC',
      level: 'Intermediate',
      desc: 'Routing, auth middleware, error handling, and MVC patterns.',
      tags: ['Routing', 'MVC', 'Auth'],
      projects: ['Mentor Map', 'API projects'],
    },
    {
      name: 'REST APIs',
      icon: '🔌',
      color: '#6C63FF',
      level: 'Advanced',
      desc: 'Designing and consuming RESTful APIs with proper HTTP contracts.',
      tags: ['CRUD', 'Auth', 'Pagination'],
      projects: ['All full-stack apps'],
    },
    {
      name: 'GraphQL',
      icon: '◈',
      color: '#E10098',
      level: 'Familiar',
      desc: 'Schema-first queries, mutations, and client integration.',
      tags: ['Queries', 'Schema', 'Apollo'],
      projects: ['Exploring'],
    },
  ],
  'Databases & DevOps': [
    {
      name: 'MongoDB',
      icon: '🍃',
      color: '#47A248',
      level: 'Intermediate',
      desc: 'Document modeling, aggregation pipelines, and Atlas cloud.',
      tags: ['NoSQL', 'Aggregation', 'Atlas'],
      projects: ['Mentor Map', 'SIH'],
    },
    {
      name: 'PostgreSQL',
      icon: '🐘',
      color: '#4169E1',
      level: 'Intermediate',
      desc: 'Relational schemas, joins, indexing, and SQL queries.',
      tags: ['SQL', 'Indexing', 'Relations'],
      projects: ['DevDash', 'Coursework'],
    },
    {
      name: 'Firebase',
      icon: '🔥',
      color: '#FFCA28',
      level: 'Intermediate',
      desc: 'Auth, Firestore real-time data, and hosting.',
      tags: ['Auth', 'Real-time', 'Hosting'],
      projects: ['Hackathon projects'],
    },
    {
      name: 'Docker',
      icon: '🐳',
      color: '#2496ED',
      level: 'Familiar',
      desc: 'Containerizing apps, writing Dockerfiles, multi-service compose.',
      tags: ['Containers', 'DevOps', 'CI'],
      projects: ['SIH deployment'],
    },
    {
      name: 'AWS / GCP',
      icon: '☁️',
      color: '#FF9900',
      level: 'Familiar',
      desc: 'Cloud deployments, storage buckets, and serverless functions.',
      tags: ['Cloud', 'S3', 'Functions'],
      projects: ['Portfolio hosting', 'SIH'],
    },
  ],
  Tools: [
    {
      name: 'Git & GitHub',
      icon: '🐙',
      color: '#F05032',
      level: 'Advanced',
      desc: 'Version control, branching, PR workflows, and open-source contributions.',
      tags: ['VCS', 'Collaboration', 'CI/CD'],
      projects: ['All projects'],
    },
    {
      name: 'Figma',
      icon: '🎭',
      color: '#A259FF',
      level: 'Intermediate',
      desc: 'UI wireframing, design to code handoff, component libraries.',
      tags: ['Design', 'Handoff', 'Prototyping'],
      projects: ['Mentor Map UI', 'Portfolio mockups'],
    },
    {
      name: 'Linux',
      icon: '🐧',
      color: '#FCC624',
      level: 'Intermediate',
      desc: 'Terminal fluency, shell scripting, and server administration.',
      tags: ['Shell', 'SSH', 'Scripting'],
      projects: ['Dev environment'],
    },
    {
      name: 'Vercel',
      icon: '▲',
      color: '#FFFFFF',
      level: 'Intermediate',
      desc: 'Instant deployments, preview URLs, and edge functions.',
      tags: ['Deployment', 'Edge', 'CI/CD'],
      projects: ['TES-4.0', 'Portfolio'],
    },
  ],
};

const EXPLORING = [
  { name: 'AI Agents',       icon: '🤖', badge: 'Learning',  color: '#8B5CF6' },
  { name: 'Web3 / Solidity', icon: '⛓️', badge: 'Exploring', color: '#F59E0B' },
  { name: 'Rust',            icon: '🦀', badge: 'Exploring', color: '#CE422B' },
  { name: 'LangChain',       icon: '🔗', badge: 'Learning',  color: '#10B981' },
];

const LEVEL_CONFIG = {
  Advanced:     { color: '#22C55E', bg: 'rgba(34,197,94,0.12)',    border: 'rgba(34,197,94,0.3)'    },
  Intermediate: { color: '#6C63FF', bg: 'rgba(108,99,255,0.12)',   border: 'rgba(108,99,255,0.3)'   },
  Familiar:     { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',   border: 'rgba(245,158,11,0.3)'   },
};

/* ─── Skill Card ─────────────────────────────────────────────── */
const SkillCard = ({ skill, index }) => {
  const [hovered, setHovered] = useState(false);
  const lvl = LEVEL_CONFIG[skill.level];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      {/* Neon Glow Layer (Behind) */}
      <div 
        className="absolute -inset-0.5 rounded-[22px] opacity-0 blur-xl transition-all duration-500 group-hover:opacity-30 pointer-events-none animate-gradient-slow"
        style={{
          background: `linear-gradient(135deg, ${skill.color}, #00D4FF, #8B5CF6)`,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Animated Gradient Border Layer */}
      <div 
        className="absolute -inset-0.5 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-gradient-slow"
        style={{
          background: `linear-gradient(135deg, ${skill.color}, #00D4FF, #8B5CF6)`,
          backgroundSize: '200% 200%',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1.5px',
        }}
      />

      {/* Main Content Card (The original sk-card format) */}
      <div className="sk-card transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.01] group-hover:shadow-2xl">
        
        {/* Header */}
        <div className="sk-card-header">
          <motion.div 
            className="sk-icon"
            style={{
              background: `linear-gradient(135deg, ${skill.color}22, ${skill.color}44)`,
              border: `1px solid ${skill.color}44`,
              color: skill.color,
            }}
            animate={hovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
          >
            <span className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_var(--glow)]" style={{ '--glow': skill.color }}>
              {skill.icon}
            </span>
          </motion.div>

          <div className="sk-name-wrap">
            <span className="sk-name">{skill.name}</span>
            <span
              className="sk-level"
              style={{ color: lvl.color, background: lvl.bg, borderColor: lvl.border }}
            >
              {skill.level}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="sk-desc">
          {skill.desc}
        </p>

        {/* Tags */}
        <div className="sk-tags">
          {skill.tags.map(tag => (
            <span key={tag} className="sk-tag" style={{ '--sk-color': skill.color }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Hover reveal: projects */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="sk-projects"
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 6, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <span className="sk-projects-label">🔗 Used in:</span>
              <div className="sk-projects-list">
                {skill.projects.map(p => (
                  <span key={p} className="sk-project-pill">{p}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="sk-bar-wrap">
          <motion.div
            className="sk-bar"
            initial={{ width: 0 }}
            whileInView={{ width: skill.level === 'Advanced' ? '90%' : skill.level === 'Intermediate' ? '65%' : '40%' }}
            viewport={{ once: true }}
            style={{
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Exploring Card ─────────────────────────────────────────── */
const ExploreCard = ({ item, index }) => (
  <motion.div
    className="sk-explore-card"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -5, scale: 1.04 }}
    style={{ '--exp-color': item.color }}
  >
    <span className="sk-explore-icon">{item.icon}</span>
    <span className="sk-explore-name">{item.name}</span>
    <span className={`sk-explore-badge ${item.badge === 'Learning' ? 'sk-explore-badge--learning' : 'sk-explore-badge--exploring'}`}>
      {item.badge === 'Learning' ? '📖' : '🔭'} {item.badge}
    </span>
  </motion.div>
);

/* ─── Main Skills Section ────────────────────────────────────── */
const Skills = () => {
  const [activeTab, setActiveTab] = useState('Languages');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  const currentSkills = SKILLS[activeTab] || [];

  return (
    <section className="section sk-section" id="skills">
      {/* BG */}
      <div className="sk-bg-grid" />
      <div className="sk-bg-orb sk-bg-orb-1" />
      <div className="sk-bg-orb sk-bg-orb-2" />

      {/* Header */}
      <motion.div
        ref={headerRef}
        className="sk-header"
        initial={{ opacity: 0, y: 36 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="sk-label"
          initial={{ opacity: 0, x: -18 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <span className="sk-label-dot" />
          MY SKILLS
        </motion.span>

        <motion.h2
          className="sk-title"
          initial={{ opacity: 0, y: 22 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Technical <span className="sk-title-accent">Arsenal</span>
        </motion.h2>

        <motion.div
          className="sk-title-line"
          initial={{ scaleX: 0, originX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.38, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          className="sk-subtitle"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          A practical overview of the tools and technologies I use to build real-world products.
        </motion.p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        className="sk-tabs"
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat.key}
            className={`sk-tab ${activeTab === cat.key ? 'sk-tab--active' : ''}`}
            onClick={() => setActiveTab(cat.key)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            id={`skills-tab-${cat.key.toLowerCase().replace(/[^a-z]/g, '')}`}
          >
            <span className="sk-tab-emoji">{cat.emoji}</span>
            <span>{cat.key}</span>
            {activeTab === cat.key && (
              <motion.div
                className="sk-tab-indicator"
                layoutId="sk-tab-indicator"
                transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Skill Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="sk-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {currentSkills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Divider */}
      <div className="sk-divider">
        <div className="sk-divider-line" />
        <span className="sk-divider-text">Currently Exploring</span>
        <div className="sk-divider-line" />
      </div>

      {/* Exploring Grid */}
      <div className="sk-explore-grid">
        {EXPLORING.map((item, i) => (
          <ExploreCard key={item.name} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
