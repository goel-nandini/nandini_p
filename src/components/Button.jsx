import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, variant = 'primary', className, onClick, ...props }) => {
  const baseStyles = 'relative inline-flex items-center justify-center px-8 py-3 font-semibold overflow-hidden group rounded-lg transition-all duration-300';
  
  const variants = {
    primary: 'bg-primary text-black hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(0,255,204,0.8)] shadow-[0_0_10px_rgba(0,255,204,0.3)]',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(0,255,204,0.5)]',
    ghost: 'text-gray-300 hover:text-primary hover:bg-glass hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:border-primary/50 text-glow-hover',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      onClick={onClick}
      {...props}
    >
      {/* Neon Glow Effect on Primary Hover */}
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full -ml-2 transition-all duration-300 left-0 bg-white/20 blur-[10px] opacity-0 group-hover:opacity-100 mix-blend-overlay" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;
