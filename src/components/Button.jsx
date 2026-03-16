import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, variant = 'primary', className, onClick, ...props }) => {
  const baseStyles = 'relative inline-flex items-center justify-center px-8 py-3 font-semibold overflow-hidden group rounded-lg transition-all duration-300';
  
  const variants = {
    primary: 'bg-primary text-black hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(0,255,204,0.6)]',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
    ghost: 'text-gray-300 hover:text-primary hover:bg-glass',
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
