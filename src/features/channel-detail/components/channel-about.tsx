'use client';

import { Calendar, TrendingUp, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChannelDetail } from '../types';

interface ChannelAboutProps {
  channel: ChannelDetail;
}

export function ChannelAbout({ channel }: ChannelAboutProps) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Column - Description */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                Kanal Hakkında
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {channel.longDescription}
              </p>
            </div>

            {/* Content Categories */}
            <div className="pt-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">İçerik Kategorileri</h3>
              <div className="flex flex-wrap gap-2">
                {channel.contentCategories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Publish Frequency */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                <Calendar size={18} className="text-gray-600" strokeWidth={2} />
                <span className="text-sm font-semibold text-gray-700">
                  Yayın Sıklığı: <span className="text-indigo-600">{channel.publishFrequency}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Stats Card */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200/50 shadow-xl p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp size={24} className="text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Hızlı İstatistikler
                </h3>
              </div>

              <div className="space-y-4">
                <StatItem
                  label="Toplam İzlenme"
                  value={channel.view_count.toLocaleString()}
                  icon="👁️"
                />
                <StatItem
                  label="Toplam Abone"
                  value={channel.subscriber_count ? `${(channel.subscriber_count / 1000).toFixed(0)}K` : 'N/A'}
                  icon="👥"
                />
                <StatItem
                  label="Video Sayısı"
                  value={channel.video_count?.toString() || 'N/A'}
                  icon="🎬"
                />
                <StatItem
                  label="Ortalama Görüntülenme"
                  value={channel.avgViewsPerVideo.toLocaleString()}
                  icon="��"
                />
                <StatItem
                  label="Aylık Yeni Video"
                  value={`~${channel.monthlyVideoCount}`}
                  icon="📅"
                />
              </div>

              {/* Suggest Button */}
              <button className={cn(
                'w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl',
                'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm',
                'hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300'
              )}>
                <Video size={18} strokeWidth={2.5} />
                Kanal Öner
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200/50 hover:border-indigo-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <span className="text-lg font-bold text-gray-900">{value}</span>
    </div>
  );
}
