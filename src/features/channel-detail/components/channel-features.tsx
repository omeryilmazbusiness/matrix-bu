'use client';

import { Shield, BookOpen, Target, Home, Lightbulb, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChannelFeature } from '../types';

interface ChannelFeaturesProps {
  features: ChannelFeature[];
}

const iconMap: Record<string, any> = {
  shield: Shield,
  book: BookOpen,
  target: Target,
  home: Home,
  lightbulb: Lightbulb,
  heart: Heart,
};

const colorMap: Record<number, { bg: string; icon: string; border: string }> = {
  1: { bg: 'from-purple-50 to-indigo-50', icon: 'text-purple-600', border: 'border-purple-200' },
  2: { bg: 'from-blue-50 to-cyan-50', icon: 'text-blue-600', border: 'border-blue-200' },
  3: { bg: 'from-green-50 to-emerald-50', icon: 'text-green-600', border: 'border-green-200' },
  4: { bg: 'from-orange-50 to-amber-50', icon: 'text-orange-600', border: 'border-orange-200' },
  5: { bg: 'from-pink-50 to-rose-50', icon: 'text-pink-600', border: 'border-pink-200' },
  6: { bg: 'from-indigo-50 to-purple-50', icon: 'text-indigo-600', border: 'border-indigo-200' },
};

export function ChannelFeatures({ features }: ChannelFeaturesProps) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full border border-indigo-200">
            <Heart size={18} className="text-indigo-600" strokeWidth={2.5} />
            <span className="text-sm font-bold text-indigo-700">Neden Öneriyoruz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            ✨ Bu Kanalın Öne Çıkan Özellikleri
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Platformumuzun kalite kriterleri çerçevesinde değerlendirilen güçlü yanları
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Shield;
            const colors = colorMap[feature.order] || colorMap[1];

            return (
              <div
                key={feature.id}
                className={cn(
                  'group relative p-8 rounded-2xl border-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2',
                  'bg-gradient-to-br',
                  colors.bg,
                  colors.border,
                  'animate-in fade-in slide-in-from-bottom-4 duration-700'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Order Badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white shadow-xl border-2 border-current flex items-center justify-center">
                  <span className={cn('text-lg font-black', colors.icon)}>
                    {feature.order}
                  </span>
                </div>

                {/* Icon */}
                <div className={cn(
                  'w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6',
                  'group-hover:scale-110 transition-transform duration-300'
                )}>
                  <Icon size={32} className={colors.icon} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/50 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
