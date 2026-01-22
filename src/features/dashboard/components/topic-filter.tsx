'use client';

import { PROFILE_TOPICS, type ProfileTopic } from '@/shared/lib/constants';
import { cn } from '@/lib/utils';
import { BookHeart, Microscope, Scroll, Newspaper, Library } from 'lucide-react';

// Icon mapping
const iconMap = {
  'BookHeart': BookHeart,
  'Microscope': Microscope,
  'Scroll': Scroll,
  'Newspaper': Newspaper,
};

interface TopicFilterProps {
  activeTopic: ProfileTopic | 'all';
  onTopicChange: (topic: ProfileTopic | 'all') => void;
  counts?: Record<ProfileTopic | 'all', number>;
  className?: string;
}

export function TopicFilter({ activeTopic, onTopicChange, counts, className }: TopicFilterProps) {
  const topics: Array<{ value: ProfileTopic | 'all'; label: string; iconName: string }> = [
    { value: 'all', label: 'Tümü', iconName: 'Library' },
    { value: 'din-felsefe', label: PROFILE_TOPICS['din-felsefe'].label, iconName: PROFILE_TOPICS['din-felsefe'].iconName },
    { value: 'bilim', label: PROFILE_TOPICS.bilim.label, iconName: PROFILE_TOPICS.bilim.iconName },
    { value: 'tarih', label: PROFILE_TOPICS.tarih.label, iconName: PROFILE_TOPICS.tarih.iconName },
    { value: 'gundem', label: PROFILE_TOPICS.gundem.label, iconName: PROFILE_TOPICS.gundem.iconName },
  ];

  return (
    <div className={cn('w-full overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0', className)}>
      <div className="inline-flex gap-2 min-w-max">
        {topics.map((topic) => {
          const isActive = activeTopic === topic.value;
          const config = topic.value !== 'all' ? PROFILE_TOPICS[topic.value] : null;
          const count = counts?.[topic.value] || 0;
          
          // Get icon component
          const IconComponent = topic.value === 'all' ? Library : iconMap[topic.iconName as keyof typeof iconMap];

          return (
            <button
              key={topic.value}
              onClick={() => onTopicChange(topic.value)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                'whitespace-nowrap',
                isActive
                  ? topic.value === 'all'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                    : `${config?.activeColor} text-white shadow-md`
                  : `bg-white/70 backdrop-blur-sm border ${config?.borderColor || 'border-gray-200'} ${config?.textColor || 'text-gray-600'} hover:bg-white hover:shadow-sm active:scale-95`
              )}
            >
              {IconComponent && (
                <IconComponent 
                  size={14} 
                  strokeWidth={2}
                />
              )}
              <span className="text-xs sm:text-sm">{topic.label}</span>
              {count > 0 && (
                <span
                  className={cn(
                    'ml-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold',
                    isActive 
                      ? 'bg-white/25 text-white' 
                      : 'bg-gray-100 text-gray-500'
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
