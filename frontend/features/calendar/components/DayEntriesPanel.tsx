import Link from 'next/link';
import { CalendarX, PlusCircle } from 'lucide-react';
import type { Diary } from '@/types';
import { formatLongDate } from '@/lib/date';
import EmptyState from '@/components/ui/EmptyState';
import DiaryCard from '@/features/diary/components/DiaryCard';

interface Props {
  date: string;
  entries: Diary[];
  /** Tanggal masa depan tidak bisa ditulis diary-nya. */
  canWrite: boolean;
}

/** Daftar semua catatan pada tanggal yang dipilih di kalender. */
export default function DayEntriesPanel({ date, entries, canWrite }: Props) {
  return (
    <section className="mt-8" aria-live="polite">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-ink">
          {formatLongDate(date)}
          <span className="ml-2 text-sm font-normal text-ink-muted">({entries.length} catatan)</span>
        </h2>
        {canWrite && entries.length > 0 && (
          <Link
            href={`/diary/create?date=${date}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <PlusCircle className="w-4 h-4" /> Tambah catatan
          </Link>
        )}
      </div>

      {entries.length === 0 ? (
        <EmptyState
          icon={CalendarX}
          title="Belum ada catatan di tanggal ini"
          description={canWrite ? 'Mau menulis sesuatu untuk hari ini?' : 'Tanggal ini belum tiba.'}
          action={canWrite ? { label: 'Tulis catatan', href: `/diary/create?date=${date}` } : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map((d) => (
            <DiaryCard key={d.id} diary={d} />
          ))}
        </div>
      )}
    </section>
  );
}
