import React, { useEffect, useRef, useState } from 'react';

const skillsData = {
  'Frontend': [
    { name: 'React.js', pct: 88 },
    { name: 'HTML & CSS', pct: 95 },
    { name: 'JavaScript', pct: 85 },
    { name: 'Tailwind CSS', pct: 80 },
    { name: 'TypeScript', pct: 70 },
    { name: 'Next.js', pct: 72 },
  ],
  'Backend': [
    { name: 'Node.js', pct: 75 },
    { name: 'Express.js', pct: 73 },
    { name: 'Python', pct: 82 },
    { name: 'REST APIs', pct: 80 },
    { name: 'MongoDB', pct: 70 },
    { name: 'SQL', pct: 68 },
  ],
  'AI / ML': [
    { name: 'Machine Learning', pct: 75 },
    { name: 'TensorFlow', pct: 65 },
    { name: 'Scikit-learn', pct: 72 },
    { name: 'Data Analysis', pct: 78 },
    { name: 'NLP', pct: 62 },
    { name: 'Computer Vision', pct: 60 },
  ],
  'Tools': [
    { name: 'Git & GitHub', pct: 90 },
    { name: 'VS Code', pct: 95 },
    { name: 'Figma', pct: 72 },
    { name: 'Docker', pct: 58 },
    { name: 'Linux', pct: 68 },
    { name: 'Postman', pct: 80 },
  ],
};

const CIRCUMFERENCE = 2 * Math.PI * 40; // r=40

const SkillCircle = ({ name, pct, animate }) => {
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
  const gradId = `grad-${name.replace(/[^a-z0-9]/gi, '')}`;

  return (
    <div className="skill-item">
      <div className="skill-circle-wrap">
        <svg className="skill-circle-svg" viewBox="0 0 100 100">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--grad-start)" />
              <stop offset="100%" stopColor="var(--grad-end)" />
            </linearGradient>
          </defs>
          <circle className="skill-circle-bg" cx="50" cy="50" r="40" />
          <circle
            className="skill-circle-prog"
            cx="50" cy="50" r="40"
            stroke={`url(#${gradId})`}
            style={{
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: animate ? offset : CIRCUMFERENCE,
              transition: 'stroke-dashoffset 1.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>
        <div className="skill-percent">{pct}%</div>
      </div>
      <span className="skill-name">{name}</span>
    </div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('Frontend');
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          entries[0].target.querySelectorAll('.fade-in-up').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Re-trigger animation on tab change
  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, [activeTab]);

  return (
    <section
      className="section"
      id="skills"
      ref={sectionRef}
      style={{ background: 'var(--bg)' }}
    >
      <div className="fade-in-up">
        <p className="section-tag">— My Skills</p>
        <h2 className="section-title">Technical Arsenal</h2>
        <div className="section-divider" />
      </div>

      {/* Tabs */}
      <div className="skills-tabs fade-in-up">
        {Object.keys(skillsData).map(tab => (
          <button
            key={tab}
            id={`skills-tab-${tab.toLowerCase().replace(/[^a-z]/g, '')}`}
            className={`skill-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="skills-grid fade-in-up">
        {skillsData[activeTab].map(skill => (
          <SkillCircle key={skill.name} {...skill} animate={animate} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
