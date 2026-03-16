import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineTrophy } from 'react-icons/hi2';
import SectionWrapper from '../components/SectionWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import GlassCard from '../components/GlassCard';

const achievements = [
  {
    title: "Smart India Hackathon 2024",
    role: "Winner",
    description: "Developed an innovative AI-driven solution to solve real-world industry challenges proposed by the government."
  },
  {
    title: "Internal Hackathon ABESEC",
    role: "Runner-up",
    description: "Built a responsive and dynamic web application under extreme time constraints."
  },
  {
    title: "HCL-GUVI Hackathon",
    role: "Top 20",
    description: "Recognized among the top 20 teams nationwide for building a highly scalable tech solution."
  }
];

const Achievements = () => {
  return (
    <SectionWrapper id="achievements">
      <AnimatedHeading subtitle="Milestones" title="Achievements" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {achievements.map((achievement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <GlassCard className="h-full flex flex-col items-center text-center p-8 border border-transparent hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,204,0.2)] group-hover:shadow-[0_0_20px_rgba(0,255,204,0.6)]">
                <HiOutlineTrophy className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{achievement.role}</h3>
              <h4 className="text-lg text-secondary font-medium mb-4">{achievement.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {achievement.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Achievements;
