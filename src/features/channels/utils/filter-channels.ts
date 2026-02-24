import { Profile } from '@/features/profiles/types';

interface FilterOptions {
  searchQuery: string;
  topic: string;
  status: string;
  sortBy?: string; // sortBy eklendi
}

export function filterChannels(
  channels: Profile[],
  { searchQuery, topic, status }: FilterOptions
): Profile[] {
  let filtered = [...channels];

  // Topic filter
  if (topic !== 'all') {
    filtered = filtered.filter(ch => ch.topic === topic);
  }

  // Status filter
  if (status !== 'all') {
    filtered = filtered.filter(ch => ch.status === status);
  }

  // Search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(ch =>
      ch.name.toLowerCase().includes(query) ||
      ch.title.toLowerCase().includes(query) ||
      ch.description.toLowerCase().includes(query)
    );
  }

  return filtered;
}

export function sortChannels(channels: Profile[], sortBy: string): Profile[] {
  const sorted = [...channels];

  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => b.view_count - a.view_count);
    case 'recent':
      return sorted.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
    case 'subscribers':
      return sorted.sort((a, b) => b.view_count - a.view_count);
    default:
      return sorted;
  }
}
