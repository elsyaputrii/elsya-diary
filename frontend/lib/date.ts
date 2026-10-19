/**
 * Helper tanggal. Semua tanggal diary disimpan sebagai string "YYYY-MM-DD".
 * Kita pakai waktu LOKAL (bukan toISOString yang memakai UTC), supaya
 * tanggal tidak mundur sehari untuk pengguna di Indonesia.
 */

export const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

export const DAY_NAMES_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const pad = (n: number) => String(n).padStart(2, '0');

/** Date -> "YYYY-MM-DD" (waktu lokal) */
export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

/** "YYYY-MM-DD" -> Date (jam 00:00 waktu lokal) */
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date: Date, amount: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

/** "2026-10-19" -> "19 Oktober 2026" */
export function formatLongDate(iso: string): string {
  const d = parseISODate(iso);
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

/** "2026-10-19" -> "19 Okt" */
export function formatShortDate(iso: string): string {
  const d = parseISODate(iso);
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)}`;
}
