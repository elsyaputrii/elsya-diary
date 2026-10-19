import { Sparkles } from 'lucide-react';

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

/** Kartu tengah layar yang dipakai bersama oleh halaman Login dan Register. */
export default function AuthShell({ title, subtitle, children, footer }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4 py-10">
      <div className="max-w-md w-full bg-surface border border-line rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-soft text-primary mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-ink">{title}</h1>
          <p className="text-sm text-ink-muted mt-1">{subtitle}</p>
        </div>

        {children}

        <p className="text-center text-sm text-ink-muted mt-6">{footer}</p>
      </div>
    </div>
  );
}
