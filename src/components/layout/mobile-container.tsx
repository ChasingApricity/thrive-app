import React, { ReactNode } from 'react';
import { BottomNav } from './bottom-nav';

export function MobileContainer({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-100 min-h-screen w-full flex justify-center">
      <div className="w-full max-w-md bg-background min-h-[100dvh] relative overflow-hidden shadow-2xl ring-1 ring-gray-200">
        <div className="h-full overflow-y-auto hide-scrollbar overflow-x-hidden">
          {children}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
