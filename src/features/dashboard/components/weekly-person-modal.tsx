'use client';

import { X, MapPin, Calendar, Award, BookOpen, Sparkles, Play, Clock, Eye, ExternalLink, Quote } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import type { WeeklyPersonModalProps } from '../types';
import { cn } from '@/lib/utils';

export function WeeklyPersonModal({ person, isOpen, onClose }: WeeklyPersonModalProps) {
  // ESC tuşu ile kapatma ve scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal Container - Mobil: Alt, Desktop: Orta */}
      <div 
        className={cn(
          'relative w-full bg-white',
          'sm:max-w-5xl sm:max-h-[92vh] sm:rounded-3xl',
          'max-h-[95vh] rounded-t-3xl',
          'overflow-y-auto overflow-x-hidden',
          'shadow-2xl',
          'animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header - Mobil için */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl border-b border-gray-100 sm:hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex-1">
              <h2 id="modal-title" className="text-lg font-bold text-gray-900 truncate">
                {person.name}
              </h2>
              <p className="text-sm text-gray-600 truncate">{person.title}</p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors ml-3 shrink-0"
              aria-label="Kapat"
            >
              <X size={20} className="text-gray-700" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Desktop Close Button */}
        <button
          onClick={onClose}
          className="hidden sm:flex sticky top-4 right-4 z-20 ml-auto mr-4 mt-4 items-center justify-center w-12 h-12 bg-white/95 backdrop-blur-xl rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 group"
          aria-label="Kapat"
        >
          <X size={24} className="text-gray-700 group-hover:text-gray-900" strokeWidth={2.5} />
        </button>

        {/* Hero Section */}
        <div className="relative h-64 sm:h-80 lg:h-96 -mt-0 sm:-mt-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={person.image}
              alt={person.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1280px"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          </div>

          {/* Hero Content */}
          <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 lg:p-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 mb-3 sm:mb-4 self-start">
              <Sparkles size={14} className="text-amber-300 sm:w-4 sm:h-4" strokeWidth={2.5} />
              <span className="text-xs sm:text-sm font-bold text-white">Haftanın Kişisi</span>
            </div>

            {/* Name & Title - Desktop için (mobilde sticky header'da var) */}
            <div className="hidden sm:block">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3 drop-shadow-2xl leading-tight">
                {person.name}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/95 font-semibold mb-3 sm:mb-4 drop-shadow-lg">
                {person.title}
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-xl rounded-lg sm:rounded-xl">
                <Calendar size={14} className="text-white/90 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-semibold text-white">{person.period}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-xl rounded-lg sm:rounded-xl">
                <MapPin size={14} className="text-white/90 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-[150px] sm:max-w-none">
                  {person.birthPlace}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 lg:p-12 space-y-8 sm:space-y-10">
          {/* Biography */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
              Yaşam Hikayesi
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {person.fullBiography}
            </p>
          </section>

          {/* Quote */}
          <section className="relative">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-indigo-100">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                  <Quote size={20} className="text-white sm:w-6 sm:h-6" strokeWidth={2.5} />
                </div>
                <blockquote className="flex-1 min-w-0">
                  <p className="text-base sm:text-xl lg:text-2xl font-serif italic text-gray-900 leading-relaxed mb-3 sm:mb-4">
                    "{person.quote}"
                  </p>
                  <footer className="text-sm sm:text-base font-semibold text-indigo-600">
                    — {person.quoteAuthor || person.name}
                  </footer>
                </blockquote>
              </div>
            </div>
          </section>

          {/* Major Works & Achievements - Mobilde tek kolon, tablette iki kolon */}
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {/* Major Works */}
            <section>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                <BookOpen size={20} className="text-indigo-600 sm:w-6 sm:h-6" strokeWidth={2.5} />
                Başlıca Eserleri
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {person.majorWorks.map((work, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs sm:text-sm font-bold text-indigo-600">{index + 1}</span>
                    </div>
                    <span className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">
                      {work}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Achievements */}
            <section>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                <Award size={20} className="text-purple-600 sm:w-6 sm:h-6" strokeWidth={2.5} />
                Başarıları
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {person.achievements.map((achievement, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                  >
                    <Award size={16} className="text-purple-600 shrink-0 mt-0.5 sm:w-5 sm:h-5" strokeWidth={2.5} />
                    <span className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Historical Context */}
          <section className="bg-amber-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-amber-100">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <span>📚</span>
              <span>Tarihsel Bağlam</span>
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              {person.historicalContext}
            </p>
          </section>

          {/* Legacy */}
          <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-green-100">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <span>🌟</span>
              <span>Mirası</span>
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              {person.legacy}
            </p>
          </section>

          {/* Related Videos */}
          <section>
            <div className="mb-6 sm:mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2 sm:mb-3">
                İlgili Videolar
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                {person.name} hakkında en iyi içerikler
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {person.relatedVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 sm:hover:scale-105"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                        <Play size={20} className="text-white ml-0.5 sm:w-7 sm:h-7" fill="white" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-lg">
                      <span className="text-xs font-bold text-white">{video.duration}</span>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                    {/* Title */}
                    <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {video.title}
                    </h4>

                    {/* Channel Info */}
                    <div className="flex items-center gap-2">
                      <Image
                        src={video.channelAvatar}
                        alt={video.channelName}
                        width={20}
                        height={20}
                        className="rounded-full sm:w-6 sm:h-6"
                      />
                      <span className="text-xs sm:text-sm font-semibold text-gray-700 truncate">
                        {video.channelName}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>{video.uploadDate}</span>
                      </div>
                    </div>

                    {/* Watch Link - Sadece desktop'ta göster */}
                    <div className="hidden sm:flex items-center gap-2 text-indigo-600 font-semibold text-sm pt-2 group-hover:gap-3 transition-all">
                      <span>İzle</span>
                      <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Bottom Safe Area - Mobil için */}
          <div className="h-6 sm:hidden" />
        </div>
      </div>
    </div>
  );
}
