import React, { useEffect, useRef } from 'react';

const projects = [
  {
    emoji: '🏆',
    title: 'Smart India Hackathon — AI Portal',
    desc: 'Award-winning national hackathon project. Built a government grievance AI system with NLP-based auto-routing and real-time dashboards.',
    tech: ['React', 'Node.js', 'Python', 'NLP', 'MongoDB'],
    live: '#',
    github: 'https://github.com/goel-nandini',
  },
  {
    emoji: '🤖',
    title: 'AI Study Assistant',
    desc: 'An intelligent chatbot that generates quizzes, summaries, and flashcards from uploaded PDFs using OpenAI API.',
    tech: ['React', 'OpenAI', 'Flask', 'TailwindCSS'],
    live: '#',
    github: 'https://github.com/goel-nandini',
  },
  {
    emoji: '🛒',
    title: 'EcoShop — Sustainable Marketplace',
    desc: 'Full-stack e-commerce platform for eco-friendly products with cart, wishlist, order tracking, and payment integration.',
    tech: ['Next.js', 'MongoDB', 'Stripe', 'Redux'],
    live: '#',
    github: 'https://github.com/goel-nandini',
  },
  {
    emoji: '💬',
    title: 'Real-time Chat App',
    desc: 'WhatsApp-style chat app with rooms, emoji reactions, file sharing, and end-to-end encryption using Socket.io.',
    tech: ['React', 'Socket.io', 'Node.js', 'Express'],
    live: '#',
    github: 'https://github.com/goel-nandini',
  },
  {
    emoji: '📊',
    title: 'Data Visualizer Dashboard',
    desc: 'Interactive dashboard for uploading CSV/Excel files and generating beautiful charts with filters and export options.',
    tech: ['React', 'D3.js', 'Python', 'FastAPI'],
    live: '#',
    github: 'https://github.com/goel-nandini',
  },
  {
    emoji: '🎨',
    title: 'Portfolio Generator',
    desc: 'A drag-and-drop portfolio builder that lets developers generate their own custom portfolio sites and deploy with one click.',
    tech: ['React', 'Vite', 'Netlify API', 'localStorage'],
    live: '#',
    github: 'https://github.com/goel-nandini',
  },
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
