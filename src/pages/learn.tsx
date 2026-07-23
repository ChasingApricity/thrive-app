import React, { useState, useEffect, useRef } from 'react';
import { Page } from '@/components/layout/page';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/hooks/useAppContext';

// ─── Shared flowchart primitives ───────────────────────────────────────────

function FlowArrow() {
  return (
    <div className="flex justify-center my-1 text-gray-300">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2v12M4 10l6 8 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function FlowBox({ icon, text, bg, textColor }: { icon: string; text: string; bg: string; textColor?: string }) {
  return (
    <div className={cn('rounded-2xl p-4 text-center w-full', bg)}>
      <span className="text-3xl block mb-1.5">{icon}</span>
      <p className={cn('font-bold text-sm leading-snug', textColor || 'text-gray-800')}>{text}</p>
    </div>
  );
}

// ─── Article-specific flowcharts ───────────────────────────────────────────

function StressHungerFlow() {
  const steps = [
    { icon: '😰', text: 'You feel stressed', bg: 'bg-red-50' },
    { icon: '🧪', text: 'Cortisol hormone rises', bg: 'bg-orange-50' },
    { icon: '🧠', text: 'Brain signals: "Danger! Need energy now!"', bg: 'bg-yellow-50' },
    { icon: '🍭', text: 'You crave sugar & simple carbs', bg: 'bg-amber-50' },
    { icon: '💡', text: 'Noticing this = power to pause & choose', bg: 'bg-green-50', textColor: 'text-green-800' },
  ];
  return (
    <div>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <FlowBox {...s} />
          {i < steps.length - 1 && <FlowArrow />}
        </React.Fragment>
      ))}
    </div>
  );
}

