'use client';

import { cn } from '@/lib/utils';
import { PROFILE_STATUS, type ProfileStatus } from '@/shared/lib/constants';
import { Star } from 'lucide-react';

interface FilterTabsProps {
  activeFilter: ProfileStatus | 'all';
  onFilterChange: (filter: ProfileStatus | 'all') => void;
  counts?: {
    all: number;
    featured: number;
    verified: number;
    standard: number;
  };
}

export function FilterTabs({ activeFilter, onFilterChange, counts }: FilterTabsProps) {
  const filters = [
    { value: 'all' as const, label: 'Tümü', stars: 0 },
    { value: 'featured' as const, label: 'Öne Çıkan', stars: 3 },
    { value: 'verified' as const, label: 'Doğrulanmış', stars: 2 },
    { value: 'standard' as const, label: 'Standart', stars: 1 },
  ];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-2 min-w-max">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;
          const config = filter.value !== 'all' ? PROFILE_STATUS[filter.value] : null;
          const count = counts?.[filter.value] || 0;

          return (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={cn(
                'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                isActive
                  ? filter.value === 'all'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : `${config?.bgColor} ${config?.textColor} border ${config?.borderColor} shadow-sm`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95'
              )}
            >
              {/* Stars - Minimal */}
              {filter.stars > 0 && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: filter.stars }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={cn(
                        'fill-current',
                        isActive ? config?.iconColor : 'text-gray-400'
                      )}
                    />
                  ))}
                </div>
              )}

              {/* Label */}
              <span>{filter.label}</span>

              {/* Count Badge - Minimal */}
              {count > 0 && (
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded text-xs font-semibold',
                    isActive
                      ? filter.value === 'all'
                        ? 'bg-white/25 text-white'
                        : 'bg-white/70'
                      : 'bg-gray-200 text-gray-600'
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
