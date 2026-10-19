import type { MoodType } from '@/types';

/**
 * Daftar mood — SATU-SATUNYA tempat mood didefinisikan.
 * Form diary, filter, kalender, dan grafik semua membaca dari sini.
 *
 * score : nilai 1-5 untuk menghitung rata-rata suasana hati di grafik
 *         (1 = paling sedih, 5 = paling bahagia)
 * color : warna batang grafik (cukup netral untuk semua tema)
 */
export interface MoodOption {
  type: MoodType;
  label: string;
  emoji: string;
  score: number;
  color: string;
}

export const MOODS: MoodOption[] = [
  { type: 'happy', label: 'Happy', emoji: '😊', score: 5, color: '#F2B84B' },
  { type: 'excited', label: 'Excited', emoji: '✨', score: 5, color: '#E58AA5' },
  { type: 'calm', label: 'Calm', emoji: '🌿', score: 4, color: '#7FB89B' },
  { type: 'reflective', label: 'Reflective', emoji: '🌙', score: 3, color: '#8E8CC9' },
  { type: 'anxious', label: 'Anxious', emoji: '💭', score: 2, color: '#E39A5C' },
  { type: 'sad', label: 'Sad', emoji: '💧', score: 1, color: '#6E9CC9' },
];

const MOOD_MAP = Object.fromEntries(MOODS.map((m) => [m.type, m])) as Record<MoodType, MoodOption>;

/** Ambil data mood dari tipe-nya. Kalau backend mengirim mood tak dikenal, pakai tampilan netral. */
export function getMood(type: string): MoodOption {
  return (
    MOOD_MAP[type as MoodType] ?? {
      type: type as MoodType,
      label: type,
      emoji: '📝',
      score: 3,
      color: '#A89888',
    }
  );
}
