import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function NewDiaryPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F6] text-gray-700 font-sans flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto space-y-6">
        {/* Navigation back */}
        <div>
          <Link 
            href="/diary" 
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-pink-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Cerita Saya
          </Link>
        </div>

        <div className="border-b border-pink-100 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tulis Cerita Baru ✍️</h1>
          <p className="text-sm text-gray-500 mt-1">Bagikan apa yang kamu rasakan hari ini.</p>
        </div>

        <form className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100/70 space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 block">Judul Cerita</label>
            <input 
              type="text" 
              placeholder="Contoh: Hari Pertama Magang..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-gray-50/50" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 block">Pilih Mood Hari Ini</label>
            <div className="flex gap-3 text-2xl">
              {['😊', '😍', '😌', '😔', '😡', '😴'].map((emoji) => (
                <button 
                  key={emoji} 
                  type="button" 
                  className="p-2.5 rounded-xl border border-gray-100 hover:bg-pink-50 transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 block">Isi Cerita</label>
            <textarea 
              rows={6}
              placeholder="Tuliskan semua momen dan refleksi harimu di sini..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-gray-50/50" 
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Link 
              href="/diary" 
              className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-all"
            >
              Batal
            </Link>
            <Link 
              href="/diary" 
              className="px-6 py-2.5 bg-linear-to-r from-pink-400 to-rose-400 text-white font-medium text-sm rounded-xl shadow-sm hover:from-pink-500 hover:to-rose-500 transition-all"
            >
              Simpan Cerita
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}