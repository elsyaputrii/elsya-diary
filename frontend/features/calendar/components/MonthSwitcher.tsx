import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTH_NAMES } from '@/lib/date';

interface Props {
  year: number;
  month: number; // 0 = Januari
  onPrev: () => void;
  onNext: () => void;
}

/** Tombol ‹ Oktober 2026 › untuk pindah bulan. Dipakai di Kalender dan Mood Tracker. */
export default function MonthSwitcher({ year, month, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center gap-2 bg-surface border border-line rounded-2xl p-1 shadow-xs">
      <button onClick={onPrev} aria-label="Bulan sebelumnya" className="p-2 hover:bg-hover rounded-xl text-primary transition">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="px-2 min-w-36 text-center text-sm font-bold text-ink">
        {MONTH_NAMES[month]} {year}
      </span>
      <button onClick={onNext} aria-label="Bulan berikutnya" className="p-2 hover:bg-hover rounded-xl text-primary transition">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
