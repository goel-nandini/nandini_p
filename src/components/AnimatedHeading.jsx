import { motion } from 'framer-motion';

const AnimatedHeading = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-16 text-center ${className}`}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-primary font-mono text-sm sm:text-base mb-4 tracking-widest uppercase"
      >
        {subtitle}
      </motion.p>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
          {title}
        </span>
      </motion.h2>
    </div>
  );
};

export default AnimatedHeading;
