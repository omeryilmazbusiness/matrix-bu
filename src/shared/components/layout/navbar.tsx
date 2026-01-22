'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Settings, Shield, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/shared/lib/constants';
import { CrescentSearchLogo } from '@/shared/components/ui/crescent-logo';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Ana Sayfa', icon: Home },
  { href: '/profiller', label: 'Profiller', icon: BookOpen },
  { href: '/ayarlar', label: 'Ayarlar', icon: Settings },
  { href: '/admin', label: 'Admin', icon: Shield, adminOnly: true }
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <>
      {/* Desktop Navigation - Compact & Professional */}
      <nav className="hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo - Hilal Büyüteç */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative transition-transform duration-300 group-hover:scale-110">
                <CrescentSearchLogo size={36} className="drop-shadow-md" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-linear-to-r from-indigo-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-none">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-[10px] text-gray-500 font-medium tracking-wide leading-none mt-0.5">
                  Keşfet ve Öğren
                </span>
              </div>
            </Link>

            {/* Desktop Menu - Compact Pills */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      active 
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <Icon size={17} strokeWidth={active ? 2.5 : 2} />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header - Compact */}
      <header className="md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="transition-transform duration-300 group-active:scale-95">
              <CrescentSearchLogo size={32} className="drop-shadow" />
            </div>
            <span className="text-base font-bold bg-linear-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Burger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              'relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200',
              mobileMenuOpen 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95'
            )}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X size={20} strokeWidth={2.5} />
            ) : (
              <Menu size={20} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <div className="absolute top-full left-0 right-0 z-50 mx-4 mt-2 animate-in slide-in-from-top-2 duration-200">
              <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden">
                <div className="p-2 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                          active 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                            : 'text-gray-700 hover:bg-gray-50 active:scale-98'
                        )}
                      >
                        <div className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                          active 
                            ? 'bg-indigo-100 text-indigo-700' 
                            : 'bg-gray-100 text-gray-600'
                        )}>
                          <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                        </div>
                        <span className="flex-1">{item.label}</span>
                        {active && (
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
