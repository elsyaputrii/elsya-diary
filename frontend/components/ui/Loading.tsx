/** Teks "memuat" sederhana yang konsisten di semua halaman. */
export default function Loading({ text = 'Memuat...' }: { text?: string }) {
  return <div className="text-center py-20 text-ink-muted">{text}</div>;
}
