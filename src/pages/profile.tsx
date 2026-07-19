import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Page } from '@/components/layout/page';
import { Card } from '@/components/ui/card';
import { useAppContext, getLevelForPoints, getNextLevel } from '@/hooks/useAppContext';
import { Bell, Clock, Lock, Info, Check, Edit2, Zap, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Profile() {
  const { user, updateUser } = useAppContext();
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);

  const [goals, setGoals] = useState({ sleep: true, stress: true, eating: false });

  const level = getLevelForPoints(user.vitalityPoints);
  const next = getNextLevel(user.vitalityPoints);
  const pct = next
    ? Math.min(100, Math.round(((user.vitalityPoints - level.minPoints) / (next.minPoints - level.minPoints)) * 100))
    : 100;

  const handleSaveName = () => {
    if (nameInput.trim()) updateUser({ name: nameInput.trim() });
    setIsEditing(false);
  };

  const toggleGoal = (key: keyof typeof goals) =>
    setGoals(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <Page className="p-6 pt-12 bg-gray-50">
      {/* Avatar + Name */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-mint rounded-full flex items-center justify-center text-5xl shadow-sm mb-4 relative">
          🧑
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
            <Edit2 size={12} className="text-gray-600" />
          </button>
        </div>

        {isEditing ? (
          <input
            type="text"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            className="text-2xl font-bold text-center bg-white border border-gray-200 rounded-xl px-4 py-1 w-48 focus:ring-2 focus:ring-primary focus:outline-none"
            autoFocus
            onBlur={handleSaveName}
            onKeyDown={e => e.key === 'Enter' && handleSaveName()}
          />
        ) : (
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsEditing(true)}>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <Edit2 size={16} className="text-gray-400" />
          </div>
        )}
      </div>

      {/* Vitality Level card */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setLocation('/progress')}
        className="w-full text-left mb-6"
      >
        <Card
          className="border-none shadow-md p-5 overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${level.color}22, white)` }}
        >
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-10">{level.emoji}</div>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-2 shrink-0"
              style={{ backgroundColor: level.color + '30', borderColor: level.color + '60' }}
            >
              {level.emoji}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Vitality Level {level.level}</p>
              <p className="font-extrabold text-gray-800 text-lg">{level.name}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Zap size={14} className="text-amber-500" />
              <span className="font-extrabold text-amber-600">{user.vitalityPoints} VP</span>
            </div>
            <ChevronRight size={16} className="text-gray-300 shrink-0" />
          </div>
          {next && (
            <div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: level.color }} />
              </div>
              <p className="text-[10px] text-gray-400 font-medium mt-1">{next.minPoints - user.vitalityPoints} VP to {next.name} {next.emoji}</p>
            </div>
          )}
        </Card>
      </motion.button>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <Card className="p-4 border-none shadow-sm flex flex-col items-center bg-orange-50">
          <span className="text-2xl mb-1">🔥</span>
          <span className="font-bold text-lg">{user.streak}</span>
          <span className="text-[10px] uppercase font-bold text-gray-500">Streak</span>
        </Card>
        <Card className="p-4 border-none shadow-sm flex flex-col items-center bg-blue-50">
          <span className="text-2xl mb-1">📅</span>
          <span className="font-bold text-lg">{user.daysTracked}</span>
          <span className="text-[10px] uppercase font-bold text-gray-500">Days</span>
        </Card>
        <Card className="p-4 border-none shadow-sm flex flex-col items-center bg-purple-50">
          <span className="text-2xl mb-1">💡</span>
          <span className="font-bold text-lg">{user.insightsUnlocked}</span>
          <span className="text-[10px] uppercase font-bold text-gray-500">Insights</span>
        </Card>
      </div>

      {/* Current Goals */}
      <h2 className="font-bold text-gray-700 mb-4 px-2">Current Goals</h2>
      <Card className="p-2 border-none shadow-sm mb-8 space-y-1">
        {[
          { key: 'sleep', label: 'Better sleep routine', icon: '🌙' },
          { key: 'stress', label: 'Managing stress better', icon: '🧘' },
          { key: 'eating', label: 'Mindful eating', icon: '🍽' },
        ].map(goal => {
          const isActive = goals[goal.key as keyof typeof goals];
          return (
            <motion.button
              key={goal.key}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleGoal(goal.key as keyof typeof goals)}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{goal.icon}</span>
                <span className={cn('font-semibold text-sm', isActive ? 'text-gray-900' : 'text-gray-500')}>
                  {goal.label}
                </span>
              </div>
              <div className={cn('w-6 h-6 rounded-full flex items-center justify-center transition-colors', isActive ? 'bg-primary text-white' : 'bg-gray-100 border border-gray-200')}>
                {isActive && <Check size={14} strokeWidth={3} />}
              </div>
            </motion.button>
          );
        })}
      </Card>

      {/* Settings */}
      <h2 className="font-bold text-gray-700 mb-4 px-2">Settings</h2>
      <Card className="p-2 border-none shadow-sm mb-8">
        <div className="flex items-center gap-3 p-4 border-b border-gray-50">
          <Bell className="text-gray-400" size={20} />
          <span className="font-medium flex-1">Notifications</span>
          <div className="w-10 h-6 bg-primary rounded-full relative">
            <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 border-b border-gray-50">
          <Clock className="text-gray-400" size={20} />
          <span className="font-medium flex-1">Reminders</span>
          <span className="text-sm text-gray-400">8:00 AM</span>
        </div>
        <div className="flex items-center gap-3 p-4 border-b border-gray-50">
          <Lock className="text-gray-400" size={20} />
          <span className="font-medium flex-1">Privacy</span>
        </div>
        <div className="flex items-center gap-3 p-4">
          <Info className="text-gray-400" size={20} />
          <span className="font-medium flex-1">About Thrive</span>
          <span className="text-xs text-gray-400">v1.0.0</span>
        </div>
      </Card>
    </Page>
  );
}
