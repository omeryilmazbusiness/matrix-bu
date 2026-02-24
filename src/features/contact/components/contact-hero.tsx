'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <Mail size={18} className="text-white" strokeWidth={2.5} />
            <span className="text-sm font-bold text-white">İletişim</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
            Bizimle İletişime Geçin
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/90 font-medium">
            Sorularınız, önerileriniz veya geri bildirimleriniz için buradayız
          </p>

          {/* Description */}
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Platformumuz hakkında merak ettikleriniz, kanal önerileriniz veya iş birliği teklifleriniz için bizimle iletişime geçebilirsiniz. Ekibimiz en kısa sürede size dönüş yapacaktır.
          </p>

          {/* Quick Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
            <a
              href="mailto:info@hakikatbu.com"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <Mail size={20} />
              <span className="font-semibold">info@hakikatbu.com</span>
            </a>
            <a
              href="tel:+905551234567"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <Phone size={20} />
              <span className="font-semibold">+90 555 123 45 67</span>
            </a>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin size={20} />
              <span className="font-semibold">İstanbul, Türkiye</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
