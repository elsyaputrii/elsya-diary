import { toISODate } from '@/lib/date';

/**
 * Membuat daftar sel untuk grid kalender satu bulan (month: 0 = Januari).
 * Hasil: array tanggal "YYYY-MM-DD", diawali `null` sebanyak kolom kosong
 * sebelum tanggal 1 (kalender dimulai dari hari Minggu).
 */
export function buildMonthCells(year: number, month: number): (string | null)[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => toISODate(new Date(year, month, i + 1))),
  ];
}
