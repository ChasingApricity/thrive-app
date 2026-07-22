import React, { useRef, useState } from 'react';
import { Page } from '@/components/layout/page';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useAppContext, VITALITY_LEVELS, POINT_ACTIONS, getLevelForPoints, getNextLevel } from '@/hooks/useAppContext';
import { Lock, Check, Zap, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

function LevelBadge({ points }: { points: number }) {
  const current = getLevelForPoints(points);
  const next = getNextLevel(points);
  const ptsToNext = next ? next.minPoints - points : 0;
  const ptsInRange = next ? next.minPoints - current.minPoints : 1;
  const ptsEarned = next ? points - current.minPoints : ptsInRange;
  const pct = Math.min(100, Math.round((ptsEarned / ptsInRange) * 100));

  return (
    <Card className="border-none shadow-md p-6 mb-6 overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${current.color}22, white)` }}>
      <div className="absolute right-4 top-4 text-6xl opacity-10">{current.emoji}</div>

      <div className="flex items-center gap-4 mb-5">
        <motion.div
          className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-md border-4 border-white"
          style={{ backgroundColor: current.color + '30', borderColor: current.color + '60' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          {current.emoji}
        </motion.div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Level {current.level}</p>
          <h2 className="text-2xl font-extrabold text-gray-900">{current.name}</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <Zap size={14} className="text-amber-500" />
            <span className="font-extrabold text-amber-600 text-sm">{points} VP</span>
          </div>
        </div>
      </div>

      {next ? (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500">To {next.name} {next.emoji}</span>
            <span className="text-xs font-bold text-gray-500">{ptsToNext} VP needed</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: current.color }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
          <p className="text-[10px] text-gray-400 font-medium mt-1.5 text-right">{pct}% there</p>
        </div>
      ) : (
        <div className="mt-2 text-center">
          <span className="text-primary font-bold text-sm">✨ Maximum level reached — you're Radiant!</span>
        </div>
      )}
    </Card>
  );
}

function StreakCard({ streak }: { streak: number }) {
  return (
    <Card className="border-none shadow-sm p-5 mb-6 bg-gradient-to-r from-orange-50 to-amber-50 flex items-center gap-4">
      <div className="relative">
        <motion.div
          className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          🔥
        </motion.div>
        <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-extrabold rounded-full w-6 h-6 flex items-center justify-center">
          {streak}
        </div>
      </div>
      <div>
        <p className="font-extrabold text-orange-800 text-lg">{streak}-Day Streak</p>
        <p className="text-orange-500 text-xs font-medium">+5 VP every day you check in 🔥</p>
        <p className="text-orange-400 text-[10px] mt-0.5 font-medium">Keep it going — don't break the chain!</p>
      </div>
    </Card>
  );
}

export default function Progress() {
  const { user } = useAppContext();
  const current = getLevelForPoints(user.vitalityPoints);

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
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Vitality</h1>
        <p className="text-gray-400 text-sm font-medium mb-8">Earn points. Level up. Unlock more.</p>
      </motion.div>

      <LevelBadge points={user.vitalityPoints} />
      <StreakCard streak={user.streak} />

      {/* All Levels Timeline */}
      <h2 className="text-lg font-bold text-gray-700 mb-4">Your Journey</h2>
      <div className="space-y-3 mb-8">
        {VITALITY_LEVELS.map((lv, i) => {
          const isUnlocked = user.vitalityPoints >= lv.minPoints;
          const isCurrent = lv.level === current.level;
          return (
            <motion.div
              key={lv.level}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className={cn(
                  'border-2 p-4 flex gap-4 items-start',
                  isCurrent ? 'shadow-md' : 'border-transparent shadow-sm',
                  !isUnlocked && 'opacity-60'
                )}
                style={isCurrent ? { borderColor: lv.color } : {}}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: isUnlocked ? lv.color + '30' : '#F3F4F6' }}
                >
                  {isUnlocked ? lv.emoji : <Lock size={18} className="text-gray-300" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-gray-800">{lv.name}</span>
                    {isCurrent && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: lv.color }}
                      >
                        YOU ARE HERE
                      </span>
                    )}
                    <span className="ml-auto text-xs font-bold text-gray-400">{lv.minPoints}+ VP</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {lv.unlocks.map((feature, j) => (
                      <span
                        key={j}
                        className={cn(
                          'text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1',
                          isUnlocked
                            ? 'bg-green-50 text-green-700 border border-green-100'
                            : 'bg-gray-100 text-gray-400'
                        )}
                      >
                        {isUnlocked && <Check size={10} strokeWidth={3} />}
                        {!isUnlocked && <Lock size={9} />}
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* How to earn VP */}
      <h2 className="text-lg font-bold text-gray-700 mb-4">How to Earn VP</h2>
      <Card className="border-none shadow-sm p-2 mb-8">
        {POINT_ACTIONS.map((action, i) => (
          <div
            key={i}
            className={cn('flex items-center gap-3 px-4 py-3', i < POINT_ACTIONS.length - 1 && 'border-b border-gray-50')}
          >
            <span className="text-xl w-8 shrink-0">{action.emoji}</span>
            <span className="flex-1 text-sm font-medium text-gray-700">{action.action}</span>
            <div className="flex items-center gap-1 shrink-0">
              <Zap size={12} className="text-amber-500" />
              <span className="font-extrabold text-amber-600 text-sm">+{action.points}</span>
            </div>
          </div>
        ))}
      </Card>

      {/* Locked features teaser (Now with Laptop Click-and-Drag Support!) */}
      {current.level < 5 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Coming Soon for You</h2>
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={cn(
              "flex gap-3 overflow-x-auto hide-scrollbar -mx-6 px-6 pb-2 snap-x",
              isDragging ? "cursor-grabbing snap-none" : "cursor-grab"
            )}
          >
            {VITALITY_LEVELS.filter(l => l.level > current.level).flatMap(l =>
              l.unlocks.map((feature, i) => (
                <Card key={`${l.level}-${i}`} className="border-none shadow-sm min-w-[140px] shrink-0 p-4 flex flex-col items-center gap-2 text-center bg-gradient-to-b from-gray-50 to-white snap-center pointer-events-none select-none">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Lock size={16} className="text-gray-300" />
                  </div>
                  <p className="font-bold text-xs text-gray-500 leading-tight">{feature}</p>
                  <span
                    className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: l.color + '30', color: l.color }}
                  >
                    Level {l.level} {l.emoji}
                  </span>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </Page>
  );
}
