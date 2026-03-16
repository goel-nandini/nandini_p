import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import GlassCard from '../components/GlassCard';

const experiences = [
  {
    role: "Frontend Intern",
    company: "E-Cell ABESEC",
    duration: "Present", // Or you can adjust this date
    description: "Improved the official E-Cell website by implementing new features and optimizing performance, which significantly improved page load time and user experience."
  }
];

const Experience = () => {
  return (
    <SectionWrapper id="experience">
      <AnimatedHeading subtitle="My Journey" title="Experience" />

      <div className="max-w-4xl mx-auto relative border-l border-glassBorder ml-4 md:ml-auto">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-10 ml-8 md:ml-12 relative"
          >
            {/* Timeline dot */}
            <span className="absolute -left-10 md:-left-14 top-4 flex h-4 w-4 items-center justify-center rounded-full bg-primary shadow-[0_0_10px_#00ffcc]">
              <span className="h-2 w-2 rounded-full bg-black"></span>
            </span>

            <GlassCard hoverEffect={false}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{exp.role}</h3>
                  <h4 className="text-lg text-primary font-medium">{exp.company}</h4>
                </div>
                <div className="text-sm border border-glassBorder rounded-full px-4 py-1 text-gray-300 w-fit">
                  {exp.duration}
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {exp.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Experience;
