import type { MoodStats } from '@/types';
import { getMood } from '../constants';

/** Batang horizontal: berapa persen tiap mood muncul pada periode terpilih. */
export default function MoodDistribution({ stats }: { stats: MoodStats[] }) {
  return (
    <div className="space-y-4">
      {stats.map((item) => {
        const mood = getMood(item.mood);
        return (
          <div key={item.mood} className="space-y-1.5">
            <div className="flex justify-between text-sm font-semibold text-ink">
              <span>
                {mood.emoji} {mood.label}
              </span>
              <span className="text-ink-soft font-medium">
                {item.count} catatan ({item.percentage}%)
              </span>
            </div>
            <div className="w-full bg-line rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%`, background: mood.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
