import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    emoji: '🗺️',
    title: 'Mentor Map',
    desc: 'Built responsive and accessible UI components with TailwindCSS, dynamically converting Figma designs into pixel-perfect web interfaces. Implemented React-based dashboards and user flows for mentor discovery, integrated with REST APIs for real-time mentor recommendations.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'REST APIs'],
    live: '#',
    github: 'https://github.com/goel-nandini',
  },
  {
    emoji: '🚀',
    title: 'TES-4.0',
    desc: 'Developed and deployed TES v4, a responsive web application using modern frontend technologies and hosted on Vercel. Implemented clean UI design and optimized user experience with efficient component structure and responsive layout.',
    tech: ['React', 'JavaScript', 'TailwindCSS', 'Vercel'],
    live: '#',
    github: 'https://github.com/goel-nandini',
  }
];

const ProjectCard = ({ project, idx }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setTimeout(() => entries[0].target.classList.add('visible'), idx * 100);
          entries[0].target.classList.add('visible');
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [idx]);

  return (
    <div
      className="project-card fade-in-up"
      ref={cardRef}
      id={`project-card-${idx}`}
    >
      {/* Image/emoji banner */}
      <div className="project-img-placeholder" style={{ fontSize: '3.5rem' }}>
        {project.emoji}
      </div>

      <div className="project-body">
        <div className="project-title">{project.title}</div>
        <div className="project-desc">{project.desc}</div>

        <div className="project-badges">
          {project.tech.map(t => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>

        <div className="project-actions">
          <a
            href={project.live}
            className="project-btn project-btn-primary"
            onClick={e => e.preventDefault()}
            id={`project-live-${idx}`}
          >
            Live Demo ↗
          </a>
          <a
            href={project.github}
            className="project-btn project-btn-outline"
            target="_blank"
            rel="noopener noreferrer"
            id={`project-github-${idx}`}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.fade-in-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="projects" ref={sectionRef}>
      <div className="fade-in-up">
        <p className="section-tag">— Featured Work</p>
        <h2 className="section-title">Projects</h2>
        <div className="section-divider" />
      </div>

      <div className="projects-grid">
        {projects.map((p, i) => <ProjectCard key={i} project={p} idx={i} />)}
      </div>
    </section>
  );
};

export default Projects;
