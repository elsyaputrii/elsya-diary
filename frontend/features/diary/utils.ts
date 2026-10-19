import type { Diary } from '@/types';

/** Urutkan: tanggal terbaru dulu; kalau tanggal sama, yang dibuat belakangan dulu. */
export function sortNewestFirst(diaries: Diary[]): Diary[] {
  return [...diaries].sort((a, b) =>
    a.entry_date === b.entry_date ? b.id - a.id : a.entry_date < b.entry_date ? 1 : -1
  );
}

/**
 * Kelompokkan diary per tanggal -> { "2026-10-19": [diary1, diary2], ... }
 * Dipakai kalender & grafik karena satu tanggal boleh punya BANYAK catatan.
 */
export function groupByDate(diaries: Diary[]): Record<string, Diary[]> {
  const result: Record<string, Diary[]> = {};
  diaries.forEach((d) => {
    (result[d.entry_date] ||= []).push(d);
  });
  return result;
}
