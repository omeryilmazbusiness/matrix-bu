'use client';

import { useState, useMemo, useEffect } from 'react';
import { HeroSection } from '@/features/dashboard/components/hero-section';
import { SearchFilterBar } from '@/features/dashboard/components/search-filter-bar';
import { TopicFilter } from '@/features/dashboard/components/topic-filter';
import { PanoCard } from '@/features/dashboard/components/pano-card';
import { WeeklyPersonCard } from '@/features/dashboard/components/weekly-person-card';
import { ProfileSlider } from '@/features/dashboard/components/profile-slider';
import { ProfileCard } from '@/features/profiles/components';
import { WelcomeGuide } from '@/features/dashboard/components/welcome-guide';
import { SuggestChannelButton } from '@/features/dashboard/components/suggest-channel-button';
import { Container } from '@/shared/components/layout';
import { mockProfiles } from '@/features/profiles/utils/mock-data';
import { ProfileCardSkeleton, PanoCardSkeleton, WeeklyPersonCardSkeleton } from '@/shared/components/ui/skeleton';
import type { ProfileStatus, ProfileTopic } from '@/shared/lib/constants';
import { Layers, SearchX, Star, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<ProfileStatus | 'all'>('all');
  const [activeTopic, setActiveTopic] = useState<ProfileTopic | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'name'>('popular');
  const [isLoading, setIsLoading] = useState(true);

  // Intentional loading delay for premium feel - Increased to 800ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms delay for smooth premium loading

    return () => clearTimeout(timer);
  }, []);

  // Filter and search profiles
  const filteredProfiles = useMemo(() => {
    let filtered = mockProfiles;

    // Apply topic filter
    if (activeTopic !== 'all') {
      filtered = filtered.filter(p => p.topic === activeTopic);
    }

    // Apply status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(p => p.status === activeFilter);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.view_count - a.view_count;
        case 'recent':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [activeFilter, activeTopic, searchQuery, sortBy]);

  // Get popular profiles for slider
  const popularProfiles = useMemo(() => 
    mockProfiles
      .filter(p => p.status === 'featured')
      .sort((a, b) => b.view_count - a.view_count)
  , []);

  // Get verified profiles for slider
  const verifiedProfiles = useMemo(() => 
    mockProfiles
      .filter(p => p.status === 'verified')
      .sort((a, b) => b.view_count - a.view_count)
  , []);

  // Calculate stats
  const stats = useMemo(() => ({
    total: mockProfiles.length,
    featured: mockProfiles.filter(p => p.status === 'featured').length,
    verified: mockProfiles.filter(p => p.status === 'verified').length,
    standard: mockProfiles.filter(p => p.status === 'standard').length,
  }), []);

  // Calculate topic counts
  const topicCounts = useMemo(() => ({
    all: mockProfiles.length,
    'din-felsefe': mockProfiles.filter(p => p.topic === 'din-felsefe').length,
    'bilim': mockProfiles.filter(p => p.topic === 'bilim').length,
    'tarih': mockProfiles.filter(p => p.topic === 'tarih').length,
    'gundem': mockProfiles.filter(p => p.topic === 'gundem').length,
  }), []);

  const statusCounts = {
    all: mockProfiles.length,
    featured: stats.featured,
    verified: stats.verified,
    standard: stats.standard,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Guide Dialog */}
      <WelcomeGuide />

      {/* Suggest Channel Button - Fixed Bottom Right */}
      <SuggestChannelButton />

      {/* Hero Section */}
      <HeroSection />

      {/* Search & Filter Bar - Sticky */}
      <div className="sticky top-16 md:top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <Container className="py-3 sm:py-4">
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            activeTopic={activeTopic}
            onTopicChange={setActiveTopic}
          />
        </Container>
      </div>

      {/* Topic Filter Section - Moved above Pano */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200/50">
        <Container className="py-4 sm:py-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <Layers size={14} className="text-white sm:w-4 sm:h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Konular</h2>
            </div>
            <TopicFilter 
              activeTopic={activeTopic}
              onTopicChange={setActiveTopic}
              counts={topicCounts}
            />
          </div>
        </Container>
      </div>

      {/* Pano & Weekly Person - With Skeleton Support */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200/50">
        <Container className="py-6 sm:py-8">
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
              <PanoCardSkeleton />
              <WeeklyPersonCardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <PanoCard />
              <WeeklyPersonCard />
            </div>
          )}
        </Container>
      </div>

      <Container className="py-6 sm:py-8 space-y-6 sm:space-y-10">
        {/* Show Loading Skeletons or Real Content */}
        {isLoading ? (
          <>
            {/* Popular Slider Skeleton */}
            <div className="space-y-3 sm:space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg animate-pulse" />
                <div className="h-6 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(4)].map((_, i) => (
                  <ProfileCardSkeleton key={`popular-skeleton-${i}`} />
                ))}
              </div>
            </div>

            {/* Verified Slider Skeleton */}
            <div className="space-y-3 sm:space-y-4 animate-in fade-in duration-500 delay-75">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg animate-pulse" />
                <div className="h-6 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(4)].map((_, i) => (
                  <ProfileCardSkeleton key={`verified-skeleton-${i}`} />
                ))}
              </div>
            </div>

            {/* Main Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-in fade-in duration-500 delay-150">
              {[...Array(6)].map((_, i) => (
                <ProfileCardSkeleton key={`grid-skeleton-${i}`} />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Popular Slider Section - Real Content with Fade In */}
            {popularProfiles.length > 0 && !searchQuery && (
              <div className="space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                    <Star size={16} className="text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">En Çok Tercih Edilenler</h2>
                </div>
                <ProfileSlider profiles={popularProfiles} />
              </div>
            )}

            {/* Verified Slider Section - Real Content with Fade In */}
            {verifiedProfiles.length > 0 && !searchQuery && (
              <div className="space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                    <CheckCircle2 size={16} className="text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">Doğrulanmış Kanallar</h2>
                </div>
                <ProfileSlider profiles={verifiedProfiles} />
              </div>
            )}

            {/* Minimal Results Info */}
            {(searchQuery || activeTopic !== 'all') && (
              <div className="flex items-center justify-center gap-3 py-3 animate-in fade-in duration-500">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{filteredProfiles.length}</span> sonuç bulundu
                  </span>
                </div>
              </div>
            )}

            {/* Profile Grid - Real Content with Staggered Fade In */}
            {filteredProfiles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProfiles.map((profile, index) => (
                  <div
                    key={profile.id}
                    className="animate-in fade-in slide-in-from-bottom-3 duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProfileCard profile={profile} />
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-12 sm:py-20 animate-in fade-in zoom-in-95 duration-700">
                <div className="max-w-md mx-auto space-y-3 sm:space-y-4 px-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                    <SearchX size={40} className="text-gray-400 sm:w-12 sm:h-12" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Sonuç Bulunamadı
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-lg">
                    {searchQuery 
                      ? `"${searchQuery}" için sonuç bulunamadı. Farklı bir arama deneyin.`
                      : 'Bu kategoride henüz profil eklenmemiş.'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('all');
                      setActiveTopic('all');
                    }}
                    className="mt-4 sm:mt-6 w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg active:scale-95 sm:hover:scale-105 transition-all font-semibold text-sm sm:text-base"
                  >
                    Tüm Profilleri Gör
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
