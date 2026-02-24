'use client';

import { Mail, Share2, MapPin, ExternalLink } from 'lucide-react';
import { contactInfoCards } from '../utils/contact-data';

const iconMap = {
  Mail,
  Share2,
  MapPin
};

export function ContactInfoCards() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactInfoCards.map((card, index) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap];
            
            return (
              <div
                key={card.id}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl group-hover:scale-110 transition-transform">
                    <Icon size={32} className="text-indigo-600" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-lg font-semibold text-indigo-600">
                    {card.subtitle}
                  </p>
                  <p className="text-gray-600">
                    {card.description}
                  </p>
                </div>

                {/* Action Button */}
                {card.actionUrl && (
                  <a
                    href={card.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group/link"
                  >
                    <span>{card.actionLabel}</span>
                    <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                )}

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
