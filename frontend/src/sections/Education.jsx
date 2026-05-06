import React, { useEffect, useRef, useState } from 'react';

const educationData = [
  {
    year: '2023 – 2027',
    degree: 'Bachelor of Technology',
    field: 'Computer Science - AIML',
    institution: 'ABES Engineering College',
    location: 'Ghaziabad, India',
    cgpa: '8.0 CGPA',
    icon: '🎓',
  },
  {
    year: '2022 – 2023',
    degree: 'Senior Secondary',
    field: 'Science Stream',
    institution: 'Silver Bells Public School',
    location: 'Shamli, India',
    cgpa: '93%',
    icon: '📚',
  },
  {
    year: '2020 – 2021',
    degree: 'Secondary School',
    field: 'High School',
    institution: 'Silver Bells Public School',
    location: 'Shamli, India',
    cgpa: '93.66%',
    icon: '🏫',
  },
];

export default function Education() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);
  const [lineProgress, setLineProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);

  // Scroll-based timeline fill
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return;

      const timelineEl = timelineRef.current;
      const rect = timelineEl.getBoundingClientRect();
      const windowH = window.innerHeight;

      // How much of the timeline is scrolled through
      const start = rect.top;
      const end = rect.bottom;
      const visible = windowH - start;
      const total = end - start + windowH;
      const progress = Math.min(Math.max(visible / total, 0), 1);

      setLineProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for card reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index, 10);
            setVisibleCards((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="edu-section" ref={sectionRef}>
      {/* Background orbs */}
      <div className="edu-orb edu-orb-1" />
      <div className="edu-orb edu-orb-2" />

      <div className="section edu-wrapper">
        {/* Header */}
        <div className="edu-header">
          <span className="section-tag">Academic Journey</span>
          <h2 className="section-title">Education</h2>
          <div className="section-divider" />
        </div>

        {/* Timeline */}
        <div className="edu-timeline" ref={timelineRef}>
          {/* Glowing vertical line */}
          <div className="edu-line-track">
            <div
              className="edu-line-fill"
              style={{ height: `${lineProgress * 100}%` }}
            />
          </div>

          {/* Education cards */}
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className={`edu-item ${visibleCards.includes(idx) ? 'edu-item--visible' : ''}`}
              data-index={idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              style={{ '--delay': `${idx * 0.15}s` }}
            >
              {/* Timeline dot */}
              <div className="edu-dot">
                <span className="edu-dot-icon">{edu.icon}</span>
              </div>

              {/* Card */}
              <div className="edu-card glass-card">
                {/* Year pill */}
                <div className="edu-year-pill">{edu.year}</div>

                <div className="edu-card-body">
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <p className="edu-field">{edu.field}</p>
                  <p className="edu-institution">{edu.institution}</p>

                  <div className="edu-card-footer">
                    <span className="edu-location">
                      <svg className="edu-loc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {edu.location}
                    </span>
                    <span className="edu-cgpa-badge">
                      ✦ {edu.cgpa}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
