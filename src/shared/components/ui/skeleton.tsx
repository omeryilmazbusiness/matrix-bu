import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-md bg-gray-200', className)}>
      {/* Kayan yansıma efekti */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border-0 h-[320px] sm:h-[360px] bg-gradient-to-br from-gray-100 to-gray-50">
      {/* Shimmer overlay effect - Main Card */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-4 sm:p-5">
        {/* Top Section */}
        <div className="flex items-start justify-between">
          <Skeleton className="w-9 h-9 rounded-full" />
          <Skeleton className="w-24 h-8 rounded-lg" />
        </div>

        {/* Bottom Section */}
        <div className="space-y-3">
          <Skeleton className="w-28 h-7 rounded-lg" />
          
          <div className="flex items-center gap-2">
            <Skeleton className="w-16 h-7 rounded-lg" />
            <Skeleton className="w-16 h-7 rounded-lg" />
            <Skeleton className="w-16 h-7 rounded-lg" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>

          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSliderSkeleton() {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <Skeleton className="h-6 w-48" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <ProfileCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function PanoCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 p-6 h-[300px]">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      
      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="w-32 h-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function WeeklyPersonCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 p-6 h-[300px]">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      
      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="h-6 w-40" />
        </div>

        {/* Profile Image & Info */}
        <div className="flex items-start gap-4">
          <Skeleton className="w-20 h-20 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Button */}
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
    </div>
  );
}

export function TopicFilterSkeleton() {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <Skeleton className="h-6 w-24" />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative overflow-hidden">
            <Skeleton className="w-32 h-10 rounded-xl" />
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 py-12 sm:py-16">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      
      <div className="relative container mx-auto px-4 text-center space-y-6">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <div className="flex justify-center gap-4 mt-8">
          <Skeleton className="w-32 h-12 rounded-xl" />
          <Skeleton className="w-32 h-12 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
