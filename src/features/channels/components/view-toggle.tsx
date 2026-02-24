'use client';

import { Grid3x3, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ViewMode } from '../types';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
      <button
        onClick={() => onViewModeChange('grid')}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-md transition-all duration-300',
          viewMode === 'grid'
            ? 'bg-white text-indigo-600 shadow-md'
            : 'text-gray-500 hover:text-gray-700'
        )}
        aria-label="Grid görünümü"
      >
        <Grid3x3 size={18} strokeWidth={2.5} />
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-md transition-all duration-300',
          viewMode === 'list'
            ? 'bg-white text-indigo-600 shadow-md'
            : 'text-gray-500 hover:text-gray-700'
        )}
        aria-label="Liste görünümü"
      >
        <List size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
