'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Diary } from '@/types';
import { getErrorMessage } from '@/lib/errors';
import { getDiaries } from '../services/diaryService';

/**
 * Mengambil semua diary milik pengguna.
 * Dipakai oleh Home, Daftar Diary, Kalender, dan Mood Tracker.
 *
 *   const { diaries, loading, error, reload, removeLocal } = useDiaries();
 */
export function useDiaries() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    getDiaries()
      .then((data) => {
        if (!cancelled) setDiaries(data);
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Gagal mengambil data diary.'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  /** Muat ulang dari server (mis. setelah tombol "Coba lagi"). */
  const reload = useCallback(() => {
    setLoading(true);
    setError('');
    setReloadKey((k) => k + 1);
  }, []);

  /** Hapus dari daftar di layar tanpa menunggu request baru (setelah delete sukses). */
  const removeLocal = useCallback((id: number) => {
    setDiaries((prev) => prev.filter((d) => d.id !== id));
  }, []);

  return { diaries, loading, error, reload, removeLocal };
}
