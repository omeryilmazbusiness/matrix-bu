'use client';

import { Calendar, Rocket, Users, Award, TrendingUp, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const timeline = [
  {
    year: '2024',
    quarter: 'Q1',
    title: 'Platform Fikri',
    description: 'Kaliteli içerik ihtiyacını fark ettik ve Hakikatbu fikrini geliştirdik.',
    icon: Rocket,
    color: 'indigo'
  },
  {
    year: '2024',
    quarter: 'Q2',
    title: 'İlk Kanallar',
    description: 'Titizlikle seçilmiş ilk 25 kanalı platforma ekledik.',
    icon: Award,
    color: 'purple'
  },
  {
    year: '2024',
    quarter: 'Q3',
    title: 'Topluluk Büyümesi',
    description: '10.000+ kullanıcıya ulaştık ve topluluk önerilerini almaya başladık.',
    icon: Users,
    color: 'pink'
  },
  {
    year: '2025',
    quarter: 'Q1',
    title: 'Büyük Büyüme',
    description: '100+ doğrulanmış kanal ve 50.000+ aktif kullanıcı.',
    icon: TrendingUp,
    color: 'indigo'
  },
  {
    year: '2026',
    quarter: 'Q1',
    title: 'Gelecek Vizyonu',
    description: 'Global ölçekte topluma faydalı içeriği ulaştırma misyonu.',
    icon: Globe,
    color: 'purple'
  }
];

export function TimelineSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg mb-4">
            <Calendar size={28} className="text-white" strokeWidth={2} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Yolculuğumuz
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Küçük bir fikirden büyük bir topluluğa giden yolumuz
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={cn(
                    'relative grid md:grid-cols-2 gap-8 items-center',
                    'animate-in fade-in slide-in-from-bottom-4 duration-700'
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Content - Left Side on Desktop */}
                  <div className={cn(
                    'md:text-right',
                    isEven ? 'md:order-1' : 'md:order-2'
                  )}>
                    <div className={cn(
                      'inline-block text-left md:text-inherit',
                      'bg-white rounded-2xl p-6 shadow-xl border border-gray-200/50',
                      'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300',
                      'w-full'
                    )}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-xs font-bold">
                          {item.year} {item.quarter}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon - Center */}
                  <div className={cn(
                    'absolute left-1/2 -translate-x-1/2 hidden md:flex',
                    'w-16 h-16 rounded-2xl',
                    'bg-linear-to-br shadow-xl',
                    'items-center justify-center z-10',
                    item.color === 'indigo' && 'from-indigo-600 to-indigo-500',
                    item.color === 'purple' && 'from-purple-600 to-purple-500',
                    item.color === 'pink' && 'from-pink-600 to-pink-500'
                  )}>
                    <Icon size={28} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Mobile Icon - Inline */}
                  <div className={cn(
                    'md:hidden inline-flex',
                    'w-12 h-12 rounded-xl',
                    'bg-linear-to-br shadow-lg',
                    'items-center justify-center',
                    item.color === 'indigo' && 'from-indigo-600 to-indigo-500',
                    item.color === 'purple' && 'from-purple-600 to-purple-500',
                    item.color === 'pink' && 'from-pink-600 to-pink-500'
                  )}>
                    <Icon size={20} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Empty Space - Right Side on Desktop */}
                  <div className={cn(
                    'hidden md:block',
                    isEven ? 'md:order-2' : 'md:order-1'
                  )} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
