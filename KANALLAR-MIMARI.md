# 🏗️ KANALLAR SAYFASI - MİMARİ TASARIM

## 📁 Klasör Yapısı

```
src/features/channels/
├── components/
│   ├── channel-card.tsx           # Kanal kartı (Grid görünümü)
│   ├── channel-list-item.tsx      # Kanal item (List görünümü)
│   ├── channel-grid.tsx           # Grid container + layout
│   ├── filter-bar.tsx             # Üst filtreleme barı
│   ├── quick-filters.tsx          # Hızlı filtre chip'leri
│   ├── stats-bar.tsx              # İstatistik göstergesi
│   ├── view-toggle.tsx            # Grid/List switch
│   ├── channel-skeleton.tsx       # Loading skeleton
│   └── empty-state.tsx            # Boş durum componentleri
├── hooks/
│   ├── use-channels.ts            # Kanal verisi hook'u
│   ├── use-channel-filters.ts    # Filtreleme logic
│   ├── use-pagination.ts         # Sayfalama logic
│   └── use-view-mode.ts          # Görünüm modu state
├── types/
│   └── index.ts                   # TypeScript tipleri
└── utils/
    ├── filter-channels.ts         # Filtreleme fonksiyonları
    ├── sort-channels.ts           # Sıralama fonksiyonları
    └── format-metrics.ts          # Metrik formatlama

src/app/kanallar/
└── page.tsx                       # Ana sayfa component
```

## 🎯 Component Hierarchy

```
ChannelsPage
├── Hero Section
├── FilterBar
│   ├── SearchInput (with debounce)
│   ├── TopicFilter (chips)
│   ├── SortDropdown
│   ├── ViewToggle (grid/list)
│   └── StatusFilter
├── StatsBar
│   ├── StatCard (Total)
│   ├── StatCard (Featured)
│   ├── StatCard (Verified)
│   └── StatCard (New This Month)
├── QuickFilters
│   └── FilterChip[]
├── ChannelGrid | ChannelList
│   └── ChannelCard[] | ChannelListItem[]
├── Pagination
└── EmptyState (conditional)
```

## 🔄 Data Flow

### 1. State Management (React Hooks + URL State)
```typescript
// Custom hooks
const { channels, isLoading, error } = useChannels();
const { 
  filters, 
  setSearchQuery, 
  setTopic, 
  setStatus, 
  setSortBy,
  clearFilters 
} = useChannelFilters();
const { viewMode, setViewMode } = useViewMode();
const { page, setPage, totalPages } = usePagination(totalResults);
```

### 2. Filter Pipeline
```
Raw Channels → Topic Filter → Status Filter → Search Filter → Sort → Paginate → Display
```

### 3. URL Sync (Next.js Router)
```
/kanallar?topic=bilim&status=featured&sort=popular&view=grid&page=2
```

## 🎨 Component Props Interface

### ChannelCard
```typescript
interface ChannelCardProps {
  channel: Channel;
  viewMode: 'grid' | 'list';
  onChannelClick?: (id: string) => void;
  showSocial?: boolean;
}
```

### FilterBar
```typescript
interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTopic: ProfileTopic | 'all';
  onTopicChange: (topic: ProfileTopic | 'all') => void;
  activeStatus: ProfileStatus | 'all';
  onStatusChange: (status: ProfileStatus | 'all') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalResults: number;
}
```

## 🚀 Performance Optimization

### 1. Memoization
```typescript
const filteredChannels = useMemo(() => 
  filterChannels(channels, filters), 
  [channels, filters]
);

const sortedChannels = useMemo(() => 
  sortChannels(filteredChannels, sortBy), 
  [filteredChannels, sortBy]
);
```

### 2. Debouncing
```typescript
const debouncedSearch = useDebounce(searchQuery, 500);
```

### 3. Virtual Scrolling (React Window)
```typescript
// For 1000+ channels
<FixedSizeGrid
  columnCount={4}
  rowCount={Math.ceil(channels.length / 4)}
  // ...
/>
```

### 4. Image Optimization
```typescript
<Image
  src={channel.image}
  alt={channel.name}
  loading="lazy"
  placeholder="blur"
/>
```

## 🔐 Data Types

```typescript
// Channel Type
interface Channel {
  id: string;
  name: string;
  title: string;
  description: string;
  image_url: string;
  status: ProfileStatus;
  topic: ProfileTopic;
  view_count: number;
  subscriber_count?: number;
  video_count?: number;
  created_at: string;
  updated_at: string;
  social_links: SocialLink[];
  tags?: string[];
}

// Filter State
interface ChannelFilters {
  searchQuery: string;
  topic: ProfileTopic | 'all';
  status: ProfileStatus | 'all';
  sortBy: 'popular' | 'recent' | 'name' | 'subscribers';
  quickFilter?: 'trending' | 'new' | 'verified' | 'featured';
}

// View Mode
type ViewMode = 'grid' | 'list';

// Pagination
interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
```

## 📊 API Integration (Future)

```typescript
// Supabase query example
const fetchChannels = async (filters: ChannelFilters) => {
  let query = supabase
    .from('profiles')
    .select('*')
    .order(filters.sortBy, { ascending: false });
  
  if (filters.topic !== 'all') {
    query = query.eq('topic', filters.topic);
  }
  
  if (filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }
  
  if (filters.searchQuery) {
    query = query.or(`name.ilike.%${filters.searchQuery}%,title.ilike.%${filters.searchQuery}%`);
  }
  
  const { data, error } = await query;
  return { data, error };
};
```

## 🎭 Animation Strategy

### Page Enter
```typescript
// Staggered fade-in
<div className="animate-in fade-in slide-in-from-bottom-4 duration-700"
     style={{ animationDelay: `${index * 50}ms` }}
/>
```

### Filter Change
```typescript
// Fade out → Update → Fade in
const [isTransitioning, setIsTransitioning] = useState(false);

const handleFilterChange = async (newFilter) => {
  setIsTransitioning(true);
  await new Promise(resolve => setTimeout(resolve, 150));
  applyFilter(newFilter);
  setIsTransitioning(false);
};
```

### Skeleton → Content
```typescript
{isLoading ? (
  <ChannelSkeleton count={12} />
) : (
  <ChannelGrid channels={channels} />
)}
```

## 🧪 Testing Strategy

### Unit Tests
- Filter functions
- Sort functions
- Format functions
- Custom hooks

### Integration Tests
- Filter + Search + Sort workflow
- Pagination logic
- URL state sync

### E2E Tests
- Full user journey
- Mobile responsiveness
- Accessibility

## 🚀 Deployment Checklist

- [ ] SEO meta tags
- [ ] Open Graph images
- [ ] Loading states
- [ ] Error boundaries
- [ ] Analytics events
- [ ] Performance monitoring
- [ ] A11y audit
- [ ] Mobile testing
- [ ] Cross-browser testing

## 📈 Phase 2 Features

- Infinite scroll option
- Advanced filters (sidebar)
- Save filter presets
- Compare channels
- Favorites system
- Channel recommendations
- Export channel list
