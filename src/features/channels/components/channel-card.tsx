'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, Users, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/shared/components/ui/status-badge';
import { SocialLinks } from '@/shared/components/ui/social-links';
import { Profile } from '@/features/profiles/types';
import { PROFILE_TOPICS, getChannelImage } from '@/shared/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChannelCardProps {
  channel: Profile;
  index: number;
}

export function ChannelCard({ channel, index }: ChannelCardProps) {
  const topicConfig = PROFILE_TOPICS[channel.topic];
  const imageUrl = getChannelImage(channel.image_url);

  return (
    <article
      className={cn(
        'group relative bg-white rounded-2xl overflow-hidden border border-gray-200/50',
        'shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2',
        'animate-in fade-in slide-in-from-bottom-4 duration-700',
        'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
      role="article"
      aria-label={`${channel.name} YouTube kanalı`}
    >
      {/* Image Container - Wrapped with Link */}
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-gray-100 to-gray-50">
        <Link 
          href={`/kanallar/${channel.slug}`} 
          className="block absolute inset-0 focus:outline-none"
          aria-label={`${channel.name} kanalının detaylarını görüntüle`}
        >
          <Image
            src={imageUrl}
            alt={`${channel.name} kanal görseli`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={index < 4 ? 'eager' : 'lazy'}
            priority={index < 4}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getChannelImage(null);
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
        </Link>

        {/* Status Badge - Top Left (outside Link) */}
        <div className="absolute top-3 left-3 z-10" aria-label={`Kanal durumu: ${channel.status}`}>
          <StatusBadge status={channel.status} size="sm" showLabel={false} />
        </div>

        {/* Social Links - Appear on Hover (outside Link) */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-10">
          <SocialLinks links={channel.social_links} variant="buttons" size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Topic Badge */}
        <div className="flex items-center gap-2">
          <span 
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold',
              topicConfig.bgColor,
              topicConfig.textColor,
              topicConfig.borderColor,
              'border'
            )}
            role="tag"
            aria-label={`Konu: ${topicConfig.label}`}
          >
            {topicConfig.label}
          </span>
        </div>

        {/* Title - Clickable */}
        <Link href={`/kanallar/${channel.slug}`} className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1 hover:text-indigo-600 transition-colors cursor-pointer">
            {channel.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {channel.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-2 text-sm text-gray-500" role="list" aria-label="Kanal istatistikleri">
          <div className="flex items-center gap-1.5" role="listitem">
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
            <span className="font-semibold" aria-label={`${channel.view_count.toLocaleString()} görüntülenme`}>
              {channel.view_count.toLocaleString()}
            </span>
          </div>
          {channel.subscriber_count && (
            <div className="flex items-center gap-1.5" role="listitem">
              <Users size={16} strokeWidth={2} aria-hidden="true" />
              <span className="font-semibold" aria-label={`${(channel.subscriber_count / 1000).toFixed(0)} bin abone`}>
                {(channel.subscriber_count / 1000).toFixed(0)}K
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link href={`/kanallar/${channel.slug}`} className="block">
          <button 
            className={cn(
              'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl',
              'bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm',
              'hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300',
              'opacity-0 group-hover:opacity-100',
              'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            )}
            aria-label={`${channel.name} kanalının detaylarını gör`}
          >
            Detayları Gör
            <ExternalLink size={16} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </Link>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-br from-indigo-500/10 to-transparent rounded-bl-full" aria-hidden="true" />
    </article>
  );
}
