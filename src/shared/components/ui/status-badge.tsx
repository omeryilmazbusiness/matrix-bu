import { Star } from 'lucide-react';
import { PROFILE_STATUS, type ProfileStatus } from '@/shared/lib/constants';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ProfileStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusBadge({ 
  status, 
  showLabel = true, 
  size = 'md',
  className 
}: StatusBadgeProps) {
  const config = PROFILE_STATUS[status];
  
  const sizeClasses = {
    sm: 'text-xs gap-1 px-2 py-1',
    md: 'text-sm gap-1.5 px-3 py-1.5',
    lg: 'text-base gap-2 px-4 py-2'
  };
  
  const starSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-all',
        config.bgColor,
        config.borderColor,
        config.textColor,
        'border-2',
        sizeClasses[size],
        className
      )}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: config.stars }).map((_, i) => (
          <Star
            key={i}
            size={starSizes[size]}
            className={cn('fill-current', config.iconColor)}
          />
        ))}
      </div>
      {showLabel && <span className="font-semibold">{config.label}</span>}
    </div>
  );
}
