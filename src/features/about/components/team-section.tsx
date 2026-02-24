'use client';

import { Users, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const team = [
  {
    name: 'Ekip Lideri',
    role: 'Strateji ve Vizyon',
    description: 'Platform vizyonunu belirler ve stratejik kararları yönetir.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    name: 'İçerik Uzmanı',
    role: 'Kalite Kontrol',
    description: 'Tüm içerikleri değerlendirir ve kalite standartlarını belirler.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: 'Teknoloji Lideri',
    role: 'Geliştirme',
    description: 'Platform teknolojisini geliştirir ve yenilikçi çözümler üretir.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Topluluk Yöneticisi',
    role: 'Kullanıcı İlişkileri',
    description: 'Kullanıcı geri bildirimlerini toplar ve topluluğu yönetir.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  }
];

export function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <Users size={28} className="text-white" strokeWidth={2} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Ekibimiz
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Alanında uzman, tutkulu ve deneyimli ekibimizle kaliteyi garanti ediyoruz
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-t from-indigo-600/90 to-transparent transition-opacity duration-500',
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  )} />

                  {/* Social Icons */}
                  <div className={cn(
                    'absolute bottom-4 left-0 right-0 flex justify-center gap-3 transition-all duration-500',
                    hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  )}>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Linkedin size={18} className="text-white" strokeWidth={2} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Mail size={18} className="text-white" strokeWidth={2} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-600">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-bl-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
