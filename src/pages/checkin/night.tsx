import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Page } from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/hooks/useAppContext'; // 👈 We added this to get water & stress data!

export default function NightReflection() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // 👈 Bringing in the user's past data
  const { user } = useAppContext(); 
  const a = user.assessment; 

  const [mood, setMood] = useState('🙂');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [gratitude, setGratitude] = useState('');

  const gutOptions = ['Bloating', 'Cramps', 'Nausea', 'Constipation', 'None'];

  const toggleSymptom = (sym: string) => {
    if (sym === 'None') {
      setSymptoms(['None']);
      return;
    }
    setSymptoms(prev => {
      const filtered = prev.filter(s => s !== 'None');
      return filtered.includes(sym) ? filtered.filter(s => s !== sym) : [...filtered, sym];
    });
  };

  const handleSave = () => {
    toast({
      title: "Night reflection saved! 🌙",
      description: "Rest well.",
    });
    setLocation('/home');
  };

  // 🧠 DYNAMIC SUMMARY LOGIC
  // 1. Give the mood a text label
  const moodText = {'😔': 'Rough', '😕': 'Meh', '🙂': 'Good', '😊': 'Great', '🤩': 'Amazing'}[mood] || 'Good';
  
  // 2. Check if gut is happy or symptomatic
  const isHappyGut = symptoms.length === 0 || symptoms.includes('None');
  const gutSummary = isHappyGut ? 'Happy Gut' : `${symptoms.length} Symptom${symptoms.length > 1 ? 's' : ''}`;
  const gutEmoji = isHappyGut ? '✨' : '⚠️';

  // 3. Pull actual stress and water from the app context
  const stressSummary = a?.stress || 'Calm';
  const stressEmoji = a?.stress === 'Overwhelmed' ? '😰' : a?.stress === 'Pretty stressed' ? '😟' : a?.stress === 'A bit tense' ? '🌤' : '😌';
  const waterGlasses = a?.waterGlasses || 0;

  return (
    <Page className="p-6 pt-12 pb-24 bg-indigo-50">
      <div className="flex items-center mb-6">
        <button onClick={() => setLocation('/home')} className="p-2 -ml-2 rounded-full hover:bg-white/50 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2 text-indigo-900">Night Reflection</h1>
      </div>

      <div className="space-y-6">
        <Card className="border-none bg-white">
          <h2 className="font-bold text-gray-800 mb-4">How was your day overall?</h2>
          <div className="flex justify-between">
            {['😔', '😕', '🙂', '😊', '🤩'].map(emoji => (
              <motion.button
                key={emoji}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMood(emoji)}
                className={cn(
                  "text-4xl p-2 rounded-full transition-all",
                  mood === emoji ? "bg-indigo-50 shadow-sm ring-2 ring-indigo-500 scale-110" : "opacity-60 grayscale"
                )}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </Card>

        <Card className="border-none bg-white">
          <h2 className="font-bold text-gray-800 mb-4">Any digestive symptoms tonight?</h2>
          <div className="flex flex-wrap gap-2">
            {gutOptions.map(sym => (
              <button
                key={sym}
                onClick={() => toggleSymptom(sym)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold border-2 transition-all",
                  symptoms.includes(sym) ? "bg-indigo-500 border-indigo-500 text-white" : "border-gray-100 text-gray-600"
                )}
              >
                {sym}
              </button>
            ))}
          </div>
        </Card>

        <Card className="border-none bg-white">
          <h2 className="font-bold text-gray-800 mb-4">What went well today?</h2>
          <textarea 
            className="w-full h-24 p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-300 resize-none text-sm"
            placeholder="Even something small like a good cup of tea..."
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
          />
        </Card>

        <Card className="border-none bg-indigo-900 text-white">
          <h3 className="font-bold mb-3 text-indigo-200 uppercase text-xs tracking-wider">Today's Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm font-medium">
            <div className="flex items-center gap-2"><span className="text-xl">{mood}</span> {moodText} Mood</div>
            
            {/* Now pulling dynamically from Context & State! */}
            <div className="flex items-center gap-2 truncate"><span className="text-xl">{stressEmoji}</span> {stressSummary}</div>
            <div className="flex items-center gap-2"><span className="text-xl">💧</span> {waterGlasses} Glasses</div>
            <div className="flex items-center gap-2"><span className="text-xl">{gutEmoji}</span> {gutSummary}</div>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleSave}>
          Save & Sleep Well 🌙
        </Button>
      </div>
    </Page>
  );
}
