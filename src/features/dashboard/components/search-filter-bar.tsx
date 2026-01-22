'use client';

import { Search, X, TrendingUp, Clock, ArrowDownAZ, Sparkles, BookHeart, Microscope, Scroll, Newspaper, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import type { ProfileTopic } from '@/shared/lib/constants';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: 'recent' | 'popular' | 'name';
  onSortChange: (value: 'recent' | 'popular' | 'name') => void;
  activeTopic?: ProfileTopic | 'all';
  onTopicChange?: (topic: ProfileTopic | 'all') => void;
  className?: string;
}

const sortOptions = [
  { 
    value: 'popular' as const, 
    label: 'Popüler', 
    icon: TrendingUp,
  },
  { 
    value: 'recent' as const, 
    label: 'Yeni', 
    icon: Clock,
  },
  { 
    value: 'name' as const, 
    label: 'A-Z', 
    icon: ArrowDownAZ,
  },
];

const topicOptions = [
  { value: 'all' as const, label: 'Tümü', icon: Sparkles },
  { value: 'din-felsefe' as const, label: 'Din & Felsefe', icon: BookHeart },
  { value: 'bilim' as const, label: 'Bilim', icon: Microscope },
  { value: 'tarih' as const, label: 'Tarih', icon: Scroll },
  { value: 'gundem' as const, label: 'Gündem', icon: Newspaper },
];

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  activeTopic = 'all',
  onTopicChange,
  className
}: SearchFilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (value: 'recent' | 'popular' | 'name') => {
    onSortChange(value);
    setIsFilterOpen(false);
  };

  const handleTopicSelect = (value: ProfileTopic | 'all') => {
    onTopicChange?.(value);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    onSearchChange('');
    onSortChange('popular');
    onTopicChange?.('all');
    setIsFilterOpen(false);
  };

  const activeSort = sortOptions.find(opt => opt.value === sortBy);
  const activeTopicOption = topicOptions.find(opt => opt.value === activeTopic);

  // Check if any filters are active
  const hasActiveFilters = searchQuery || sortBy !== 'popular' || activeTopic !== 'all';

  return (
    <div className={cn('max-w-4xl mx-auto', className)}>
      {/* Search Container */}
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          {/* Animated Color-Changing Border Light */}
          <div className="absolute -inset-[2px] rounded-3xl">
            {/* Pulsing Rainbow Border - Orange to Purple */}
            <div 
              className={cn(
                'absolute inset-0 rounded-3xl transition-all duration-500',
                isFocused ? 'opacity-70' : 'opacity-50'
              )}
              style={{
                background: 'linear-gradient(90deg, #f97316, #fb923c, #f472b6, #a78bfa, #8b5cf6, #a78bfa, #f472b6, #fb923c, #f97316)',
                backgroundSize: '200% 100%',
                animation: isFocused ? 'colorShiftFast 3s linear infinite' : 'colorShift 5s linear infinite',
                boxShadow: '0 0 15px rgba(249, 115, 22, 0.2), 0 0 30px rgba(139, 92, 246, 0.2)',
              }}
            />
            {/* Glow Effect Layer */}
            <div 
              className={cn(
                'absolute inset-0 rounded-3xl blur-md transition-all duration-500',
                isFocused ? 'opacity-60 blur-lg' : 'opacity-40'
              )}
              style={{
                background: 'linear-gradient(90deg, #f97316, #fb923c, #f472b6, #a78bfa, #8b5cf6, #a78bfa, #f472b6, #fb923c, #f97316)',
                backgroundSize: '200% 100%',
                animation: isFocused ? 'colorShiftFast 3s linear infinite' : 'colorShift 5s linear infinite',
              }}
            />
            {/* Outer Glow */}
            <div 
              className={cn(
                'absolute inset-0 rounded-3xl blur-xl transition-all duration-500',
                isFocused ? 'opacity-40' : 'opacity-25'
              )}
              style={{
                background: 'linear-gradient(90deg, #f97316, #fb923c, #f472b6, #a78bfa, #8b5cf6, #a78bfa, #f472b6, #fb923c, #f97316)',
                backgroundSize: '200% 100%',
                animation: isFocused ? 'colorShiftFast 3.5s linear infinite' : 'colorShift 6s linear infinite',
              }}
            />
          </div>

          {/* Main Search Input Container */}
          <div className="relative flex items-center bg-white rounded-2xl shadow-2xl">
            {/* AI Sparkles Icon - Top Left Corner */}
            <div className="absolute -top-3 -left-3 z-20">
              <div className={cn(
                'w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-500 shadow-lg',
                isFocused 
                  ? 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 shadow-purple-500/50 scale-110' 
                  : 'bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 shadow-purple-400/30'
              )}>
                <Sparkles 
                  className={cn(
                    'text-white transition-all duration-500',
                    isFocused ? 'animate-pulse' : ''
                  )}
                  size={20} 
                  strokeWidth={2.5}
                />
              </div>
            </div>

            {/* Search Icon - Gradient and Animated */}
            <div className="absolute left-5 z-10">
              <div className={cn(
                'w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-500 shadow-2xl',
                isFocused 
                  ? 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 shadow-orange-500/50 scale-110' 
                  : 'bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 shadow-orange-400/30'
              )}>
                <Search 
                  className="text-white"
                  size={24} 
                  strokeWidth={2.5}
                />
              </div>
            </div>
            
            {/* Search Input - NO BORDER */}
            <Input
              type="text"
              placeholder="AI ile akıllı arama yapın..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={cn(
                'relative z-10 w-full h-16 pl-[84px] pr-24',
                'bg-transparent backdrop-blur-xl',
                'border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                'rounded-2xl text-base sm:text-lg font-medium',
                'placeholder:text-gray-400 placeholder:font-normal',
                'transition-all duration-500 shadow-none'
              )}
            />

            {/* Right Side: Clear + Minimal Filter Button */}
            <div className="absolute right-3 z-20 flex items-center gap-2">
              {/* Clear Button */}
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all group"
                  aria-label="Temizle"
                >
                  <X size={16} className="text-gray-600 group-hover:text-gray-900" strokeWidth={2.5} />
                </button>
              )}

              {/* Minimal Filter Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={cn(
                  'w-9 h-9 flex items-center justify-center rounded-lg font-semibold transition-all',
                  isFilterOpen
                    ? 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95'
                )}
                aria-label="Filtreler"
              >
                <ChevronDown 
                  size={16} 
                  strokeWidth={2.5}
                  className={cn(
                    'transition-transform duration-200',
                    isFilterOpen && 'rotate-180'
                  )}
                />
              </button>
            </div>
          </div>

          {/* AI Suggestions Hint - Only when focused and empty */}
          {isFocused && !searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-3 px-5 z-30 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-xl p-4 border-2 border-orange-200/50 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 shadow-lg shrink-0">
                    <Search className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <p className="font-bold text-gray-900">AI Destekli Akıllı Arama</p>
                    <p className="text-gray-600">
                      <span className="text-orange-600 font-semibold">"tarih"</span>, 
                      <span className="text-pink-600 font-semibold"> "bilim"</span> veya 
                      <span className="text-purple-600 font-semibold"> "felsefe"</span> gibi konular arayın
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Dropdown - Topics & Sort Combined */}
        {isFilterOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-gray-200/80 overflow-hidden max-w-lg mx-auto">
              {/* Topics Section */}
              {onTopicChange && (
                <div className="p-3 border-b border-gray-200">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 px-2">Konular</div>
                  <div className="grid grid-cols-3 gap-2">
                    {topicOptions.map((topic) => {
                      const isActive = activeTopic === topic.value;
                      const Icon = topic.icon;
                      
                      return (
                        <button
                          key={topic.value}
                          onClick={() => handleTopicSelect(topic.value)}
                          className={cn(
                            'flex flex-col items-center gap-2 px-3 py-3 rounded-xl text-center transition-all',
                            isActive
                              ? 'bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 text-orange-700 shadow-sm border-2 border-orange-200'
                              : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100 border-2 border-transparent'
                          )}
                        >
                          <div className={cn(
                            'w-8 h-8 flex items-center justify-center rounded-lg transition-all',
                            isActive 
                              ? 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white' 
                              : 'bg-gray-100 text-gray-600'
                          )}>
                            <Icon size={16} strokeWidth={2.5} />
                          </div>
                          <span className="text-xs font-semibold">{topic.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sort Section */}
              <div className="p-3">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 px-2">Sıralama</div>
                <div className="flex gap-2">
                  {sortOptions.map((option) => {
                    const isActive = sortBy === option.value;
                    const Icon = option.icon;
                    
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSortSelect(option.value)}
                        className={cn(
                          'flex-1 flex flex-col items-center gap-2 px-3 py-3 rounded-xl text-center transition-all',
                          isActive
                            ? 'bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 text-orange-700 shadow-sm border-2 border-orange-200'
                            : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100 border-2 border-transparent'
                        )}
                      >
                        <div className={cn(
                          'w-8 h-8 flex items-center justify-center rounded-lg transition-all',
                          isActive 
                            ? 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        )}>
                          <Icon size={16} strokeWidth={2.5} />
                        </div>
                        <span className="text-xs font-semibold">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <div className="p-3 border-t border-gray-200">
                  <button
                    onClick={handleClearFilters}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 text-red-700 rounded-xl font-semibold text-sm transition-all duration-200 border-2 border-red-200/50 hover:border-red-300"
                  >
                    <X size={16} strokeWidth={2.5} />
                    <span>Filtreleri Temizle</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
