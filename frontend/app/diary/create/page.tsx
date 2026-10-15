'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { apiClient } from '@/services/api';
import { MoodType } from '@/types';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import Link from 'next/link';

const moods: { type: MoodType; label: string; emoji: string }[] = [
  { type: 'happy', label: 'Happy', emoji: '😊' },
  { type: 'calm', label: 'Calm', emoji: '🌿' },
  { type: 'sad', label: 'Sad', emoji: '💧' },
  { type: 'anxious', label: 'Anxious', emoji: '💭' },
  { type: 'excited', label: 'Excited', emoji: '✨' },
  { type: 'reflective', label: 'Reflective', emoji: '🌙' },
];

export default function CreateDiaryPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodType>('happy');
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Judul dan isi catatan diary wajib diisi.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiClient.post('/diaries', {
        title,
        content,
        mood,
        entry_date: entryDate,
      });
      router.push('/diary');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal menyimpan diary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="mb-6">
          <Link href="/diary" className="inline-flex items-center gap-2 text-sm text-[#7A6B5D] hover:text-[#5A4D41] mb-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Diary
          </Link>
          <h1 className="text-2xl font-bold text-[#5A4D41]">Tulis Catatan Baru</h1>
          <p className="text-sm text-[#8C7A6B]">Abadikan momen dan perasaanmu hari ini.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FDF2F2] border border-[#F2D6D6] text-[#B96D6D] text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] mb-2">Judul Catatan</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Hari yang penuh ketenangan di kafe..."
              required
              className="w-full px-4 py-3 bg-[#F9F6F0] border border-[#EBE0D5] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A7A7]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] mb-2">Tanggal</label>
              <input
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F9F6F0] border border-[#EBE0D5] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A7A7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] mb-2">Pilih Suasana Hati (Mood)</label>
              <div className="grid grid-cols-3 gap-2">
                {moods.map((m) => (
                  <button
                    type="button"
                    key={m.type}
                    onClick={() => setMood(m.type)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl text-xs font-semibold capitalize transition border ${
                      mood === m.type
                        ? 'bg-[#7D5A50] text-white border-[#7D5A50] shadow-xs'
                        : 'bg-[#F9F6F0] text-[#7A6B5D] border-[#EBE0D5] hover:bg-[#F2ECE4]'
                    }`}
                  >
                    <span>{m.emoji}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] mb-2">Isi Catatan</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder="Ceritakan harimu di sini..."
              required
              className="w-full px-4 py-3 bg-[#F9F6F0] border border-[#EBE0D5] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A7A7]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#F5EBE6]">
            <Link
              href="/diary"
              className="px-6 py-3 bg-[#F7F0EB] text-[#7A6B5D] font-medium rounded-2xl text-sm hover:bg-[#EFE5DC] transition"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#7D5A50] hover:bg-[#684940] text-white font-medium rounded-2xl text-sm shadow-md transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {loading ? 'Menyimpan...' : 'Simpan Catatan'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}