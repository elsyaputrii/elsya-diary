'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import { apiClient } from '@/services/api';
import { Diary } from '@/types';
import Link from 'next/link';
import { BookOpen, PlusCircle, Search, Filter, Trash2, Calendar } from 'lucide-react';

export default function DiaryListPage() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchDiaries = async () => {
      try {
        const res = await apiClient.get('/diaries');
        const data = res.data.data?.data || res.data.data || [];
        if (!cancelled) setDiaries(data);
      } catch (err) {
        console.error('Gagal mengambil daftar diary:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDiaries();

    return () => {
      cancelled = true;
    };
  }, []);

  // Hasil filter dihitung langsung, tanpa state tambahan
  const filteredDiaries = useMemo(() => {
    let result = diaries;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.content.toLowerCase().includes(q)
      );
    }
    if (selectedMood !== 'all') {
      result = result.filter((d) => d.mood === selectedMood);
    }
    return result;
  }, [searchQuery, selectedMood, diaries]);

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm('Apakah kamu yakin ingin menghapus catatan diary ini?')) return;

    try {
      await apiClient.delete(`/diaries/${id}`);
      setDiaries((prev) => prev.filter((d) => d.id !== id));
    } catch {
      alert('Gagal menghapus diary.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#5A4D41]">Semua Catatan Diary</h1>
            <p className="text-sm text-[#8C7A6B]">Arsip lengkap cerita dan perjalanan emosimu.</p>
          </div>
          <Link
            href="/diary/create"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#7D5A50] hover:bg-[#684940] text-white font-medium rounded-2xl shadow-md transition"
          >
            <PlusCircle className="w-5 h-5" /> Tulis Baru
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-4 md:p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A89888]">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul atau isi catatan..."
              className="w-full pl-12 pr-4 py-2.5 bg-[#F9F6F0] border border-[#EBE0D5] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A7A7]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 text-[#8C7A6B] shrink-0" />
            {['all', 'happy', 'calm', 'sad', 'anxious', 'excited', 'reflective'].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMood(m)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize shrink-0 transition ${
                  selectedMood === m
                    ? 'bg-[#7D5A50] text-white shadow-xs'
                    : 'bg-[#F7F0EB] text-[#7A6B5D] hover:bg-[#EFE5DC]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Content List */}
        {loading ? (
          <div className="text-center py-20 text-[#8C7A6B]">Memuat daftar diary...</div>
        ) : filteredDiaries.length === 0 ? (
          <div className="bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-12 text-center">
            <BookOpen className="w-12 h-12 text-[#D8A7A7] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#5A4D41] mb-1">Tidak ada catatan ditemukan</h3>
            <p className="text-sm text-[#8C7A6B] mb-4">Coba ubah kata kunci pencarian atau filter mood.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDiaries.map((diary) => (
              <div
                key={diary.id}
                className="bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-6 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-3 py-1 bg-[#F7EBE8] text-[#7D5A50] rounded-full font-medium capitalize">
                      {diary.mood}
                    </span>
                    <span className="text-xs text-[#A89888] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {diary.entry_date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#5A4D41] mb-2">{diary.title}</h3>
                  <p className="text-sm text-[#7A6B5D] line-clamp-3 mb-6">{diary.content}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#F5EBE6]">
                  <Link
                    href={`/diary/${diary.id}`}
                    className="text-xs font-bold text-[#7D5A50] hover:underline"
                  >
                    Baca Selengkapnya &rarr;
                  </Link>
                  <button
                    onClick={(e) => handleDelete(diary.id, e)}
                    className="text-[#B96D6D] hover:bg-[#FDF2F2] p-2 rounded-xl transition"
                    title="Hapus Diary"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}