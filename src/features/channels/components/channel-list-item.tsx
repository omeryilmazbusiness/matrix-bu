'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, Users, ExternalLink, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/shared/components/ui/status-badge';
import { SocialLinks } from '@/shared/components/ui/social-links';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Profile } from '@/features/profiles/types';
import { PROFILE_TOPICS, getChannelImage } from '@/shared/lib/constants';

interface ChannelListItemProps {
  channel: Profile;
  index?: number;
}

export function ChannelListItem({ channel, index = 0 }: ChannelListItemProps) {
  const topicConfig = PROFILE_TOPICS[channel.topic];
  const createdDate = new Date(channel.created_at);
  const imageUrl = getChannelImage(channel.image_url);

  return (
    <article
      className={cn(
        'group relative bg-white rounded-2xl overflow-hidden border border-gray-200/50',
        'shadow-lg hover:shadow-2xl transition-all duration-500',
        'animate-in fade-in slide-in-from-left-4 duration-700'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex flex-col sm:flex-row gap-6 p-6">
        {/* Image - Left Side */}
        <Link href={`/kanallar/${channel.slug}`} className="shrink-0 w-full sm:w-48 h-48 sm:h-36">
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-50 cursor-pointer">
            <Image
              src={imageUrl}
              alt={channel.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, 200px"
              loading={index < 3 ? 'eager' : 'lazy'}
              priority={index < 3}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getChannelImage(null);
              }}
            />
            
            {/* Status Badge Overlay */}
            <div className="absolute top-2 left-2">
              <StatusBadge status={channel.status} size="sm" />
            </div>
          </div>
        </Link>

        {/* Content - Middle */}
        <div className="flex-1 space-y-3">
          {/* Topic Badge + Date */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold',
              topicConfig.bgColor,
              topicConfig.textColor,
              topicConfig.borderColor,
              'border'
            )}>
              {topicConfig.label}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar size={14} strokeWidth={2} />
              <span>{createdDate.toLocaleDateString('tr-TR')}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/kanallar/${channel.slug}`}>
            <h3 className="font-bold text-xl text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer">
              {channel.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {channel.description}
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Eye size={18} strokeWidth={2} className="text-indigo-600" />
              <span className="font-semibold">{channel.view_count.toLocaleString()}</span>
              <span className="text-gray-400">görüntülenme</span>
            </div>
            {channel.subscriber_count && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={18} strokeWidth={2} className="text-purple-600" />
                <span className="font-semibold">{(channel.subscriber_count / 1000).toFixed(0)}K</span>
                <span className="text-gray-400">abone</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="pt-2">
            <SocialLinks links={channel.social_links} variant="both" size="sm" />
          </div>
        </div>

        {/* Action - Right Side */}
        <div className="shrink-0 flex flex-col justify-center gap-3">
          <Link href={`/kanallar/${channel.slug}`}>
            <button className={cn(
              'flex items-center justify-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap',
              'bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm',
              'hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300'
            )}>
              Detayları Gör
              <ExternalLink size={16} strokeWidth={2.5} />
            </button>
          </Link>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-indigo-500/5 to-transparent rounded-bl-full" />
    </article>
  );
}
