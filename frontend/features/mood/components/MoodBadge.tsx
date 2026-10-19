import { getMood } from '../constants';

/** Label kecil berisi emoji + nama mood. */
export default function MoodBadge({ mood }: { mood: string }) {
  const m = getMood(mood);
  return (
    <span className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-accent-soft text-primary rounded-full font-medium">
      <span aria-hidden>{m.emoji}</span> {m.label}
    </span>
  );
}
