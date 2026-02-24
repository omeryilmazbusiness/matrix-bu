// Profile status types
export type ProfileStatus = 'featured' | 'verified' | 'standard';

// Topic types
export type ProfileTopic = 'din-felsefe' | 'bilim' | 'tarih' | 'gundem';

// Default images
export const DEFAULT_CHANNEL_IMAGE = '/placeholder-channel.svg';

// Helper function to get channel image with fallback
export function getChannelImage(imageUrl: string | null | undefined): string {
  if (!imageUrl || imageUrl === '') {
    return DEFAULT_CHANNEL_IMAGE;
  }
  
  // Check if it's a valid URL or path
  try {
    // If it starts with http/https or /, it's valid
    if (imageUrl.startsWith('http') || imageUrl.startsWith('/')) {
      return imageUrl;
    }
    return DEFAULT_CHANNEL_IMAGE;
  } catch {
    return DEFAULT_CHANNEL_IMAGE;
  }
}

// Profile status configuration
export const PROFILE_STATUS = {
  featured: {
    label: 'Öne Çıkan',
    stars: 3,
    theme: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-500',
    textColor: 'text-green-700',
    iconColor: 'text-green-500'
  },
  verified: {
    label: 'Doğrulanmış',
    stars: 2,
    theme: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-700',
    iconColor: 'text-blue-500'
  },
  standard: {
    label: 'Standart',
    stars: 1,
    theme: 'white',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-300',
    textColor: 'text-gray-700',
    iconColor: 'text-gray-400'
  }
} as const;

// Topic configuration with Lucide icon names
export const PROFILE_TOPICS = {
  'din-felsefe': {
    label: 'Din & Felsefe',
    iconName: 'BookHeart', // Lucide icon name
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-700',
    hoverColor: 'hover:bg-purple-100',
    activeColor: 'bg-purple-500'
  },
  'bilim': {
    label: 'Bilim',
    iconName: 'Microscope',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-700',
    hoverColor: 'hover:bg-blue-100',
    activeColor: 'bg-blue-500'
  },
  'tarih': {
    label: 'Tarih',
    iconName: 'Scroll',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-700',
    hoverColor: 'hover:bg-amber-100',
    activeColor: 'bg-amber-500'
  },
  'gundem': {
    label: 'Gündem',
    iconName: 'Newspaper',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-500',
    textColor: 'text-rose-700',
    hoverColor: 'hover:bg-rose-100',
    activeColor: 'bg-rose-500'
  }
} as const;

// Site configuration
export const SITE_CONFIG = {
  name: 'Hakikatbu',
  description: 'Profil ve içerik platformu',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
} as const;
