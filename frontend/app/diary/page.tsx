import Link from 'next/link';

// Data dummy cerita diary
const dummyDiaries = [
  {
    id: 1,
    date: '28 September 2026',
    mood: '🙂 Lumayan',
    title: 'Hari yang Lumayan Melelahkan',
    snippet: 'Hari ini lumayan capek, tapi masih bisa ngerjain tugas. Semoga besok lebih baik lagi dan semuanya lancar!...',
    commentsCount: 3,
  },
  {
    id: 2,
    date: '26 September 2026',
    mood: '😊 Bahagia',
    title: 'Akhirnya Bisa Istirahat Sedikit Hari Ini',
    snippet: 'Akhirnya bisa ketemu temen-temen lagi hari ini. Seru banget dan bikin semangat lagi setelah beberapa hari sibuk...',
    commentsCount: 5,
  },
  {
    id: 3,
    date: '25 September 2026',
    mood: '😔 Pusing',
    title: 'Pusing Sama Tugas Revisi',
    snippet: 'Pusing banget sama revisi tugas. Rasanya capek tapi harus selesai juga. Semoga besok lebih lancar dari hari ini...',
    commentsCount: 8,
  },
];

export default function DiaryPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F6] text-gray-700 font-sans flex flex-col md:flex-row">
      {/* Sidebar Sederhana */}
      <aside className="w-full md:w-64 bg-white/70 backdrop-blur-sm border-r border-pink-100 p-6 flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl">🌷</span>
            <h1 className="font-semibold text-xl text-gray-800 tracking-wide">Elsya's Diary</h1>
          </div>

          <nav className="space-y-2">
            <Link 
              href="/" 
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Beranda
            </Link>
            <Link 
              href="/diary" 
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-pink-100/70 text-pink-700 font-medium transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Cerita Saya
            </Link>
            <Link 
              href="/profile" 
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profil
            </Link>
          </nav>
        </div>

        <div className="hidden md:block p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 text-center border border-pink-100">
          <p className="text-xs italic text-gray-500">"Setiap detik cerita punya harganya sendiri."</p>
          <span className="text-pink-400 text-xs mt-1 block">♡</span>
        </div>
      </aside>

      {/* Konten Utama Diary */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto space-y-8">
        
        {/* Header Halaman & Tombol Tulis Cerita */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-pink-100/80">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
              My Diary 🌷
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Tempat menyimpan semua cerita, kenangan, dan perasaanmu.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#A294C2] hover:bg-[#8F80B3] text-white font-medium text-sm transition-all shadow-sm hover:shadow active:scale-[0.98] shrink-0">
            <span>＋</span> Tulis Cerita
          </button>
        </div>

        {/* Daftar Kartu Diary */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyDiaries.map((diary) => (
            <article 
              key={diary.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100/70 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header Card: Tanggal & Mood */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-medium text-pink-400 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100/50">
                    {diary.date}
                  </span>
                  <span className="bg-amber-50 text-gray-600 px-2.5 py-1 rounded-full font-medium border border-amber-100/50">
                    {diary.mood}
                  </span>
                </div>

                {/* Judul & Snippet */}
                <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                  {diary.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {diary.snippet}
                </p>
              </div>

              {/* Footer Card: Tombol Lihat Cerita */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  💬 {diary.commentsCount} komentar
                </span>
                <button className="text-xs font-semibold text-[#A294C2] hover:text-[#8F80B3] transition-colors flex items-center gap-1">
                  Lihat Cerita →
                </button>
              </div>
            </article>
          ))}
        </section>

      </main>
    </div>
  );
}