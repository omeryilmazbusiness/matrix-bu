'use client';

import { TrendingUp, Star, CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface StatsBarProps {
  total: number;
  featured: number;
  verified: number;
  newThisMonth: number;
}

export function StatsBar({ total, featured, verified, newThisMonth }: StatsBarProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const stats = [
    { 
      label: 'Toplam Kanal', 
      value: total, 
      icon: TrendingUp, 
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    { 
      label: 'Öne Çıkan', 
      value: featured, 
      icon: Star, 
      color: 'from-amber-500 to-orange-600',
      bgColor: 'from-amber-50 to-orange-50'
    },
    { 
      label: 'Doğrulanmış', 
      value: verified, 
      icon: CheckCircle2, 
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    { 
      label: 'Bu Ay Eklenen', 
      value: newThisMonth, 
      icon: Sparkles, 
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={cn(
              'relative overflow-hidden rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1',
              'animate-in fade-in slide-in-from-bottom-4 duration-700'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient Background */}
            <div className={cn('absolute inset-0 bg-linear-to-br opacity-5', stat.bgColor)} />
            
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  'bg-linear-to-br shadow-lg',
                  stat.color
                )}>
                  <Icon size={24} className="text-white" strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className={cn(
                  'text-3xl font-black bg-linear-to-r bg-clip-text text-transparent transition-all duration-1000',
                  stat.color,
                  animated ? 'opacity-100' : 'opacity-0'
                )}>
                  {animated ? stat.value : 0}
                </div>
                <p className="text-sm font-semibold text-gray-600">
                  {stat.label}
                </p>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/50 to-transparent rounded-bl-full" />
          </div>
        );
      })}
    </div>
  );
}
