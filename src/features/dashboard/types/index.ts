// Weekly Person Types
export interface WeeklyPersonVideo {
  id: string;
  title: string;
  channelName: string;
  channelAvatar: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
  youtubeUrl: string;
  description: string;
}

export interface WeeklyPerson {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  period: string;
  likes: number;
  views: number;
  
  // Detaylı bilgiler (modal için)
  fullBiography: string;
  birthPlace: string;
  deathPlace?: string;
  majorWorks: string[];
  achievements: string[];
  quote: string;
  quoteAuthor?: string;
  historicalContext: string;
  legacy: string;
  relatedVideos: WeeklyPersonVideo[];
}

export interface WeeklyPersonModalProps {
  person: WeeklyPerson;
  isOpen: boolean;
  onClose: () => void;
}
