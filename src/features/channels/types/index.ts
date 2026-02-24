import type { Profile, ProfileTopic, SocialLink, ProfileStatus } from '@/features/profiles/types';

// Re-export for other modules
export type { Profile as Channel, ProfileTopic, SocialLink, ProfileStatus };

export type ViewMode = 'grid' | 'list';

export type ChannelTopic = 'all' | 'teknoloji' | 'egitim' | 'eglence' | 'oyun' | 'muzik' | 'spor' | 'yasam';

export type ChannelStatus = 'all' | 'active' | 'verified';

export type SortOption = 'popular' | 'recent' | 'name' | 'subscribers';

export interface ChannelFilters {
  searchQuery: string;
  topic: ProfileTopic | 'all';
  status: ProfileStatus | 'all';
  sortBy: SortOption;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
