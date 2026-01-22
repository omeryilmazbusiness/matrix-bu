'use client';

import { useState, useEffect } from 'react';
import { MessageCircleQuestion, ChevronRight, Lightbulb, Sparkles, Heart, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

const panoQuestions = [
  {
    id: 1,
    question: 'Yapay zeka insanlığın geleceğini nasıl şekillendirecek?',
    answer: 'Yapay zeka, sağlıktan eğitime kadar birçok alanda devrim yaratacak. Ancak etik kullanım ve düzenlemeler kritik önem taşıyor.',
    category: 'bilim',
    icon: Sparkles,
    color: 'blue' as const,
    likes: 1247,
    views: 8542
  },
  {
    id: 2,
    question: 'Tarih tekerrür eder mi?',
    answer: 'Tarih birebir tekrar etmez ama benzer desenler gösterir. Geçmişten ders almak, geleceği şekillendirmede önemlidir.',
    category: 'tarih',
    icon: Lightbulb,
    color: 'amber' as const,
    likes: 892,
    views: 5321
  },
  {
    id: 3,
    question: 'Din ve bilim çelişir mi?',
    answer: 'Din ve bilim farklı soruları yanıtlar. Biri "nasıl", diğeri "neden" sorusuna odaklanır. Uyum içinde var olabilirler.',
    category: 'din-felsefe',
    icon: MessageCircleQuestion,
    color: 'purple' as const,
    likes: 2103,
    views: 12487
  }
];

type ColorType = 'blue' | 'amber' | 'purple';

export function PanoCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const currentQuestion = panoQuestions[currentIndex];
  const Icon = currentQuestion.icon;

  useEffect(() => {
    if (isExpanded) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % panoQuestions.length);
      setIsLiked(false); // Reset like on question change
    }, 8000);

    return () => clearInterval(interval);
  }, [isExpanded]);

  // Color mapping
  const colorClasses: Record<ColorType, {
    glow: string;
    icon: string;
    iconBg: string;
    badge: string;
    button: string;
    like: string;
  }> = {
    blue: {
      glow: 'from-blue-200/40 to-indigo-200/40',
      icon: 'text-blue-600',
      iconBg: 'bg-blue-50',
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
      button: 'bg-blue-600 hover:bg-blue-700',
      like: 'text-blue-600'
    },
    amber: {
      glow: 'from-amber-200/40 to-orange-200/40',
      icon: 'text-amber-600',
      iconBg: 'bg-amber-50',
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      button: 'bg-amber-600 hover:bg-amber-700',
      like: 'text-amber-600'
    },
    purple: {
      glow: 'from-purple-200/40 to-pink-200/40',
      icon: 'text-purple-600',
      iconBg: 'bg-purple-50',
      badge: 'bg-purple-50 text-purple-700 border-purple-200',
      button: 'bg-purple-600 hover:bg-purple-700',
      like: 'text-purple-600'
    }
  };

  const colors = colorClasses[currentQuestion.color];
  const displayLikes = currentQuestion.likes + (isLiked ? 1 : 0);

  return (
    <div className="relative group h-full">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className={cn(
          'absolute inset-0 rounded-3xl opacity-30 blur-3xl transition-all duration-1000',
          `bg-gradient-to-br ${colors.glow}`
        )} />
      </div>

      {/* Main Card */}
      <div 
        className={cn(
          'relative overflow-hidden rounded-3xl transition-all duration-500 h-full',
          'bg-white/90 backdrop-blur-xl',
          'border-2 border-gray-200/60',
          'shadow-xl shadow-gray-200/50',
          'hover:shadow-2xl hover:border-gray-300/60'
        )}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200/50 bg-gradient-to-b from-gray-50/50 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Icon - Fixed Size */}
              <div className={cn(
                'w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300',
                colors.iconBg,
                'border border-gray-200/50 shadow-sm'
              )}>
                <Icon 
                  size={22} 
                  className={cn(colors.icon, 'flex-shrink-0')}
                  strokeWidth={2}
                />
              </div>

              {/* Title */}
              <div>
                <h3 className="text-base font-bold text-gray-900">Haftanın Sorusu</h3>
                <p className="text-xs text-gray-600 font-medium">Pano</p>
              </div>
            </div>
            
            {/* Indicator Dots */}
            <div className="flex gap-1.5 bg-gray-100/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200/50">
              {panoQuestions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-500',
                    idx === currentIndex 
                      ? 'w-6 bg-gray-900' 
                      : 'w-1.5 bg-gray-400 hover:bg-gray-500'
                  )}
                  aria-label={`Soru ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-5">
          {/* Question */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-gray-900">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Category Badge, Like & View Stats */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border',
              colors.badge
            )}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              #{currentQuestion.category}
            </span>

            {/* Stats Container */}
            <div className="flex items-center gap-2">
              {/* View Count */}
              <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold bg-gray-50 border border-gray-200">
                <Eye size={16} className="text-gray-600" strokeWidth={2} />
                <span className="text-gray-700">
                  {currentQuestion.views.toLocaleString()}
                </span>
              </div>

              {/* Like Button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                  'bg-gray-50 border border-gray-200 hover:bg-gray-100',
                  isLiked && 'bg-red-50 border-red-200'
                )}
              >
                <Heart 
                  size={16} 
                  className={cn(
                    'transition-all duration-300',
                    isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  )}
                  strokeWidth={2}
                />
                <span className={cn(
                  'font-bold',
                  isLiked ? 'text-red-600' : 'text-gray-700'
                )}>
                  {displayLikes.toLocaleString()}
                </span>
              </button>
            </div>
          </div>

          {/* Answer - Expandable */}
          <div 
            className={cn(
              'overflow-hidden transition-all duration-700 ease-out',
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="pt-4 pb-2">
              <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {currentQuestion.answer}
                </p>
              </div>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl',
              'text-white font-semibold text-sm transition-all duration-300',
              'shadow-lg hover:shadow-xl active:scale-[0.98]',
              colors.button
            )}
          >
            <span>{isExpanded ? 'Gizle' : 'Cevabı Gör'}</span>
            <ChevronRight 
              size={18} 
              className={cn(
                'transition-all duration-300',
                isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'
              )}
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
