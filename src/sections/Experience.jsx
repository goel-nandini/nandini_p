import React from 'react';
import { motion } from 'framer-motion';
import { MdWork, MdSchool, MdEmojiEvents, MdWorkspacePremium } from 'react-icons/md';

const experiences = [
  {
    year: 'Oct 2025 — Dec 2025',
    role: 'Front-end Intern',
    org: 'E-Cell ABESEC',
    desc: 'Enhanced the official E-Cell website by implementing new features and optimising site performance, resulting in a 75% improvement in page load times and increased user engagement, while ensuring intuitive navigation.',
    icon: <MdWork size={24} />
  }
];

const education = [
  {
    year: '2023 — 2027',
    role: 'B.Tech CS - AIML',
    org: 'ABES Engineering College',
    desc: 'Cumulative Grade Point Average: 8.0 CGPA. Location: Ghaziabad, India.',
    icon: <MdSchool size={24} />
  },
  {
    year: '2022 — 2023',
    role: 'Senior Secondary',
    org: 'Silver Bells Public School',
    desc: 'Location: Shamli, India.',
    icon: <MdSchool size={24} />
  },
];

const achievements = [
  {
    year: '2024',
    role: 'Winner',
    org: 'Smart India Hackathon 2024',
    desc: 'National-level hackathon (385+ entries) organized by the Ministry of Education, Govt. of India.',
    icon: <MdEmojiEvents size={24} />
  },
  {
    year: '2024',
    role: 'Runner-up',
    org: 'ABES Engineering College Hackathon',
    desc: 'Secured 2nd out of 100+ teams in a HACK-O-VERSE ABESEC hackathon.',
    icon: <MdEmojiEvents size={24} />
  },
  {
    year: '2024',
    role: 'Top-20',
    org: 'HCL-GUVI Hackathon',
    desc: 'Among top 20 teams out of 450+ teams in a college hackathon.',
    icon: <MdEmojiEvents size={24} />
  },
  {
    year: 'Achievement',
    role: 'Certified Cloud Practitioner',
    org: 'Udemy',
    desc: 'Developed practical expertise in cloud infrastructure, virtualization, and scalability principles.',
    icon: <MdWorkspacePremium size={24} />
  }
];

const TimelineCard = ({ item, idx }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="relative pl-12 md:pl-0"
      style={{ marginBottom: '2.5rem' }}
    >
      <div className="absolute left-4 top-10 bottom-[-2.5rem] w-0.5 bg-gradient-to-b from-[var(--grad-start)] to-transparent md:hidden" />
      
      <div 
        className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white md:hidden"
        style={{ background: 'var(--gradient)', boxShadow: '0 0 15px rgba(108, 99, 255, 0.4)' }}
      >
        {item.icon}
      </div>

      <motion.div 
        whileHover={{ y: -5, scale: 1.02 }}
        className="glass-card overflow-hidden relative group"
        style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent)' }}
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          {item.icon}
        </div>
        
        <span style={{ 
          display: 'inline-block',
          padding: '0.2rem 0.8rem', 
          borderRadius: '50px',
          background: 'rgba(108, 99, 255, 0.1)',
          color: 'var(--grad-start)',
          fontSize: 'var(--fs-small)',
          fontWeight: 700,
          marginBottom: '0.75rem'
        }}>
          {item.year}
        </span>
        
        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          {item.role}
        </h4>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', fontStyle: 'italic' }}>
          📍 {item.org}
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
          {item.desc}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section className="section" id="experience" style={{ background: 'var(--bg-card)', position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-tag">— My Journey</p>
        <h2 className="section-title">Timeline & Achievements</h2>
        <div className="section-divider" />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
        
        {/* Experience Column */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <span style={{ color: 'var(--accent)' }}><MdWork /></span> Experience
          </motion.h3>
          <div className="md:pl-4 md:border-l-2 md:border-[var(--border)]">
            {experiences.map((item, i) => <TimelineCard key={i} item={item} idx={i} />)}
          </div>
        </div>

        {/* Education Column */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <span style={{ color: 'var(--grad-end)' }}><MdSchool /></span> Education
          </motion.h3>
          <div className="md:pl-4 md:border-l-2 md:border-[var(--border)]">
            {education.map((item, i) => <TimelineCard key={i} item={item} idx={i} />)}
          </div>
        </div>

        {/* Achievements Column */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <span style={{ color: '#FFD700' }}><MdEmojiEvents /></span> Trophies
          </motion.h3>
          <div className="md:pl-4 md:border-l-2 md:border-[var(--border)]">
            {achievements.map((item, i) => <TimelineCard key={i} item={item} idx={i} />)}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
