import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Page } from '@/components/layout/page';
import { motion } from 'framer-motion';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';

function ThriveLogo() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Upward arrow / growth lines */}
      <motion.path
        d="M60 68 L60 20"
        stroke="#22C55E"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {/* Left branch */}
      <motion.path
        d="M60 34 L40 20"
        stroke="#22C55E"
        strokeWidth="4.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
      />
      {/* Right branch */}
      <motion.path
        d="M60 34 L80 20"
        stroke="#22C55E"
        strokeWidth="4.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
      />
      {/* Sparkle dots */}
      {[{ cx: 40, cy: 20 }, { cx: 80, cy: 20 }, { cx: 60, cy: 12 }].map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r="4"
          fill="#22C55E"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1], opacity: 1 }}
          transition={{ delay: 0.9 + i * 0.12, duration: 0.4 }}
        />
      ))}
      {/* Pulse base line */}
      <motion.path
        d="M20 68 H100"
        stroke="#22C55E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.2 }}
      />
    </svg>
  );
}

export default function Welcome() {
  const [, setLocation] = useLocation();
  const [showBridge, setShowBridge] = useState(false);

  const handleLoginClick = () => {
    setShowBridge(true);
  };

  return (
    <Page className="items-center justify-center p-6 text-center bg-mint">
      <motion.div
        className="flex-1 flex flex-col items-center justify-center w-full max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-8 p-5"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
        >
          <ThriveLogo />
        </motion.div>

        <h1 className="text-4xl font-extrabold text-primary mb-3">Thrive</h1>

        {!showBridge ? (
          <>
            <p className="text-lg text-primary/80 font-medium mb-12">
              Untangling food and feelings, without the pressure of perfection.
            </p>

            <div className="w-full space-y-4">
              <Button
                className="w-full bg-white text-foreground hover:bg-gray-50 border border-gray-100 flex items-center justify-center"
                onClick={handleLoginClick}
              >
                <FaApple className="mr-2 text-xl" /> Continue with Apple
              </Button>
              <Button
                className="w-full bg-white text-foreground hover:bg-gray-50 border border-gray-100 flex items-center justify-center"
                onClick={handleLoginClick}
              >
                <FcGoogle className="mr-2 text-xl" /> Continue with Google
              </Button>
              <Button
                className="w-full bg-primary text-white flex items-center justify-center"
                onClick={handleLoginClick}
              >
                <MdEmail className="mr-2 text-xl" /> Continue with Email
              </Button>
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Take a deep breath.</h2>
            <p className="text-md text-primary/80 font-medium mb-8 leading-relaxed">
              Let's take a quick 8-question check-in to personalize your daily guide. There are no right or wrong answers.
            </p>
            <Button
              className="w-full bg-primary text-white h-12 text-lg rounded-xl shadow-sm hover:opacity-90"
              onClick={() => setLocation('/assessment')}
            >
              Start Check-in
            </Button>
          </motion.div>
        )}

        <p className="mt-8 text-sm text-primary/60 font-medium">
          A safe space just for you. 💚
        </p>
      </motion.div>
    </Page>
  );
}
