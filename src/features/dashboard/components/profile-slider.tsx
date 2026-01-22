'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { ProfileCard } from '@/features/profiles/components';
import { Profile } from '@/features/profiles/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProfileSliderProps {
  profiles: Profile[];
  className?: string;
}

export function ProfileSlider({ profiles, className }: ProfileSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, profiles.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (profiles.length === 0) return null;

  return (
    <div className={cn('relative', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Çok Popüler</h2>
            <p className="text-sm text-gray-600">En çok görüntülenen profiller</p>
          </div>
        </div>

        {/* Navigation Buttons - Desktop */}
        <div className="hidden sm:flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="h-10 w-10 rounded-xl border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-all"
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="h-10 w-10 rounded-xl border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-all"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
          }}
        >
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
            >
              <ProfileCard profile={profile} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator - Mobile */}
      <div className="flex sm:hidden justify-center gap-2 mt-4">
        {Array.from({ length: profiles.length }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              'h-2 rounded-full transition-all',
              idx === currentIndex 
                ? 'w-8 bg-blue-600' 
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            )}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
