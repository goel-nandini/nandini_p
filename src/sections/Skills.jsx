import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import GlassCard from '../components/GlassCard';

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "C", level: 75 },
      { name: "C++", level: 70 },
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 90 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "TailwindCSS", level: 85 },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "REST APIs", level: 85 },
      { name: "JWT", level: 75 },
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 85 },
      { name: "Firebase", level: 75 },
    ]
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 70 },
      { name: "GCP", level: 65 },
      { name: "Docker", level: 70 },
      { name: "Linux", level: 80 },
      { name: "CI/CD basics", level: 65 },
    ]
  }
];

const SkillBar = ({ name, level }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300 font-medium text-sm">{name}</span>
        <span className="text-primary font-mono text-xs">{level}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden border border-glassBorder">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full relative"
        >
          {/* Subtle moving glow effect on the bar */}
          <div className="absolute top-0 right-0 w-4 h-full bg-white/50 blur-[4px]" />
        </motion.div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <SectionWrapper id="skills">
      <AnimatedHeading subtitle="What I do" title="My Skills" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <GlassCard className="h-full">
              <h3 className="text-xl font-bold mb-6 text-white tracking-wide border-b border-glassBorder pb-2">
                {category.title}
              </h3>
              <div className="flex flex-col space-y-4">
                {category.skills.map(skill => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;
