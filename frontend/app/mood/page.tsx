import Link from 'next/link';

// Data dummy statistik mood
const moodStatsData = {
  todayMood: {
    emoji: '😌',
    label: 'Lumayan',
    note: 'Tetap tenang dan perlahan menyelesaikan tugas harian.',
  },
  mostFrequentMood: {
    emoji: '😊',
    label: 'Bahagia',
    count: 12,
    percentage: '40%',
  },
  counts: [
    { emoji: '😍', label: 'Sangat Bahagia', count: 5, color: 'bg-pink-100 text-pink-700 border-pink-200' },
    { emoji: '😊', label: 'Bahagia', count: 12, color: 'bg-rose-100 text-rose-700 border-rose-200' },
    { emoji: '😌', label: 'Lumayan', count: 8, color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { emoji: '😔', label: 'Sedih', count: 3, color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { emoji: '😡', label: 'Marah', count: 1, color: 'bg-red-100 text-red-700 border-red-200' },
    { emoji: '😴', label: 'Lelah', count: 4, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  ],
  weeklyChart: [
    { day: 'Sen', emoji: '😌', value: 60, label: 'Lumayan' },
    { day: 'Sel', emoji: '😊', value: 85, label: 'Bahagia' },
    { day: 'Rab', emoji: '😍', value: 95, label: 'Sangat Bahagia' },
    { day: 'Kam', emoji: '😴', value: 40, label: 'Lelah' },
    { day: 'Jum', emoji: '😌', value: 65, label: 'Lumayan' },
    { day: 'Sab', emoji: '😊', value: 80, label: 'Bahagia' },
    { day: 'Min', emoji: '😊', value: 88, label: 'Bahagia' },
  ],
  monthlySummary: {
    totalEntries: 33,
    positiveDays: 25,
    neutralDays: 8,
    summaryText: 'Bulan ini diwarnai oleh lebih banyak hari-hari bahagia dan tenang. Suasana hatimu sangat stabil dan positif! 🌸',
  }
};

export default function MoodPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F6] text-gray-700 font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
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
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Cerita Saya
            </Link>
            <Link 
              href="/calendar" 
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Kalender
            </Link>
            <Link 
              href="/mood" 
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-pink-100/70 text-pink-700 font-medium transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Statistik Mood
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
          <p className="text-xs italic text-gray-500">"Pahami dan peluk semua perasaanmu."</p>
          <span className="text-pink-400 text-xs mt-1 block">♡</span>
        </div>
      </aside>

      {/* Konten Utama Statistik Mood */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto space-y-8">
        
        {/* Header Halaman */}
        <div className="border-b border-pink-100/80 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            Statistik Mood 📊
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Melihat dinamika dan tren suasana hatimu dari waktu ke waktu.
          </p>
        </div>

        {/* Ringkasan Mood Hari Ini & Paling Sering */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card Mood Hari Ini */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100/70 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-3xl shrink-0">
              {moodStatsData.todayMood.emoji}
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                Mood Hari Ini
              </span>
              <h3 className="text-xl font-bold text-gray-800">
                {moodStatsData.todayMood.label}
              </h3>
              <p className="text-xs text-gray-500">
                {moodStatsData.todayMood.note}
              </p>
            </div>
          </div>

          {/* Card Mood Paling Sering */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100/70 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-3xl shrink-0">
              {moodStatsData.mostFrequentMood.emoji}
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                Paling Sering Muncul
              </span>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                {moodStatsData.mostFrequentMood.label}
                <span className="text-xs font-medium text-pink-500 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                  {moodStatsData.mostFrequentMood.percentage}
                </span>
              </h3>
              <p className="text-xs text-gray-500">
                Tercatat {moodStatsData.mostFrequentMood.count} kali dalam sebulan terakhir.
              </p>
            </div>
          </div>

        </section>

        {/* Grafik Sederhana Mood Mingguan */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-pink-100/70 space-y-6">
          <div className="flex items-center justify-between border-b border-pink-50 pb-3">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Grafik Mood Mingguan 📈
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Perkembangan suasana hati selama 7 hari terakhir
              </p>
            </div>
            <span className="text-xs font-medium text-[#A294C2] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              Minggu Ini
            </span>
          </div>

          {/* Bar Chart Sederhana */}
          <div className="pt-6 pb-2">
            <div className="h-44 flex items-end justify-between gap-2 sm:gap-6 border-b border-gray-100 pb-2">
              {moodStatsData.weeklyChart.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-xs font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                  <span className="text-lg group-hover:scale-125 transition-transform">
                    {item.emoji}
                  </span>
                  <div 
                    style={{ height: `${item.value}%` }} 
                    className="w-full max-w-[36px] bg-gradient-to-t from-[#A294C2] to-pink-300 rounded-t-xl transition-all group-hover:opacity-90 shadow-sm"
                  />
                  <span className="text-xs font-semibold text-gray-600 mt-1">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grid Jumlah Setiap Mood & Ringkasan Bulanan */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Rincian Jumlah Setiap Mood (2/3 Grid) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-pink-100/70 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b border-pink-50 pb-3">
              Distribusi Mood
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {moodStatsData.counts.map((item) => (
                <div 
                  key={item.label}
                  className={`p-3.5 rounded-2xl border ${item.color} flex items-center justify-between space-x-2`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl shrink-0">{item.emoji}</span>
                    <span className="text-xs font-semibold truncate">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold bg-white/80 px-2 py-0.5 rounded-lg shrink-0">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ringkasan Bulanan (1/3 Grid) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100/70 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-800 border-b border-pink-50 pb-3">
                Ringkasan Bulanan 🗓️
              </h2>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400">Total Catatan:</span>
                  <span className="font-bold text-gray-700">{moodStatsData.monthlySummary.totalEntries} hari</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400">Hari Positif:</span>
                  <span className="font-bold text-emerald-600">{moodStatsData.monthlySummary.positiveDays} hari</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400">Hari Netral / Lelah:</span>
                  <span className="font-bold text-amber-600">{moodStatsData.monthlySummary.neutralDays} hari</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed pt-2 italic">
                "{moodStatsData.monthlySummary.summaryText}"
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 text-center">
              <span className="text-xs text-pink-400 font-medium">
                Keep blooming, Elsya! 🌸
              </span>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}