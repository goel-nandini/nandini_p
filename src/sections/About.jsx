import React, { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.fade-in-up').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 150);
          });
        }
      }),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="about" ref={sectionRef}>
      {/* Header */}
      <div className="fade-in-up">
        <p className="section-tag">— About Me</p>
        <h2 className="section-title">Who I Am</h2>
        <div className="section-divider" />
      </div>

      <div className="about-grid">
        {/* Avatar */}
        <div className="about-img-wrap fade-in-up">
          <div className="about-img-ring">
            <div className="about-avatar-placeholder">N</div>
          </div>
        </div>

        {/* Text */}
        <div className="about-text">
          <h3 className="fade-in-up">
            Nandini Goel — Full Stack Developer & AI/ML Enthusiast
          </h3>
          <p className="fade-in-up">
            I'm a passionate developer from India, currently pursuing Computer Science with a deep interest in building elegant, high-performance web applications and exploring the frontiers of Artificial Intelligence.
          </p>
          <p className="fade-in-up">
            I love transforming complex problems into simple, beautiful, and intuitive solutions. From winning Smart India Hackathon to working on real-world projects, I strive to make an impact through technology.
          </p>
          <p className="fade-in-up">
            When I'm not coding, you'll find me sketching designs, exploring new frameworks, or participating in competitive programming.
          </p>

          {/* Stats */}
          <div className="about-stats fade-in-up">
            <div className="about-stat">
              <span className="about-stat-num">10+</span>
              <span className="about-stat-label">Projects</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-num">3+</span>
              <span className="about-stat-label">Hackathons</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-num">2+</span>
              <span className="about-stat-label">Years Coding</span>
            </div>
          </div>

          <div className="fade-in-up" style={{ marginTop: '1.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button id="about-projects-btn" className="btn btn-primary" onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
            </button>
            <a id="about-resume-btn" href="#" className="btn btn-outline" onClick={e => e.preventDefault()}>
              ⬇ Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
