'use client';

import { Search, X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ViewToggle } from './view-toggle';
import type { ProfileTopic, ProfileStatus } from '@/shared/lib/constants';
import type { SortOption, ViewMode } from '../types';
import { Select } from '@/components/ui/select';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTopic: ProfileTopic | 'all';
  onTopicChange: (topic: ProfileTopic | 'all') => void;
  activeStatus: ProfileStatus | 'all';
  onStatusChange: (status: ProfileStatus | 'all') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalResults: number;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalResults,
}: FilterBarProps) {
  return (
    <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Kanal ara..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-sm font-medium text-gray-700 cursor-pointer"
          >
            <option value="popular">En Popüler</option>
            <option value="recent">En Yeni</option>
            <option value="name">A-Z</option>
            <option value="subscribers">En Çok Abone</option>
          </select>

          {/* View Toggle */}
          <div className="hidden sm:block">
            <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
          </div>
        </div>

        {/* Results Count */}
        {totalResults > 0 && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <SlidersHorizontal size={16} className="text-indigo-600" />
            <span>
              <span className="font-semibold text-gray-900">{totalResults}</span> kanal bulundu
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
