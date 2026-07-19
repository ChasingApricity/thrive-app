import React, { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { Page } from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ChevronRight, Camera, PenLine, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/hooks/useAppContext';

type LoggedMeal = {
  type: 'photo' | 'text';
  content: string;
  time: string;
};

const triggerOptions = [
  { label: 'Boredom', emoji: '😐' },
  { label: 'Anxiety', emoji: '😰' },
  { label: 'Habit', emoji: '🔄' },
  { label: 'Actual hunger', emoji: '🍽' },
  { label: 'Stress', emoji: '😤' },
  { label: 'Social pressure', emoji: '👥' },
];

const signalOptions = [
  { label: 'Stomach growling', emoji: '🗣️' },
  { label: 'Low energy', emoji: '🔋' },
  { label: 'Shaky', emoji: '😬' },
  { label: 'Headache', emoji: '🤕' },
  { label: 'Mouth watering', emoji: '💧' },
  { label: 'Craving one specific thing', emoji: '🎯' },
  { label: 'None of these', emoji: '✨' },
];

export default function Meals() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { addPoints } = useAppContext();

  const [step, setStep] = useState<1 | 2 | 'verdict'>(1);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [signals, setSignals] = useState<string[]>([]);

  // Logging state
  const [logMode, setLogMode] = useState<'none' | 'photo' | 'text'>('none');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [mealText, setMealText] = useState('');
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const toggleArray = (arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (item === 'None of these') { setArr(['None of these']); return; }
    setArr(prev => {
      const filtered = prev.filter(i => i !== 'None of these');
      return filtered.includes(item) ? filtered.filter(i => i !== item) : [...filtered, item];
    });
  };

  const getVerdict = () => {
    const hasPhysical = signals.some(s => ['Stomach growling', 'Low energy', 'Shaky', 'Headache'].includes(s));
    const hasEmotional = triggers.some(t => ['Boredom', 'Anxiety', 'Stress'].includes(t));
    if (hasPhysical && !hasEmotional) return 'physical';
    if (!hasPhysical && (hasEmotional || signals.includes('Craving one specific thing'))) return 'emotional';
    return 'mixed';
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleLog = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (photoPreview) {
      setLoggedMeals(prev => [...prev, { type: 'photo', content: photoPreview, time: now }]);
      setPhotoPreview(null);
      setLogMode('none');
      if (photoInputRef.current) photoInputRef.current.value = '';
      addPoints(10);
      toast({ title: 'Meal logged! 📸  +10 VP ⚡', description: 'Nice one — your body thanks you.' });
    } else if (mealText.trim()) {
      setLoggedMeals(prev => [...prev, { type: 'text', content: mealText.trim(), time: now }]);
      setMealText('');
      setLogMode('none');
      addPoints(10);
      toast({ title: 'Meal logged! ✅  +10 VP ⚡', description: 'Nice one — your body thanks you.' });
    }
  };

  return (
    <Page className="p-6 pt-12 pb-24 bg-mint">
      <div className="flex items-center mb-6">
        <button onClick={() => setLocation('/home')} className="p-2 -ml-2 rounded-full hover:bg-white/50 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2">Meal & Hunger</h1>
      </div>

      <AnimatePresence mode="wait">
        {/* ── Step 1: Trigger check ── */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold mb-2">Are you actually hungry?</h2>
            <p className="text-gray-500 text-sm mb-5 font-medium">Let's figure it out together. No wrong answers.</p>
            <Card className="mb-5">
              <p className="font-bold text-gray-600 mb-4 text-sm">Step 1 of 2 — What's bringing on this feeling?</p>
              <div className="flex flex-wrap gap-2">
                {triggerOptions.map(t => (
                  <button
                    key={t.label}
                    onClick={() => toggleArray(triggers, setTriggers, t.label)}
                    className={cn(
                      'px-3 py-2 rounded-full text-sm font-bold border-2 transition-all flex items-center gap-1.5',
                      triggers.includes(t.label) ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-600 bg-white'
                    )}
                  >
                    <span>{t.emoji}</span> {t.label}
                  </button>
                ))}
              </div>
            </Card>
            <Button className="w-full" disabled={triggers.length === 0} onClick={() => setStep(2)}>
              Next <ChevronRight className="ml-2" size={18} />
            </Button>
          </motion.div>
        )}

        {/* ── Step 2: Body signals ── */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold mb-2">Check your body</h2>
            <p className="text-gray-500 text-sm mb-5 font-medium">Step 2 of 2 — What do you actually notice right now?</p>
            <Card className="mb-5">
              <div className="flex flex-wrap gap-2">
                {signalOptions.map(s => (
                  <button
                    key={s.label}
                    onClick={() => toggleArray(signals, setSignals, s.label)}
                    className={cn(
                      'px-3 py-2 rounded-full text-sm font-bold border-2 transition-all flex items-center gap-1.5',
                      signals.includes(s.label) ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-600 bg-white'
                    )}
                  >
                    <span>{s.emoji}</span> {s.label}
                  </button>
                ))}
              </div>
            </Card>
            <Button className="w-full" disabled={signals.length === 0} onClick={() => setStep('verdict')}>
              See result
            </Button>
          </motion.div>
        )}

        {/* ── Verdict + Logging ── */}
        {step === 'verdict' && (
          <motion.div key="verdict" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
            {/* Verdict card */}
            <Card className="text-center p-7 border-2 border-primary">
              {getVerdict() === 'emotional' && (
                <>
                  <div className="text-5xl mb-3">💭</div>
                  <h2 className="text-xl font-bold mb-2">Looks like Emotional Hunger</h2>
                  <p className="text-gray-500 text-sm font-medium">Your body might need comfort, rest, or connection rather than food right now.</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {['Try journaling 📝', 'Take a walk 🚶', 'Call a friend 📱'].map(s => (
                      <span key={s} className="bg-purple-50 text-purple-700 font-bold text-xs px-3 py-1.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </>
              )}
              {getVerdict() === 'physical' && (
                <>
                  <div className="text-5xl mb-3">🍽</div>
                  <h2 className="text-xl font-bold mb-2">Looks like Physical Hunger</h2>
                  <p className="text-gray-500 text-sm font-medium">Your body is asking for real fuel. Log what you eat below!</p>
                </>
              )}
              {getVerdict() === 'mixed' && (
                <>
                  <div className="text-5xl mb-3">⚖️</div>
                  <h2 className="text-xl font-bold mb-2">It's a Mix!</h2>
                  <p className="text-gray-500 text-sm font-medium">A little hungry, but emotions are involved too. Eat mindfully and slowly.</p>
                </>
              )}
            </Card>

            {/* Log a Meal or Snack */}
            <Card>
              <h3 className="font-bold text-gray-700 mb-4">Log a Meal or Snack</h3>

              {logMode === 'none' && (
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setLogMode('photo'); setTimeout(() => photoInputRef.current?.click(), 100); }}
                    className="flex flex-col items-center gap-2 p-5 bg-purple-50 rounded-2xl border-2 border-purple-100 text-purple-800"
                  >
                    <Camera size={28} className="text-purple-500" />
                    <span className="font-bold text-sm">Take a photo</span>
                    <span className="text-[10px] font-medium text-purple-500">Snap what you ate</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setLogMode('text')}
                    className="flex flex-col items-center gap-2 p-5 bg-blue-50 rounded-2xl border-2 border-blue-100 text-blue-800"
                  >
                    <PenLine size={28} className="text-blue-500" />
                    <span className="font-bold text-sm">Type it</span>
                    <span className="text-[10px] font-medium text-blue-500">Describe your meal</span>
                  </motion.button>
                </div>
              )}

              {/* Hidden file input for camera */}
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handlePhotoCapture}
              />

              {/* Photo preview */}
              <AnimatePresence>
                {logMode === 'photo' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    {photoPreview ? (
                      <div className="space-y-3">
                        <div className="relative">
                          <img src={photoPreview} alt="Meal" className="w-full h-48 object-cover rounded-2xl" />
                          <button
                            onClick={() => { setPhotoPreview(null); setLogMode('none'); }}
                            className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md"
                          >
                            <X size={14} className="text-gray-600" />
                          </button>
                        </div>
                        <Button className="w-full" onClick={handleLog}>
                          <Check size={16} className="mr-2" /> Log this meal
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Camera size={32} className="mx-auto text-gray-300 mb-2" />
                        <p className="text-sm text-gray-400 font-medium mb-3">Camera opened — select or take a photo</p>
                        <button onClick={() => setLogMode('none')} className="text-xs text-gray-400 underline">Cancel</button>
                      </div>
                    )}
                  </motion.div>
                )}

                {logMode === 'text' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                    <textarea
                      value={mealText}
                      onChange={e => setMealText(e.target.value)}
                      placeholder="e.g. rice and dal, a banana, green chai with biscuits..."
                      rows={3}
                      className="w-full border-2 border-gray-200 rounded-2xl p-4 text-sm font-medium text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-primary resize-none bg-gray-50"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => { setLogMode('none'); setMealText(''); }} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-500">
                        Cancel
                      </button>
                      <Button className="flex-2" disabled={!mealText.trim()} onClick={handleLog}>
                        <Check size={16} className="mr-1.5" /> Log it
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Logged meals list */}
              {loggedMeals.length > 0 && (
                <div className="mt-5 space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Logged today</p>
                  {loggedMeals.map((meal, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 bg-green-50 rounded-2xl p-3"
                    >
                      {meal.type === 'photo' ? (
                        <img src={meal.content} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl shrink-0">🍽</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-700 truncate">
                          {meal.type === 'text' ? meal.content : 'Photo logged'}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">{meal.time}</p>
                      </div>
                      <span className="text-green-500 shrink-0"><Check size={16} /></span>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>

            <Button
              variant="secondary"
              className="w-full bg-orange-100 text-orange-800 border-none hover:bg-orange-200"
              onClick={() => setLocation('/snacks')}
            >
              Need a healthy snack idea? 🥜
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Page>
  );
}
