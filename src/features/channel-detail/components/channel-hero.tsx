'use client';

import Image from 'next/image';
import { Eye, Users, Video, ExternalLink, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/shared/components/ui/status-badge';
import { SocialLinks } from '@/shared/components/ui/social-links';
import { PROFILE_TOPICS } from '@/shared/lib/constants';
import type { ChannelDetail } from '../types';

interface ChannelHeroProps {
  channel: ChannelDetail;
}

export function ChannelHero({ channel }: ChannelHeroProps) {
  const topicConfig = PROFILE_TOPICS[channel.topic];

  return (
    <section className="relative h-[500px] sm:h-[600px] overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={channel.image_url}
          alt={channel.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        
        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full flex flex-col justify-end pb-12 sm:pb-16">
          {/* Badges */}
          <div className="flex items-center gap-3 mb-6">
            <StatusBadge status={channel.status} size="md" />
            <span className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold',
              topicConfig.bgColor,
              topicConfig.textColor,
              topicConfig.borderColor,
              'border backdrop-blur-sm'
            )}>
              {topicConfig.label}
            </span>
          </div>

          {/* Channel Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-2xl leading-tight">
            {channel.name}
          </h1>

          {/* Channel Title/Slogan */}
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl font-medium drop-shadow-lg">
            {channel.title}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                <Eye size={20} strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-lg font-bold">{channel.view_count.toLocaleString()}</div>
                <div className="text-xs text-white/70">Görüntülenme</div>
              </div>
            </div>

            {channel.subscriber_count && (
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Users size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-lg font-bold">{(channel.subscriber_count / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-white/70">Abone</div>
                </div>
              </div>
            )}

            {channel.video_count && (
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Video size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-lg font-bold">{channel.video_count}</div>
                  <div className="text-xs text-white/70">Video</div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-white/90">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                <Calendar size={20} strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-sm font-bold">{new Date(channel.foundedDate).getFullYear()}</div>
                <div className="text-xs text-white/70">Kuruluş</div>
              </div>
            </div>
          </div>

          {/* Actions Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Social Links */}
            <div className="flex-1">
              <SocialLinks links={channel.social_links} variant="buttons" size="md" />
            </div>

            {/* CTA Button */}
            <a
              href={channel.social_links?.find(l => l.platform === 'youtube')?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base',
                'bg-white text-gray-900 shadow-2xl',
                'hover:scale-105 active:scale-95 transition-all duration-300',
                'whitespace-nowrap'
              )}
            >
              Kanalı Ziyaret Et
              <ExternalLink size={20} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </section>
  );
}
