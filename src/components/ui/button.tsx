import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-primary text-primary-foreground shadow-sm hover:opacity-90',
      secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:opacity-90',
      outline: 'border-2 border-primary text-primary hover:bg-mint',
      ghost: 'hover:bg-muted text-foreground',
      glass: 'bg-white/50 backdrop-blur-md text-foreground shadow-sm border border-white/20'
    };

    const sizes = {
      default: 'h-14 px-6 py-4 text-lg font-bold',
      sm: 'h-10 px-4 text-sm font-semibold',
      lg: 'h-16 px-8 text-xl font-bold',
      icon: 'h-14 w-14 flex items-center justify-center'
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
