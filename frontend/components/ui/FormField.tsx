interface Props {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

/** Pembungkus input: label di atas, pesan error merah di bawah. */
export default function FormField({ id, label, error, children }: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
