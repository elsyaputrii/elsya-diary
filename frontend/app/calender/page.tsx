'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { apiClient } from '@/services/api';
import { Diary } from '@/types';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPage() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    let cancelled = false;

    const fetchDiaries = async () => {
      try {
        const res = await apiClient.get('/diaries');
        const data = res.data.data?.data || res.data.data || [];
        if (!cancelled) setDiaries(data);
      } catch (err) {
        console.error('Gagal mengambil data kalender diary:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDiaries();

    return () => {
      cancelled = true;
    };
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Map diaries by date string YYYY-MM-DD
  const diaryMap: Record<string, Diary> = {};
  diaries.forEach((d) => {
    diaryMap[d.entry_date] = d;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#5A4D41]">Kalender Diary</h1>
            <p className="text-sm text-[#8C7A6B]">Telusuri catatan berdasarkan tanggal penulisan.</p>
          </div>
          <div className="flex items-center gap-2 bg-[#FFFDF9] border border-[#F0E6DD] rounded-2xl p-1 shadow-xs">
            <button onClick={prevMonth} className="p-2 hover:bg-[#F7F0EB] rounded-xl text-[#7D5A50] transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-4 text-sm font-bold text-[#5A4D41]">
              {monthNames[month]} {year}
            </span>
            <button onClick={nextMonth} className="p-2 hover:bg-[#F7F0EB] rounded-xl text-[#7D5A50] transition">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#8C7A6B]">Memuat kalender...</div>
        ) : (
          <div className="bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-6 shadow-xs">
            <div className="grid grid-cols-7 gap-2 mb-4 text-center font-semibold text-xs text-[#8C7A6B] uppercase">
              <span>Min</span>
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-24 bg-transparent"></div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const formattedMonth = String(month + 1).padStart(2, '0');
                const formattedDay = String(day).padStart(2, '0');
                const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
                const diary = diaryMap[dateStr];

                return (
                  <div
                    key={dateStr}
                    className={`h-24 p-2 rounded-2xl border flex flex-col justify-between transition ${
                      diary
                        ? 'bg-[#F7EBE8]/50 border-[#EBD6D0] hover:bg-[#F7EBE8]'
                        : 'bg-[#F9F6F0] border-[#EBE0D5]'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#5A4D41]">{day}</span>
                    {diary ? (
                      <Link href={`/diary/${diary.id}`} className="block overflow-hidden">
                        <span className="text-[10px] font-semibold text-[#7D5A50] block truncate">
                          {diary.title}
                        </span>
                        <span className="text-[9px] text-[#A89888] capitalize block">{diary.mood}</span>
                      </Link>
                    ) : (
                      <span className="text-[10px] text-[#C4B8A8]">-</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}