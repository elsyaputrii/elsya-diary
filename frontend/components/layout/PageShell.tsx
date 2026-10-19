import Navbar from '@/components/Navbar';

interface Props {
  children: React.ReactNode;
  /** Lebar maksimum konten, mis. "max-w-6xl" (lebar) atau "max-w-3xl" (form). */
  width?: string;
}

/** Kerangka halaman yang sudah login: Navbar + area konten. Dipakai semua halaman utama. */
export default function PageShell({ children, width = 'max-w-6xl' }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-page">
      <Navbar />
      <main className={`flex-1 ${width} w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 md:pb-12`}>
        {children}
      </main>
    </div>
  );
}
