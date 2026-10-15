'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { apiClient } from '@/services/api';
import { Diary, MoodStats, MoodType } from '@/types';
import { Smile, Sparkles, BarChart2 } from 'lucide-react';

export default function MoodTrackerPage() {
  const [stats, setStats] = useState<MoodStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchMoodStats = async () => {
      try {
        const res = await apiClient.get('/diaries');
        const diaries: Diary[] = res.data.data?.data || res.data.data || [];

        const total = diaries.length;
        const counts: Record<string, number> = {};

        diaries.forEach((d) => {
          counts[d.mood] = (counts[d.mood] || 0) + 1;
        });

        const calculated: MoodStats[] = Object.keys(counts).map((mood) => ({
          mood: mood as MoodType,
          count: counts[mood],
          percentage: total > 0 ? Math.round((counts[mood] / total) * 100) : 0,
        }));

        if (!cancelled) setStats(calculated);
      } catch (err) {
        console.error('Gagal mengambil statistik mood:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMoodStats();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7EBE8] text-[#7D5A50] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Emotional Well-being
          </span>
          <h1 className="text-2xl font-bold text-[#5A4D41]">Mood Tracker & Statistik</h1>
          <p className="text-sm text-[#8C7A6B]">Analisis suasana hati berdasarkan catatan diary harianmu.</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#8C7A6B]">Menghitung statistik mood...</div>
        ) : stats.length === 0 ? (
          <div className="bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-12 text-center">
            <Smile className="w-12 h-12 text-[#D8A7A7] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#5A4D41] mb-1">Belum ada data mood</h3>
            <p className="text-sm text-[#8C7A6B]">Mulai tulis diary dengan memilih mood harianmu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-[#5A4D41] flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-[#7D5A50]" /> Distribusi Suasana Hati
              </h3>

              <div className="space-y-4">
                {stats.map((item) => (
                  <div key={item.mood} className="space-y-1.5">
                    <div className="flex justify-between text-sm font-semibold text-[#5A4D41] capitalize">
                      <span>{item.mood}</span>
                      <span>{item.count} catatan ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-[#F5EBE6] rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-[#7D5A50] h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}