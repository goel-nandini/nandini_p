import React, { useEffect, useRef, useState } from 'react';

/* ─── Data ─── */
const featured = {
  icon: '🏆',
  tag: '🏆 National Winner',
  title: 'Smart India Hackathon 2024',
  year: '2024',
  description:
    'Won a national-level hackathon with 385+ entries organized by the Ministry of Education, Govt. of India, building an impactful solution that stood out across hundreds of competing teams.',
};

const cards = [
  {
    icon: '🥈',
    title: 'HACK-O-VERSE | ABES Engineering College',
    year: '2024',
    tag: 'Runner-Up',
    tagColor: 'silver',
    description:
      'Secured 2nd place out of 100+ competing teams at the HACK-O-VERSE internal hackathon, delivering a full-stack solution under tight deadline pressure.',
  },
  {
    icon: '🚀',
    title: 'HCL-GUVI Hackathon | ABES Engineering College',
    year: '2024',
    tag: 'Top 20 Finalist',
    tagColor: 'blue',
    description:
      'Ranked among top 20 teams out of 450+ participants, demonstrating strong problem-solving, teamwork, and technical execution under competition conditions.',
  },
  {
    icon: '☁️',
    title: 'Certified Cloud Computing Practitioner',
    year: 'Udemy',
    tag: 'Certified',
    tagColor: 'purple',
    description:
      'Earned a professional certification with practical expertise in cloud infrastructure, virtualization, and scalability principles.',
  },
];

/* ─── Spotlight hook ─── */
function useSpotlight(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--sx', `${x}px`);
      el.style.setProperty('--sy', `${y}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [ref]);
}

/* ─── Count-up hook ─── */
function useCountUp(target, duration = 1400, triggerRef) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, triggerRef]);

  return count;
}

/* ─── Fade-in hook ─── */
function useFadeIn(refs) {
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const i = parseInt(e.target.dataset.i, 10);
          setVisible((v) => (v.includes(i) ? v : [...v, i]));
        }
      });
    }, { threshold: 0.15 });
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, [refs]);
  return visible;
}

/* ─── Featured Card ─── */
function FeaturedCard({ data }) {
  const ref = useRef(null);
  useSpotlight(ref);

  return (
    <div className="ach-featured-wrap">
      <div className="ach-featured" ref={ref}>
        {/* Animated gold border */}
        <div className="ach-featured-border" />
        {/* Spotlight overlay */}
        <div className="ach-spotlight" />

        <div className="ach-featured-inner">
          <div className="ach-featured-top">
            <span className="ach-feat-icon">{data.icon}</span>
            <span className="ach-feat-tag">{data.tag}</span>
            <span className="ach-year-pill ach-year-gold">{data.year}</span>
          </div>
          <h3 className="ach-feat-title">{data.title}</h3>
          <p className="ach-feat-desc">{data.description}</p>
        </div>

        {/* Pulsing glow rings */}
        <div className="ach-pulse-ring ach-pulse-ring-1" />
        <div className="ach-pulse-ring ach-pulse-ring-2" />
      </div>
    </div>
  );
}

/* ─── Small Card ─── */
function AchCard({ data, index, isVisible }) {
  const ref = useRef(null);
  useSpotlight(ref);

  return (
    <div
      className={`ach-card ach-card--${data.tagColor} ${isVisible ? 'ach-card--visible' : ''}`}
      style={{ '--delay': `${index * 0.12}s` }}
      ref={ref}
      data-i={index}
    >
      <div className="ach-card-border-anim" />
      <div className="ach-spotlight ach-spotlight--sm" />
      <div className="ach-card-inner">
        <div className="ach-card-header">
          <span className="ach-card-icon">{data.icon}</span>
          <span className={`ach-tag ach-tag--${data.tagColor}`}>{data.tag}</span>
        </div>
        <h4 className="ach-card-title">{data.title}</h4>
        <span className="ach-year-pill ach-year-blue">{data.year}</span>
        <p className="ach-card-desc">{data.description}</p>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function Achievements() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const countRef = useRef(null);
  const count = useCountUp(cards.length + 1, 1200, countRef);
  const visible = useFadeIn(cardRefs);

  return (
    <section id="achievements" className="ach-section" ref={sectionRef}>
      {/* BG orbs */}
      <div className="ach-orb ach-orb-1" />
      <div className="ach-orb ach-orb-2" />
      <div className="ach-orb ach-orb-3" />

      <div className="section ach-wrapper">
        {/* Header */}
        <div className="ach-header">
          <span className="section-tag">Recognition</span>
          <h2 className="section-title ach-grad-title">Achievements &amp; Highlights</h2>
          <div className="section-divider ach-divider-gold" />
          <p className="ach-subtitle" ref={countRef}>
            <span className="ach-count-num">{count}+</span>
            <span className="ach-count-label">&nbsp;achievements &amp; recognitions</span>
          </p>
        </div>

        {/* Featured */}
        <FeaturedCard data={featured} />

        {/* Grid */}
        <div className="ach-grid">
          {cards.map((card, i) => (
            <div
              key={i}
              data-i={i}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <AchCard data={card} index={i} isVisible={visible.includes(i)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
