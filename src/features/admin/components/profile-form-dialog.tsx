'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2, AlertCircle, Search, Youtube, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useYouTubeSearch } from '../hooks/use-youtube-search';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { 
  profileFormSchema, 
  type ProfileFormData,
  topicOptions,
  statusOptions 
} from '../utils/validation';

interface ProfileFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  initialData?: Partial<ProfileFormData>;
  mode: 'create' | 'edit';
}

export function ProfileFormDialog({
  open,
  onClose,
  onSubmit,
  initialData,
  mode,
}: ProfileFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingChannel, setIsLoadingChannel] = useState(false); // Yeni: Kanal yükleme durumu
  const [error, setError] = useState<string | null>(null);
  const [youtubeSearchQuery, setYoutubeSearchQuery] = useState('');
  const [showYoutubeSearch, setShowYoutubeSearch] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(youtubeSearchQuery, 500);
  
  const {
    searchChannels,
    getChannelDetails,
    clearResults,
    isSearching,
    searchResults,
    error: youtubeError,
  } = useYouTubeSearch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData || {
      slug: '',
      title: '',
      name: '',
      image_url: '',
      topic: '',
      description: '',
      youtube_url: '',
      twitter_url: '',
      instagram_url: '',
      status: 'draft',
    },
  });

  // YouTube arama
  useEffect(() => {
    if (debouncedSearchQuery && showYoutubeSearch) {
      searchChannels(debouncedSearchQuery);
    } else {
      clearResults();
    }
  }, [debouncedSearchQuery, showYoutubeSearch]);

  // Kanal seçildiğinde detayları çek ve formu doldur
  const handleSelectChannel = async (channelId: string) => {
    console.log('📺 Kanal seçildi:', channelId);
    setSelectedChannel(channelId);
    setIsLoadingChannel(true); // Kanal yükleme başladı
    
    try {
      const details = await getChannelDetails(channelId);
      
      if (details) {
        // Form alanlarını otomatik doldur
        const slug = details.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();

        setValue('name', details.title);
        setValue('title', details.title);
        setValue('slug', slug);
        setValue('description', details.description || '');
        setValue('image_url', details.thumbnailHigh || details.thumbnailMedium || details.thumbnailDefault || '');
        
        if (details.customUrl) {
          setValue('youtube_url', `https://youtube.com/${details.customUrl}`);
        }

        // YouTube arama panelini kapat
        setShowYoutubeSearch(false);
        setYoutubeSearchQuery('');
        clearResults();
        setSelectedChannel(null);

        console.log('✅ Form otomatik dolduruldu');
      }
    } catch (error) {
      console.error('❌ Kanal detayları alınamadı:', error);
      setError(error instanceof Error ? error.message : 'Kanal detayları alınamadı');
    } finally {
      setIsLoadingChannel(false); // Kanal yükleme bitti
    }
  };

  const handleFormSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // X butonunu her zaman çalıştır, sadece form submit sırasında engelle
    if (isSubmitting) {
      return; // Sadece form submit ediliyorsa kapat
    }
    
    reset();
    setError(null);
    setShowYoutubeSearch(false);
    setYoutubeSearchQuery('');
    setSelectedChannel(null);
    setIsLoadingChannel(false);
    clearResults();
    onClose();
  };

  // Popup dışına tıklandığında kapat
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!open) return null; // Popup kapalıysa hiçbir şey render etme

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {mode === 'create' ? '🎨 Yeni Kanal Ekle' : '✏️ Kanal Düzenle'}
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* YouTube Arama Butonu (sadece create modunda) */}
        {mode === 'create' && !showYoutubeSearch && (
          <div className="px-6 pt-6">
            <button
              type="button"
              onClick={() => setShowYoutubeSearch(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 border-2 border-red-200 text-red-700 font-semibold rounded-xl hover:bg-red-100 transition-colors"
            >
              <Youtube size={20} />
              <span>YouTube'dan Kanal Ara ve Ekle</span>
            </button>
          </div>
        )}

        {/* YouTube Arama Paneli */}
        {showYoutubeSearch && (
          <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-red-50 to-white border-b-2 border-red-100">
            <div className="flex items-center gap-2 mb-3">
              <Youtube size={20} className="text-red-600" />
              <h3 className="font-bold text-gray-900">YouTube'dan Kanal Ara</h3>
              <button
                onClick={() => {
                  setShowYoutubeSearch(false);
                  setYoutubeSearchQuery('');
                  clearResults();
                }}
                className="ml-auto text-sm text-gray-600 hover:text-gray-900"
              >
                Kapat
              </button>
            </div>

            {/* Arama Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Kanal adı veya @kullanıcıadı ara..."
                value={youtubeSearchQuery}
                onChange={(e) => setYoutubeSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
              />
            </div>

            {/* Arama Sonuçları */}
            {youtubeError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                <p className="text-sm text-red-800">{youtubeError}</p>
              </div>
            )}

            {isSearching && (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={32} className="text-red-600 animate-spin" />
              </div>
            )}

            {!isSearching && searchResults.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {searchResults.map((channel) => (
                  <button
                    key={channel.channelId}
                    type="button"
                    onClick={() => handleSelectChannel(channel.channelId)}
                    className={cn(
                      "w-full flex items-start gap-3 p-3 rounded-lg border-2 transition-all text-left",
                      selectedChannel === channel.channelId
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                    )}
                  >
                    <img
                      src={channel.thumbnailUrl}
                      alt={channel.title}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900 truncate">{channel.title}</p>
                        {selectedChannel === channel.channelId && (
                          <CheckCircle size={16} className="text-green-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{channel.description}</p>
                      {channel.customUrl && (
                        <p className="text-xs text-red-600 mt-1">{channel.customUrl}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!isSearching && debouncedSearchQuery && searchResults.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="font-semibold">Sonuç bulunamadı</p>
                <p className="text-sm">Farklı bir arama terimi deneyin</p>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Row 1: Slug & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Slug (URL) *
                </label>
                <Input
                  {...register('slug')}
                  placeholder="ornek-kanal-adi"
                  disabled={isSubmitting}
                  className={cn(errors.slug && 'border-red-500')}
                />
                {errors.slug && (
                  <p className="text-xs text-red-600 mt-1">{errors.slug.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Durum *
                </label>
                <select
                  {...register('status')}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-xs text-red-600 mt-1">{errors.status.message}</p>
                )}
              </div>
            </div>

            {/* Row 2: Title */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Başlık *
              </label>
              <Input
                {...register('title')}
                placeholder="Kanalın tam başlığı"
                disabled={isSubmitting}
                className={cn(errors.title && 'border-red-500')}
              />
              {errors.title && (
                <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Row 3: Name & Topic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Kanal Adı *
                </label>
                <Input
                  {...register('name')}
                  placeholder="Örn: İsmail Saymaz"
                  disabled={isSubmitting}
                  className={cn(errors.name && 'border-red-500')}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Kategori *
                </label>
                <select
                  {...register('topic')}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                >
                  <option value="">Kategori seçin...</option>
                  {topicOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.topic && (
                  <p className="text-xs text-red-600 mt-1">{errors.topic.message}</p>
                )}
              </div>
            </div>

            {/* Row 4: Image URL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Profil Resmi URL *
              </label>
              <Input
                {...register('image_url')}
                placeholder="https://example.com/image.jpg"
                disabled={isSubmitting}
                className={cn(errors.image_url && 'border-red-500')}
              />
              {errors.image_url && (
                <p className="text-xs text-red-600 mt-1">{errors.image_url.message}</p>
              )}
            </div>

            {/* Row 5: Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Açıklama *
              </label>
              <Textarea
                {...register('description')}
                placeholder="Kanal hakkında detaylı açıklama..."
                rows={4}
                disabled={isSubmitting}
                className={cn(errors.description && 'border-red-500')}
              />
              {errors.description && (
                <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Row 6: Social Media URLs */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-700">Sosyal Medya Linkleri</h3>
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  YouTube URL
                </label>
                <Input
                  {...register('youtube_url')}
                  placeholder="https://youtube.com/@kanal"
                  disabled={isSubmitting}
                  className={cn(errors.youtube_url && 'border-red-500')}
                />
                {errors.youtube_url && (
                  <p className="text-xs text-red-600 mt-1">{errors.youtube_url.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Twitter URL
                </label>
                <Input
                  {...register('twitter_url')}
                  placeholder="https://twitter.com/kullanici"
                  disabled={isSubmitting}
                  className={cn(errors.twitter_url && 'border-red-500')}
                />
                {errors.twitter_url && (
                  <p className="text-xs text-red-600 mt-1">{errors.twitter_url.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Instagram URL
                </label>
                <Input
                  {...register('instagram_url')}
                  placeholder="https://instagram.com/kullanici"
                  disabled={isSubmitting}
                  className={cn(errors.instagram_url && 'border-red-500')}
                />
                {errors.instagram_url && (
                  <p className="text-xs text-red-600 mt-1">{errors.instagram_url.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              variant="outline"
              className="px-6"
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Kaydediliyor...
                </>
              ) : (
                mode === 'create' ? '✨ Oluştur' : '💾 Kaydet'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
