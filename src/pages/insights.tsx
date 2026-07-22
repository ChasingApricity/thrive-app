import React, { useRef, useState } from 'react';
import { Page } from '@/components/layout/page';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useAppContext } from '@/hooks/useAppContext';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

function getRadarData(assessment: NonNullable<ReturnType<typeof useAppContext>['user']['assessment']>) {
  const stressScore = { Calm: 90, 'A bit tense': 70, 'Pretty stressed': 45, Overwhelmed: 20 }[assessment.stress] ?? 55;
  const sleepScore = { Blissful: 95, Deep: 85, Okay: 65, Light: 45, Restless: 25 }[assessment.sleepQuality] ?? 65;
  const moodScore = { 'Great!': 95, 'Pretty good': 80, Okay: 65, Meh: 45, Low: 25 }[assessment.mood] ?? 65;
  const gutScore = {
    'Mostly smooth, rare bloating': 88,
    'Bloating a few times a week': 62,
    'Irregular bowel movements': 50,
    'Sensitive to many foods': 40,
    'Frequent discomfort or pain': 25,
  }[assessment.gutSymptoms] ?? 65;
  const hydrationScore = Math.min(100, Math.round((assessment.waterGlasses / 8) * 100));
  const hungerScore = {
    'Regular meals, steady hunger': 90,
    'I often skip meals, then overeat': 50,
    'I snack through the day': 60,
    'I eat when stressed or upset': 40,
    'Most of my eating is at night 🌙': 55,
  }[assessment.hungerPattern] ?? 65;
  const sleepHoursScore = { '9h+': 95, '7–8h': 88, '5–6h': 55, 'Under 5h': 30 }[assessment.sleepHours] ?? 65;
  const energyScore = Math.round((sleepScore + hydrationScore + gutScore) / 3);

  return [
    { subject: 'Digestion', value: gutScore },
    { subject: 'Energy', value: energyScore },
    { subject: 'Sleep', value: Math.round((sleepScore + sleepHoursScore) / 2) },
    { subject: 'Mood', value: moodScore },
    { subject: 'Stress', value: stressScore },
    { subject: 'Hydration', value: hydrationScore },
    { subject: 'Eating', value: hungerScore },
  ];
}

const weeklyInsights = [
  { title: 'Stress ↓ 20%', desc: 'this week', emoji: '😌', bg: 'bg-blue-100', color: 'text-blue-800' },
  { title: 'Mood ↑ 30%', desc: 'feeling brighter', emoji: '😊', bg: 'bg-yellow-100', color: 'text-yellow-800' },
  { title: 'Water Goal ✓', desc: '6/7 days met', emoji: '💧', bg: 'bg-cyan-100', color: 'text-cyan-800' },
  { title: 'Cravings ↓', desc: 'less snacking', emoji: '🍃', bg: 'bg-orange-100', color: 'text-orange-800' },
  { title: 'Sleep ✨', desc: 'better quality', emoji: '😴', bg: 'bg-indigo-100', color: 'text-indigo-800' },
];

const badges = [
  { label: 'Better digestion', icon: '🥗' },
  { label: 'More energy', icon: '⚡' },
  { label: 'Better sleep', icon: '🌙' },
  { label: 'Better mood', icon: '🌻' },
  { label: 'Less stress', icon: '🧘' },
  { label: 'More water', icon: '🌊' },
  { label: 'Fewer cravings', icon: '🍃' },
  { label: 'Consistency', icon: '✨' },
];

function BarMarker({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-600">{label}</span>
        <span className="text-xs font-extrabold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Insights() {
  const { user } = useAppContext();
  const radarData = user.assessment ? getRadarData(user.assessment) : null;

  // 🖱️ DRAG TO SCROLL LOGIC FOR LAPTOPS
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Page className="p-6 pt-12 bg-gray-50">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Insights</h1>
        <p className="text-gray-500 text-sm font-medium mb-8">How you're doing — beyond the scale.</p>
      </motion.div>

      {/* ── Radar Chart ── */}
      {radarData && (
        <Card className="border-none shadow-sm mb-8 p-5 bg-white">
          <h2 className="text-base font-bold text-gray-800 mb-1">Your Wellness Snapshot</h2>
          <p className="text-xs text-gray-400 font-medium mb-4">Based on your check-in — higher = better</p>
          <ResponsiveContainer width="100%" height={230}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 11, fontWeight: 700, fill: '#6B7280' }}
              />
              <Radar
                name="Health"
                dataKey="value"
                stroke="#22C55E"
                fill="#22C55E"
                fillOpacity={0.25}
                strokeWidth={2.5}
                dot={{ fill: '#22C55E', r: 4, strokeWidth: 0 }}
              />
              <Tooltip
                formatter={(v: number) => [`${v}%`, 'Score']}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12, fontWeight: 700 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* ── Non-scale health bars ── */}
      {radarData && (
        <Card className="border-none shadow-sm mb-8 p-5 bg-white">
          <h2 className="text-base font-bold text-gray-800 mb-4">Health Markers</h2>
          <div className="space-y-4">
            {radarData.map((d, i) => {
              const colors = ['#22C55E', '#F59E0B', '#6366F1', '#FBBF24', '#60A5FA', '#06B6D4', '#F97316'];
              return <BarMarker key={i} label={d.subject} value={d.value} color={colors[i % colors.length]} />;
            })}
          </div>
        </Card>
      )}

      {/* ── This Week (Now with Laptop Click-and-Drag Support!) ── */}
      <h2 className="text-lg font-bold mb-4 text-gray-700">This Week</h2>
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-4 overflow-x-auto hide-scrollbar pb-6 -mx-6 px-6 snap-x ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab"}`}
      >
        {weeklyInsights.map((insight, i) => (
          <Card key={i} className={`min-w-[160px] snap-center shrink-0 p-5 border-none shadow-sm ${insight.bg} flex flex-col justify-between h-40 pointer-events-none select-none`}>
            <div className="text-4xl">{insight.emoji}</div>
            <div>
              <div className={`font-bold text-lg leading-tight ${insight.color}`}>{insight.title}</div>
              <div className="text-xs font-medium text-black/40 uppercase mt-1">{insight.desc}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Why this happened ── */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Why this happened</h2>
        <Card className="bg-white border-none shadow-sm p-6 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 text-6xl opacity-10 translate-x-2 translate-y-2">💡</div>
          <p className="font-bold text-gray-800 leading-relaxed relative z-10 text-base">
            Because you slept earlier this week, your stress reduced and your bloating improved. Everything is connected!
          </p>
        </Card>
      </div>

      {/* ── Progress Beyond Weight ── */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Progress Beyond Weight</h2>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-gray-100 rounded-full px-4 py-2 text-sm font-bold flex items-center gap-2 shadow-sm text-gray-700"
            >
              <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-[10px]">✔</span>
              <span>{badge.icon} {badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Page>
  );
}
