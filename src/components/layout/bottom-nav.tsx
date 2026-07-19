import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, Zap, Lightbulb, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppContext, getLevelForPoints } from '@/hooks/useAppContext';

export function BottomNav() {
  const [location] = useLocation();
  const { user } = useAppContext();
  const level = getLevelForPoints(user.vitalityPoints);

  const navItems = [
    { path: '/home',     icon: Home,      label: 'Home' },
    { path: '/progress', icon: Zap,       label: 'Vitality' },
    { path: '/insights', icon: Lightbulb, label: 'Insights' },
    { path: '/learn',    icon: BookOpen,  label: 'Learn' },
    { path: '/profile',  icon: User,      label: 'Profile' },
  ];

  if (location === '/' || location.startsWith('/assessment')) return null;

  const isMainTab = navItems.some(item => location === item.path);
  if (!isMainTab) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe">
      <div className="w-full max-w-md bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] px-4 py-3 flex justify-between items-center rounded-t-3xl">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          const isVitality = item.path === '/progress';

          return (
            <Link key={item.path} href={item.path} className="flex flex-col items-center gap-1 min-w-[52px]">
              <div className={cn(
                'p-2 rounded-full transition-colors flex flex-col items-center justify-center relative',
                isActive ? 'bg-mint text-primary' : 'text-muted-foreground hover:text-foreground'
              )}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {/* Vitality level badge */}
                {isVitality && (
                  <div
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[8px] font-extrabold flex items-center justify-center text-white leading-none"
                    style={{ backgroundColor: level.color }}
                  >
                    {level.level}
                  </div>
                )}
              </div>
              <span className={cn(
                'text-[10px] font-semibold transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
