import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Page } from '@/components/layout/page';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function StressRelief() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  // Breathing state
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Hold '>('Inhale');
  const [isBreathing, setIsBreathing] = useState(false);
  
  // Body scan state
  const [scanStep, setScanStep] = useState(0);
  const scanSteps = [
    "Find a comfortable position and close your eyes.",
    "Notice your feet touching the ground. Let them feel heavy.",
    "Move your attention to your stomach. Let it soften and relax.",
    "Drop your shoulders away from your ears. Release your jaw.",
    "Take one deep breath in, and let it all go."
  ];

  // Journal state
  const [journalEntry, setJournalEntry] = useState('');

  const toggleCard = (id: string) => {
    if (expandedCard === id) {
      setExpandedCard(null);
      setIsBreathing(false);
    } else {
      setExpandedCard(id);
      if (id === 'breath') setIsBreathing(true);
    }
  };

  useEffect(() => {
    if (!isBreathing) return;
    
    const phases: Array<'Inhale' | 'Hold' | 'Exhale' | 'Hold '> = ['Inhale', 'Hold', 'Exhale', 'Hold '];
    let currentPhase = 0;
    
    const interval = setInterval(() => {
      currentPhase = (currentPhase + 1) % 4;
      setBreathingPhase(phases[currentPhase]);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isBreathing]);

  const markComplete = (activity: string) => {
    toast({ title: "Great job! ✅", description: `${activity} completed.` });
    setExpandedCard(null);
    setIsBreathing(false);
  };

  return (
    <Page className="p-6 pt-12 pb-24 bg-lavender">
      <div className="flex items-center mb-6">
        <button onClick={() => setLocation('/home')} className="p-2 -ml-2 rounded-full hover:bg-white/50 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2 text-indigo-900">Let's calm down together 💆</h1>
      </div>

      <div className="space-y-4">
        
        {/* Box Breathing */}
        <Card className="border-none transition-all duration-300">
          <button className="w-full flex items-center justify-between p-2" onClick={() => toggleCard('breath')}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🫁</span>
              <span className="font-bold text-lg text-left">Box Breathing</span>
            </div>
            {expandedCard === 'breath' ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          <AnimatePresence>
            {expandedCard === 'breath' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 pb-2 flex flex-col items-center">
                  <div className="h-40 flex items-center justify-center relative w-full mb-4">
                    <motion.div 
                      className="absolute bg-blue-100 rounded-full"
                      animate={{ 
                        scale: breathingPhase === 'Inhale' ? 2 : 
                               breathingPhase === 'Exhale' ? 0.5 : 
                               breathingPhase === 'Hold' ? 2 : 0.5
                      }}
                      transition={{ duration: 4, ease: "linear" }}
                      style={{ width: 100, height: 100 }}
                    />
                    <div className="absolute font-bold text-blue-900 bg-white/50 backdrop-blur-sm px-4 py-1 rounded-full">
                      {breathingPhase}
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => markComplete("Box Breathing")}>Mark Complete ✅</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Body Scan */}
        <Card className="border-none transition-all duration-300">
          <button className="w-full flex items-center justify-between p-2" onClick={() => toggleCard('scan')}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧘</span>
              <span className="font-bold text-lg text-left">Body Scan Meditation</span>
            </div>
            {expandedCard === 'scan' ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          <AnimatePresence>
            {expandedCard === 'scan' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 pb-2">
                  <div className="min-h-[100px] flex items-center justify-center text-center px-4 mb-6">
                    <p className="text-lg font-medium text-gray-700">{scanSteps[scanStep]}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    {scanStep < scanSteps.length - 1 ? (
                      <Button className="w-full bg-indigo-100 text-indigo-900 hover:bg-indigo-200" onClick={() => setScanStep(s => s + 1)}>
                        Next Step
                      </Button>
                    ) : (
                      <Button className="w-full" onClick={() => { markComplete("Body Scan"); setScanStep(0); }}>
                        Mark Complete ✅
                      </Button>
                    )}
                  </div>
                  
                  {/* Progress dots */}
                  <div className="flex justify-center gap-1.5 mt-6">
                    {scanSteps.map((_, i) => (
                      <div key={i} className={cn("w-2 h-2 rounded-full", i === scanStep ? "bg-indigo-500" : "bg-indigo-100")} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Mood Journal */}
        <Card className="border-none transition-all duration-300">
          <button className="w-full flex items-center justify-between p-2" onClick={() => toggleCard('journal')}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">📝</span>
              <span className="font-bold text-lg text-left">Brain Dump Journal</span>
            </div>
            {expandedCard === 'journal' ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          <AnimatePresence>
            {expandedCard === 'journal' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2">
                  <textarea 
                    className="w-full h-32 p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-300 resize-none mb-4"
                    placeholder="Write whatever's on your mind. Nobody else will see this..."
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                  />
                  <Button className="w-full" onClick={() => markComplete("Journal Entry")}>Save Entry ✅</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

      </div>
    </Page>
  );
}
