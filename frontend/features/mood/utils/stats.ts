import type { Diary, MoodStats, MoodType } from '@/types';
import { addDays, DAY_NAMES_SHORT, toISODate } from '@/lib/date';
import { groupByDate } from '@/features/diary/utils';
import { getMood, MOODS } from '../constants';

/**
 * Fungsi-fungsi murni untuk menghitung statistik mood (tanpa React, tanpa API),
 * jadi mudah dibaca dan dites.
 */

/** Satu titik/batang pada grafik (satu hari). */
export interface TrendPoint {
  date: string; // YYYY-MM-DD
  label: string; // teks utama di bawah batang
  sublabel: string; // teks kecil di bawahnya
  count: number; // jumlah catatan pada hari itu
  avgScore: number | null; // rata-rata skor mood (null = tidak ada catatan)
  dominant: MoodType | null; // mood yang paling sering muncul hari itu
}

/** Hitung jumlah & persentase tiap mood. Hanya mood yang muncul, urut dari terbanyak. */
export function getMoodDistribution(diaries: Diary[]): MoodStats[] {
  const total = diaries.length;
  if (total === 0) return [];

  return MOODS.map((m) => {
    const count = diaries.filter((d) => d.mood === m.type).length;
    return { mood: m.type, count, percentage: Math.round((count / total) * 100) };
  })
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count);
}

function buildPoint(date: string, label: string, sublabel: string, entries: Diary[]): TrendPoint {
  if (entries.length === 0) {
    return { date, label, sublabel, count: 0, avgScore: null, dominant: null };
  }

  const avgScore = entries.reduce((sum, e) => sum + getMood(e.mood).score, 0) / entries.length;

  // mood paling sering muncul hari itu
  const tally: Record<string, number> = {};
  entries.forEach((e) => (tally[e.mood] = (tally[e.mood] || 0) + 1));
  const dominant = Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0] as MoodType;

  return { date, label, sublabel, count: entries.length, avgScore, dominant };
}

/** 7 hari terakhir (hari ini di paling kanan). */
export function getWeeklyTrend(diaries: Diary[], endDate: Date = new Date()): TrendPoint[] {
  const byDate = groupByDate(diaries);
  return Array.from({ length: 7 }, (_, i) => {
    const day = addDays(endDate, i - 6);
    const iso = toISODate(day);
    return buildPoint(iso, DAY_NAMES_SHORT[day.getDay()], String(day.getDate()), byDate[iso] ?? []);
  });
}

/** Semua hari dalam satu bulan (month: 0 = Januari). */
export function getMonthlyTrend(diaries: Diary[], year: number, month: number): TrendPoint[] {
  const byDate = groupByDate(diaries);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = new Date(year, month, i + 1);
    const iso = toISODate(day);
    return buildPoint(iso, String(i + 1), '', byDate[iso] ?? []);
  });
}

/** Ambil diary yang tanggalnya berada di rentang [from, to] (inklusif, format YYYY-MM-DD). */
export function filterByRange(diaries: Diary[], from: string, to: string): Diary[] {
  return diaries.filter((d) => d.entry_date >= from && d.entry_date <= to);
}

/** Rentang tanggal untuk periode mingguan (7 hari terakhir). */
export function getWeekRange(endDate: Date = new Date()): { from: string; to: string } {
  return { from: toISODate(addDays(endDate, -6)), to: toISODate(endDate) };
}

/** Rentang tanggal untuk satu bulan. */
export function getMonthRange(year: number, month: number): { from: string; to: string } {
  return {
    from: toISODate(new Date(year, month, 1)),
    to: toISODate(new Date(year, month + 1, 0)),
  };
}
