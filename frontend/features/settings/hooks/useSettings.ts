'use client';

import { useSyncExternalStore } from 'react';
import { getServerSnapshot, getSnapshot, subscribe, updateSettings } from '../store';
import type { FontName, ThemeName } from '../constants';

/** Membaca pengaturan saat ini + fungsi untuk mengubah tema / font. */
export function useSettings() {
  const settings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    theme: settings.theme,
    font: settings.font,
    setTheme: (theme: ThemeName) => updateSettings({ theme }),
    setFont: (font: FontName) => updateSettings({ font }),
  };
}
