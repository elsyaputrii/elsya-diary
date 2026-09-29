'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Pilihan mood sesuai daftar
const moodOptions = [
  { label: 'Sangat Bahagia', emoji: '😍', color: 'bg-pink-100 border-pink-200 text-pink-700' },
  { label: 'Bahagia', emoji: '😊', color: 'bg-rose-100 border-rose-200 text-rose-700' },
  { label: 'Lumayan', emoji: '😌', color: 'bg-amber-100 border-amber-200 text-amber-700' },
  { label: 'Sedih', emoji: '😔', color: 'bg-blue-100 border-blue-200 text-blue-700' },
  { label: 'Marah', emoji: '😡', color: 'bg-red-100 border-red-200 text-red-700' },
  { label: 'Lelah', emoji: '😴', color: 'bg-purple-100 border-purple-200 text-purple-700' },
  { label: 'Biasa Saja', emoji: '😐', color: 'bg-gray-100 border-gray-200 text-gray-700' },
];

export default function CreateDiaryPage() {
  const router = useRouter();

  // State form lokal (UI Only)
  const [selectedMood, setSelectedMood] = useState<string>('😌 Lumayan');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy submit action: Kembali ke halaman list diary
    router.push('/diary');
  };

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
          <p className="text-xs italic text-gray-500">"Tuliskan semua yang kamu rasakan hari ini."</p>
          <span className="text-pink-400 text-xs mt-1 block">♡</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto space-y-6">
        
        {/* Navigasi Kembali / Batal */}
        <div>
          <Link 
            href="/diary"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-pink-600 transition-colors bg-white px-4 py-2 rounded-2xl border border-pink-100/70 shadow-sm"
          >
            ← Batal
          </Link>
        </div>

        {/* Card Form Tulis Cerita */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-pink-100/70 space-y-6">
          
          <div className="border-b border-pink-50 pb-4">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
              Tulis Cerita ✍️
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Bagikan kisah, pikiran, atau peristiwa yang terjadi hari ini.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Tanggal & Waktu (Opsional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="date" className="block text-xs font-semibold text-gray-600 pl-1">
                  Tanggal Kejadian
                </label>
                <input
                  id="date"
                  type="date"
                  defaultValue="2026-09-28"
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/30 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#A294C2]/50 text-sm text-gray-700 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="time" className="block text-xs font-semibold text-gray-600 pl-1">
                  Waktu Kejadian <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <input
                  id="time"
                  type="time"
                  defaultValue="12:43"
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/30 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#A294C2]/50 text-sm text-gray-700 transition-all"
                />
              </div>
            </div>

            {/* Pilihan Mood */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-600 pl-1">
                Bagaimana perasaanmu hari ini?
              </label>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((m) => {
                  const moodString = `${m.emoji} ${m.label}`;
                  const isSelected = selectedMood === moodString;
                  return (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setSelectedMood(moodString)}
                      className={`px-3.5 py-2 rounded-2xl text-xs font-medium border transition-all flex items-center gap-1.5 active:scale-95 ${
                        isSelected 
                          ? `${m.color} ring-2 ring-offset-1 ring-[#A294C2]` 
                          : 'bg-white border-pink-100 text-gray-600 hover:bg-pink-50/50'
                      }`}
                    >
                      <span className="text-base">{m.emoji}</span>
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Judul Cerita */}
            <div className="space-y-1.5">
              <label htmlFor="title" className="block text-xs font-semibold text-gray-600 pl-1">
                Judul Cerita
              </label>
              <input
                id="title"
                type="text"
                placeholder="Beri judul untuk harimu..."
                className="w-full px-4 py-3 rounded-2xl bg-pink-50/30 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#A294C2]/50 text-sm text-gray-700 placeholder-gray-400 transition-all"
                required
              />
            </div>

            {/* Isi Cerita */}
            <div className="space-y-1.5">
              <label htmlFor="content" className="block text-xs font-semibold text-gray-600 pl-1">
                Isi Cerita
              </label>
              <textarea
                id="content"
                rows={6}
                placeholder="Tuliskan cerita, keluh kesah, atau momen berharga hari ini..."
                className="w-full px-4 py-3 rounded-2xl bg-pink-50/30 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#A294C2]/50 text-sm text-gray-700 placeholder-gray-400 resize-none transition-all"
                required
              />
            </div>

            {/* Lampiran Foto / Attachment */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600 pl-1">
                Lampiran / Foto <span className="text-gray-400 font-normal">(opsional)</span>
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-pink-50 hover:bg-pink-100/70 border border-pink-100 text-xs font-medium text-pink-700 transition-all">
                  <span>📎</span> {selectedFile ? 'Ganti Foto' : 'Pilih Foto'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                </label>
                {selectedFile && (
                  <span className="text-xs text-gray-500 truncate max-w-xs">
                    {selectedFile.name}
                  </span>
                )}
              </div>
            </div>

            {/* Actions: Simpan & Batal */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <Link
                href="/diary"
                className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium transition-all"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-[#A294C2] hover:bg-[#8F80B3] text-white text-xs font-medium transition-all shadow-sm hover:shadow active:scale-95"
              >
                Simpan Cerita
              </button>
            </div>

          </form>
        </section>

      </main>
    </div>
  );
}