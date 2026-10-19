import { AlertCircle } from 'lucide-react';

interface Props {
  message: string;
  onRetry?: () => void;
}

/** Kotak pesan error (merah) dengan tombol "Coba lagi" opsional. */
export default function ErrorNotice({ message, onRetry }: Props) {
  return (
    <div role="alert" className="p-4 rounded-2xl bg-danger-soft border border-danger-line text-danger text-sm flex items-center gap-3">
      <AlertCircle className="w-5 h-5 shrink-0" />
      <span className="flex-1">{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="font-semibold underline underline-offset-2 shrink-0">
          Coba lagi
        </button>
      )}
    </div>
  );
}
