'use client';

import { useState, useEffect } from 'react';
import { channelsService } from '../services/channels-service';
import { Profile } from '@/features/profiles/types';

export function useChannels() {
  const [channels, setChannels] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChannels() {
      try {
        setLoading(true);
        setError(null);
        const data = await channelsService.getPublishedChannels();
        setChannels(data);
      } catch (err) {
        console.error('Error in useChannels:', err);
        setError('Kanallar yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }

    fetchChannels();
  }, []);

  return { channels, loading, error };
}
