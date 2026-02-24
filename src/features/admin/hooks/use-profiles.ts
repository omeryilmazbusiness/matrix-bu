'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { Profile, ProfileFormData } from '../types';

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to handle API responses
  const handleResponse = async (response: Response) => {
    const contentType = response.headers.get('content-type');
    
    // Check if response is JSON
    if (!contentType || !contentType.includes('application/json')) {
      // Not JSON - probably redirect or HTML error
      if (response.status === 401) {
        window.location.href = '/admin/login';
        throw new Error('Oturum süresi doldu. Lütfen tekrar giriş yapın.');
      }
      throw new Error('Beklenmeyen bir hata oluştu');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'İşlem başarısız oldu');
    }

    return data;
  };

  // Fetch all profiles
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/profiles');
      const data = await handleResponse(response);
      setProfiles(data.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Profiller yüklenemedi';
      setError(message);
      toast.error('Hata', { description: message });
    } finally {
      setLoading(false);
    }
  };

  // Create profile
  const createProfile = async (data: ProfileFormData) => {
    try {
      const response = await fetch('/api/admin/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await handleResponse(response);
      setProfiles((prev) => [...prev, result.data]);
      toast.success('Başarılı!', { description: 'Kanal başarıyla oluşturuldu' });
      return result.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Kanal oluşturulamadı';
      toast.error('Hata', { description: message });
      throw err;
    }
  };

  // Update profile
  const updateProfile = async (id: string, data: ProfileFormData) => {
    try {
      const response = await fetch(`/api/admin/profiles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await handleResponse(response);
      setProfiles((prev) =>
        prev.map((profile) => (profile.id === id ? result.data : profile))
      );
      toast.success('Başarılı!', { description: 'Kanal başarıyla güncellendi' });
      return result.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Kanal güncellenemedi';
      toast.error('Hata', { description: message });
      throw err;
    }
  };

  // Delete profile
  const deleteProfile = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/profiles/${id}`, {
        method: 'DELETE',
      });

      await handleResponse(response);
      setProfiles((prev) => prev.filter((profile) => profile.id !== id));
      toast.success('Başarılı!', { description: 'Kanal başarıyla silindi' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Kanal silinemedi';
      toast.error('Hata', { description: message });
      throw err;
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return {
    profiles,
    loading,
    error,
    createProfile,
    updateProfile,
    deleteProfile,
    refetch: fetchProfiles,
  };
}
