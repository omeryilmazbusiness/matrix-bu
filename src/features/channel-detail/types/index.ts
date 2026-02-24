import type { Channel } from '@/features/channels/types';

export interface AIReview {
  summary: string;
  strengths: string[];
  targetAudience: string;
  contentQualityScore: number; // 1-5
  generatedAt: string;
}

export interface ChannelFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface VideoReview {
  why: string;
  topics: string[];
  targetAudience: string;
  highlights: string[];
}

export interface FeaturedVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  ourReview: VideoReview;
}

export interface ChannelDetail extends Channel {
  longDescription: string;
  foundedDate: string;
  contentCategories: string[];
  publishFrequency: string;
  avgViewsPerVideo: number;
  monthlyVideoCount: number;
  aiReview: AIReview;
  features: ChannelFeature[];
  featuredVideos: FeaturedVideo[];
  similarChannelIds: string[];
}
