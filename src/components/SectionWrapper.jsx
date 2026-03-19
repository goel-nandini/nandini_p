import { motion } from 'framer-motion';

const defaultVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] // Custom refined spring-like easing 
    } 
  },
};

const SectionWrapper = ({ id, children, className = '' }) => {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={defaultVariants}
      className={`min-h-screen py-24 flex items-center justify-center px-6 md:px-12 relative ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {children}
      </div>
    </motion.section>
  );
};

export default SectionWrapper;
