import { Youtube, Twitter, Instagram, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SocialLink {
  platform: string; // string olarak değiştirdik - daha esnek
  url?: string;
  nick?: string;
}

interface SocialLinksProps {
  links?: SocialLink[];
  variant?: 'buttons' | 'nicks' | 'both';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const socialConfig: Record<string, any> = { // Record<string, any> ile dinamik yapı
  youtube: {
    icon: Youtube,
    color: 'hover:bg-red-500 hover:text-white',
    label: 'YouTube'
  },
  twitter: {
    icon: Twitter,
    color: 'hover:bg-sky-500 hover:text-white',
    label: 'Twitter'
  },
  instagram: {
    icon: Instagram,
    color: 'hover:bg-linear-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white',
    label: 'Instagram'
  },
  tiktok: {
    icon: Music2,
    color: 'hover:bg-black hover:text-white',
    label: 'TikTok'
  }
};

export function SocialLinks({ 
  links, 
  variant = 'both',
  size = 'md',
  className 
}: SocialLinksProps) {
  // Guard clause: links undefined veya null ise boş array kullan
  const filteredLinks = (links || []).filter(link => link.url || link.nick);
  
  if (filteredLinks.length === 0) return null;

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Nicknames */}
      {(variant === 'nicks' || variant === 'both') && (
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          {filteredLinks.map((link) => 
            link.nick && (
              <span key={link.platform} className="flex items-center gap-1">
                <span className="text-gray-400">@</span>
                <span className="font-medium">{link.nick}</span>
              </span>
            )
          )}
        </div>
      )}

      {/* Social Buttons */}
      {(variant === 'buttons' || variant === 'both') && (
        <div className="flex flex-wrap gap-2">
          {filteredLinks.map((link) => {
            if (!link.url) return null;
            
            const config = socialConfig[link.platform];
            if (!config) return null; // Platform tanımlı değilse skip et
            
            const Icon = config.icon;
            
            return (
              <Button
                key={link.platform}
                variant="outline"
                size="icon"
                className={cn(
                  'transition-all duration-200',
                  sizeClasses[size],
                  config.color
                )}
                asChild
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${config.label} profili`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
