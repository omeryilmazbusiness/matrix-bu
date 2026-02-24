'use client';

import { TrendingUp, Clock, Star, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickFiltersProps {
  onFilterClick: (filter: string) => void;
  activeFilter?: string;
}

export function QuickFilters({ onFilterClick, activeFilter }: QuickFiltersProps) {
  const filters = [
    { id: 'trending', label: 'En Popüler', icon: TrendingUp, color: 'from-orange-500 to-red-600' },
    { id: 'new', label: 'Yeni Eklenenler', icon: Clock, color: 'from-blue-500 to-indigo-600' },
    { id: 'featured', label: 'Öne Çıkanlar', icon: Star, color: 'from-amber-500 to-yellow-600' },
    { id: 'verified', label: 'Doğrulanmış', icon: CheckCircle2, color: 'from-green-500 to-emerald-600' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.id;
        
        return (
          <button
            key={filter.id}
            onClick={() => onFilterClick(filter.id)}
            className={cn(
              'group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300',
              isActive
                ? 'bg-linear-to-r text-white shadow-lg scale-105 ' + filter.color
                : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:shadow-md'
            )}
          >
            <Icon 
              size={18} 
              strokeWidth={2.5}
              className={cn(
                'transition-transform duration-300',
                isActive && 'animate-pulse',
                !isActive && 'group-hover:scale-110'
              )}
            />
            <span>{filter.label}</span>
            
            {isActive && (
              <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping opacity-75" />
            )}
          </button>
        );
      })}
    </div>
  );
}
