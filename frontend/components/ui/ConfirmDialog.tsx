'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Kotak konfirmasi sebelum aksi berbahaya (mis. menghapus catatan). Tekan Esc untuk batal. */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Ya, Hapus',
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={loading ? undefined : onCancel} />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="relative w-full max-w-sm bg-surface border border-line rounded-3xl p-6 shadow-xl"
      >
        <div className="w-11 h-11 rounded-2xl bg-danger-soft text-danger flex items-center justify-center mb-4">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <h2 id="confirm-title" className="text-lg font-bold text-ink mb-1">
          {title}
        </h2>
        <p id="confirm-message" className="text-sm text-ink-soft mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 rounded-2xl text-sm font-medium bg-hover text-ink-soft hover:bg-line transition disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2.5 rounded-2xl text-sm font-medium bg-danger text-on-primary hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Menghapus...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
