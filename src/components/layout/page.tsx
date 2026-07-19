import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageProps extends HTMLMotionProps<"div"> {
  className?: string;
}

export function Page({ children, className, ...props }: PageProps) {
  return (
    <motion.div
      initial={{ x: '100%', opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0.5 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={cn("min-h-[100dvh] w-full flex flex-col bg-background relative pb-24", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
