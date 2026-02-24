'use client';

import { useState, useMemo } from 'react';
import { Container } from '@/shared/components/layout';
import { Sparkles, Filter, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/shared/hooks';
import { useViewMode } from '@/features/channels/hooks/use-view-mode';
import { useChannels } from '@/features/channels/hooks/use-channels';
import { filterChannels, sortChannels } from '@/features/channels/utils/filter-channels';
import { StatsBar } from '@/features/channels/components/stats-bar';
import { FilterBar } from '@/features/channels/components/filter-bar';
import { QuickFilters } from '@/features/channels/components/quick-filters';
import { ChannelCard } from '@/features/channels/components/channel-card';
import { ChannelListItem } from '@/features/channels/components/channel-list-item';
import { TopicFilter } from '@/features/dashboard/components/topic-filter';
import { ChannelCardSkeleton, ChannelListItemSkeleton, StatsBarSkeleton, FilterBarSkeleton } from '@/shared/components/ui/skeleton';
import type { ProfileTopic, ProfileStatus } from '@/shared/lib/constants';
import type { SortOption } from '@/features/channels/types';

export default function ChannelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<ProfileTopic | 'all'>('all');
  const [activeStatus, setActiveStatus] = useState<ProfileStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [quickFilter, setQuickFilter] = useState<string | undefined>();
  const { viewMode, setViewMode } = useViewMode();
  
  // Fetch real data from database
  const { channels, loading, error } = useChannels();

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Filter and sort channels
  const filteredChannels = useMemo(() => {
    let filtered = channels;

    // Apply quick filters first
    if (quickFilter === 'trending') {
      filtered = filtered.sort((a, b) => b.view_count - a.view_count).slice(0, 20);
    } else if (quickFilter === 'new') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      filtered = filtered.filter(p => new Date(p.created_at) > oneMonthAgo);
    } else if (quickFilter === 'featured') {
      filtered = filtered.filter(p => p.status === 'featured');
    } else if (quickFilter === 'verified') {
      filtered = filtered.filter(p => p.status === 'verified');
    }

    // Apply regular filters
    filtered = filterChannels(filtered, {
      searchQuery: debouncedSearch,
      topic: activeTopic,
      status: activeStatus,
      sortBy,
    });

    // Apply sorting
    filtered = sortChannels(filtered, sortBy);

    return filtered;
  }, [channels, debouncedSearch, activeTopic, activeStatus, sortBy, quickFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return {
      total: channels.length,
      featured: channels.filter(p => p.status === 'featured').length,
      verified: channels.filter(p => p.status === 'verified').length,
      newThisMonth: channels.filter(p => new Date(p.created_at) > oneMonthAgo).length,
    };
  }, [channels]);

  // Calculate topic counts
  const topicCounts = useMemo(() => ({
    all: channels.length,
    'din-felsefe': channels.filter(p => p.topic === 'din-felsefe').length,
    'bilim': channels.filter(p => p.topic === 'bilim').length,
    'tarih': channels.filter(p => p.topic === 'tarih').length,
    'gundem': channels.filter(p => p.topic === 'gundem').length,
  }), [channels]);

  const handleQuickFilterClick = (filter: string) => {
    if (quickFilter === filter) {
      setQuickFilter(undefined);
    } else {
      setQuickFilter(filter);
      // Reset other filters when quick filter is applied
      setActiveTopic('all');
      setActiveStatus('all');
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveTopic('all');
    setActiveStatus('all');
    setQuickFilter(undefined);
  };

  const hasActiveFilters = searchQuery || activeTopic !== 'all' || activeStatus !== 'all' || quickFilter;

  // Loading state with skeletons
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-70" />
          <Container className="relative py-16 sm:py-20">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-200/50 shadow-lg">
                <Sparkles size={16} className="text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-700">Doğrulanmış İçerikler</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Tüm{' '}
                <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Kanallar
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Yükleniyor...
              </p>
            </div>
          </Container>
        </div>

        {/* Filter Bar Skeleton */}
        <FilterBarSkeleton />

        <Container className="py-8 sm:py-12 space-y-8">
          {/* Stats Bar Skeleton */}
          <StatsBarSkeleton />

          {/* Topic Filter Skeleton */}
          <div className="bg-white rounded-2xl border border-gray-200/50 shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <Filter size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Konulara Göre Filtrele</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-32 h-10 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>

          {/* Channel Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ChannelCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <X className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Bir Hata Oluştu</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-70" />
        
        {/* Decorative Elements - Hidden on mobile */}
        <div className="hidden md:block absolute top-20 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="hidden md:block absolute top-40 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        
        <Container className="relative py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-200/50 shadow-lg">
              <Sparkles size={14} className="text-indigo-600 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-semibold text-indigo-700">Doğrulanmış İçerikler</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight px-4">
              Tüm{' '}
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Kanallar
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-4">
              Ahlaki değerlere saygılı, kaliteli ve topluma faydalı içerik üreten 
              doğrulanmış YouTube kanallarını keşfedin.
            </p>
          </div>
        </Container>
      </div>

      {/* Filter Bar - Sticky */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTopic={activeTopic}
        onTopicChange={setActiveTopic}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalResults={filteredChannels.length}
      />

      <Container className="py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-8">
        {/* Stats Bar */}
        <StatsBar
          total={stats.total}
          featured={stats.featured}
          verified={stats.verified}
          newThisMonth={stats.newThisMonth}
        />

        {/* Topic Filter */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/50 shadow-lg p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
              <Filter size={18} className="text-white sm:w-5 sm:h-5" strokeWidth={2.5} />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Konulara Göre Filtrele</h2>
          </div>
          <TopicFilter
            activeTopic={activeTopic}
            onTopicChange={setActiveTopic}
            counts={topicCounts}
          />
        </div>

        {/* Quick Filters */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">Hızlı Filtreler</h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
              >
                <X size={14} strokeWidth={2.5} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Filtreleri Temizle</span>
                <span className="sm:hidden">Temizle</span>
              </button>
            )}
          </div>
          <QuickFilters
            onFilterClick={handleQuickFilterClick}
            activeFilter={quickFilter}
          />
        </div>

        {/* Channel Grid/List */}
        {filteredChannels.length > 0 ? (
          <div className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
              : 'space-y-4 sm:space-y-6'
          )}>
            {filteredChannels.map((channel, index) =>
              viewMode === 'grid' ? (
                <ChannelCard key={channel.id} channel={channel} index={index} />
              ) : (
                <ChannelListItem key={channel.id} channel={channel} index={index} />
              )
            )}
          </div>
        ) : (
          // Empty State - Mobile Optimized
          <div className="text-center py-12 sm:py-20 animate-in fade-in zoom-in-95 duration-700">
            <div className="max-w-md mx-auto space-y-3 sm:space-y-4 px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                <Filter size={36} className="text-gray-400 sm:w-12 sm:h-12" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Sonuç Bulunamadı
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                {searchQuery
                  ? `"${searchQuery}" için kanal bulunamadı.`
                  : 'Bu filtrelere uygun kanal bulunmuyor.'}
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 sm:mt-6 w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg active:scale-95 sm:hover:scale-105 transition-all font-semibold text-sm sm:text-base"
              >
                Tüm Kanalları Gör
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
