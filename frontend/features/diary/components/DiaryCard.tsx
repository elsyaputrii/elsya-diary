import Link from 'next/link';
import { Calendar, Trash2 } from 'lucide-react';
import type { Diary } from '@/types';
import { formatLongDate } from '@/lib/date';
import MoodBadge from '@/features/mood/components/MoodBadge';

interface Props {
  diary: Diary;
  /** Jika diisi, tombol hapus (ikon tempat sampah) akan muncul. */
  onDelete?: (diary: Diary) => void;
}

/** Kartu ringkasan satu catatan. Dipakai di Home, Daftar Diary, dan Kalender. */
export default function DiaryCard({ diary, onDelete }: Props) {
  return (
    <article className="bg-surface border border-line rounded-3xl p-6 hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <MoodBadge mood={diary.mood} />
          <span className="text-xs text-ink-muted flex items-center gap-1 shrink-0">
            <Calendar className="w-3.5 h-3.5" /> {formatLongDate(diary.entry_date)}
          </span>
        </div>
        <h3 className="text-lg font-bold text-ink mb-2 line-clamp-1">{diary.title}</h3>
        <p className="text-sm text-ink-soft line-clamp-3 mb-5">{diary.content}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-line">
        <Link href={`/diary/${diary.id}`} className="text-xs font-bold text-primary hover:underline">
          Baca Selengkapnya &rarr;
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(diary)}
            className="text-danger hover:bg-danger-soft p-2 rounded-xl transition"
            title="Hapus catatan"
            aria-label={`Hapus catatan ${diary.title}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </article>
  );
}
