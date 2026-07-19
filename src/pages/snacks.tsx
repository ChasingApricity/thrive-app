import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Page } from '@/components/layout/page';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Snacks() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [doneSnacks, setDoneSnacks] = useState<number[]>([]);

  const snacks = [
    {
      emoji: '🥜',
      name: 'Roasted Chana',
      benefits: ['High protein, keeps you full', 'Great for gut bacteria', 'Easy to digest']
    },
    {
      emoji: '🍌',
      name: 'Banana & Peanut Butter',
      benefits: ['Natural sugar for quick energy', 'Potassium calms nerves', 'Healthy fats keep cravings away']
    },
    {
      emoji: '🫖',
      name: 'Turmeric Milk (Haldi Doodh)',
      benefits: ['Anti-inflammatory', 'Reduces bloating', 'Calms the gut lining']
    },
    {
      emoji: '🍎',
      name: 'Apple with Chaat Masala',
      benefits: ['Fibre feeds good gut bacteria', 'Antioxidants reduce stress', 'Satisfies sweet cravings']
    },
    {
      emoji: '🫙',
      name: 'Curd (Dahi) with Honey',
      benefits: ['Probiotics restore gut balance', 'Protein for satiety', 'Soothes digestive tract']
    },
    {
      emoji: '🌾',
      name: 'Light Poha',
      benefits: ['Light on stomach', 'Iron boosts energy', 'Complex carbs prevent sugar spikes']
    }
  ];

  const handleMarkDone = (index: number, name: string) => {
    if (!doneSnacks.includes(index)) {
      setDoneSnacks(prev => [...prev, index]);
      toast({
        title: "Snack logged! 😋",
        description: `Enjoy your ${name}.`,
      });
    }
  };

  return (
    <Page className="p-6 pt-12 pb-24 bg-orange-50">
      <div className="flex items-center mb-6">
        <button onClick={() => setLocation('/meals')} className="p-2 -ml-2 rounded-full hover:bg-white/50 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2 text-orange-900">Snacks from your kitchen 🏠</h1>
      </div>

      <div className="space-y-4">
        {snacks.map((snack, i) => {
          const isDone = doneSnacks.includes(i);
          return (
            <Card key={i} className="flex gap-4 p-5 overflow-hidden relative border-none">
              <div className="w-16 h-16 shrink-0 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl">
                {snack.emoji}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{snack.name}</h3>
                <ul className="text-xs text-gray-600 space-y-1 mb-4">
                  {snack.benefits.map((b, j) => (
                    <li key={j} className="flex items-start gap-1.5">
                      <span className="text-green-500 font-bold mt-0.5">•</span> 
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  size="sm" 
                  variant={isDone ? 'primary' : 'outline'}
                  className={cn(
                    "w-full h-8 rounded-lg text-xs transition-colors",
                    isDone && "bg-green-500 border-green-500"
                  )}
                  onClick={() => handleMarkDone(i, snack.name)}
                >
                  {isDone ? <><Check size={14} className="mr-1" /> I had this!</> : 'I had this! ✅'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </Page>
  );
}
