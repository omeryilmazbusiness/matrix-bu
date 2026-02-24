'use client';

import { useState, useEffect } from 'react';
import { channelsService } from '../services/channels-service';
import { Profile } from '@/features/profiles/types';

export function useChannelDetail(slugOrId: string) {
  const [channel, setChannel] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChannel() {
      try {
        setLoading(true);
        setError(null);
        const data = await channelsService.getChannelBySlugOrId(slugOrId);
        
        if (!data) {
          setError('Kanal bulunamadı');
        } else {
          setChannel(data);
        }
      } catch (err) {
        console.error('Error in useChannelDetail:', err);
        setError('Kanal yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }

    if (slugOrId) {
      fetchChannel();
    }
  }, [slugOrId]);

  return { channel, loading, error };
}
