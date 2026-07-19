import React from 'react';
import { useLocation } from 'wouter';
import { Page } from '@/components/layout/page';
import { Card } from '@/components/ui/card';
import { useAppContext, getLevelForPoints, getNextLevel } from '@/hooks/useAppContext';
import { Sun, Moon, Utensils, Wind, Zap, Flame, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

function getStressInfo(stress: string) {
  if (stress === 'Calm') return { emoji: '😌', value: 'Calm', color: 'bg-yellow-50 text-yellow-700' };
  if (stress === 'A bit tense') return { emoji: '🙂', value: 'A bit tense', color: 'bg-sky-50 text-sky-700' };
  if (stress === 'Pretty stressed') return { emoji: '😟', value: 'Stressed', color: 'bg-orange-50 text-orange-700' };
  if (stress === 'Overwhelmed') return { emoji: '😰', value: 'Overwhelmed', color: 'bg-red-50 text-red-700' };
  return { emoji: '😌', value: 'Unknown', color: 'bg-gray-50 text-gray-700' };
}

function getMoodEmoji(mood: string) {
  const map: Record<string, string> = { Low: '😶‍🌫️', Meh: '😕', Okay: '😐', 'Pretty good': '🙂', 'Great!': '😄' };
  return map[mood] || '😐';
}

function getGutInfo(gut: string) {
  if (gut.includes('smooth'))   return { label: 'Good',      color: 'bg-green-50 text-green-700' };
  if (gut.includes('Bloating')) return { label: 'Bloating',  color: 'bg-orange-50 text-orange-700' };
  if (gut.includes('Irregular'))return { label: 'Irregular', color: 'bg-yellow-50 text-yellow-700' };
  if (gut.includes('Sensitive'))return { label: 'Sensitive', color: 'bg-red-50 text-red-700' };
  if (gut.includes('Frequent')) return { label: 'Discomfort',color: 'bg-red-100 text-red-800' };
  return { label: 'OK', color: 'bg-gray-50 text-gray-700' };
}

function getHungerType(hunger: string) {
  if (hunger.includes('Regular')) return 'Balanced';
  if (hunger.includes('skip'))    return 'Irregular';
  if (hunger.includes('snack'))   return 'Snacking';
  if (hunger.includes('stressed'))return 'Emotional';
  if (hunger.includes('night'))   return 'Night Eater';
  return 'Balanced';
}

function getTodayInsight(assessment: NonNullable<ReturnType<typeof useAppContext>['user']['assessment']>) {
  if (assessment.stress === 'Overwhelmed') return "High stress can trigger cravings. Take 3 deep breaths before your next snack. 🫁";
  if (assessment.sleepHours === 'Under 5h') return "Low sleep affects hunger hormones — you may crave sugar today. Stay hydrated! 💧";
  if (assessment.hungerPattern.includes('stressed')) return "You tend to eat when stressed. Try a 5-min body scan before reaching for food. 🧘";
  if (assessment.gutSymptoms.includes('Bloating')) return "You reported bloating — stay hydrated and try warm meals today. 🫖";
  if (assessment.waterGlasses < 4) return "You're drinking less than 4 glasses a day. Start with a glass right now! 💧";
  if (assessment.goals.includes('Less stress')) return "Your goal is less stress — try the box breathing exercise today. 🌬️";
  return "Every small healthy choice compounds. You're doing great! ✨";
}

function VitalityBanner() {
  const { user } = useAppContext();
  const [, setLocation] = useLocation();
  const current = getLevelForPoints(user.vitalityPoints);
  const next = getNextLevel(user.vitalityPoints);
  const ptsInRange = next ? next.minPoints - current.minPoints : 1;
  const ptsEarned = next ? user.vitalityPoints - current.minPoints : ptsInRange;
  const pct = Math.min(100, Math.round((ptsEarned / ptsInRange) * 100));

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => setLocation('/progress')}
      className="w-full text-left mb-6"
    >
      <Card
        className="border-none shadow-md p-4 overflow-hidden relative"
        style={{ background: `linear-gradient(135deg, ${current.color}25, white 70%)` }}
      >
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-5xl opacity-10 pointer-events-none">
          {current.emoji}
        </div>

        <div className="flex items-center gap-3 mb-3">
          {/* Level badge */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 border-2"
            style={{ backgroundColor: current.color + '30', borderColor: current.color + '60' }}
          >
            {current.emoji}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-gray-800">Lv {current.level} · {current.name}</span>
              <div className="flex items-center gap-0.5">
                <Zap size={12} className="text-amber-500" />
                <span className="font-extrabold text-amber-600 text-sm">{user.vitalityPoints} VP</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <Flame size={12} className="text-orange-400" />
              <span className="text-xs font-bold text-orange-500">{user.streak}-day streak</span>
              {next && <span className="text-[10px] text-gray-400 font-medium ml-auto">{next.minPoints - user.vitalityPoints} VP to {next.name}</span>}
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-300 shrink-0" />
        </div>

        {/* Progress bar */}
        {next && (
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: current.color }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        )}
      </Card>
    </motion.button>
  );
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { user } = useAppContext();
  const a = user.assessment;

  const stressInfo = getStressInfo(a?.stress || 'Calm');
  const gut = getGutInfo(a?.gutSymptoms || '');

  const snapshots = [
    { label: 'Mood',    value: a?.mood || 'Okay',                         emoji: getMoodEmoji(a?.mood || 'Okay'), color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Stress',  value: stressInfo.value,                           emoji: stressInfo.emoji,                color: stressInfo.color },
    { label: 'Hunger',  value: getHungerType(a?.hungerPattern || ''),      emoji: '🍽',                            color: 'bg-green-50 text-green-700' },
    { label: 'Gut',     value: gut.label,                                  emoji: '🥗',                            color: gut.color },
    { label: 'Water',   value: `${a?.waterGlasses || 4}/8`,               emoji: '💧',                            color: 'bg-cyan-50 text-cyan-700' },
  ];

  return (
    <Page className="pt-12 px-6 bg-[#FAFAFA]">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
          Good morning, {user.name} ✨
        </h1>
        <p className="text-gray-500 font-medium">How are we feeling today?</p>
      </motion.div>

      {/* Vitality Points Banner */}
      <VitalityBanner />

      {/* Horizontal Snapshots */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-6 -mx-6 px-6 snap-x">
        {snapshots.map((snap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className={cn('min-w-[110px] snap-center shrink-0 p-4 border-none shadow-sm flex flex-col gap-2', snap.color)}>
              <div className="text-2xl">{snap.emoji}</div>
              <div>
                <div className="text-[10px] font-bold opacity-60 uppercase tracking-wider">{snap.label}</div>
                <div className="font-bold text-gray-800 text-sm mt-0.5">{snap.value}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Goals row */}
      {a?.goals && a.goals.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Your Goals</h2>
          <div className="flex gap-2 flex-wrap">
            {a.goals.map((goal, i) => (
              <span key={i} className="bg-primary/10 text-primary font-bold text-xs px-3 py-1.5 rounded-full">
                {goal}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Daily Journey */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Your Daily Journey</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card tappable color="peach" onClick={() => setLocation('/checkin/morning')} className="p-5 flex flex-col justify-between h-32 border-none">
            <Sun className="text-orange-500" size={28} />
            <div>
              <span className="font-bold text-orange-900 leading-tight block">Morning Check-in</span>
              <span className="text-[10px] font-bold text-orange-400 flex items-center gap-1 mt-1"><Zap size={9} />+15 VP</span>
            </div>
          </Card>
          <Card tappable color="mint" onClick={() => setLocation('/meals')} className="p-5 flex flex-col justify-between h-32 border-none">
            <Utensils className="text-green-600" size={28} />
            <div>
              <span className="font-bold text-green-900 leading-tight block">Meal & Hunger</span>
              <span className="text-[10px] font-bold text-green-500 flex items-center gap-1 mt-1"><Zap size={9} />+10 VP per log</span>
            </div>
          </Card>
          <Card tappable color="lavender" onClick={() => setLocation('/stress-relief')} className="p-5 flex flex-col justify-between h-32 border-none">
            <Wind className="text-purple-600" size={28} />
            <div>
              <span className="font-bold text-purple-900 leading-tight block">Stress Relief</span>
              <span className="text-[10px] font-bold text-purple-400 flex items-center gap-1 mt-1"><Zap size={9} />+5 VP</span>
            </div>
          </Card>
          <Card tappable color="white" onClick={() => setLocation('/checkin/night')} className="p-5 flex flex-col justify-between h-32 bg-indigo-50 border-none">
            <Moon className="text-indigo-600" size={28} />
            <div>
              <span className="font-bold text-indigo-900 leading-tight block">Night Reflection</span>
              <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1 mt-1"><Zap size={9} />+15 VP</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Today's Insight */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Today's Insight</h2>
        <Card className="bg-gradient-to-br from-mint to-white border-none shadow-sm p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 text-8xl opacity-10 translate-x-4 -translate-y-4">🧠</div>
          <p className="font-bold text-lg text-gray-800 leading-snug relative z-10">
            {a ? getTodayInsight(a) : "Every small healthy choice compounds. You're doing great! ✨"}
          </p>
        </Card>
      </div>
    </Page>
  );
}
