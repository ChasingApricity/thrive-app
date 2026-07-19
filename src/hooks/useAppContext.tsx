import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AssessmentData = {
  stress: string;
  mood: string;
  sleepQuality: string;
  sleepHours: string;
  hungerPattern: string;
  gutSymptoms: string;
  waterGlasses: number;
  eatingHabits: string;
  goals: string[];
};

export type VitalityLevel = {
  level: number;
  name: string;
  emoji: string;
  minPoints: number;
  color: string;
  unlocks: string[];
};

export const VITALITY_LEVELS: VitalityLevel[] = [
  { level: 1, name: 'Seedling',  emoji: '🌱', minPoints: 0,    color: '#86EFAC', unlocks: ['Daily Check-ins', 'Learn Articles', 'Meal Logging'] },
  { level: 2, name: 'Sprout',    emoji: '🌿', minPoints: 100,  color: '#34D399', unlocks: ['Guided Breathing', 'Gut Score Tracking'] },
  { level: 3, name: 'Flow',      emoji: '🌊', minPoints: 250,  color: '#38BDF8', unlocks: ['Weekly Insight Report', 'Stress Pattern Chart'] },
  { level: 4, name: 'Thrive',   emoji: '🌟', minPoints: 500,  color: '#FBBF24', unlocks: ['Custom Goals', 'Advanced Radar Insights'] },
  { level: 5, name: 'Radiant',  emoji: '✨', minPoints: 1000, color: '#A78BFA', unlocks: ['Full History', 'Streak Rewards', 'Exclusive Themes'] },
];

export const POINT_ACTIONS: { action: string; points: number; emoji: string }[] = [
  { action: 'Complete your assessment',  points: 50, emoji: '📋' },
  { action: 'Morning check-in',          points: 15, emoji: '☀️' },
  { action: 'Night reflection',          points: 15, emoji: '🌙' },
  { action: 'Log a meal',                points: 10, emoji: '🍽' },
  { action: 'Read a learn article',      points: 5,  emoji: '📚' },
  { action: 'Daily streak bonus',        points: 5,  emoji: '🔥' },
];

export function getLevelForPoints(points: number): VitalityLevel {
  let current = VITALITY_LEVELS[0];
  for (const lv of VITALITY_LEVELS) {
    if (points >= lv.minPoints) current = lv;
  }
  return current;
}

export function getNextLevel(points: number): VitalityLevel | null {
  const cur = getLevelForPoints(points);
  return VITALITY_LEVELS.find(l => l.level === cur.level + 1) ?? null;
}

type UserState = {
  name: string;
  onboarded: boolean;
  streak: number;
  daysTracked: number;
  insightsUnlocked: number;
  vitalityPoints: number;
  assessment: AssessmentData | null;
};

type AppContextType = {
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
  completeOnboarding: () => void;
  updateUser: (updates: Partial<UserState>) => void;
  updateAssessment: (data: AssessmentData) => void;
  addPoints: (amount: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultAssessment: AssessmentData = {
  stress: 'A bit tense',
  mood: 'Okay',
  sleepQuality: 'Okay',
  sleepHours: '7–8h',
  hungerPattern: 'Regular meals, steady hunger',
  gutSymptoms: 'Mostly smooth, rare bloating',
  waterGlasses: 4,
  eatingHabits: 'I eat mostly balanced meals',
  goals: ['Better sleep', 'Less stress', 'More water'],
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState>({
    name: 'Friend',
    onboarded: false,
    streak: 3,
    daysTracked: 12,
    insightsUnlocked: 4,
    vitalityPoints: 35,
    assessment: defaultAssessment,
  });

  const completeOnboarding = () => setUser(prev => ({ ...prev, onboarded: true }));

  const updateUser = (updates: Partial<UserState>) =>
    setUser(prev => ({ ...prev, ...updates }));

  const updateAssessment = (data: AssessmentData) =>
    setUser(prev => ({ ...prev, assessment: data, onboarded: true, vitalityPoints: prev.vitalityPoints + 50 }));

  const addPoints = (amount: number) =>
    setUser(prev => ({ ...prev, vitalityPoints: prev.vitalityPoints + amount }));

  return (
    <AppContext.Provider value={{ user, setUser, completeOnboarding, updateUser, updateAssessment, addPoints }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
}
