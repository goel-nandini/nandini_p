import React, { useEffect, useRef } from 'react';

const experiences = [
  {
    year: '2024 — Present',
    role: 'Smart India Hackathon Winner 🏆',
    org: 'Government of India',
    desc: 'Led a team of 6 to build an AI-powered solution that won first place at Smart India Hackathon 2024. Solved a real government problem using NLP and React.',
  },
  {
    year: '2023 — 2024',
    role: 'Full Stack Developer Intern',
    org: 'Tech Startup (Remote)',
    desc: 'Built responsive web dashboards using React and Node.js. Integrated REST APIs and improved UI performance by 40%.',
  },
  {
    year: '2023',
    role: 'Open Source Contributor',
    org: 'GitHub community',
    desc: 'Contributed to open source projects during Hacktoberfest, submitted 10+ merged PRs across React and Python projects.',
  },
];

const education = [
  {
    year: '2022 — 2026',
    role: 'B.Tech in Computer Science',
    org: 'VIT Bhopal University',
    desc: 'Specialization in AI & Machine Learning. CGPA: 8.5/10. Core cs, DSA, OS, DBMS.',
  },
  {
    year: '2020 — 2022',
    role: 'Higher Secondary (PCM + CS)',
    org: 'Delhi Public School',
    desc: 'Scored 95.4% in 12th boards. School topper in Computer Science.',
  },
];

const TimelineItem = ({ item, idx }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          entries[0].target.classList.add('visible');
        }
      },
      { threshold: 0.25 }
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline-item" ref={itemRef} style={{ transitionDelay: `${idx * 0.1}s` }}>
      <div className="timeline-dot" />
      <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
        <div className="timeline-year">{item.year}</div>
        <div className="timeline-role">{item.role}</div>
        <div className="timeline-org">📍 {item.org}</div>
        <div className="timeline-desc">{item.desc}</div>
      </div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.fade-in-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="experience" ref={sectionRef}
      style={{ background: 'rgba(108,99,255,0.03)' }}
    >
      <div className="fade-in-up">
        <p className="section-tag">— My Journey</p>
        <h2 className="section-title">Experience & Education</h2>
        <div className="section-divider" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        {/* Experience */}
        <div>
          <h3 className="fade-in-up" style={{
            fontSize: 'var(--fs-sub)', fontWeight: 700, marginBottom: '2rem',
            color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            💼 Experience
          </h3>
          <div className="timeline">
            {experiences.map((item, i) => <TimelineItem key={i} item={item} idx={i} />)}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="fade-in-up" style={{
            fontSize: 'var(--fs-sub)', fontWeight: 700, marginBottom: '2rem',
            color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            🎓 Education
          </h3>
          <div className="timeline">
            {education.map((item, i) => <TimelineItem key={i} item={item} idx={i} />)}
          </div>
        </div>
      </div>

      {/* Responsive for mobile */}
      <style>{`
        @media (max-width: 768px) {
          #experience .section > div:last-child,
          #experience > div[style] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
