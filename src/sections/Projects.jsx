import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineExternalLink, HiOutlineCode } from 'react-icons/hi';
import SectionWrapper from '../components/SectionWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const projects = [
  {
    title: "Mentor Map",
    tech: ["React", "TypeScript", "TailwindCSS"],
    description: "A mentor discovery platform featuring dynamic dashboards and forms. Integrated with powerful REST APIs for seamless user match-making and profile management.",
    github: "#", // Replace with real link wrapper
    live: "#",   // Replace with real link wrapper
  },
  {
    title: "TES v4",
    tech: ["React", "JavaScript", "TailwindCSS"],
    description: "A highly responsive web application focused on clean UI design and an optimized component structure, delivering a fast and intuitive user experience.",
    github: "#", // Replace with real link wrapper
    live: "#",   // Replace with real link wrapper
  }
];

const Projects = () => {
  return (
    <SectionWrapper id="projects">
      <AnimatedHeading subtitle="My recent work" title="Featured Projects" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <GlassCard className="h-full flex flex-col justify-between border-t-[3px] border-t-transparent hover:border-t-primary transition-all duration-300">
              
              <div>
                {/* Project Header */}
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                {/* Tech Stack Bubbles */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs md:text-sm bg-glass border border-glassBorder px-3 py-1 rounded-full text-gray-300 shadow-[0_0_5px_rgba(255,255,255,0.05)]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-8 text-sm md:text-base">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-auto">
                <Button variant="outline" className="flex items-center gap-2 px-4 py-2 text-sm w-full sm:w-auto hover:bg-white hover:text-black">
                  <HiOutlineExternalLink className="w-5 h-5" /> Live Demo
                </Button>
                <Button variant="ghost" className="flex items-center gap-2 px-4 py-2 text-sm border border-glassBorder hover:border-white w-full sm:w-auto group-hover:bg-glass">
                  <HiOutlineCode className="w-5 h-5" /> GitHub
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
