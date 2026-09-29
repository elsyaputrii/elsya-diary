import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFF9F6] text-gray-700 flex flex-col justify-between p-6 md:p-12 font-sans">
      <header className="flex justify-between items-center max-w-5xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌷</span>
          <span className="font-semibold text-lg text-gray-800">Elsya's Diary</span>
        </div>
        <Link 
          href="/login" 
          className="px-5 py-2 rounded-full text-xs font-semibold text-pink-600 border border-pink-200 bg-white hover:bg-pink-50 transition-all shadow-sm"
        >
          Masuk Akun
        </Link>
      </header>

      <main className="max-w-2xl mx-auto text-center space-y-6 my-auto py-12">
        <span className="inline-block text-4xl mb-2">📖✨</span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 tracking-tight leading-snug">
          Tempat Setiap Cerita & Perasaan Menemukan Rumahnya.
        </h1>
        <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto leading-relaxed">
          Ruang pribadi Elsya untuk merekam momen harian, melacak mood, dan berefleksi dengan tenang.
        </p>

        <div className="pt-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium text-sm rounded-full shadow-md hover:from-pink-500 hover:to-rose-500 transition-all hover:scale-[1.02]"
          >
            Mulai Menulis 🌸
          </Link>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Elsya's Diary. All rights reserved.
      </footer>
    </div>
  );
}