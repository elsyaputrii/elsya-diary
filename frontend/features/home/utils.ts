import type { Diary, MoodType } from '@/types';
import { addDays, toISODate } from '@/lib/date';
import { getMoodDistribution } from '@/features/mood/utils/stats';

export interface ActivitySummary {
  total: number; // seluruh catatan
  thisMonth: number; // catatan bulan ini
  streak: number; // hari berturut-turut menulis
  topMood: MoodType | null; // mood terbanyak
}

/**
 * Streak = jumlah hari beruntun yang punya catatan, dihitung mundur dari hari ini.
 * Kalau hari ini belum menulis, streak kemarin tetap dihitung (masih ada kesempatan hari ini).
 */
function calculateStreak(dates: Set<string>, today: Date): number {
  let cursor = dates.has(toISODate(today)) ? today : addDays(today, -1);
  let streak = 0;
  while (dates.has(toISODate(cursor))) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function summarizeActivity(diaries: Diary[], today: Date = new Date()): ActivitySummary {
  const monthPrefix = toISODate(today).slice(0, 7); // "2026-10"
  const distribution = getMoodDistribution(diaries);

  return {
    total: diaries.length,
    thisMonth: diaries.filter((d) => d.entry_date.startsWith(monthPrefix)).length,
    streak: calculateStreak(new Set(diaries.map((d) => d.entry_date)), today),
    topMood: distribution[0]?.mood ?? null,
  };
}
