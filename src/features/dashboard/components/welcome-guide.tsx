'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Sparkles, Search, Star, CheckCircle2, ArrowRight, X } from 'lucide-react';

export function WelcomeGuide() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Popup disabled - not showing on page load
    // Uncomment below to enable popup
    // const timer = setTimeout(() => {
    //   setIsOpen(true);
    // }, 600);
    // return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="max-w-md sm:max-w-lg p-0 border-0 overflow-visible bg-transparent shadow-none"
        showCloseButton={false}
      >
        {/* Hidden title for accessibility */}
        <DialogTitle className="sr-only">Hoş Geldiniz</DialogTitle>

        {/* Subtle Multi-layered Background - Minimal & Calm */}
        <div className="relative">
          {/* Soft outer glow - very subtle */}
          <div className="absolute -inset-8 bg-gradient-to-br from-slate-100/40 via-gray-50/30 to-slate-100/40 rounded-3xl blur-3xl" />
          
          {/* Inner soft glow */}
          <div className="absolute -inset-4 bg-white/50 rounded-2xl blur-2xl" />
          
          {/* Main Content Container - Clean & Minimal */}
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            {/* Very subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-transparent to-gray-50/20 rounded-2xl" />
            
            {/* Close Button - Minimal */}
            <button
              onClick={handleClose}
              className="absolute -top-2 -right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <X size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={2} />
            </button>

            {/* Content */}
            <div className="relative p-8 sm:p-10">
              {/* Header - Clean & Simple */}
              <div className="text-center mb-8">
                {/* Icon - Subtle */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl shadow-sm mb-4">
                  <Sparkles className="w-7 h-7 text-slate-600" strokeWidth={2} />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                  Hoş Geldiniz
                </h2>
                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                  YouTube'da en kaliteli içerik üreticilerini keşfetmeye başlayın
                </p>
              </div>

              {/* Features - Minimal Cards */}
              <div className="space-y-3 mb-8">
                {/* Feature 1 */}
                <div className="flex items-center gap-4 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-100/50 hover:bg-white/60 transition-all duration-300">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 shrink-0">
                    <Search className="w-5 h-5 text-slate-600" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-gray-900 mb-0.5">AI Akıllı Arama</h3>
                    <p className="text-xs text-gray-500">Aradığın içeriğe kolayca ulaş</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-4 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-100/50 hover:bg-white/60 transition-all duration-300">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 shrink-0">
                    <Star className="w-5 h-5 text-slate-600" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-gray-900 mb-0.5">Öne Çıkan Kanallar</h3>
                    <p className="text-xs text-gray-500">Popüler içerik üreticileri</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-4 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-100/50 hover:bg-white/60 transition-all duration-300">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-slate-600" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-gray-900 mb-0.5">Doğrulanmış İçerikler</h3>
                    <p className="text-xs text-gray-500">Güvenilir kaynaklar</p>
                  </div>
                </div>
              </div>

              {/* CTA Button - Subtle & Clean */}
              <button
                onClick={handleClose}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <span>Keşfetmeye Başla</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}