import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLMotionProps<"div"> {
  color?: 'white' | 'mint' | 'lavender' | 'peach';
  tappable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, color = 'white', tappable = false, children, ...props }, ref) => {
    
    const colors = {
      white: 'bg-card text-card-foreground',
      mint: 'bg-mint text-foreground',
      lavender: 'bg-lavender text-foreground',
      peach: 'bg-peach text-foreground',
    };

    return (
      <motion.div
        ref={ref}
        whileTap={tappable ? { scale: 0.97 } : undefined}
        className={cn(
          'rounded-3xl p-6 shadow-sm border border-card-border overflow-hidden relative',
          colors[color],
          tappable && 'cursor-pointer select-none active:scale-[0.97] transition-transform',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
