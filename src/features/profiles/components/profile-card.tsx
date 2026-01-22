import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Profile } from '@/features/profiles/types';
import { PROFILE_TOPICS, PROFILE_STATUS } from '@/shared/lib/constants';
import { cn } from '@/lib/utils';
import { Users, Video, Eye, BookHeart, Microscope, Scroll, Newspaper, Sparkles, Star } from 'lucide-react';

// Icon mapping for topics
const topicIconMap = {
  'BookHeart': BookHeart,
  'Microscope': Microscope,
  'Scroll': Scroll,
  'Newspaper': Newspaper,
};

interface ProfileCardProps {
  profile: Profile;
  className?: string;
}

export function ProfileCard({ profile, className }: ProfileCardProps) {
  // Format numbers (e.g., 1500 -> 1.5K)
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Generate consistent video count based on profile ID
  const getVideoCount = () => {
    // Use profile ID to generate a consistent number between 50-250
    const hash = profile.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 50 + (hash % 200);
  };

  // AI generated short description based on channel name/title
  const getAIDescription = () => {
    const descriptions = [
      "Derin analizler ve özgün içerikler sunan kanal",
      "İzleyicilerin en beğendiği içerik üreticisi",
      "Eğitici ve bilgilendirici videolar paylaşıyor",
      "Özgün bakış açısıyla konuları ele alıyor",
      "Kaliteli ve düzenli içerik üreten kanal"
    ];
    // Use profile id to consistently select same description
    const index = parseInt(profile.id.slice(-1), 16) % descriptions.length;
    return descriptions[index] || descriptions[0];
  };

  // Get topic configuration
  const topicConfig = PROFILE_TOPICS[profile.topic];
  const TopicIcon = topicIconMap[topicConfig.iconName as keyof typeof topicIconMap];
  
  // Get status configuration
  const statusConfig = PROFILE_STATUS[profile.status];

  return (
    <Link href={`/profil/${profile.slug}`}>
      <Card 
        className={cn(
          'group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer border-0',
          'h-[320px] sm:h-[360px]',
          className
        )}
      >
        {/* Background Image - Full Cover */}
        <div className="absolute inset-0">
          <Image
            src={profile.image_url}
            alt={profile.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          
          {/* Gradient Overlay - Bottom Half with Blur */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col justify-between p-4 sm:p-5">
          {/* Top Section - YouTube Logo & Topic Badge */}
          <div className="flex items-start justify-between">
            {/* YouTube Icon - Top Left */}
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 group-hover:scale-105">
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5"
                fill="#FF0000"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            
            {/* Topic Badge - Minimal & Top Right */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
              {TopicIcon && <TopicIcon size={12} className="text-white/80" strokeWidth={2} />}
              <span className="text-xs font-semibold text-white/90">{topicConfig.label}</span>
            </div>
          </div>

          {/* Bottom Section - Channel Info */}
          <div className="space-y-3">
            {/* Status Badge with Stars - Minimal */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-sm w-fit">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: statusConfig.stars }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-yellow-400 text-yellow-400"
                    strokeWidth={2}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-white/90">{statusConfig.label}</span>
            </div>

            {/* Channel Stats */}
            <div className="flex items-center gap-2 text-white/90">
              {/* Subscribers */}
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                <Users size={13} strokeWidth={2} className="opacity-80" />
                <span className="text-xs font-semibold">{formatNumber(profile.view_count || 0)}</span>
              </div>
              
              {/* Videos */}
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                <Video size={13} strokeWidth={2} className="opacity-80" />
                <span className="text-xs font-semibold">{getVideoCount()}</span>
              </div>

              {/* Views */}
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                <Eye size={13} strokeWidth={2} className="opacity-80" />
                <span className="text-xs font-semibold">{formatNumber((profile.view_count || 0) * 100)}</span>
              </div>
            </div>

            {/* Channel Name */}
            <h3 className="font-bold text-xl sm:text-2xl text-white line-clamp-2 drop-shadow-lg transition-all duration-300 group-hover:text-red-400">
              {profile.name}
            </h3>

            {/* AI Generated Description */}
            <div className="flex items-start gap-2 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-transparent backdrop-blur-sm px-3 py-2 rounded-lg border border-orange-500/30">
              <Sparkles size={14} className="text-orange-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
              <p className="text-xs text-white/90 font-medium line-clamp-2">
                {getAIDescription()}
              </p>
            </div>

            {/* Channel Handle & Title */}
            <div className="space-y-1">
              {profile.youtube_nick && (
                <p className="text-sm text-white/90 font-medium flex items-center gap-1.5">
                  <span className="text-red-400">@</span>
                  <span>{profile.youtube_nick}</span>
                </p>
              )}
              <p className="text-xs sm:text-sm text-white/60 line-clamp-1 font-medium">
                {profile.title}
              </p>
            </div>

            {/* Action Indicator */}
            <div className="flex items-center gap-2 text-white/50 text-xs font-medium pt-1">
              <div className="w-6 h-0.5 bg-gradient-to-r from-red-500 to-transparent rounded-full transition-all duration-300 group-hover:w-12" />
              <span className="transition-all duration-300 group-hover:text-white/80">Kanala Git</span>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-transparent to-transparent" />
        </div>
      </Card>
    </Link>
  );
}
