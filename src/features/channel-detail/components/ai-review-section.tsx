'use client';

import { Sparkles, CheckCircle2, Star, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AIReview } from '../types';

interface AIReviewSectionProps {
  review: AIReview;
  channelName: string;
}

export function AIReviewSection({ review, channelName }: AIReviewSectionProps) {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl opacity-50" />
          
          <div className="relative bg-white rounded-3xl border-2 border-transparent bg-clip-padding shadow-2xl overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-[2px] -z-10">
              <div className="h-full w-full bg-white rounded-3xl" />
            </div>

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-6">
              <div className="flex items-start gap-4">
                {/* AI Avatar */}
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center border-2 border-white/30 shadow-xl">
                  <Sparkles size={32} className="text-white" strokeWidth={2.5} />
                </div>

                {/* Title */}
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    🤖 AI Değerlendirmesi
                  </h2>
                  <p className="text-white/90 text-sm">
                    Platformumuzun yapay zeka asistanı tarafından değerlendirildi
                  </p>
                </div>

                {/* Quality Score */}
                <div className="hidden sm:block shrink-0 text-center">
                  <div className="text-3xl font-black text-white mb-1">
                    {review.contentQualityScore.toFixed(1)}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={cn(
                          i < review.contentQualityScore
                            ? 'fill-yellow-300 text-yellow-300'
                            : 'fill-white/30 text-white/30'
                        )}
                        strokeWidth={2}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Quality Score - Mobile */}
              <div className="sm:hidden flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                <span className="text-sm font-bold text-gray-900">İçerik Kalitesi</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-indigo-600">
                    {review.contentQualityScore.toFixed(1)}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={cn(
                          i < review.contentQualityScore
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'fill-gray-300 text-gray-300'
                        )}
                        strokeWidth={2}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {review.summary}
                </p>
              </div>

              {/* Strengths */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-green-600" strokeWidth={2.5} />
                  </div>
                  Güçlü Yönleri
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {review.strengths.map((strength, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:shadow-md transition-shadow duration-300"
                    >
                      <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-sm font-medium text-gray-800 leading-relaxed">
                        {strength}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0">
                    <Users size={20} className="text-indigo-600" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-900 mb-2">
                      Hedef Kitle
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {review.targetAudience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Generated Date */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Bu değerlendirme {new Date(review.generatedAt).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} tarihinde AI tarafından oluşturulmuştur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
