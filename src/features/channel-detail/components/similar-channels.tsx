'use client';

import { Sparkles } from 'lucide-react';
import { ProfileCard } from '@/features/profiles/components';
import type { Profile } from '@/features/profiles/types';

interface SimilarChannelsProps {
  channels: Profile[];
}

export function SimilarChannels({ channels }: SimilarChannelsProps) {
  if (channels.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full border border-indigo-200">
            <Sparkles size={18} className="text-indigo-600" strokeWidth={2.5} />
            <span className="text-sm font-bold text-indigo-700">İlginizi Çekebilir</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            📺 Benzer Kanallar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bu kanala ilgi duyuyorsanız bunları da beğenebilirsiniz
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((channel, index) => (
            <div
              key={channel.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProfileCard profile={channel} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
