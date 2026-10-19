import { getMood } from '../constants';
import type { TrendPoint } from '../utils/stats';

interface Props {
  points: TrendPoint[];
  /** Tampilkan emoji di atas batang (cocok untuk mingguan; bulanan terlalu sempit). */
  showEmoji: boolean;
}

const MAX_SCORE = 5;

/**
 * Grafik batang suasana hati per hari (murni CSS, tanpa library tambahan).
 * Tinggi batang = rata-rata skor mood hari itu (1 sedih ... 5 bahagia).
 * Warna batang = mood yang paling dominan hari itu.
 */
export default function MoodTrendChart({ points, showEmoji }: Props) {
  return (
    <div>
      <div
        role="img"
        aria-label="Grafik rata-rata suasana hati per hari"
        className="flex items-stretch gap-1 sm:gap-2 h-52"
      >
        {points.map((p) => {
          const mood = p.dominant ? getMood(p.dominant) : null;
          const tooltip = p.count
            ? `${p.label} ${p.sublabel}: ${p.count} catatan, skor rata-rata ${p.avgScore?.toFixed(1)}`
            : `${p.label} ${p.sublabel}: belum ada catatan`;

          return (
            <div key={p.date} title={tooltip} className="flex-1 min-w-0 flex flex-col items-center">
              <div className="h-6 text-base leading-6" aria-hidden>
                {showEmoji && mood ? mood.emoji : ''}
              </div>

              <div className="flex-1 w-full flex items-end justify-center">
                {mood && p.avgScore ? (
                  <div
                    className="w-full max-w-10 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(p.avgScore / MAX_SCORE) * 100}%`, background: mood.color }}
                  />
                ) : (
                  <div className="w-full max-w-10 h-1 rounded-full bg-line-strong" />
                )}
              </div>

              <div className="mt-2 text-center leading-tight">
                <div className="text-[10px] sm:text-xs font-semibold text-ink-soft">{p.label}</div>
                {p.sublabel && <div className="text-[10px] text-ink-muted">{p.sublabel}</div>}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-ink-muted">
        Tinggi batang = rata-rata skor mood (1 = sedih, 5 = bahagia). Warna = mood yang paling sering muncul pada hari itu.
      </p>
    </div>
  );
}
