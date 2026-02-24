'use client';

import Image from 'next/image';
import { Play, Eye, ThumbsUp, ExternalLink, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FeaturedVideo } from '../types';

interface ContentExamplesProps {
  videos: FeaturedVideo[];
  channelName: string;
}

export function ContentExamples({ videos, channelName }: ContentExamplesProps) {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-md">
            <Play size={18} className="text-indigo-600" strokeWidth={2.5} />
            <span className="text-sm font-bold text-gray-700">Önerilen İçerikler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            🎬 {channelName} İçeriklerinden Öne Çıkanlar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            İzlemenizi önerdiğimiz ve sizin için değerlendirdiğimiz videolar
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <article
              key={video.id}
              className={cn(
                'group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500',
                'animate-in fade-in slide-in-from-bottom-4 duration-700'
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-gray-900">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Play size={28} className="text-white ml-1" strokeWidth={2.5} fill="white" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-white text-xs font-bold">
                  {video.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {video.title}
                </h3>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Eye size={16} strokeWidth={2} />
                    <span>{video.viewCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp size={16} strokeWidth={2} />
                    <span>{video.likeCount.toLocaleString()}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span>{new Date(video.publishedAt).toLocaleDateString('tr-TR')}</span>
                </div>

                {/* Our Review */}
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">
                      Bizim Yorumumuz
                    </h4>
                  </div>

                  {/* Why */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong className="text-indigo-600">Neden Öneriyoruz:</strong> {video.ourReview.why}
                  </p>

                  {/* Topics */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                      Kapsanan Konular:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {video.ourReview.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                      Öne Çıkan Noktalar:
                    </span>
                    <ul className="space-y-1.5">
                      {video.ourReview.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" strokeWidth={2} />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Target Audience */}
                  <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                    <p className="text-xs text-purple-900">
                      <strong>Hedef Kitle:</strong> {video.ourReview.targetAudience}
                    </p>
                  </div>
                </div>

                {/* Watch Button */}
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl',
                    'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm',
                    'hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300'
                  )}
                >
                  <Play size={18} strokeWidth={2.5} />
                  Videoyu İzle
                  <ExternalLink size={16} strokeWidth={2.5} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