function GutHealthFlow() {
  const spokes = [
    { icon: '🔄', text: 'Digests food', bg: 'bg-green-50' },
    { icon: '💊', text: 'Makes vitamins', bg: 'bg-blue-50' },
    { icon: '😊', text: '90% serotonin', bg: 'bg-yellow-50' },
    { icon: '🧠', text: 'Affects mood', bg: 'bg-purple-50' },
    { icon: '🛡️', text: 'Boosts immunity', bg: 'bg-orange-50' },
    { icon: '⚡', text: 'Regulates energy', bg: 'bg-pink-50' },
  ];
  return (
    <div className="space-y-4">
      <div className="bg-green-100 rounded-3xl p-5 text-center">
        <span className="text-4xl block mb-2">🦠</span>
        <p className="font-extrabold text-green-800 text-lg">Your Gut</p>
        <p className="text-green-600 text-xs font-medium mt-1">home to trillions of bacteria</p>
      </div>
      <div className="flex justify-center text-gray-300">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2v12M4 10l6 8 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider">powers all of this</p>
      <div className="grid grid-cols-2 gap-3">
        {spokes.map((s, i) => (
          <div key={i} className={cn('rounded-2xl p-4 text-center', s.bg)}>
            <span className="text-2xl block mb-1">{s.icon}</span>
            <p className="font-bold text-xs text-gray-700">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HydrationFlow() {
  const steps = [
    { icon: '💧', text: 'Even 1-2% dehydration', bg: 'bg-blue-50' },
    { icon: '😵‍💫', text: 'Tired, cranky, can\'t focus', bg: 'bg-slate-100' },
    { icon: '🤔', text: 'Mistaken for hunger or anxiety', bg: 'bg-yellow-50' },
    { icon: '🌊', text: 'Try: one glass of water first, always', bg: 'bg-cyan-50', textColor: 'text-cyan-800' },
  ];
  return (
    <div>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <FlowBox {...s} />
          {i < steps.length - 1 && <FlowArrow />}
        </React.Fragment>
      ))}
    </div>
  );
}

function SleepFlow() {
  const outcomes = [
    { icon: '🔧', text: 'Repairs cells', bg: 'bg-purple-50' },
    { icon: '🧹', text: 'Clears brain toxins', bg: 'bg-indigo-50' },
    { icon: '😌', text: 'Balances mood', bg: 'bg-blue-50' },
    { icon: '🍽', text: 'Resets hunger hormones', bg: 'bg-green-50' },
  ];
  return (
    <div className="space-y-4">
      <div className="bg-indigo-100 rounded-3xl p-5 text-center">
        <span className="text-4xl block mb-2">😴</span>
        <p className="font-extrabold text-indigo-800 text-lg">8–9 hours of sleep</p>
        <p className="text-indigo-500 text-xs font-medium mt-1">the foundation of everything</p>
      </div>
      <div className="flex justify-center text-gray-300">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2v12M4 10l6 8 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider">your body does all of this</p>
      <div className="grid grid-cols-2 gap-3">
        {outcomes.map((o, i) => (
          <div key={i} className={cn('rounded-2xl p-4 text-center', o.bg)}>
            <span className="text-2xl block mb-1">{o.icon}</span>
            <p className="font-bold text-xs text-gray-700">{o.text}</p>
          </div>
        ))}
      </div>
      <div className="bg-yellow-50 rounded-2xl p-4 text-center">
        <p className="font-bold text-sm text-yellow-800">Without enough sleep: stress hormones rise, gut slows, cravings spike. 🌀</p>
      </div>
    </div>
  );
}

function HungerDecisionTree() {
  return (
    <div className="space-y-3">
      <div className="bg-amber-50 rounded-2xl p-4 text-center">
        <span className="text-3xl block mb-1.5">🤔</span>
        <p className="font-bold text-sm text-amber-800">Feeling hungry?</p>
      </div>
      <div className="flex justify-center gap-0">
        <div className="flex items-start">
          <div className="w-24 h-6 border-b-2 border-l-2 border-gray-200 rounded-bl-xl mt-0" />
          <div className="w-24 h-6 border-b-2 border-r-2 border-gray-200 rounded-br-xl mt-0" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-100">
            <p className="font-bold text-xs text-purple-700">Came on suddenly ⚡</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-100">
            <p className="font-bold text-xs text-purple-700">Craving something specific 🍫</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-100">
            <p className="font-bold text-xs text-purple-700">Triggered by a mood 💭</p>
          </div>
          <div className="bg-purple-100 rounded-2xl p-4 text-center border-2 border-purple-300">
            <span className="text-2xl block mb-1">💭</span>
            <p className="font-extrabold text-sm text-purple-800">Emotional</p>
            <p className="text-[10px] text-purple-600 mt-1">You might need a hug or a walk</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
            <p className="font-bold text-xs text-green-700">Built up gradually 🐢</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
            <p className="font-bold text-xs text-green-700">Stomach growling 🗣️</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
            <p className="font-bold text-xs text-green-700">Low energy or shaky ⚡</p>
          </div>
          <div className="bg-green-100 rounded-2xl p-4 text-center border-2 border-green-300">
            <span className="text-2xl block mb-1">🍽</span>
            <p className="font-extrabold text-sm text-green-800">Physical</p>
            <p className="text-[10px] text-green-600 mt-1">Time to get something nourishing!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StressCycleFlow() {
  const nodes = [
    { icon: '😰', text: 'Stress', color: '#F87171', bg: '#FEF2F2' },
    { icon: '😴', text: 'Poor Sleep', color: '#A78BFA', bg: '#F5F3FF' },
    { icon: '🦠', text: 'Gut Issues', color: '#FB923C', bg: '#FFF7ED' },
    { icon: '🍭', text: 'Cravings', color: '#FBBF24', bg: '#FFFBEB' },
    { icon: '😔', text: 'Low Mood', color: '#60A5FA', bg: '#EFF6FF' },
  ];

  const count = nodes.length;
  const r = 100;
  const cx = 140;
  const cy = 140;
  const viewSize = 280;

  const points = Array.from({ length: count }, (_, i) => {
    const angle = (i * 2 * Math.PI) / count - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  return (
    <div className="space-y-4">
      <div className="relative" style={{ height: 280 }}>
        <svg viewBox={`0 0 ${viewSize} ${viewSize}`} className="absolute inset-0 w-full h-full">
          <defs>
            <marker id="lrn-arrow" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
              <path d="M0,1 L0,6 L5,3.5 Z" fill="#9CA3AF" />
            </marker>
          </defs>
          {points.map((pt, i) => {
            const next = points[(i + 1) % count];
            const mx = (pt.x + next.x) / 2;
            const my = (pt.y + next.y) / 2;
            const dx = cx - mx;
            const dy = cy - my;
            const cpx = mx + dx * 0.18;
            const cpy = my + dy * 0.18;
            return (
              <path key={i} d={`M ${pt.x} ${pt.y} Q ${cpx} ${cpy} ${next.x} ${next.y}`} fill="none" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#lrn-arrow)" />
            );
          })}
          <text x={cx} y={cy - 8} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9CA3AF">The Loop</text>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="9" fill="#9CA3AF">breaks anywhere</text>
        </svg>
        {points.map((pt, i) => (
          <div key={i} className="absolute flex flex-col items-center" style={{ left: `${(pt.x / viewSize) * 100}%`, top: `${(pt.y / viewSize) * 100}%`, transform: 'translate(-50%, -50%)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl border-2 shadow-sm" style={{ backgroundColor: nodes[i].bg, borderColor: nodes[i].color + '60' }}>
              {nodes[i].icon}
            </div>
            <span className="text-[10px] font-bold text-gray-600 text-center w-16 mt-1 leading-tight">{nodes[i].text}</span>
          </div>
        ))}
      </div>
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 text-center">
        <p className="font-bold text-sm text-green-800">✨ Good news: you can break the cycle at any point!</p>
        <p className="text-xs text-green-600 mt-1">Drink water. Sleep 30 min earlier. Take 5 deep breaths. Any small win shifts the whole loop.</p>
      </div>
    </div>
  );
}

// ─── Mini-Game Engines ───────────────────────────────────────────────────

type Question = { text: string; isFact: boolean; explanation: string; };

// GAME 1: Myth vs Fact Quiz
function MythVsFactGame({ questions, onComplete }: { questions: Question[], onComplete: (score: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastGuess, setLastGuess] = useState<boolean | null>(null);

  const question = questions[idx];
  const isCorrect = lastGuess === question.isFact;

  const handleGuess = (guess: boolean) => {
    setLastGuess(guess);
    if (guess === question.isFact) setScore(s => s + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (idx < questions.length - 1) {
      setIdx(i => i + 1);
      setShowResult(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/50 text-center relative overflow-hidden">
      <div className="absolute -top-10 -right-10 text-9xl opacity-5 pointer-events-none">🧠</div>
      <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-6">Myth vs Fact</p>
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-xl font-extrabold text-gray-800 mb-8 leading-snug">"{question.text}"</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => handleGuess(false)} className="bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold h-14 rounded-2xl border-none">Myth 🧢</Button>
              <Button onClick={() => handleGuess(true)} className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold h-14 rounded-2xl border-none">Fact ✅</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="flex justify-center mb-4">
              {isCorrect ? <CheckCircle2 size={48} className="text-emerald-500" /> : <XCircle size={48} className="text-rose-500" />}
            </div>
            <h3 className={cn("text-xl font-extrabold mb-2", isCorrect ? "text-emerald-600" : "text-rose-600")}>
              {isCorrect ? "Correct!" : "Actually..."}
            </h3>
            <p className="text-sm font-medium text-gray-700 mb-8">{question.explanation}</p>
            <Button onClick={handleNext} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-white">
              {idx < questions.length - 1 ? 'Next Question' : 'Finish Game'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-6 flex justify-center gap-1">
        {questions.map((_, i) => (
          <div key={i} className={cn("h-1.5 rounded-full transition-all", i <= idx ? "w-4 bg-indigo-500" : "w-1.5 bg-gray-200")} />
        ))}
      </div>
    </div>
  );
}

// GAME 2: Cortisol Slider
function CortisolSliderGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [level, setLevel] = useState(40);
  const [timeLeft, setTimeLeft] = useState(50); 
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  
  const [shieldActive, setShieldActive] = useState(false);
  const [waterCharges, setWaterCharges] = useState(1); 
  
  const [isHolding, setIsHolding] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [holdDuration, setHoldDuration] = useState(0);

  const isZenMode = holdDuration >= 16;

  const isHoldingRef = useRef(isHolding);
  useEffect(() => { isHoldingRef.current = isHolding; }, [isHolding]);
  const shieldRef = useRef(shieldActive);
  useEffect(() => { shieldRef.current = shieldActive; }, [shieldActive]);
  const zenRef = useRef(isZenMode);
  useEffect(() => { zenRef.current = isZenMode; }, [isZenMode]);

  useEffect(() => {
    if (!isHolding) {
      setBreathPhase('Inhale');
      return;
    }
    const cycle = setInterval(() => {
      setBreathPhase(p => (p === 'Inhale' ? 'Exhale' : 'Inhale'));
    }, 4000); 
    return () => clearInterval(cycle);
  }, [isHolding]);

  useEffect(() => {
    if (!isHolding || status !== 'playing') {
      setHoldDuration(0);
      return;
    }
    const holdTimer = setInterval(() => {
      setHoldDuration(d => d + 1);
    }, 1000);
    return () => clearInterval(holdTimer);
  }, [isHolding, status]);

  useEffect(() => {
    if (status !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setStatus('won');
          return 0;
        }
        return t - 1;
      });

      setLevel(l => {
        if (shieldRef.current) return l; 
        
        let newLevel = l + 7; 
        
        if (isHoldingRef.current) {
          newLevel -= zenRef.current ? 18 : 12; 
        }
        
        if (newLevel >= 100) {
          setStatus('lost');
          return 100;
        }
        return Math.max(0, newLevel);
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status]);

  const useWater = () => {
    if (waterCharges > 0 && status === 'playing') {
      setWaterCharges(0);
      setShieldActive(true);
      setLevel(l => Math.max(0, l - 25)); 
      setTimeout(() => setShieldActive(false), 5000); 
    }
  };

  let activeTip = "Watch the zones! Keep cortisol out of the red Danger area.";
  if (shieldActive) {
    activeTip = "🛡️ Cells hydrated! Physical stress response is frozen.";
  } else if (isZenMode) {
    activeTip = "✨ Flow State Achieved: Deep parasympathetic reset active!";
  } else if (isHolding) {
    activeTip = breathPhase === 'Inhale' 
      ? "🫁 Deep inhale (4s)... fill your lungs..." 
      : "😌 Slow exhale (4s)... release tension...";
  }

  if (status !== 'playing') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 backdrop-blur-md rounded-3xl p-8 text-center shadow-lg border border-white/50">
        <div className="text-6xl mb-4">{status === 'won' ? '🧘‍♀️' : '🤯'}</div>
        <h3 className={cn("text-2xl font-extrabold mb-2", status === 'won' ? "text-emerald-600" : "text-rose-600")}>
          {status === 'won' ? "Deep Zen Achieved!" : "Cortisol Overload!"}
        </h3>
        <p className="text-sm font-medium text-gray-700 mb-8">
          {status === 'won' 
            ? "By utilizing guided Inhale/Exhale pacing for 45 seconds, you successfully lowered your physical stress response!" 
            : "When cortisol runs wild, your brain demands fast energy (sugar). Remember to pace your breathing!"}
        </p>
        <Button onClick={() => onComplete(status === 'won' ? 4 : 0)} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-white">Continue</Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/50 text-center relative overflow-hidden select-none">
      <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">Keep it chill!</p>
      
      <div className="flex justify-between font-bold text-gray-700 mb-2 mt-4 relative z-10">
        <span>Cortisol Level</span>
        <span className={level >= 80 ? "text-red-600 font-extrabold" : level >= 50 ? "text-amber-500" : "text-emerald-600"}>
          {level}%
        </span>
      </div>
      
      <div className="relative h-6 w-full bg-gray-200 rounded-full overflow-hidden mb-6 shadow-inner border border-gray-100 transition-all">
        <div className="absolute inset-0 flex text-[9px] font-extrabold uppercase tracking-wider text-gray-500 z-10 pointer-events-none mix-blend-color-burn opacity-70">
          <div className="w-[50%] h-full flex items-center justify-start pl-3 border-r border-gray-400/30">Rest</div>
          <div className="w-[30%] h-full flex items-center justify-center border-r border-gray-400/30">Alert</div>
          <div className="w-[20%] h-full flex items-center justify-end pr-2 text-red-900">Danger</div>
        </div>
        
        <motion.div 
          className="h-full relative z-0" 
          animate={{ 
            width: `${level}%`, 
            backgroundColor: shieldActive ? "#06B6D4" : (level < 50 ? "#34D399" : level < 80 ? "#FBBF24" : "#EF4444") 
          }} 
          transition={{ duration: 0.3 }} 
        />
      </div>

      <div className="flex justify-center mb-6 relative h-36 items-center">
        <motion.div 
          animate={{ 
            scale: isHolding ? (breathPhase === 'Inhale' ? 1.35 : 0.8) : [1, 1.1, 1],
            boxShadow: isZenMode ? "0px 0px 40px rgba(52, 211, 153, 0.8)" : "0px 0px 0px rgba(0,0,0,0)"
          }} 
          transition={{ duration: isHolding ? 4 : 4, repeat: isHolding ? 0 : Infinity, ease: "easeInOut" }}
          onPointerDown={(e) => { e.preventDefault(); setIsHolding(true); }}
          onPointerUp={(e) => { e.preventDefault(); setIsHolding(false); }}
          onPointerLeave={(e) => { e.preventDefault(); setIsHolding(false); }}
          onPointerCancel={(e) => { e.preventDefault(); setIsHolding(false); }}
          className={cn("absolute w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center transition-colors cursor-pointer select-none touch-none", 
            isZenMode ? "bg-emerald-400 border-emerald-300 text-white" 
            : isHolding ? "bg-emerald-500 border-emerald-600 shadow-lg" 
            : "bg-indigo-50 border-indigo-200")}
        >
          <span className="text-4xl mb-0.5">{isHolding ? (breathPhase === 'Inhale' ? '🫁' : '😌') : '🌬️'}</span>
          <span className={cn("text-[10px] font-bold uppercase tracking-wider", isHolding ? "text-white" : "text-indigo-400")}>
            {isZenMode ? 'Zen Mode' : isHolding ? breathPhase : 'Hold Orb'}
          </span>
        </motion.div>
      </div>

      <div className="h-10 flex items-center justify-center mb-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTip}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={cn("text-[11px] font-bold px-4 text-center leading-tight", 
              shieldActive ? "text-cyan-600" : isZenMode ? "text-emerald-600" : level >= 80 ? "text-rose-600" : "text-indigo-600"
            )}
          >
            {activeTip}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mb-6 relative z-10">
        <Button 
          disabled={waterCharges === 0 || shieldActive}
          onClick={useWater} 
          className={cn("font-bold h-12 w-full max-w-[200px] rounded-2xl shadow-sm transition-all text-sm", 
            shieldActive ? "bg-cyan-400 text-white" 
            : waterCharges > 0 ? "bg-cyan-100 hover:bg-cyan-200 text-cyan-800" 
            : "bg-gray-100 text-gray-400"
          )}
        >
          {shieldActive ? "Shield Active 🛡️" : waterCharges > 0 ? "Hydration Shield 💧" : "Water Used"}
        </Button>
      </div>
      
      <div className="text-3xl font-extrabold text-indigo-900 bg-indigo-50 py-3 rounded-xl border-2 border-indigo-100">
        00:{timeLeft.toString().padStart(2, '0')}
      </div>
    </div>
  );
}

// GAME 3: Build-a-Plate
type FoodItem = { id: number; name: string; emoji: string; isGood: boolean; explanation: string; };
const GUT_FOODS: FoodItem[] = [
  { id: 1, name: 'Oats', emoji: '🥣', isGood: true, explanation: 'Rich in beta-glucan fiber, feeding good bacteria.' },
  { id: 2, name: 'Curd', emoji: '🥄', isGood: true, explanation: 'Packed with live probiotics that balance your gut flora.' },
  { id: 3, name: 'Apple', emoji: '🍎', isGood: true, explanation: 'Contains pectin, a prebiotic fiber that microbes love.' },
  { id: 4, name: 'Garlic', emoji: '🧄', isGood: true, explanation: 'A powerful prebiotic that fuels bifidobacteria.' },
  { id: 5, name: 'Lentils', emoji: '🍲', isGood: true, explanation: 'High in resistant starch to keep your microbiome diverse.' },
  { id: 6, name: 'Chia', emoji: '🌱', isGood: true, explanation: 'Forms a soothing gel that aids digestion and feeds microbes.' },
  { id: 7, name: 'Kimchi', emoji: '🥬', isGood: true, explanation: 'Fermented goodness full of beneficial lactic acid bacteria.' },
  { id: 8, name: 'Banana', emoji: '🍌', isGood: true, explanation: 'Provides inulin and resistant starch (especially when less ripe).' },
  { id: 9, name: 'Donut', emoji: '🍩', isGood: false, explanation: 'High in refined sugar, which feeds inflammation-causing bacteria.' },
  { id: 10, name: 'Soda', emoji: '🥤', isGood: false, explanation: 'Artificial sweeteners and sugar can disrupt your microbiome balance.' },
  { id: 11, name: 'Candy', emoji: '🍬', isGood: false, explanation: 'Spikes blood sugar and starves the beneficial fiber-eating bacteria.' },
  { id: 12, name: 'Fries', emoji: '🍟', isGood: false, explanation: 'Heavy in inflammatory oils with zero fiber for your gut bugs.' },
];

function GutHealthPlateGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [plate, setPlate] = useState<FoodItem[]>([]);
  const [status, setStatus] = useState<'playing' | 'done'>('playing');
  const [petHealth, setPetHealth] = useState(50);
  const [petState, setPetState] = useState<'idle' | 'happy' | 'sick'>('idle');
  const [floatingParticles, setFloatingParticles] = useState<{id: number, emoji: string}[]>([]);

  const handleTap = (food: FoodItem) => {
    if (status !== 'playing' || plate.length >= 5 || petState !== 'idle') return;
    
    const newHealth = Math.max(0, Math.min(100, petHealth + (food.isGood ? 20 : -20)));
    setPetHealth(newHealth);
    setPlate([...plate, food]);
    setPetState(food.isGood ? 'happy' : 'sick');
    
    const particle = { id: Date.now(), emoji: food.isGood ? '✨' : '💨' };
    setFloatingParticles([particle]);

    setTimeout(() => {
      setFloatingParticles([]);
      if (plate.length + 1 === 5) {
        setStatus('done');
      } else {
        setPetState('idle');
      }
    }, 1000);
  };

  const isWon = petHealth >= 70; 

  const getPetVisuals = () => {
    if (status === 'done') return isWon ? { emoji: '🥰', bg: 'bg-emerald-400 border-emerald-200', bounce: true } : { emoji: '🤒', bg: 'bg-rose-400 border-rose-200', shake: true };
    if (petState === 'happy') return { emoji: '😋', bg: 'bg-emerald-400 border-emerald-200', bounce: true };
    if (petState === 'sick') return { emoji: '🤢', bg: 'bg-rose-400 border-rose-200', shake: true };
    if (petHealth > 70) return { emoji: '😊', bg: 'bg-emerald-300 border-emerald-100' };
    if (petHealth < 30) return { emoji: '😵‍💫', bg: 'bg-rose-300 border-rose-100' };
    return { emoji: '🦠', bg: 'bg-indigo-300 border-indigo-100' };
  };

  const visuals = getPetVisuals();

  if (status === 'done') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 backdrop-blur-md rounded-3xl p-6 text-center shadow-lg border border-white/50">
        <div className="flex justify-center mb-4">
          <div className={cn("w-24 h-24 rounded-full flex items-center justify-center text-6xl shadow-md border-4", visuals.bg)}>
            {visuals.emoji}
          </div>
        </div>
        <h3 className={cn("text-2xl font-extrabold mb-4", isWon ? "text-emerald-600" : "text-rose-600")}>
          {isWon ? "Gubby is Thriving! ✨" : "Gubby is Starving! 📉"}
        </h3>
        <div className="space-y-2 mb-6 text-left h-56 overflow-y-auto pr-2 custom-scrollbar">
          {plate.map((food, i) => (
            <div key={i} className="flex gap-3 items-start bg-white p-3 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl bg-gray-50 rounded-full w-10 h-10 flex items-center justify-center shrink-0">{food.emoji}</div>
              <div>
                <p className="font-bold text-sm text-gray-800 flex items-center gap-1">
                  {food.name} {food.isGood ? <span className="text-emerald-500">✅</span> : <span className="text-rose-500">❌</span>}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{food.explanation}</p>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={() => onComplete(isWon ? 4 : 0)} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-white">Continue</Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/50 text-center relative overflow-hidden">
      <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Feed Your Microbiome</p>
      <p className="text-sm font-medium text-gray-600 mb-6">Keep Gubby in the green by picking 5 foods!</p>
      
      <div className="flex flex-col items-center justify-center mb-6 relative">
        <div className="relative">
          <motion.div 
            animate={
              visuals.bounce ? { y: [0, -18, 0], scale: [1, 1.12, 1] } : 
              visuals.shake ? { x: [-6, 6, -6, 6, 0], filter: "sepia(100%) hue-rotate(90deg)" } : 
              { y: [0, -6, 0] }
            }
            transition={ visuals.bounce || visuals.shake ? { duration: 0.6, ease: "easeInOut" } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }
            className={cn("w-28 h-28 rounded-full flex items-center justify-center text-6xl shadow-lg border-4 transition-colors duration-500 z-10 relative", visuals.bg)}
          >
            {visuals.emoji}
          </motion.div>
          <AnimatePresence>
            {floatingParticles.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, y: 0, scale: 0.4 }}
                animate={{ opacity: 0, y: -50, scale: 1.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-0 right-0 z-20 text-3xl pointer-events-none"
              >
                {p.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="w-full max-w-[200px] mt-4">
          <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            <span>HP</span>
            <span>{petHealth}/100</span>
          </div>
          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="h-full" 
              animate={{ 
                width: `${petHealth}%`, 
                backgroundColor: petHealth > 70 ? "#34D399" : petHealth >= 30 ? "#FBBF24" : "#EF4444" 
              }} 
              transition={{ type: "spring", stiffness: 80, damping: 15 }} 
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mb-6 h-10">
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className="w-10 h-10 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-xl shadow-inner">
            {plate[i] ? <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>{plate[i].emoji}</motion.span> : ''}
          </div>
        ))}
      </div>
      <div className={cn("grid grid-cols-4 gap-2 mb-2 transition-opacity duration-300", petState !== 'idle' ? "opacity-50 pointer-events-none" : "opacity-100")}>
        {GUT_FOODS.map(food => (
          <motion.button key={food.id} whileTap={{ scale: 0.9 }} onClick={() => handleTap(food)} className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 p-2 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-3xl mb-1">{food.emoji}</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase">{food.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// GAME 4: Hydration Hero 
type HydrationScenario = { prompt: string; icon: string; goodAction: string; goodExplanation: string; badAction: string; };
const HYDRATION_ROUNDS: HydrationScenario[] = [
  { prompt: "You feel suddenly anxious and jittery at your desk.", icon: '😰', goodAction: "Drink 2 Glasses of Water 💧", goodExplanation: "Mild cellular dehydration triggers physical stress responses that your brain misinterprets as anxiety.", badAction: "Grab an Espresso ☕" },
  { prompt: "Your afternoon focus is crashing and you feel sluggish.", icon: '🥱', goodAction: "Sip Coconut Water or Electrolytes 🥥", goodExplanation: "Water plus trace electrolytes instantly restores electrical signaling in your neurons.", badAction: "Eat a Sugary Snack 🍬" },
  { prompt: "You wake up with a dull headache and a foggy brain.", icon: '🤕', goodAction: "Drink Water Before Coffee 🌊", goodExplanation: "Your brain tissue temporarily shrinks during sleep-induced dehydration; water expands it back.", badAction: "Scroll Phone in Bed 📱" }
];

function HydrationGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'playing' | 'feedback' | 'done'>('playing');
  const [lastCorrect, setLastCorrect] = useState(false);

  const current = HYDRATION_ROUNDS[round];

  const handleChoice = (isGood: boolean) => {
    setLastCorrect(isGood);
    if (isGood) setScore(s => s + 1);
    setStatus('feedback');
  };

  const handleNext = () => {
    if (round < HYDRATION_ROUNDS.length - 1) {
      setRound(r => r + 1);
      setStatus('playing');
    } else {
      setStatus('done');
    }
  };

  if (status === 'done') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 backdrop-blur-md rounded-3xl p-8 text-center shadow-lg border border-white/50">
        <div className="text-6xl mb-4">🌊✨</div>
        <h3 className="text-2xl font-extrabold mb-2 text-cyan-800">Hydration Master!</h3>
        <p className="text-sm font-medium text-gray-700 mb-8">
          You scored {score}/3! You now know that before reaching for caffeine or snacks, a glass of water fixes brain fog and false anxiety.
        </p>
        <Button onClick={() => onComplete(score > 1 ? 4 : 1)} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-white">Continue</Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/50 text-center relative overflow-hidden">
      <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-2">Hydration Hero</p>
      
      <AnimatePresence mode="wait">
        {status === 'playing' ? (
          <motion.div key="playing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <span className="text-5xl block mb-4">{current.icon}</span>
            <h3 className="text-lg font-bold text-gray-800 mb-6">{current.prompt}</h3>
            
            <div className="space-y-3">
              <Button onClick={() => handleChoice(true)} className="w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-900 font-bold h-14 rounded-2xl shadow-sm border border-cyan-200">
                {current.goodAction}
              </Button>
              <Button onClick={() => handleChoice(false)} className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold h-14 rounded-2xl shadow-sm border border-gray-200">
                {current.badAction}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="feedback" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="flex justify-center mb-4">
              {lastCorrect ? <CheckCircle2 size={48} className="text-emerald-500" /> : <XCircle size={48} className="text-rose-500" />}
            </div>
            <h3 className={cn("text-xl font-extrabold mb-2", lastCorrect ? "text-emerald-600" : "text-rose-600")}>
              {lastCorrect ? "Smart Choice!" : "Not quite right!"}
            </h3>
            <p className="text-sm font-medium text-gray-700 mb-8">{current.goodExplanation}</p>
            <Button onClick={handleNext} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-white">
              {round < HYDRATION_ROUNDS.length - 1 ? 'Next Scenario' : 'Finish Game'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex justify-center gap-1">
        {HYDRATION_ROUNDS.map((_, i) => (
          <div key={i} className={cn("h-1.5 rounded-full transition-all", i <= round ? "w-4 bg-cyan-500" : "w-1.5 bg-gray-200")} />
        ))}
      </div>
    </div>
  );
}

// GAME 5: CIRCADIAN CLOCK BUILDER
type CircadianHabit = { 
  id: string; 
  name: string; 
  emoji: string; 
  minTime: number; 
  maxTime: number; 
  idealDisplay: string; 
  success: string; 
  failEarly: string; 
  failLate: string; 
};

const CIRCADIAN_HABITS: CircadianHabit[] = [
  { 
    id: 'sun', 
    name: 'Morning Sunlight', 
    emoji: '☀️', 
    minTime: 6.0, maxTime: 9.5, 
    idealDisplay: "6:00 AM - 9:30 AM", 
    success: "Perfect! Morning light triggers cortisol, waking up your teen brain and starting the countdown for evening melatonin.", 
    failEarly: "Wow, early bird! If you wake up before the sun, turn on bright indoor lights immediately so your brain knows it's daytime.",
    failLate: "Too late! Missing morning light makes it much harder to wake up for school and shifts your body clock even later." 
  },
  { 
    id: 'coffee', 
    name: 'Last Caffeine/Energy Drink', 
    emoji: '🥤', 
    minTime: 12, maxTime: 15, 
    idealDisplay: "Before 3:00 PM", 
    success: "Great! This gives your body enough time to clear out the caffeine before you try to sleep.", 
    failEarly: "Skipping the afternoon slump? Cutting off caffeine this early is totally fine, but if you need a boost, try splashing cold water on your face instead!",
    failLate: "Too late! Energy drinks and iced coffees have a 6-8 hour half-life. Drinking them late destroys your deep sleep." 
  },
  { 
    id: 'meal', 
    name: 'Last Heavy Meal', 
    emoji: '🍔', 
    minTime: 18, maxTime: 20.5, 
    idealDisplay: "6:00 PM - 8:30 PM", 
    success: "Nice! Giving your stomach 2-3 hours to digest means your core temperature can drop, which is required for sleep.", 
    failEarly: "A bit too early! If you eat dinner at 4 PM, you'll likely experience a blood sugar drop and wake up hungry in the middle of the night.",
    failLate: "Eating a heavy meal right before bed forces your gut to work overtime, raising your heart rate and ruining your sleep quality!" 
  },
  { 
    id: 'screens', 
    name: 'Screens Dimmed/Off', 
    emoji: '📱', 
    minTime: 21, maxTime: 22.5, 
    idealDisplay: "9:00 PM - 10:30 PM", 
    success: "Excellent. Giving your eyes a break from TikTok/Instagram blue light allows your brain to finally release melatonin.", 
    failEarly: "Super disciplined! Turning screens off this early is great for your brain, just make sure you switch to a relaxing low-light activity like reading.",
    failLate: "Blue light at this hour tricks your brain into thinking the sun is still up, completely blocking your sleep hormones!" 
  },
  { 
    id: 'sleep', 
    name: 'Consistent Bedtime', 
    emoji: '😴', 
    minTime: 21.5, maxTime: 23.5, 
    idealDisplay: "9:30 PM - 11:30 PM", 
    success: "Ideal! Going to bed at the same time anchors your internal clock. Consistency makes waking up way less painful.", 
    failEarly: "Too early! Trying to force sleep before your body's 'sleep gate' opens just leads to tossing, turning, and sleep anxiety.",
    failLate: "A bit off-schedule! Teen body clocks naturally want to stay up late, but consistency is the only way to not feel exhausted." 
  }
];

function CircadianClockGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [round, setRound] = useState(0);
  const [time, setTime] = useState(12); 
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'playing' | 'feedback' | 'done'>('playing');
  const [feedbackType, setFeedbackType] = useState<'success' | 'early' | 'late'>('success');

  const current = CIRCADIAN_HABITS[round];

  const formatTime = (t: number) => {
    const h = Math.floor(t);
    const m = t % 1 === 0.5 ? '30' : '00';
    const period = h >= 12 && h < 24 ? 'PM' : 'AM';
    const displayH = h > 12 ? h - 12 : (h === 24 ? 12 : h);
    return `${displayH}:${m} ${period}`;
  };

  const getSkyColor = (t: number) => {
    if (t >= 6 && t < 8.5) return "from-orange-300 to-blue-400"; 
    if (t >= 8.5 && t < 16) return "from-sky-400 to-blue-300"; 
    if (t >= 16 && t < 19.5) return "from-indigo-400 to-orange-400"; 
    return "from-slate-900 to-indigo-900"; 
  };

  const getSunMoonProps = (t: number) => {
    const isNight = t < 6 || t >= 19.5;
    const emoji = isNight ? '🌙' : '☀️';
    let percent = 0;
    if (!isNight) {
      percent = ((t - 6) / 13.5) * 100; 
    } else {
      percent = ((t - 19.5) / 4.5) * 100; 
    }
    return { emoji, percent: Math.min(Math.max(percent, 5), 95) }; 
  };

  const handleLockTime = () => {
    let type: 'success' | 'early' | 'late' = 'success';
    
    if (time < current.minTime) {
      type = 'early';
    } else if (time > current.maxTime) {
      type = 'late';
    }

    setFeedbackType(type);
    if (type === 'success') setScore(s => s + 1);
    setStatus('feedback');
  };

  const handleNext = () => {
    if (round < CIRCADIAN_HABITS.length - 1) {
      setRound(r => r + 1);
      setTime(12); 
      setStatus('playing');
    } else {
      setStatus('done');
    }
  };

  if (status === 'done') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 backdrop-blur-md rounded-3xl p-8 text-center shadow-lg border border-white/50">
        <div className="text-6xl mb-4">⏱️</div>
        <h3 className="text-2xl font-extrabold mb-2 text-indigo-800">Master of Time!</h3>
        <p className="text-sm font-medium text-gray-700 mb-8">
          You scheduled {score}/5 habits correctly. You now understand that sleep hygiene isn't just about what you do in bed—it's a 24-hour cycle that starts the minute you wake up!
        </p>
        <Button onClick={() => onComplete(score >= 4 ? 4 : 1)} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-white">Continue</Button>
      </motion.div>
    );
  }

  const skyVisuals = getSunMoonProps(time);
  const isSuccess = feedbackType === 'success';
  const feedbackExplanation = isSuccess ? current.success : (feedbackType === 'early' ? current.failEarly : current.failLate);

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/50 text-center relative overflow-hidden">
      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Circadian Builder</p>
      
      <AnimatePresence mode="wait">
        {status === 'playing' ? (
          <motion.div key="playing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p className="text-sm font-bold text-gray-800 mb-4">When should you schedule:</p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 mb-6 flex items-center justify-center gap-2 shadow-sm">
              <span className="text-2xl">{current.emoji}</span>
              <span className="font-extrabold text-indigo-900">{current.name}</span>
            </div>
            
            <div className={cn("relative w-full h-32 rounded-2xl mb-6 overflow-hidden transition-all duration-500 bg-gradient-to-b border border-black/5 shadow-inner", getSkyColor(time))}>
              <div 
                className="absolute text-4xl transition-all duration-200"
                style={{ left: `${skyVisuals.percent}%`, bottom: '20%', transform: 'translateX(-50%)' }}
              >
                {skyVisuals.emoji}
              </div>
              <div className="absolute bottom-0 w-full h-1/4 bg-black/20" />
            </div>
            
            <div className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {formatTime(time)}
            </div>

            <input 
              type="range" 
              min="6" max="24" step="0.5" 
              value={time} 
              onChange={(e) => setTime(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-6"
            />

            <Button onClick={handleLockTime} className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl text-white font-bold text-lg shadow-sm">
              Lock Time ⏱️
            </Button>
            <p className="text-[10px] text-gray-400 mt-3 font-medium uppercase tracking-wider">Drag slider to adjust sky</p>
          </motion.div>
        ) : (
          <motion.div key="feedback" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="flex justify-center mb-4">
              {isSuccess ? <CheckCircle2 size={48} className="text-emerald-500" /> : <XCircle size={48} className="text-rose-500" />}
            </div>
            <h3 className={cn("text-xl font-extrabold mb-2", isSuccess ? "text-emerald-600" : "text-rose-600")}>
              {isSuccess ? "Perfect Timing!" : (feedbackType === 'early' ? "Too Early!" : "Too Late!")}
            </h3>
            <p className="text-sm font-bold text-gray-800 mb-2">Ideal Window: {current.idealDisplay}</p>
            <p className="text-sm font-medium text-gray-700 mb-8">{feedbackExplanation}</p>
            <Button onClick={handleNext} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-white">
              {round < CIRCADIAN_HABITS.length - 1 ? 'Next Habit' : 'Finish Clock'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-6 flex justify-center gap-1">
        {CIRCADIAN_HABITS.map((_, i) => (
          <div key={i} className={cn("h-1.5 rounded-full transition-all", i <= round ? "w-4 bg-indigo-500" : "w-1.5 bg-gray-200")} />
        ))}
      </div>
    </div>
  );
}

// GAME 6: The Swap It Challenge
type SwapRound = { craving: string; cravingEmoji: string; correct: string; correctEmoji: string; wrong: string; wrongEmoji: string; explanation: string };
const SWAP_ROUNDS: SwapRound[] = [
  { craving: "Sugary Donut", cravingEmoji: "🍩", correct: "Apple & Almonds", correctEmoji: "🍎🥜", wrong: "Energy Drink", wrongEmoji: "🥤", explanation: "Apples and almonds provide fiber and healthy fats, giving you steady energy instead of a rapid sugar crash!" },
  { craving: "Potato Chips", cravingEmoji: "🍟", correct: "Roasted Chickpeas", correctEmoji: "🥙", wrong: "Pretzels", wrongEmoji: "🥨", explanation: "Chickpeas offer protein and fiber to keep you genuinely full, whereas pretzels are just empty carbs." },
  { craving: "Ice Cream", cravingEmoji: "🍦", correct: "Greek Yogurt & Fruit", correctEmoji: "🍨", wrong: "Candy Bar", wrongEmoji: "🍫", explanation: "Greek yogurt provides satisfying protein and natural sweetness without the massive cortisol and sugar spike." },
  { craving: "Chocolate Bar", cravingEmoji: "🍫", correct: "Dark Choc & Nuts", correctEmoji: "🍫🌰", wrong: "Gummy Bears", wrongEmoji: "🍬", explanation: "Dark chocolate satisfies the craving while nuts add healthy brain fats. Gummy bears are just pure refined sugar!" },
  { craving: "Sugary Soda", cravingEmoji: "🥤", correct: "Iced Green Tea", correctEmoji: "🍵🧊", wrong: "Processed Juice", wrongEmoji: "🧃", explanation: "Fruit juice has the fiber stripped out, spiking your blood sugar just like soda! Unsweetened green tea provides steady hydration and antioxidants." }
];

function FoodSwapGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'playing' | 'feedback' | 'done'>('playing');
  const [lastGuess, setLastGuess] = useState<boolean>(false);
  
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const current = SWAP_ROUNDS[round];

  const handleSwap = (isCorrect: boolean) => {
    setLastGuess(isCorrect);
    if (isCorrect) setScore(s => s + 1);
    setStatus('feedback');
  };

  const handleDragEnd = (e: any, info: any, isCorrect: boolean) => {
    if (!dropZoneRef.current) return;
    const rect = dropZoneRef.current.getBoundingClientRect();
    
    let clientX = info.point.x;
    let clientY = info.point.y;

    if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else if (e.clientX !== undefined && e.clientY !== undefined) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const buffer = 50;

    if (
      clientX >= (rect.left - buffer) &&
      clientX <= (rect.right + buffer) &&
      clientY >= (rect.top - buffer) &&
      clientY <= (rect.bottom + buffer)
    ) {
      handleSwap(isCorrect);
    }
  };

  const handleNext = () => {
    if (round < SWAP_ROUNDS.length - 1) {
      setRound(r => r + 1);
      setStatus('playing');
    } else {
      setStatus('done');
    }
  };

  if (status === 'done') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 backdrop-blur-md rounded-3xl p-8 text-center shadow-lg border border-white/50">
        <div className="text-6xl mb-4">⚖️</div>
        <h3 className="text-2xl font-extrabold mb-2 text-indigo-700">Macros Balanced!</h3>
        <p className="text-sm font-medium text-gray-700 mb-8">
          You made {score}/{SWAP_ROUNDS.length} healthy food swaps! By choosing complex carbs, fiber, and protein over simple sugars, you keep your blood sugar steady and avoid energy crashes.
        </p>
        <Button onClick={() => onComplete(score > 2 ? 4 : 1)} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-white">Continue</Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/50 text-center relative overflow-hidden">
      <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">The Swap It Challenge</p>
      
      <AnimatePresence mode="wait">
        {status === 'playing' ? (
          <motion.div key="playing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p className="text-sm font-medium text-gray-600 mb-4">Drag a healthy swap into the drop zone!</p>
            
            <div 
              ref={dropZoneRef}
              className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-6 mb-8 text-center relative"
            >
              <span className="text-4xl block mb-2">{current.cravingEmoji}</span>
              <p className="font-bold text-amber-900 line-through decoration-amber-400 decoration-2">{current.craving}</p>
              
              <div className="absolute inset-0 bg-amber-200/20 rounded-2xl animate-pulse pointer-events-none" />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-200 shadow-sm">
                DROP ZONE
              </span>
            </div>
            
            <div className="flex justify-between font-bold text-gray-700 mb-2">
              <span className="text-xs">Physical Swap Options ⬆️</span>
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-20">
              <motion.div 
                drag
                dragSnapToOrigin={true}
                dragElastic={0.2}
                whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                onDragEnd={(e, info) => handleDragEnd(e, info, false)}
                className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold h-24 rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-1 shadow-sm cursor-grab touch-none"
              >
                <div className="absolute top-1 right-2 text-gray-300">⠿</div>
                <span className="text-2xl">{current.wrongEmoji}</span>
                <span className="text-xs px-1 text-center leading-tight">{current.wrong}</span>
              </motion.div>

              <motion.div 
                drag
                dragSnapToOrigin={true}
                dragElastic={0.2}
                whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                onDragEnd={(e, info) => handleDragEnd(e, info, true)}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold h-24 rounded-2xl border border-emerald-200 flex flex-col items-center justify-center gap-1 shadow-sm cursor-grab touch-none"
              >
                <div className="absolute top-1 right-2 text-emerald-300">⠿</div>
                <span className="text-2xl">{current.correctEmoji}</span>
                <span className="text-xs px-1 whitespace-normal text-center leading-tight">{current.correct}</span>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="feedback" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="flex justify-center mb-4">
              {lastGuess ? <CheckCircle2 size={48} className="text-emerald-500" /> : <XCircle size={48} className="text-rose-500" />}
            </div>
            <h3 className={cn("text-xl font-extrabold mb-2", lastGuess ? "text-emerald-600" : "text-rose-600")}>
              {lastGuess ? "Perfect Swap!" : "Sugar Crash! 📉"}
            </h3>
            <p className="text-sm font-medium text-gray-700 mb-8">{current.explanation}</p>
            <Button onClick={handleNext} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-white">
              {round < SWAP_ROUNDS.length - 1 ? 'Next Round' : 'Finish Game'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-6 flex justify-center gap-1">
        {SWAP_ROUNDS.map((_, i) => (
          <div key={i} className={cn("h-1.5 rounded-full transition-all", i <= round ? "w-4 bg-amber-500" : "w-1.5 bg-gray-200")} />
        ))}
      </div>
    </div>
  );
}

// ─── Article Data & Unique Question Sets ────────────────────────────────────

const articles = [
  {
    id: 1, emoji: '🧠', title: 'Why stress makes you hungrier', color: 'bg-orange-50 text-orange-900',
    takeaway: "It's not weak willpower — it's cortisol. Knowing this = the power to pause.", Chart: StressHungerFlow,
    GameComponent: CortisolSliderGame, 
    questions: [
      { text: "Stress directly spikes your blood sugar.", isFact: true, explanation: "Cortisol triggers your liver to release glucose for quick energy!" },
      { text: "Craving a donut when stressed means you have no willpower.", isFact: false, explanation: "It is a biological response. Your brain is demanding fast-acting energy." }
    ]
  },
  {
    id: 2, emoji: '🥗', title: 'What is gut health anyway?', color: 'bg-green-50 text-green-900',
    takeaway: "Feed your gut bacteria fibre (apples, oats, curd) and they'll keep your mood and digestion balanced.", Chart: GutHealthFlow,
    GameComponent: GutHealthPlateGame, 
    questions: [
      { text: "All bacteria in your gut are bad for you.", isFact: false, explanation: "You have trillions of 'good' bacteria that digest food and create vitamins." },
      { text: "Your gut produces most of your body's serotonin.", isFact: true, explanation: "Around 90% of your 'happy hormone' is made in your digestive tract!" }
    ]
  },
  {
    id: 3, emoji: '💧', title: 'How hydration affects your mood', color: 'bg-cyan-50 text-cyan-900',
    takeaway: "Before deciding you need a nap or a snack — drink a glass of water first, always.", Chart: HydrationFlow,
    GameComponent: HydrationGame, 
    questions: [
      { text: "You should only drink water when you feel thirsty.", isFact: false, explanation: "Thirst is a late sign of dehydration. Keep sipping steadily." },
      { text: "Dehydration can masquerade as anxiety.", isFact: true, explanation: "Even mild dehydration causes physical stress that your brain misinterprets as anxiety." }
    ]
  },
  {
    id: 4, emoji: '😴', title: 'Why sleep is the secret weapon', color: 'bg-indigo-50 text-indigo-900',
    takeaway: "8–9 hours isn't optional. It's when your body fixes everything else.", Chart: SleepFlow,
    GameComponent: CircadianClockGame, 
    questions: [
      { text: "You can 'catch up' on missed sleep during the weekend.", isFact: false, explanation: "Binge-sleeping doesn't undo the metabolic damage of sleep deprivation during the week." },
      { text: "Lack of sleep increases your hunger hormones.", isFact: true, explanation: "Poor sleep spikes ghrelin (hunger) and lowers leptin (fullness)." }
    ]
  },
  {
    id: 5, emoji: '🍽', title: 'Emotional vs physical hunger', color: 'bg-peach text-orange-900',
    takeaway: "Both are normal. The skill is noticing which one is talking.", Chart: HungerDecisionTree,
    GameComponent: FoodSwapGame, 
    questions: [
      { text: "Physical hunger usually comes on suddenly.", isFact: false, explanation: "Physical hunger builds gradually. Emotional hunger hits you like a lightning bolt." },
      { text: "Emotional hunger rarely feels satisfied when full.", isFact: true, explanation: "Because you aren't feeding the stomach, you are trying to feed a feeling." }
    ]
  },
  {
    id: 6, emoji: '🌱', title: 'The stress-sleep-hunger cycle', color: 'bg-mint text-green-900',
    takeaway: "Everything connects. Every small good habit ripples through the whole loop.", Chart: StressCycleFlow,
    questions: [
      { text: "You have to fix your sleep, stress, and diet all at the exact same time.", isFact: false, explanation: "Fixing just ONE thing (like drinking more water) positively ripples through the entire cycle." },
      { text: "High stress can directly slow down your digestion.", isFact: true, explanation: "When stressed, your body diverts blood away from your gut, slowing digestion down." }
    ]
  },
];

export default function Learn() {
  const [selected, setSelected] = useState<number | null>(null);
  const [playState, setPlayState] = useState<'idle' | 'playing_custom' | 'transition' | 'playing_quiz' | 'done'>('idle');
  const [sliderScore, setSliderScore] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  
  const { addPoints } = useAppContext();
  const active = articles.find(a => a.id === selected);
  const awarded = React.useRef(new Set<number>());

  const openArticle = (id: number) => {
    setSelected(id);
    setPlayState('idle');
    setSliderScore(0);
    setQuizScore(0);
    if (!awarded.current.has(id)) {
      addPoints(5);
      awarded.current.add(id);
    }
  };

  const startGame = () => {
    if (active?.GameComponent) {
      setPlayState('playing_custom');
    } else {
      setPlayState('playing_quiz');
    }
  };

  const skipBonusRound = () => {
    setPlayState('done');
    if (sliderScore > 0) addPoints(sliderScore * 5); 
  };

  return (
    <Page className="p-6 pt-12 pb-24 bg-gray-50">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Learn 📚</h1>
        <p className="text-gray-500 text-sm font-medium mb-8">Tap any topic to see how it works — visually.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {articles.map((article, i) => (
          <motion.div key={article.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card tappable className={cn('border-none flex items-center p-5 gap-4 shadow-sm', article.color)} onClick={() => openArticle(article.id)}>
              <div className="text-4xl bg-white/50 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">{article.emoji}</div>
              <div className="flex-1">
                <h2 className="font-bold text-lg leading-tight">{article.title}</h2>
                <p className="text-xs opacity-60 font-medium mt-1">Tap to see the flowchart →</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && active && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 220 }} className={cn('fixed inset-0 z-50 overflow-y-auto', active.color)}>
            <div className="p-6 pt-12 max-w-md mx-auto min-h-full pb-20">
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => setSelected(null)} className="bg-white/50 p-2 rounded-full inline-flex items-center justify-center backdrop-blur-sm">
                  <ArrowLeft size={22} />
                </button>
              </div>

              <div className="text-5xl mb-4">{active.emoji}</div>
              <h1 className="text-2xl font-extrabold mb-8 leading-tight">{active.title}</h1>

              <AnimatePresence mode="wait">
                
                {playState === 'playing_custom' && active.GameComponent && (
                  <motion.div key="custom_game" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <active.GameComponent onComplete={(score) => {
                      setSliderScore(score);
                      setPlayState('transition');
                    }} />
                  </motion.div>
                )}

                {playState === 'transition' && (
                  <motion.div key="transition" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 backdrop-blur-md rounded-3xl p-8 text-center shadow-lg border border-white/50">
                    <div className="text-6xl mb-4">🎁</div>
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Bonus Round Unlocked!</h2>
                    <p className="text-gray-600 font-medium mb-6">You secured <span className="font-bold text-amber-500">{sliderScore * 5} VP</span>! Answer two quick questions to earn even more.</p>
                    <div className="space-y-3">
                      <Button onClick={() => setPlayState('playing_quiz')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl">
                        Start Bonus Quiz 🧠
                      </Button>
                      <Button onClick={skipBonusRound} variant="ghost" className="w-full text-gray-500 hover:text-gray-700">
                        No thanks, collect my VP
                      </Button>
                    </div>
                  </motion.div>
                )}

                {playState === 'playing_quiz' && (
                  <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <MythVsFactGame questions={active.questions || []} onComplete={(score) => {
                      setQuizScore(score);
                      const totalVP = (sliderScore * 5) + (score * 5);
                      if (totalVP > 0) addPoints(totalVP);
                      setPlayState('done');
                    }} />
                  </motion.div>
                )}

                {playState === 'done' && (
                  <motion.div key="score" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 backdrop-blur-md rounded-3xl p-8 text-center shadow-lg border border-white/50">
                    <div className="text-6xl mb-4">🏆</div>
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Knowledge Checked!</h2>
                    <p className="text-gray-600 font-medium mb-4">
                      You earned a total of <span className="font-bold text-amber-500">{(sliderScore * 5) + (quizScore * 5)} VP</span>!
                    </p>
                    <Button onClick={() => setSelected(null)} className="w-full bg-gray-900 text-white rounded-xl">Back to Menu</Button>
                  </motion.div>
                )}

                {playState === 'idle' && (
                  <motion.div key="flowchart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="bg-white/50 rounded-3xl p-5 mb-6 backdrop-blur-sm">
                      <active.Chart />
                    </div>
                    <div className="bg-white/70 rounded-2xl p-5 backdrop-blur-sm">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Key Takeaway 💡</p>
                      <p className="font-bold text-gray-800 leading-relaxed">{active.takeaway}</p>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
                      <div className="absolute -right-4 -top-6 text-8xl opacity-20 transform rotate-12 pointer-events-none">🎮</div>
                      <div className="absolute -left-6 -bottom-6 text-6xl opacity-20 transform -rotate-12 pointer-events-none">✨</div>
                      <div className="relative z-10">
                        <h3 className="font-extrabold text-xl mb-1">Ready to play?</h3>
                        <p className="text-indigo-100 text-sm font-medium mb-5">
                          {active.GameComponent ? "Play a quick game and unlock a bonus round for up to 30 VP!" : "Test your knowledge on this topic and earn up to 10 VP!"}
                        </p>
                        <Button onClick={startGame} className="w-full bg-white text-indigo-600 hover:bg-gray-50 rounded-xl font-bold h-12 shadow-sm">
                          Start Mini-Game 🚀
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Page>
  );
}
