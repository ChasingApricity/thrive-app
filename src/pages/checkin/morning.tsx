import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Page } from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function MorningCheckin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [mood, setMood] = useState('🙂');
  const [stress, setStress] = useState(5);
  const [sleep, setSleep] = useState('😴');
  const [bodySignals, setBodySignals] = useState<string[]>([]);

  const signals = [
    'Stomach growling',
    'Low energy',
    'Headache',
    'Mouth watering',
    'Craving something specific',
    'None'
  ];

  const handleSignalToggle = (signal: string) => {
    if (signal === 'None') {
      setBodySignals(['None']);
      return;
    }
    setBodySignals(prev => {
      const filtered = prev.filter(s => s !== 'None');
      if (filtered.includes(signal)) {
        return filtered.filter(s => s !== signal);
      }
      return [...filtered, signal];
    });
  };

  const handleSave = () => {
    toast({
      title: "Morning logged! 🌸",
      description: "Have a wonderful day ahead.",
    });
    setLocation('/home');
  };

  return (
    <Page className="p-6 pt-12 pb-24 bg-peach">
      <div className="flex items-center mb-6">
        <button onClick={() => setLocation('/home')} className="p-2 -ml-2 rounded-full hover:bg-white/50 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2">Morning Check-in</h1>
      </div>

      <div className="space-y-8 flex-1">
        {/* Mood */}
        <section className="bg-white/60 p-6 rounded-3xl">
          <h2 className="font-bold text-gray-800 mb-4">How are you feeling right now?</h2>
          <div className="flex justify-between">
            {['😔', '😕', '🙂', '😊', '🤩'].map(emoji => (
              <motion.button
                key={emoji}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMood(emoji)}
                className={cn(
                  "text-4xl p-2 rounded-full transition-all",
                  mood === emoji ? "bg-white shadow-sm ring-2 ring-primary scale-110" : "opacity-60"
                )}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Stress */}
        <section className="bg-white/60 p-6 rounded-3xl">
          <h2 className="font-bold text-gray-800 mb-4 flex justify-between">
            <span>Stress Level</span>
            <span className="text-primary">{stress}/10</span>
          </h2>
          <input 
            type="range" min="1" max="10" 
            value={stress}
            onChange={(e) => setStress(parseInt(e.target.value))}
            className="w-full accent-primary h-2 bg-black/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-3 text-xs font-bold text-gray-500 uppercase">
            <span>Totally Zen</span>
            <span>Overwhelmed</span>
          </div>
        </section>

        {/* Body Signals */}
        <section className="bg-white/60 p-6 rounded-3xl">
          <h2 className="font-bold text-gray-800 mb-4">How are you feeling in your body?</h2>
          <div className="flex flex-wrap gap-2">
            {signals.map(signal => {
              const isSelected = bodySignals.includes(signal);
              return (
                <motion.button
                  key={signal}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSignalToggle(signal)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold border-2 transition-all",
                    isSelected 
                      ? "bg-primary border-primary text-white" 
                      : "bg-white/50 border-transparent text-gray-700"
                  )}
                >
                  {signal}
                </motion.button>
              )
            })}
          </div>
        </section>
      </div>

      <div className="mt-8">
        <Button className="w-full" onClick={handleSave}>
          Save Morning Check-in ✅
        </Button>
      </div>
    </Page>
  );
}
