import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; href: string };
}

/** Tampilan halaman kosong (belum ada jurnal / hasil pencarian kosong, dll). */
export default function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="bg-surface border border-line rounded-3xl p-10 md:p-12 text-center">
      <div className="w-14 h-14 rounded-2xl bg-accent-soft text-accent flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-ink mb-1">{title}</h3>
      <p className="text-sm text-ink-muted mb-5 max-w-sm mx-auto">{description}</p>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary rounded-2xl text-sm font-medium transition"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
