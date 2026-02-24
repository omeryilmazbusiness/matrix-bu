'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminUser } from '../types';

interface UseAdminAuthReturn {
  user: AdminUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

/**
 * Admin Authentication Hook
 * - Session management
 * - Auto-redirect to login
 * - Token validation
 */
export function useAdminAuth(): UseAdminAuthReturn {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/auth/me', {
        method: 'GET',
        credentials: 'include', // Include cookies
      });

      const data = await response.json();

      if (data.success && data.data?.user) {
        setUser(data.data.user);
        setError(null);
      } else {
        setUser(null);
        // Don't redirect here - let the page decide
      }
    } catch (err) {
      console.error('❌ Auth check failed:', err);
      setUser(null);
      setError('Session doğrulanamadı');
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.data?.user) {
        setUser(data.data.user);
        router.push('/admin/dashboard');
      } else {
        throw new Error(data.error || 'Giriş başarısız');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Bir hata oluştu';
      setError(message);
      throw err; // Re-throw for component to handle
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      setUser(null);
      router.push('/admin/login');
    } catch (err) {
      console.error('❌ Logout failed:', err);
      setError('Çıkış yapılamadı');
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
  };
}

/**
 * Hook for protected pages
 * Automatically redirects to login if not authenticated
 */
export function useRequireAuth() {
  const router = useRouter();
  const auth = useAdminAuth();

  useEffect(() => {
    if (!auth.loading && !auth.user) {
      router.push('/admin/login');
    }
  }, [auth.loading, auth.user, router]);

  return auth;
}
