'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Play, Info, Mail, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/shared/lib/constants';
import { CrescentSearchLogo } from '@/shared/components/ui/crescent-logo';
import { useState, useEffect } from 'react';

const navItems = [
  { 
    href: '/', 
    label: 'Ana Sayfa', 
    icon: Home,
    description: 'Keşfet ve incele'
  },
  { 
    href: '/kanallar', 
    label: 'Kanallar', 
    icon: Play,
    description: 'Tüm içerikler'
  },
  { 
    href: '/hakkimizda', 
    label: 'Hakkımızda', 
    icon: Info,
    description: 'Bizi tanıyın'
  },
  { 
    href: '/iletisim', 
    label: 'İletişim', 
    icon: Mail,
    description: 'Bizimle iletişime geçin'
  }
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  // Detect scroll for enhanced blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop Navigation - Ultra Modern Glass Morphism */}
      <nav 
        className={cn(
          'hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled 
            ? 'bg-white/70 backdrop-blur-2xl shadow-lg shadow-indigo-500/5' 
            : 'bg-white/60 backdrop-blur-xl shadow-md shadow-black/5'
        )}
      >
        {/* Gradient Border Top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section - Premium Design */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group relative"
            >
              {/* Logo Glow Background */}
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
              
              {/* Animated Logo Container */}
              <div className="relative transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <CrescentSearchLogo 
                  size={40} 
                  className="drop-shadow-lg"
                  animated={false}
                />
                {/* Micro pulse on hover */}
                <div className="absolute inset-0 rounded-full bg-indigo-400/20 animate-ping opacity-0 group-hover:opacity-100" />
              </div>
              
              {/* Text Container */}
              <div className="flex flex-col -space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className={cn(
                    "text-xl font-black tracking-tight transition-all duration-300",
                    "bg-linear-to-r from-indigo-600 via-indigo-700 to-purple-700 bg-clip-text text-transparent",
                    "group-hover:from-indigo-700 group-hover:via-purple-600 group-hover:to-indigo-700"
                  )}>
                    {SITE_CONFIG.name}
                  </span>
                  <Sparkles 
                    size={14} 
                    className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" 
                  />
                </div>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase leading-none">
                  Keşfet • Öğren • Paylaş
                </span>
              </div>
            </Link>

            {/* Desktop Menu - Pill Design with Enhanced UX */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative group/item flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm',
                      'transition-all duration-300 ease-out',
                      active 
                        ? 'text-white shadow-lg shadow-indigo-500/30' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                    )}
                  >
                    {/* Active Background - Gradient */}
                    {active && (
                      <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-indigo-500 to-purple-600 rounded-xl -z-10 animate-in fade-in zoom-in-95 duration-300" />
                    )}
                    
                    {/* Hover Glow */}
                    {!active && (
                      <div className="absolute inset-0 bg-linear-to-br from-indigo-50 to-purple-50 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 -z-10" />
                    )}
                    
                    {/* Icon Container */}
                    <div className={cn(
                      'relative transition-transform duration-300',
                      active && 'scale-110',
                      !active && 'group-hover/item:scale-110 group-hover/item:rotate-3'
                    )}>
                      <Icon 
                        size={18} 
                        strokeWidth={active ? 2.5 : 2}
                        className="relative z-10"
                      />
                      {/* Icon Glow */}
                      {active && (
                        <div className="absolute inset-0 bg-white/30 blur-md rounded-full" />
                      )}
                    </div>
                    
                    {/* Label */}
                    <span className="relative">
                      {item.label}
                    </span>
                    
                    {/* Active Indicator */}
                    {active && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Gradient Border */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500",
          scrolled 
            ? "bg-linear-to-r from-transparent via-indigo-300/50 to-transparent opacity-100"
            : "bg-linear-to-r from-transparent via-gray-200/50 to-transparent opacity-50"
        )} />
      </nav>

      {/* Mobile Header - Glass Morphism */}
      <header 
        className={cn(
          'md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/75 backdrop-blur-2xl shadow-xl shadow-indigo-500/10'
            : 'bg-white/65 backdrop-blur-xl shadow-lg shadow-black/5'
        )}
      >
        {/* Top Gradient Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />
        
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative transform transition-all duration-300 group-active:scale-95">
              <CrescentSearchLogo size={36} className="drop-shadow-md" />
              <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col -space-y-0.5">
              <span className="text-lg font-black bg-linear-to-r from-indigo-600 via-indigo-700 to-purple-700 bg-clip-text text-transparent leading-none">
                {SITE_CONFIG.name}
              </span>
              <span className="text-[9px] text-gray-500 font-semibold tracking-wider leading-none">
                Keşfet & Öğren
              </span>
            </div>
          </Link>

          {/* Burger Menu Button - Enhanced */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              'relative w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300',
              'active:scale-95',
              mobileMenuOpen 
                ? 'bg-linear-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
                : 'bg-white/80 text-gray-700 hover:bg-white shadow-md hover:shadow-lg'
            )}
            aria-label="Menu"
          >
            {/* Button Glow */}
            {mobileMenuOpen && (
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl blur-md opacity-50 -z-10" />
            )}
            
            {/* Animated Burger/Close Icon */}
            <div className="relative w-5 h-5 flex flex-col items-center justify-center gap-1.5">
              <span className={cn(
                'absolute w-5 h-0.5 bg-current transition-all duration-300',
                mobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
              )} />
              <span className={cn(
                'absolute w-5 h-0.5 bg-current transition-all duration-300',
                mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
              )} />
              <span className={cn(
                'absolute w-5 h-0.5 bg-current transition-all duration-300',
                mobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
              )} />
            </div>
          </button>
        </div>

        {/* Bottom Border */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500",
          scrolled 
            ? "bg-linear-to-r from-transparent via-indigo-300/40 to-transparent"
            : "bg-linear-to-r from-transparent via-gray-200/40 to-transparent"
        )} />

        {/* Mobile Dropdown Menu - Premium Glass Design */}
        {mobileMenuOpen && (
          <>
            {/* Enhanced Backdrop */}
            <div 
              className="fixed inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/30 backdrop-blur-md z-40 animate-in fade-in duration-300"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Content - Glass Card */}
            <div className="absolute top-full left-0 right-0 z-50 px-4 pt-3 pb-safe animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-indigo-500/10 border border-white/50 overflow-hidden">
                {/* Menu Header Gradient */}
                <div className="h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500" />
                
                <div className="p-3 space-y-1.5">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'relative group flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold',
                          'transition-all duration-300 active:scale-98',
                          'animate-in slide-in-from-top-2 fade-in duration-300',
                          active 
                            ? 'text-white shadow-lg shadow-indigo-500/30' 
                            : 'text-gray-700 hover:bg-white/60 active:bg-white/80'
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Active Background */}
                        {active && (
                          <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-indigo-500 to-purple-600 rounded-xl -z-10" />
                        )}
                        
                        {/* Icon Container with Badge */}
                        <div className={cn(
                          'relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300',
                          active 
                            ? 'bg-white/20' 
                            : 'bg-linear-to-br from-gray-100 to-gray-50 group-hover:from-indigo-50 group-hover:to-purple-50'
                        )}>
                          <Icon 
                            size={20} 
                            strokeWidth={active ? 2.5 : 2}
                            className="relative z-10"
                          />
                          {/* Icon Glow */}
                          {active && (
                            <div className="absolute inset-0 bg-white/20 blur-md rounded-xl" />
                          )}
                        </div>
                        
                        {/* Label & Description */}
                        <div className="flex-1">
                          <span className="block">{item.label}</span>
                          <span className={cn(
                            "text-xs font-normal opacity-70 block mt-0.5",
                            active ? 'text-white/90' : 'text-gray-500'
                          )}>
                            {item.description}
                          </span>
                        </div>
                        
                        {/* Active Indicator */}
                        {active && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Menu Footer */}
                <div className="px-4 py-3 bg-linear-to-r from-indigo-50/50 via-purple-50/50 to-indigo-50/50 border-t border-gray-200/50">
                  <p className="text-xs text-center text-gray-500 font-medium">
                    Premium Kullanıcı Deneyimi ✨
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
