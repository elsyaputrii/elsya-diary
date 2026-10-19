import { BookOpen, CalendarDays, Flame, Smile } from 'lucide-react';
import { getMood } from '@/features/mood/constants';
import type { ActivitySummary } from '../utils';

/** Empat kartu ringkasan aktivitas di halaman Home. */
export default function SummaryCards({ summary }: { summary: ActivitySummary }) {
  const top = summary.topMood ? getMood(summary.topMood) : null;

  const items = [
    { label: 'Total Catatan', value: String(summary.total), icon: BookOpen },
    { label: 'Bulan Ini', value: String(summary.thisMonth), icon: CalendarDays },
    { label: 'Streak Menulis', value: `${summary.streak} hari`, icon: Flame },
    { label: 'Mood Terbanyak', value: top ? `${top.emoji} ${top.label}` : '-', icon: Smile },
  ];

  return (
    <section aria-label="Ringkasan aktivitas" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="bg-surface border border-line rounded-3xl p-5">
          <div className="w-9 h-9 rounded-xl bg-accent-soft text-primary flex items-center justify-center mb-3">
            <Icon className="w-4 h-4" />
          </div>
          <p className="text-xl font-bold text-ink">{value}</p>
          <p className="text-xs text-ink-muted">{label}</p>
        </div>
      ))}
    </section>
  );
}
