'use client';

import Link from 'next/link';
import { useState } from 'react';

// Tipe data untuk entry kalender dummy
interface DiaryEntry {
  id: string;
  dateStr: string; // Format YYYY-MM-DD
  moodEmoji: string;
  moodText: string;
  title: string;
  snippet: string;
}

// Data dummy diary harian
const dummyDiaryData: Record<string, DiaryEntry> = {
  '2026-09-28': {
    id: '1',
    dateStr: '2026-09-28',
    moodEmoji: '🙂',
    moodText: 'Lumayan',
    title: 'Hari yang Lumayan Melelahkan',
    snippet: 'Hari ini lumayan capek, tapi masih bisa ngerjain tugas. Semoga besok lebih baik lagi dan semuanya lancar!',
  },
  '2026-09-26': {
    id: '2',
    dateStr: '2026-09-26',
    moodEmoji: '😊',
    moodText: 'Bahagia',
    title: 'Akhirnya Bisa Istirahat Sedikit Hari Ini',
    snippet: 'Akhirnya bisa ketemu temen-temen lagi hari ini. Seru banget dan bikin semangat lagi!',
  },
  '2026-09-25': {
    id: '3',
    dateStr: '2026-09-25',
    moodEmoji: '😔',
    moodText: 'Pusing',
    title: 'Pusing Sama Tugas Revisi',
    snippet: 'Pusing banget sama revisi tugas. Rasanya capek tapi harus selesai juga.',
  },
  '2026-09-20': {
    id: '4',
    dateStr: '2026-09-20',
    moodEmoji: '😍',
    moodText: 'Sangat Bahagia',
    title: 'Jalan-jalan Santai',
    snippet: 'Membeli kopi favorit dan jalan-jalan sore. Terasa tenang dan fresh sekali!',
  },
};

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function CalendarPage() {
  // State untuk navigasi bulan dan tahun (Default: September 2026)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1));
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-09-28');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Menghitung jumlah hari dalam bulan dan hari pertama
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Handler pergantian bulan
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Format Helper YYYY-MM-DD
  const formatDateString = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const selectedEntry = dummyDiaryData[selectedDateStr];

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
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-pink-100/70 text-pink-700 font-medium transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Kalender
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
          <p className="text-xs italic text-gray-500">"Lihat rekam jejak perasaanmu dari hari ke hari."</p>
          <span className="text-pink-400 text-xs mt-1 block">♡</span>
        </div>
      </aside>

      {/* Konten Utama Kalender */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto space-y-8">
        
        {/* Header Halaman */}
        <div className="border-b border-pink-100/80 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            Kalender Mood & Diary 📅
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Pilih tanggal untuk melihat suasana hati dan catatan harianmu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card Kalender Utama (2/3 Grid) */}
          <section className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-pink-100/70 space-y-6">
            
            {/* Navigasi Bulan & Tahun */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">
                {monthNames[month]} {year}
              </h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 transition-all text-xs font-semibold"
                >
                  ←
                </button>
                <button 
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 transition-all text-xs font-semibold"
                >
                  →
                </button>
              </div>
            </div>

            {/* Grid Kalender */}
            <div>
              {/* Header Nama Hari */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {dayNames.map((day) => (
                  <span key={day} className="text-xs font-semibold text-gray-400 py-1">
                    {day}
                  </span>
                ))}
              </div>

              {/* Angka Tanggal */}
              <div className="grid grid-cols-7 gap-1.5">
                {/* Offset Sel Kosong Sebelum Tanggal 1 */}
                {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-14 sm:h-16 rounded-2xl bg-transparent" />
                ))}

                {/* Tanggal Bulan Ini */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const dateStr = formatDateString(year, month, dayNum);
                  const entry = dummyDiaryData[dateStr];
                  const isSelected = dateStr === selectedDateStr;

                  return (
                    <button
                      key={dateStr}
                      onClick={() => setSelectedDateStr(dateStr)}
                      className={`h-14 sm:h-16 rounded-2xl p-1.5 flex flex-col justify-between items-center transition-all text-xs border relative ${
                        isSelected 
                          ? 'bg-[#A294C2] text-white border-[#A294C2] shadow-sm' 
                          : entry 
                          ? 'bg-pink-50/70 border-pink-200/80 text-gray-800 hover:bg-pink-100/80' 
                          : 'bg-white border-gray-100 text-gray-600 hover:bg-pink-50/30'
                      }`}
                    >
                      <span className={`font-semibold text-xs ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                        {dayNum}
                      </span>

                      {/* Indikator Mood / Emoji */}
                      {entry ? (
                        <span className="text-base sm:text-lg">{entry.moodEmoji}</span>
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-transparent mb-1" />
                      )}

                      {/* Titik Indikator jika ada diary */}
                      {entry && (
                        <span className={`w-1.5 h-1.5 rounded-full absolute bottom-1.5 ${isSelected ? 'bg-white' : 'bg-pink-400'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </section>

          {/* Card Ringkasan Diary Tanggal Terpilih (1/3 Grid) */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100/70 flex flex-col justify-between space-y-4">
            
            <div className="space-y-4">
              <div className="border-b border-pink-50 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  Ringkasan Tanggal
                </span>
                <h3 className="text-base font-bold text-gray-800 mt-0.5">
                  {selectedDateStr}
                </h3>
              </div>

              {selectedEntry ? (
                <div className="space-y-4">
                  {/* Badge Mood */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-xs font-medium text-gray-700">
                    <span>{selectedEntry.moodEmoji}</span>
                    <span>{selectedEntry.moodText}</span>
                  </div>

                  {/* Judul & Snippet */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800 text-base">
                      {selectedEntry.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      "{selectedEntry.snippet}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center space-y-2">
                  <span className="text-3xl block">🍃</span>
                  <p className="text-xs text-gray-400">
                    Tidak ada cerita ditulis pada tanggal ini.
                  </p>
                </div>
              )}
            </div>

            {/* Action Link ke Detail */}
            {selectedEntry && (
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href={`/diary/${selectedEntry.id}`}
                  className="w-full py-3 px-4 rounded-2xl bg-[#A294C2] hover:bg-[#8F80B3] text-white font-medium text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  Buka Cerita Lengkap →
                </Link>
              </div>
            )}

          </section>

        </div>

      </main>
    </div>
  );
}