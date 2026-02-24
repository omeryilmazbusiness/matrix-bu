'use client';

import { useState, useMemo } from 'react';
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
import { usePublicProfiles } from '@/features/profiles/hooks/use-public-profiles';
import { ProfileCardSkeleton, PanoCardSkeleton, WeeklyPersonCardSkeleton } from '@/shared/components/ui/skeleton';
import type { ProfileStatus, ProfileTopic } from '@/shared/lib/constants';
import { Layers, SearchX, Star, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<ProfileStatus | 'all'>('all');
  const [activeTopic, setActiveTopic] = useState<ProfileTopic | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'name'>('popular');

  // Fetch profiles from database
  const { profiles: dbProfiles, loading: dbLoading, error: dbError } = usePublicProfiles();

  // Map database profiles to expected format
  const profiles = useMemo(() => 
    dbProfiles.map(profile => ({
      id: profile.id,
      slug: profile.slug,
      name: profile.name || profile.channel_title || 'İsimsiz Kanal',
      title: profile.title || profile.channel_title || '',
      description: profile.description || profile.channel_description || '',
      image_url: profile.image_url || profile.thumbnail_high || profile.thumbnail_medium || '/placeholder-channel.svg',
      topic: profile.topic as ProfileTopic,
      status: mapStatus(profile.status),
      youtube_url: profile.youtube_url || '',
      twitter_url: profile.twitter_url || '',
      instagram_url: profile.instagram_url || '',
      view_count: profile.view_count || 0,
      created_at: profile.created_at,
      updated_at: profile.updated_at, // ✅ Eksik alan eklendi
      is_featured: profile.is_featured || false,
    }))
  , [dbProfiles]);

  // Map database status to ProfileStatus
  function mapStatus(dbStatus: string): ProfileStatus {
    switch (dbStatus) {
      case 'verified':
        return 'verified';
      case 'published':
      case 'active':
        return 'standard';
      default:
        return 'standard';
    }
  }

  // Determine if featured based on is_featured flag or view count
  const getFeaturedStatus = (profile: any): ProfileStatus => {
    if (profile.is_featured) return 'featured';
    if (profile.status === 'verified') return 'verified';
    return 'standard';
  };

  // Map profiles with proper status
  const mappedProfiles = useMemo(() => 
    profiles.map(profile => ({
      ...profile,
      status: getFeaturedStatus(profile)
    }))
  , [profiles]);

  // Filter and search profiles
  const filteredProfiles = useMemo(() => {
    let filtered = mappedProfiles;

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
  }, [activeFilter, activeTopic, searchQuery, sortBy, mappedProfiles]);

  // Get popular profiles for slider
  const popularProfiles = useMemo(() => 
    mappedProfiles
      .filter(p => p.status === 'featured')
      .sort((a, b) => b.view_count - a.view_count)
  , [mappedProfiles]);

  // Get verified profiles for slider
  const verifiedProfiles = useMemo(() => 
    mappedProfiles
      .filter(p => p.status === 'verified')
      .sort((a, b) => b.view_count - a.view_count)
  , [mappedProfiles]);

  // Calculate stats
  const stats = useMemo(() => ({
    total: mappedProfiles.length,
    featured: mappedProfiles.filter(p => p.status === 'featured').length,
    verified: mappedProfiles.filter(p => p.status === 'verified').length,
    standard: mappedProfiles.filter(p => p.status === 'standard').length,
  }), [mappedProfiles]);

  // Calculate topic counts
  const topicCounts = useMemo(() => ({
    all: mappedProfiles.length,
    'din-felsefe': mappedProfiles.filter(p => p.topic === 'din-felsefe').length,
    'bilim': mappedProfiles.filter(p => p.topic === 'bilim').length,
    'tarih': mappedProfiles.filter(p => p.topic === 'tarih').length,
    'gundem': mappedProfiles.filter(p => p.topic === 'gundem').length,
  }), [mappedProfiles]);

  const statusCounts = {
    all: mappedProfiles.length,
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

      {/* Topic Filter Section */}
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

      {/* Pano & Weekly Person */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200/50">
        <Container className="py-6 sm:py-8">
          {dbLoading ? (
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
        {/* Database Error */}
        {dbError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-900">Veri Yükleme Hatası</p>
              <p className="text-sm text-red-700">{dbError}</p>
            </div>
          </div>
        )}

        {/* Loading Skeletons */}
        {dbLoading ? (
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
            {/* Popular Slider Section */}
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

            {/* Verified Slider Section */}
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

            {/* Results Info */}
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

            {/* Profile Grid */}
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
