import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Page } from '@/components/layout/page';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { useAppContext } from '@/hooks/useAppContext';
import type { AssessmentData } from '@/hooks/useAppContext';
import { cn } from '@/lib/utils';

const TOTAL = 8;

const STRESS_OPTIONS = [
  { icon: '☀️', label: 'Calm', from: 'from-yellow-100', to: 'to-amber-50', text: 'text-amber-800' },
  { icon: '🌤', label: 'A bit tense', from: 'from-sky-100', to: 'to-cyan-50', text: 'text-sky-800' },
  { icon: '☁️', label: 'Pretty stressed', from: 'from-slate-200', to: 'to-gray-100', text: 'text-slate-700' },
  { icon: '⛈', label: 'Overwhelmed', from: 'from-slate-500', to: 'to-slate-400', text: 'text-white' },
];

const MOOD_OPTIONS = [
  { emoji: '😶‍🌫️', label: 'Low', color: '#94A3B8' },
  { emoji: '😕', label: 'Meh', color: '#A78BFA' },
  { emoji: '😐', label: 'Okay', color: '#60A5FA' },
  { emoji: '🙂', label: 'Pretty good', color: '#34D399' },
  { emoji: '😄', label: 'Great!', color: '#FBBF24' },
];

const SLEEP_QUALITY = ['Restless', 'Light', 'Okay', 'Deep', 'Blissful'];
const SLEEP_HOURS = ['Under 5h', '5–6h', '7–8h', '9h+'];

const HUNGER_OPTIONS = [
  { dot: '#22C55E', label: 'Regular meals, steady hunger' },
  { dot: '#F97316', label: 'I often skip meals, then overeat' },
  { dot: '#EAB308', label: 'I snack through the day' },
  { dot: '#EF4444', label: 'I eat when stressed or upset' },
  { dot: '#8B5CF6', label: 'Most of my eating is at night 🌙' },
];

const GUT_OPTIONS = [
  { emoji: '😌', label: 'Mostly smooth, rare bloating' },
  { emoji: '🎈', label: 'Bloating a few times a week' },
  { emoji: '🔄', label: 'Irregular bowel movements' },
  { emoji: '⚠️', label: 'Sensitive to many foods' },
  { emoji: '😣', label: 'Frequent discomfort or pain' },
];

const EATING_OPTIONS = [
  { emoji: '🥗', label: 'I eat mostly balanced meals' },
  { emoji: '🎢', label: 'I restrict, then binge' },
  { emoji: '🍫', label: 'Food is my main comfort' },
  { emoji: '🏃', label: 'I eat on the run, rarely mindful' },
  { emoji: '💧', label: 'I eat to soothe emotions' },
];

const GOAL_OPTIONS = [
  { emoji: '🌱', label: 'Better digestion' },
  { emoji: '⚡', label: 'More energy' },
  { emoji: '🌙', label: 'Better sleep' },
  { emoji: '😊', label: 'Better mood' },
  { emoji: '🌬️', label: 'Less stress' },
  { emoji: '🍃', label: 'Fewer cravings' },
  { emoji: '💧', label: 'More water' },
  { emoji: '✨', label: 'Consistency' },
];

const QUESTIONS = [
  { title: 'How stressed have you felt this week?', subtitle: "There's no wrong answer." },
  { title: 'How has your mood been overall?', subtitle: 'Think about the last few days, not just today.' },
  { title: "How's your sleep?", subtitle: 'Sleep is one of the biggest levers for stress and gut health.' },
  { title: 'How would you describe your hunger patterns?', subtitle: 'Be honest — this helps us spot emotional vs. physical hunger.' },
  { title: 'How are your digestion and gut symptoms?', subtitle: 'Pick what sounds most like you lately.' },
  { title: 'How much water do you drink?', subtitle: 'One glass ≈ 250ml. Tap a glass to fill it up.' },
  { title: 'Your eating habits in a sentence', subtitle: 'Which best describes your relationship with food?' },
  { title: 'What matters most to you?', subtitle: "Pick a few. We'll celebrate progress in these areas beyond the scale." },
];

