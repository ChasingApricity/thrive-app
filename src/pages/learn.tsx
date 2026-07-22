import React, { useState } from 'react';
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
// (Flowchart components remain unchanged)

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

// ─── Mini-Game Engine ───────────────────────────────────────────────────

type Question = { text: string; isFact: boolean; explanation: string; };

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

// ─── Article Data & Unique Question Sets ────────────────────────────────────

const articles = [
  {
    id: 1, emoji: '🧠', title: 'Why stress makes you hungrier', color: 'bg-orange-50 text-orange-900',
    takeaway: "It's not weak willpower — it's cortisol. Knowing this = the power to pause.", Chart: StressHungerFlow,
    questions: [
      { text: "Stress directly spikes your blood sugar.", isFact: true, explanation: "Cortisol triggers your liver to release glucose for quick energy!" },
      { text: "Craving a donut when stressed means you have no willpower.", isFact: false, explanation: "It is a biological response. Your brain is demanding fast-acting energy." }
    ]
  },
  {
    id: 2, emoji: '🥗', title: 'What is gut health anyway?', color: 'bg-green-50 text-green-900',
    takeaway: "Feed your gut bacteria fibre (apples, oats, curd) and they'll keep your mood and digestion balanced.", Chart: GutHealthFlow,
    questions: [
      { text: "All bacteria in your gut are bad for you.", isFact: false, explanation: "You have trillions of 'good' bacteria that digest food and create vitamins." },
      { text: "Your gut produces most of your body's serotonin.", isFact: true, explanation: "Around 90% of your 'happy hormone' is made in your digestive tract!" }
    ]
  },
  {
    id: 3, emoji: '💧', title: 'How hydration affects your mood', color: 'bg-cyan-50 text-cyan-900',
    takeaway: "Before deciding you need a nap or a snack — drink a glass of water first, always.", Chart: HydrationFlow,
    questions: [
      { text: "You should only drink water when you feel thirsty.", isFact: false, explanation: "Thirst is a late sign of dehydration. Keep sipping steadily." },
      { text: "Dehydration can masquerade as anxiety.", isFact: true, explanation: "Even mild dehydration causes physical stress that your brain misinterprets as anxiety." }
    ]
  },
  {
    id: 4, emoji: '😴', title: 'Why sleep is the secret weapon', color: 'bg-indigo-50 text-indigo-900',
    takeaway: "8–9 hours isn't optional. It's when your body fixes everything else.", Chart: SleepFlow,
    questions: [
      { text: "You can 'catch up' on missed sleep during the weekend.", isFact: false, explanation: "Binge-sleeping doesn't undo the metabolic damage of sleep deprivation during the week." },
      { text: "Lack of sleep increases your hunger hormones.", isFact: true, explanation: "Poor sleep spikes ghrelin (hunger) and lowers leptin (fullness)." }
    ]
  },
  {
    id: 5, emoji: '🍽', title: 'Emotional vs physical hunger', color: 'bg-peach text-orange-900',
    takeaway: "Both are normal. The skill is noticing which one is talking.", Chart: HungerDecisionTree,
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameScore, setGameScore] = useState<number | null>(null);
  
  const { addPoints } = useAppContext();
  const active = articles.find(a => a.id === selected);
  const awarded = React.useRef(new Set<number>());

  const openArticle = (id: number) => {
    setSelected(id);
    setIsPlaying(false);
    setGameScore(null);
    if (!awarded.current.has(id)) {
      addPoints(5);
      awarded.current.add(id);
    }
  };

  const handleGameComplete = (score: number) => {
    setGameScore(score);
    setIsPlaying(false); 
    if (score > 0) addPoints(score * 5); 
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
                {isPlaying ? (
                  <motion.div key="game" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    {/* Now passing the UNIQUE questions into the engine! */}
                    <MythVsFactGame questions={active.questions} onComplete={handleGameComplete} />
                  </motion.div>
                ) : gameScore !== null ? (
                  <motion.div key="score" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 backdrop-blur-md rounded-3xl p-8 text-center shadow-lg">
                    <div className="text-6xl mb-4">🏆</div>
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-2">You scored {gameScore}/{active.questions.length}!</h2>
                    <p className="text-gray-600 font-medium mb-4">You earned <span className="font-bold text-amber-500">+{gameScore * 5} VP</span> for playing.</p>
                    <Button onClick={() => setSelected(null)} className="w-full bg-gray-900 text-white rounded-xl">Back to Menu</Button>
                  </motion.div>
                ) : (
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
                        <p className="text-indigo-100 text-sm font-medium mb-5">Test your knowledge on this topic and earn up to 10 VP!</p>
                        <Button onClick={() => setIsPlaying(true)} className="w-full bg-white text-indigo-600 hover:bg-gray-50 rounded-xl font-bold h-12 shadow-sm">
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
