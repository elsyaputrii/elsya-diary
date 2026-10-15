'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { apiClient } from '@/services/api';
import { Diary, MoodType } from '@/types';
import Link from 'next/link';
import { ArrowLeft, Calendar, Edit3, Trash2, Save, X } from 'lucide-react';

const moods: { type: MoodType; label: string; emoji: string }[] = [
  { type: 'happy', label: 'Happy', emoji: '😊' },
  { type: 'calm', label: 'Calm', emoji: '🌿' },
  { type: 'sad', label: 'Sad', emoji: '💧' },
  { type: 'anxious', label: 'Anxious', emoji: '💭' },
  { type: 'excited', label: 'Excited', emoji: '✨' },
  { type: 'reflective', label: 'Reflective', emoji: '🌙' },
];

export default function DiaryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [diary, setDiary] = useState<Diary | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Edit form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodType>('happy');
  const [entryDate, setEntryDate] = useState('');

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchDiaryDetail = async () => {
      try {
        const res = await apiClient.get(`/diaries/${id}`);
        const data = res.data.data;
        if (cancelled) return;
        setDiary(data);
        setTitle(data.title);
        setContent(data.content);
        setMood(data.mood);
        setEntryDate(data.entry_date);
      } catch (error) {
        console.error('Gagal mengambil detail diary:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDiaryDetail();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.put(`/diaries/${id}`, {
        title,
        content,
        mood,
        entry_date: entryDate,
      });
      setDiary(res.data.data);
      setIsEditing(false);
    } catch {
      alert('Gagal memperbarui diary.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Apakah kamu yakin ingin menghapus catatan ini?')) return;
    try {
      await apiClient.delete(`/diaries/${id}`);
      router.push('/diary');
    } catch {
      alert('Gagal menghapus diary.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-[#8C7A6B]">Memuat detail catatan...</div>
      </div>
    );
  }

  if (!diary) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-[#8C7A6B] mb-4">Catatan diary tidak ditemukan.</p>
          <Link href="/diary" className="px-5 py-2.5 bg-[#7D5A50] text-white rounded-2xl text-sm">
            Kembali ke Daftar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <Link href="/diary" className="inline-flex items-center gap-2 text-sm text-[#7A6B5D] hover:text-[#5A4D41]">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
          {!isEditing && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F7F0EB] text-[#7D5A50] hover:bg-[#EFE5DC] rounded-xl text-xs font-semibold transition"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FDF2F2] text-[#B96D6D] hover:bg-[#FBE8E8] rounded-xl text-xs font-semibold transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Hapus
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#F5EBE6] pb-4">
              <h2 className="text-xl font-bold text-[#5A4D41]">Edit Catatan Diary</h2>
              <button type="button" onClick={() => setIsEditing(false)} className="text-[#8C7A6B] hover:text-[#5A4D41]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] mb-2">Judul</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] mb-2">Mood</label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value as MoodType)}
                  className="w-full px-4 py-3 bg-[#F9F6F0] border border-[#EBE0D5] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A7A7] capitalize"
                >
                  {moods.map((m) => (
                    <option key={m.type} value={m.type}>
                      {m.emoji} {m.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] mb-2">Isi Catatan</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                required
                className="w-full px-4 py-3 bg-[#F9F6F0] border border-[#EBE0D5] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A7A7]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#F5EBE6]">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-[#F7F0EB] text-[#7A6B5D] font-medium rounded-2xl text-sm hover:bg-[#EFE5DC] transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#7D5A50] hover:bg-[#684940] text-white font-medium rounded-2xl text-sm shadow-md transition"
              >
                <Save className="w-4 h-4" /> Simpan Perubahan
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#F5EBE6] pb-4">
              <span className="px-3.5 py-1 bg-[#F7EBE8] text-[#7D5A50] rounded-full text-xs font-semibold capitalize">
                {diary.mood}
              </span>
              <span className="text-xs text-[#8C7A6B] flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {diary.entry_date}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-[#5A4D41]">{diary.title}</h1>

            <div className="prose text-[#7A6B5D] text-base leading-relaxed whitespace-pre-wrap pt-2">
              {diary.content}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}