function WaterGlass({ index, selectedCount, onTap }: { index: number; selectedCount: number; onTap: () => void }) {
  const isActive = index < selectedCount;
  return (
    <motion.button whileTap={{ scale: 0.9 }} onClick={onTap} className="flex flex-col items-center gap-1">
      {/* Removed the masks that caused Android glitches. */}
      <div className={cn('w-9 h-12 rounded-b-xl rounded-t-sm border-2 relative overflow-hidden transition-all duration-300', isActive ? 'border-blue-400 bg-blue-50/50' : 'border-gray-200 bg-gray-50')}>
        
        {/* The water now slides UP (y-axis) instead of squishing (height), which perfectly stops Android tearing. */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-400 to-sky-300"
          initial={{ y: '100%' }}
          animate={{ y: isActive ? '15%' : '100%' }}
          transition={{ duration: 0.3, delay: index * 0.03 }}
        />
        
        <div className="absolute top-1 left-1 w-1 h-4 bg-white/60 rounded-full z-10" />
      </div>
      <span className="text-[9px] font-bold text-gray-400">{index + 1}</span>
    </motion.button>
  );
}

export default function Assessment() {
  const [, setLocation] = useLocation();
  const { updateAssessment } = useAppContext();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    stress: '',
    mood: '',
    sleepQuality: '',
    sleepHours: '',
    hungerPattern: '',
    gutSymptoms: '',
    waterGlasses: 0,
    eatingHabits: '',
    goals: [] as string[],
  });

  const progress = ((step + 1) / TOTAL) * 100;

  const canProceed = () => {
    if (step === 0) return !!answers.stress;
    if (step === 1) return !!answers.mood;
    if (step === 2) return !!answers.sleepQuality && !!answers.sleepHours;
    if (step === 3) return !!answers.hungerPattern;
    if (step === 4) return !!answers.gutSymptoms;
    if (step === 5) return answers.waterGlasses > 0;
    if (step === 6) return !!answers.eatingHabits;
    if (step === 7) return answers.goals.length > 0;
    return false;
  };

  const goNext = () => {
    if (step < TOTAL - 1) setStep(s => s + 1);
    else {
      updateAssessment(answers as AssessmentData);
      setLocation('/home');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
    else setLocation('/');
  };

  const set = (key: string, val: unknown) => setAnswers(prev => ({ ...prev, [key]: val }));

  const pick = (key: string, val: string) => {
    setAnswers(prev => ({ ...prev, [key]: val }));
    setTimeout(() => setStep(s => Math.min(s + 1, TOTAL - 1)), 360);
  };

  const toggleGoal = (label: string) => {
    setAnswers(prev => {
      const goals = prev.goals;
      return { ...prev, goals: goals.includes(label) ? goals.filter(g => g !== label) : [...goals, label] };
    });
  };

  const needsButton = step === 2 || step === 5 || step === 7;

  return (
    <Page className="p-6 pt-12 pb-6 bg-white">
      {/* Progress bar */}
      <div className="flex items-center mb-8 gap-4">
        <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors shrink-0">
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <span className="text-sm font-bold text-gray-400 shrink-0">{step + 1}/{TOTAL}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col"
        >
          <h2 className="text-2xl font-extrabold mb-1 leading-tight">{QUESTIONS[step].title}</h2>
          <p className="text-gray-400 font-medium mb-8 text-sm">{QUESTIONS[step].subtitle}</p>

          {/* Q1: Stress */}
          {step === 0 && (
            <div className="grid grid-cols-2 gap-4">
              {STRESS_OPTIONS.map(opt => (
                <motion.button
                  key={opt.label}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => pick('stress', opt.label)}
                  className={cn(
                    `bg-gradient-to-br ${opt.from} ${opt.to} rounded-3xl p-6 flex flex-col items-center gap-3 border-2 transition-all`,
                    answers.stress === opt.label ? 'border-primary shadow-lg scale-[1.03]' : 'border-transparent shadow-sm'
                  )}
                >
                  <span className="text-5xl">{opt.icon}</span>
                  <span className={cn('font-bold text-sm', opt.text)}>{opt.label}</span>
                </motion.button>
              ))}
            </div>
          )}

          {/* Q2: Mood */}
          {step === 1 && (
            <div className="flex flex-col items-center gap-10">
              <div className="flex items-end justify-between w-full px-1 gap-2">
                {MOOD_OPTIONS.map((opt, i) => {
                  const isSelected = answers.mood === opt.label;
                  const sizes = ['w-12 h-12', 'w-14 h-14', 'w-16 h-16', 'w-14 h-14', 'w-12 h-12'];
                  return (
                    <motion.button
                      key={opt.label}
                      whileTap={{ scale: 0.88 }}
                      onClick={() => pick('mood', opt.label)}
                      className="flex flex-col items-center gap-2"
                    >
                      <motion.div
                        className={cn('rounded-full flex items-center justify-center text-2xl border-4 transition-all', sizes[i])}
                        style={{
                          backgroundColor: opt.color + '35',
                          borderColor: isSelected ? opt.color : 'transparent',
                          boxShadow: isSelected ? `0 0 22px ${opt.color}70` : 'none',
                        }}
                        animate={{ scale: isSelected ? 1.18 : 1 }}
                      >
                        {opt.emoji}
                      </motion.div>
                      <span className="text-[10px] font-bold text-gray-500">{opt.label}</span>
                    </motion.button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 font-medium">Tap the orb that matches your vibe</p>
            </div>
          )}

          {/* Q3: Sleep */}
          {step === 2 && (
            <div className="space-y-7">
              <div>
                <p className="font-bold text-gray-700 mb-3 text-sm">Sleep quality</p>
                <div className="flex flex-wrap gap-2">
                  {SLEEP_QUALITY.map(q => (
                    <motion.button
                      key={q}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => set('sleepQuality', q)}
                      className={cn(
                        'px-4 py-2.5 rounded-full font-bold text-sm border-2 transition-all',
                        answers.sleepQuality === q ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600'
                      )}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-700 mb-3 text-sm">Average hours per night</p>
                <div className="grid grid-cols-2 gap-3">
                  {SLEEP_HOURS.map(h => (
                    <motion.button
                      key={h}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => set('sleepHours', h)}
                      className={cn(
                        'flex items-center gap-3 p-4 rounded-2xl border-2 font-bold text-sm transition-all',
                        answers.sleepHours === h ? 'bg-indigo-50 border-indigo-400 text-indigo-800' : 'bg-white border-gray-100 text-gray-700'
                      )}
                    >
                      <span className="text-xl">🌙</span>
                      <span>{h}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Q4: Hunger Patterns */}
          {step === 3 && (
            <div className="space-y-3">
              {HUNGER_OPTIONS.map(opt => (
                <motion.button
                  key={opt.label}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => pick('hungerPattern', opt.label)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-2xl border-2 font-medium text-left text-sm transition-all',
                    answers.hungerPattern === opt.label ? 'border-primary bg-mint' : 'border-gray-100 bg-white text-gray-700'
                  )}
                >
                  <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: opt.dot }} />
                  <span className="flex-1">{opt.label}</span>
                  {answers.hungerPattern === opt.label && <Check size={16} className="text-primary shrink-0" />}
                </motion.button>
              ))}
            </div>
          )}

          {/* Q5: Gut Symptoms */}
          {step === 4 && (
            <div className="space-y-3">
              {GUT_OPTIONS.map(opt => (
                <motion.button
                  key={opt.label}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => pick('gutSymptoms', opt.label)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-2xl border-2 font-medium text-left text-sm transition-all',
                    answers.gutSymptoms === opt.label ? 'border-primary bg-mint' : 'border-gray-100 bg-white text-gray-700'
                  )}
                >
                  <span className="text-2xl w-8 shrink-0">{opt.emoji}</span>
                  <span className="flex-1">{opt.label}</span>
                  {answers.gutSymptoms === opt.label && <Check size={16} className="text-primary shrink-0" />}
                </motion.button>
              ))}
            </div>
          )}

          {/* Q6: Water */}
          {step === 5 && (
            <div className="flex flex-col items-center gap-8">
              <div className="flex justify-center gap-2">
                {Array.from({ length: 8 }, (_, i) => (
                  <WaterGlass
                    key={i}
                    index={i}
                    selectedCount={answers.waterGlasses}
                    onTap={() => set('waterGlasses', answers.waterGlasses === i + 1 ? i : i + 1)}
                  />
                ))}
              </div>
              <div className="text-center">
                {answers.waterGlasses === 0 ? (
                  <p className="text-gray-400 font-medium text-sm">Tap to fill the glasses you drink</p>
                ) : (
                  <motion.div key={answers.waterGlasses} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    <p className="text-5xl font-extrabold text-blue-500">{answers.waterGlasses}</p>
                    <p className="text-gray-500 font-medium text-sm mt-1">glass{answers.waterGlasses === 1 ? '' : 'es'} a day</p>
                    {answers.waterGlasses >= 7 && <p className="text-primary font-bold text-sm mt-1">Awesome hydration habit! 🌟</p>}
                    {answers.waterGlasses >= 4 && answers.waterGlasses <= 6 && <p className="text-blue-500 font-bold text-sm mt-1">A great start to staying refreshed. 🌊</p>}
                    {answers.waterGlasses < 4 && <p className="text-emerald-500 font-bold text-sm mt-1">Thanks for watering your body today. 🌱</p>}
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-gray-400 text-center">Aim for 8 glasses — hydration supports digestion and steady energy</p>
            </div>
          )}

          {/* Q7: Eating Habits */}
          {step === 6 && (
            <div className="space-y-3">
              {EATING_OPTIONS.map(opt => (
                <motion.button
                  key={opt.label}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => pick('eatingHabits', opt.label)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-2xl border-2 font-medium text-left text-sm transition-all',
                    answers.eatingHabits === opt.label ? 'border-primary bg-mint' : 'border-gray-100 bg-white text-gray-700'
                  )}
                >
                  <span className="text-2xl w-8 shrink-0">{opt.emoji}</span>
                  <span className="flex-1">{opt.label}</span>
                  {answers.eatingHabits === opt.label && <Check size={16} className="text-primary shrink-0" />}
                </motion.button>
              ))}
            </div>
          )}

          {/* Q8: Goals */}
          {step === 7 && (
            <div className="flex flex-wrap gap-3 justify-center">
              {GOAL_OPTIONS.map(opt => {
                const isSelected = answers.goals.includes(opt.label);
                return (
                  <motion.button
                    key={opt.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleGoal(opt.label)}
                    className={cn(
                      'flex items-center gap-2 px-5 py-3 rounded-full border-2 font-bold text-sm transition-all',
                      isSelected ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-gray-200 text-gray-600'
                    )}
                  >
                    <span>{opt.emoji}</span>
                    <span>{opt.label}</span>
                    {isSelected && <Check size={13} />}
                  </motion.button>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8">
        {needsButton ? (
          <Button className="w-full" disabled={!canProceed()} onClick={goNext}>
            {step === TOTAL - 1 ? 'See My Dashboard 🌱' : 'Next'}
            {step < TOTAL - 1 && <ChevronRight className="ml-2" size={18} />}
          </Button>
        ) : (
          <div className="h-14" />
        )}
      </div>
    </Page>
  );
}
