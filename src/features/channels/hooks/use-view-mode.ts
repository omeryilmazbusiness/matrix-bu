'use client';

import { useState, useEffect } from 'react';
import type { ViewMode } from '../types';

export function useViewMode() {
  const [viewMode, setViewModeState] = useState<ViewMode>('grid');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('channelViewMode') as ViewMode;
    if (saved === 'grid' || saved === 'list') {
      setViewModeState(saved);
    }
  }, []);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    localStorage.setItem('channelViewMode', mode);
  };

  return { viewMode, setViewMode };
}
