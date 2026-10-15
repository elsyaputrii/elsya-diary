'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { apiClient } from '@/services/api';
import { Diary } from '@/types';
import Link from 'next/link';
import { BookOpen, PlusCircle, Sparkles, Smile, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentDiaries();
  }, []);

  const fetchRecentDiaries = async () => {
    try {
      const res = await apiClient.get('/diaries');
      const data = res.data.data?.data || res.data.data || [];
      setDiaries(data.slice(0, 3));
    } catch (err) {
      console.error('Gagal mengambil data diary:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#F7EBE8] to-[#F3E2DC] rounded-3xl p-8 md:p-12 mb-10 border border-[#EBD6D0] shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#7D5A50] text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Elsya's Personal Sanctuary
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#5A4D41] mb-3">
              Catat setiap cerita, emosi, dan kenangan indahmu hari ini.
            </h1>
            <p className="text-[#7A6B5D] text-sm md:text-base mb-6">
              Tempat aman untuk merenung, melacak suasana hati, dan merekam perjalanan hidupmu dengan gaya minimalis dan elegan.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/diary/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#7D5A50] hover:bg-[#684940] text-white font-medium rounded-2xl shadow-md transition"
              >
                <PlusCircle className="w-5 h-5" /> Tulis Diary Baru
              </Link>
              <Link
                href="/diary"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 hover:bg-white text-[#7D5A50] font-medium rounded-2xl border border-[#E5D5CE] transition"
              >
                Lihat Semua Catatan <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Highlights / Recent Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#5A4D41] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#7D5A50]" /> Catatan Terbaru
            </h2>
            <Link href="/diary" className="text-sm font-semibold text-[#B96D6D] hover:underline">
              Lihat Semua &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-[#8C7A6B]">Memuat catatan...</div>
          ) : diaries.length === 0 ? (
            <div className="bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-12 text-center">
              <p className="text-[#8C7A6B] mb-4">Belum ada catatan diary yang tersimpan.</p>
              <Link
                href="/diary/create"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7D5A50] text-white rounded-2xl text-sm font-medium"
              >
                Buat Catatan Pertama
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {diaries.map((diary) => (
                <Link
                  key={diary.id}
                  href={`/diary/${diary.id}`}
                  className="bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-6 hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-3 py-1 bg-[#F7EBE8] text-[#7D5A50] rounded-full font-medium capitalize">
                        {diary.mood}
                      </span>
                      <span className="text-xs text-[#A89888]">{diary.entry_date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#5A4D41] group-hover:text-[#7D5A50] transition mb-2 line-clamp-1">
                      {diary.title}
                    </h3>
                    <p className="text-sm text-[#7A6B5D] line-clamp-3 mb-4">
                      {diary.content}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#B96D6D] flex items-center gap-1">
                    Baca selengkapnya &rarr;
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}