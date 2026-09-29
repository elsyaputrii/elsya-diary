import Link from 'next/link';

// Interface untuk tipe data detail diary
interface DiaryDetail {
  id: string;
  date: string;
  time: string;
  mood: string;
  title: string;
  content: string[];
  repostCount: number;
  comments: {
    id: number;
    user: string;
    avatar: string;
    time: string;
    text: string;
  }[];
}

// Data dummy untuk detail cerita
const dummyDetailData: Record<string, DiaryDetail> = {
  '1': {
    id: '1',
    date: '28 September 2026',
    time: '10:24 WIB',
    mood: '🙂 Lumayan',
    title: 'Hari yang Lumayan Melelahkan',
    content: [
      'Hari ini lumayan capek, tapi masih bisa ngerjain tugas. Semoga besok lebih baik lagi!',
      'Pagi tadi sempat ada kendala teknis waktu mau submit revisi, tapi untungnya teman-teman kelompok saling bantu. Setelah itu bisa lanjut pengerjaan sampai sore.',
      'Sorenya sempat minum teh hangat sebentar sambil melihat pemandangan luar. Hal kecil sederhana kayak gini ternyata lumayan bikin pikiran jadi lebih tenang.'
    ],
    repostCount: 2,
    comments: [
      {
        id: 1,
        user: 'Nia',
        avatar: '🌸',
        time: '10:45 WIB',
        text: 'Semangat Elsya! Istirahat yang cukup ya sore ini.'
      },
      {
        id: 2,
        user: 'Rian',
        avatar: '☕',
        time: '11:10 WIB',
        text: 'Mantap, yang penting tugasnya beres. Besok pasti lebih lancar!'
      },
      {
        id: 3,
        user: 'Maya',
        avatar: '✨',
        time: '12:00 WIB',
        text: 'Jangan lupa minum air putih juga yaa!'
      }
    ]
  }
};

export default async function DiaryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Mengambil data berdasarkan ID atau fallback ke data dummy default
  const diary = dummyDetailData[id] || dummyDetailData['1'];

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-gray-700 font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white/70 backdrop-blur-sm border-r border-pink-100 p-6 flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl">🌷</span>
            <h1 className="font-semibold text-xl text-gray-800 tracking-wide">Elsya Diary</h1>
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

        <div className="hidden md:block p-4 rounded-2xl bg-linear-to-br from-pink-50 to-purple-50 text-center border border-pink-100">
          <p className="text-xs italic text-gray-500">"Semoga harimu menyenangkan."</p>
          <span className="text-pink-400 text-xs mt-1 block">♡</span>
        </div>
      </aside>

      {/* Konten Utama Detail Diary */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto space-y-6">
        
        {/* Navigasi Kembali */}
        <div>
          <Link 
            href="/diary"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-pink-600 transition-colors bg-white px-4 py-2 rounded-2xl border border-pink-100/70 shadow-sm"
          >
            ← Kembali ke Diary
          </Link>
        </div>

        {/* Card Detail Cerita */}
        <article className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-pink-100/70 space-y-6">
          
          {/* Header Metadata: Tanggal, Waktu & Mood */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-pink-50">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="font-semibold text-pink-500 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                📅 {diary.date}
              </span>
              <span className="text-gray-400">
                ⏰ {diary.time}
              </span>
            </div>

            <span className="bg-amber-50 text-gray-700 px-3.5 py-1 rounded-full text-xs font-semibold border border-amber-100/60">
              {diary.mood}
            </span>
          </div>

          {/* Judul Cerita */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            {diary.title}
          </h1>

          {/* Isi Cerita */}
          <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
            {diary.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Action Bar (Repost Button) */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Elsya Diary
            </span>

            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#8F80B3] font-medium text-xs transition-all border border-purple-100/60 active:scale-95">
              <span>🔁</span> Repost ({diary.repostCount})
            </button>
          </div>
        </article>

        {/* Bagian Komentar */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-pink-100/70 space-y-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            💬 Komentar ({diary.comments.length})
          </h2>

          {/* Input Tambah Komentar (UI Only) */}
          <div className="space-y-3">
            <textarea
              rows={3}
              placeholder="Tulis komentar atau dukungan untuk Elsya..."
              className="w-full px-4 py-3 rounded-2xl bg-pink-50/30 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#A294C2]/50 text-sm text-gray-700 placeholder-gray-400 resize-none transition-all"
            />
            <div className="flex justify-end">
              <button className="px-5 py-2.5 rounded-xl bg-[#A294C2] hover:bg-[#8F80B3] text-white font-medium text-xs transition-all shadow-sm active:scale-95">
                Kirim Komentar
              </button>
            </div>
          </div>

          {/* Daftar Komentar */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            {diary.comments.map((comment) => (
              <div 
                key={comment.id}
                className="p-4 rounded-2xl bg-[#FFF9F6] border border-pink-100/50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{comment.avatar}</span>
                    <span className="text-xs font-bold text-gray-700">{comment.user}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{comment.time}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-6">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}