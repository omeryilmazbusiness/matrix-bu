'use client';

import { SITE_CONFIG } from '@/shared/lib/constants';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  onSearchFocus?: () => void;
}

// Realistic static star component
function Star({ size, opacity, top, left }: { size: number; opacity: number; top: number; left: number }) {
  return (
    <div
      className="absolute rounded-full bg-white"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        opacity: opacity,
        boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, ${opacity * 0.5})`
      }}
    />
  );
}

export function HeroSection({ onSearchFocus }: HeroSectionProps) {
  const [stars, setStars] = useState<Array<{ id: number; size: number; opacity: number; top: number; left: number }>>([]);

  useEffect(() => {
    // Generate realistic stars with varied sizes and positions
    const newStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      size: Math.random() * 1.5 + 0.5, // 0.5px to 2px
      opacity: Math.random() * 0.6 + 0.3, // 0.3 to 0.9
      top: Math.random() * 100,
      left: Math.random() * 100
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="relative overflow-hidden bg-black">
      {/* Deep space gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-gray-950 to-gray-900 opacity-95" />
      
      {/* Realistic stars field */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <Star 
            key={star.id} 
            size={star.size} 
            opacity={star.opacity}
            top={star.top}
            left={star.left}
          />
        ))}
      </div>

      {/* Subtle ambient light */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-950/10 via-transparent to-purple-950/10" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center space-y-8">
          {/* Elegant Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            <Sparkles size={16} className="text-white/70" strokeWidth={1.5} />
            <span className="text-sm font-medium text-white/80 tracking-wide">
              Kaliteli İçerik Üreticileri
            </span>
          </div>

          {/* Elegant Title with subtle gradient */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="inline-block bg-linear-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
                {SITE_CONFIG.name}
              </span>
            </h1>
            
            {/* Subtle underline accent */}
            <div className="flex justify-center">
              <div className="h-1 w-24 bg-linear-to-r from-transparent via-white/40 to-transparent rounded-full" />
            </div>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 font-light tracking-wide">
            Türkiye&apos;nin en değerli içerik üreticilerini keşfedin
          </p>
        </div>
      </div>

      {/* Bottom dark fade - smooth transition to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-900 via-gray-950/80 to-transparent" />
    </div>
  );
}
