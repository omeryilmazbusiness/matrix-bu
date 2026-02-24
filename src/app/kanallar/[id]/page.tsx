'use client';

import { notFound } from 'next/navigation';
import { Loader2, X, ExternalLink, Users, Eye, Video, Calendar, Globe } from 'lucide-react';
import { Container } from '@/shared/components/layout';
import { cn } from '@/lib/utils';
import { useChannelDetail } from '@/features/channels/hooks/use-channel-detail';
import { getChannelImage, PROFILE_TOPICS } from '@/shared/lib/constants';
import { StatusBadge } from '@/shared/components/ui/status-badge';
import Image from 'next/image';
import Link from 'next/link';

interface ChannelPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ChannelPage({ params }: ChannelPageProps) {
  const [slug, setSlug] = React.useState<string>('');
  
  React.useEffect(() => {
    params.then(p => setSlug(p.id));
  }, [params]);

  const { channel, loading, error } = useChannelDetail(slug);

  // Loading state
  if (loading || !slug) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto" />
          <p className="text-lg font-semibold text-gray-600">Kanal yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !channel) {
    notFound();
  }

  const imageUrl = getChannelImage(channel.image_url);
  const topicConfig = PROFILE_TOPICS[channel.topic];
  const formattedDate = new Date(channel.created_at).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <Container className="relative py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Channel Image */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 shrink-0">
                <Image
                  src={imageUrl}
                  alt={channel.name}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getChannelImage(null);
                  }}
                />
              </div>

              {/* Channel Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <StatusBadge status={channel.status} size="lg" />
                  <span className={cn(
                    'px-3 py-1 rounded-lg text-sm font-semibold',
                    topicConfig.bgColor,
                    topicConfig.textColor,
                    'bg-white/90'
                  )}>
                    {topicConfig.label}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-black">{channel.name}</h1>
                <p className="text-lg text-white/90 leading-relaxed max-w-3xl">
                  {channel.description || 'Kanal açıklaması bulunmuyor.'}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 pt-4">
                  {channel.subscriber_count && channel.subscriber_count > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span className="font-bold">{(channel.subscriber_count / 1000).toFixed(1)}K</span>
                      <span className="text-white/80 text-sm">Abone</span>
                    </div>
                  )}
                  {channel.video_count && channel.video_count > 0 && (
                    <div className="flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      <span className="font-bold">{channel.video_count.toLocaleString()}</span>
                      <span className="text-white/80 text-sm">Video</span>
                    </div>
                  )}
                  {channel.view_count > 0 && (
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      <span className="font-bold">{(channel.view_count / 1000000).toFixed(1)}M</span>
                      <span className="text-white/80 text-sm">Görüntülenme</span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                {channel.social_links && channel.social_links.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-4">
                    {channel.social_links.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl font-semibold transition-all flex items-center gap-2"
                      >
                        {link.platform === 'youtube' && 'YouTube'}
                        {link.platform === 'twitter' && 'Twitter'}
                        {link.platform === 'instagram' && 'Instagram'}
                        {link.platform === 'website' && 'Website'}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Content Section */}
      <Container className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* About Card */}
          <div className="bg-white rounded-2xl border border-gray-200/50 shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kanal Hakkında</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {channel.description || 'Kanal açıklaması bulunmuyor.'}
              </p>
              
              {channel.created_at && (
                <div className="flex items-center gap-2 mt-6 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Platformumuza eklenme tarihi: {formattedDate}</span>
                </div>
              )}

              {channel.youtube_url && (
                <div className="mt-6">
                  <a
                    href={channel.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold',
                      'bg-linear-to-r from-red-600 to-red-700 text-white',
                      'hover:shadow-lg hover:scale-105 active:scale-95 transition-all'
                    )}
                  >
                    <Globe className="w-5 h-5" />
                    YouTube'da Ziyaret Et
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Back to Channels */}
          <div className="text-center">
            <Link href="/kanallar">
              <button className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl transition-colors">
                ← Tüm Kanallara Dön
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Fix for async params
import React from 'react';
