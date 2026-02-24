'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Crown, Calendar, Heart, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { weeklyPersonData } from '../utils/weekly-person-data';
import { WeeklyPersonModal } from './weekly-person-modal';
import type { WeeklyPerson } from '../types';

export function WeeklyPersonCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<WeeklyPerson | null>(null);
  
  const currentPerson = weeklyPersonData[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % weeklyPersonData.length);
      setIsLiked(false); // Reset like on person change
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const displayLikes = currentPerson.likes + (isLiked ? 1 : 0);

  const handleOpenModal = () => {
    setSelectedPerson(currentPerson); // Şu anki kişiyi modal için set et
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
  };

  return (
    <>
      <div className="relative group h-full min-h-125 sm:min-h-150">
        {/* Main Card */}
        <div 
          className={cn(
            'relative overflow-hidden rounded-3xl h-full',
            'border border-gray-300/40',
            'shadow-2xl shadow-black/5',
            'transition-all duration-700',
            'hover:shadow-3xl'
          )}
        >
          {/* Full Background Image */}
          <div className="absolute inset-0">
            <Image
              src={currentPerson.image}
              alt={currentPerson.name}
              fill
              className="object-cover transition-transform duration-10000 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            
            {/* Very subtle dark overlay */}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Top Section - Minimal Badges */}
          <div className="relative z-10 p-5">
            <div className="flex items-start justify-between">
              {/* Crown Badge - Soft blur */}
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-2xl rounded-2xl shadow-sm">
                <Crown size={16} className="text-amber-600" strokeWidth={2} />
                <span className="text-xs font-semibold text-gray-900">Haftanın Kişisi</span>
              </div>

              {/* Indicator Dots - Ultra soft */}
              <div className="flex gap-1.5 bg-white/60 backdrop-blur-2xl px-2.5 py-2 rounded-full shadow-sm">
                {weeklyPersonData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      'h-1 rounded-full transition-all duration-700',
                      idx === currentIndex 
                        ? 'w-5 bg-gray-900/80' 
                        : 'w-1 bg-gray-500/50 hover:bg-gray-700/60'
                    )}
                    aria-label={`Kişi ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section - Ultra Smooth Multi-layer Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-4/5">
            {/* Layer 1: Very gradual dark gradient (starts from very bottom) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
            
            {/* Layer 2: Additional smoothing layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
            
            {/* Layer 3: Subtle blue tint for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent" />
            
            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 pb-8">
              <div className="space-y-4">
                {/* Period Badge, View & Like Stats */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-xl rounded-xl">
                    <Calendar size={12} className="text-white/90" strokeWidth={2} />
                    <span className="text-xs font-medium text-white/95">{currentPerson.period}</span>
                  </div>

                  {/* Stats Container */}
                  <div className="flex items-center gap-2">
                    {/* View Count */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold bg-white/15 backdrop-blur-xl">
                      <Eye size={14} className="text-white/90" strokeWidth={2} />
                      <span className="text-white/95">
                        {currentPerson.views.toLocaleString()}
                      </span>
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLiked(!isLiked);
                      }}
                      className={cn(
                        'inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-300',
                        'bg-white/15 backdrop-blur-xl hover:bg-white/25',
                        isLiked && 'bg-red-500/20'
                      )}
                    >
                      <Heart 
                        size={16} 
                        className={cn(
                          'transition-all duration-300',
                          isLiked ? 'fill-red-500 text-red-500' : 'text-white/90'
                        )}
                        strokeWidth={2}
                      />
                      <span className={cn(
                        'font-bold',
                        isLiked ? 'text-red-500' : 'text-white/95'
                      )}>
                        {displayLikes.toLocaleString()}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Name - Large and Bold */}
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
                    {currentPerson.name}
                  </h2>
                  <p className="text-base sm:text-lg text-white/95 font-medium drop-shadow-md">
                    {currentPerson.title}
                  </p>
                </div>

                {/* Description - Soft blur background */}
                <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-4 shadow-lg">
                  <p className="text-sm sm:text-base text-white/95 leading-relaxed">
                    {currentPerson.description}
                  </p>
                </div>

                {/* Detail Button - Ultra Minimal & Soft */}
                <button
                  onClick={handleOpenModal}
                  className={cn(
                    'group/btn w-full flex items-center justify-center gap-2 px-6 py-3.5',
                    'bg-white/90 backdrop-blur-2xl rounded-2xl',
                    'text-gray-900 font-semibold text-sm',
                    'transition-all duration-500 ease-out',
                    'hover:bg-white hover:shadow-2xl hover:shadow-white/20',
                    'active:scale-98'
                  )}
                >
                  <span>Detayı Gör</span>
                  <ArrowRight 
                    size={16} 
                    className="transition-transform duration-500 group-hover/btn:translate-x-1"
                    strokeWidth={2}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Subtle Inner Shadow for depth */}
          <div className="absolute inset-0 rounded-3xl shadow-inner-xl pointer-events-none" />
        </div>

        {/* Minimal Background Glow */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-linear-to-br from-gray-200/20 to-gray-300/20 opacity-40 blur-3xl" />
      </div>

      {/* Modal - sadece selectedPerson varsa göster */}
      {selectedPerson && (
        <WeeklyPersonModal
          person={selectedPerson}
          isOpen={true}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
