'use client';

import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Send, Search, PlusCircle, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/shared/hooks';

interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  subscriberCount: string;
  videoCount: string;
  customUrl?: string;
}

interface SuggestionStatus {
  channelId: string;
  status: 'idle' | 'sending' | 'success' | 'error';
  message?: string;
}

export function SuggestChannelButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [suggestionStatuses, setSuggestionStatuses] = useState<Record<string, SuggestionStatus>>({});
  
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Search YouTube channels
  const searchChannels = useCallback(async (query: string) => {
    if (!query.trim()) {
      setChannels([]);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
      
      const data = await response.json();
      
      if (!response.ok) {
        // Show specific error message from API
        throw new Error(data.error || 'Arama başarısız oldu');
      }

      setChannels(data.channels || []);
    } catch (error) {
      console.error('Channel search error:', error);
      setSearchError(error instanceof Error ? error.message : 'Kanallar aranırken bir hata oluştu');
      setChannels([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Effect to trigger search when debounced query changes
  useEffect(() => {
    searchChannels(debouncedSearchQuery);
  }, [debouncedSearchQuery, searchChannels]);

  // Handle channel suggestion
  const handleSuggest = async (channel: YouTubeChannel) => {
    // Set status to sending
    setSuggestionStatuses(prev => ({
      ...prev,
      [channel.id]: { channelId: channel.id, status: 'sending' }
    }));

    try {
      const response = await fetch('/api/suggestions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelId: channel.id,
          channelName: channel.title,
          channelUrl: channel.customUrl || `https://youtube.com/channel/${channel.id}`,
          subscriberCount: channel.subscriberCount,
          thumbnailUrl: channel.thumbnailUrl,
          description: channel.description,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Öneri gönderilemedi');
      }

      // Set status to success
      setSuggestionStatuses(prev => ({
        ...prev,
        [channel.id]: { 
          channelId: channel.id, 
          status: 'success',
          message: 'Öneriniz alındı! 🎉'
        }
      }));

      // Reset status after 3 seconds
      setTimeout(() => {
        setSuggestionStatuses(prev => {
          const newStatuses = { ...prev };
          delete newStatuses[channel.id];
          return newStatuses;
        });
      }, 3000);

    } catch (error) {
      console.error('Suggestion error:', error);
      
      // Set status to error
      setSuggestionStatuses(prev => ({
        ...prev,
        [channel.id]: { 
          channelId: channel.id, 
          status: 'error',
          message: error instanceof Error ? error.message : 'Bir hata oluştu'
        }
      }));

      // Reset status after 3 seconds
      setTimeout(() => {
        setSuggestionStatuses(prev => {
          const newStatuses = { ...prev };
          delete newStatuses[channel.id];
          return newStatuses;
        });
      }, 3000);
    }
  };

  // Format subscriber count
  const formatSubscribers = (count: string) => {
    const num = parseInt(count);
    if (isNaN(num)) return count;
    
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Get suggestion status for a channel
  const getChannelStatus = (channelId: string) => {
    return suggestionStatuses[channelId];
  };

  return (
    <>
      {/* Floating Action Button - Fixed Bottom Right */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5',
          'bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600',
          'text-white font-semibold text-sm sm:text-base',
          'rounded-full shadow-2xl',
          'hover:shadow-indigo-500/50 hover:scale-105',
          'active:scale-95',
          'transition-all duration-300',
          'animate-in fade-in slide-in-from-bottom-8 duration-700'
        )}
      >
        <PlusCircle size={20} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Kanal Öner</span>
        <span className="sm:hidden">Öner</span>
      </button>

      {/* Popup Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md sm:max-w-lg p-0 border-0 overflow-hidden bg-white">
          <div className="relative">
            {/* Header Section */}
            <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5 text-white">
              <DialogTitle className="text-2xl font-bold mb-1">
                Kanal Öner
              </DialogTitle>
              <DialogDescription className="text-white/90 text-sm">
                Platformda görmek istediğiniz YouTube kanallarını önerin
              </DialogDescription>
            </div>

            {/* Search Section */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <Search 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                  size={18} 
                  strokeWidth={2.5}
                />
                <Input
                  type="text"
                  placeholder="YouTube kanalı ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
                {isSearching && (
                  <Loader2 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 animate-spin" 
                    size={18}
                  />
                )}
              </div>
            </div>

            {/* Channel List Section */}
            <div className="p-6 max-h-100 overflow-y-auto">
              {searchError ? (
                // Error State
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Bir Hata Oluştu
                  </h3>
                  <p className="text-sm text-gray-500">{searchError}</p>
                </div>
              ) : channels.length > 0 ? (
                <div className="space-y-2">
                  {channels.map((channel) => {
                    const status = getChannelStatus(channel.id);
                    
                    return (
                      <div
                        key={channel.id}
                        className={cn(
                          'flex items-center gap-3 p-4 rounded-xl transition-all duration-300 group',
                          status?.status === 'success' 
                            ? 'bg-green-50 border-2 border-green-200'
                            : status?.status === 'error'
                            ? 'bg-red-50 border-2 border-red-200'
                            : 'bg-gray-50 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 border border-gray-200 hover:border-indigo-200'
                        )}
                      >
                        {/* Channel Thumbnail */}
                        <img
                          src={channel.thumbnailUrl}
                          alt={channel.title}
                          className="w-12 h-12 rounded-full object-cover shrink-0"
                        />

                        {/* Channel Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 truncate">
                            {channel.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{formatSubscribers(channel.subscriberCount)} Abone</span>
                            <span>•</span>
                            <span>{channel.videoCount} Video</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        {status?.status === 'success' ? (
                          <div className="flex items-center gap-2 text-green-600 shrink-0">
                            <CheckCircle2 size={20} strokeWidth={2.5} />
                            <span className="text-xs font-semibold hidden sm:inline">Gönderildi</span>
                          </div>
                        ) : status?.status === 'error' ? (
                          <div className="flex items-center gap-2 text-red-600 shrink-0">
                            <AlertCircle size={20} strokeWidth={2.5} />
                            <span className="text-xs font-semibold hidden sm:inline">Hata</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSuggest(channel)}
                            disabled={status?.status === 'sending'}
                            className={cn(
                              'ml-2 flex items-center justify-center',
                              'w-10 h-10 rounded-lg',
                              'bg-linear-to-r from-indigo-600 to-purple-600',
                              'text-white',
                              'hover:shadow-lg hover:scale-105',
                              'active:scale-95',
                              'transition-all duration-300',
                              'opacity-70 group-hover:opacity-100',
                              'disabled:opacity-50 disabled:cursor-not-allowed'
                            )}
                          >
                            {status?.status === 'sending' ? (
                              <Loader2 size={16} className="animate-spin" strokeWidth={2.5} />
                            ) : (
                              <Send size={16} strokeWidth={2.5} />
                            )}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : debouncedSearchQuery && !isSearching ? (
                // Empty State
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Sonuç Bulunamadı
                  </h3>
                  <p className="text-sm text-gray-500">
                    &quot;{debouncedSearchQuery}&quot; için kanal bulunamadı
                  </p>
                </div>
              ) : (
                // Initial State
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-indigo-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    YouTube Kanalı Arayın
                  </h3>
                  <p className="text-sm text-gray-500">
                    Önermek istediğiniz kanalın adını yazın
                  </p>
                </div>
              )}
            </div>

            {/* Footer Section */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Öneriniz incelendikten sonra platforma eklenecektir
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}