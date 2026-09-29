import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F6] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-sm border border-pink-100 space-y-6 relative">
        
        {/* Tombol Kembali ke Homepage */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-pink-500 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Beranda
        </Link>

        <div className="text-center space-y-2">
          <span className="text-3xl">🌷</span>
          <h1 className="text-2xl font-bold text-gray-800">Masuk ke Elsya's Diary</h1>
          <p className="text-xs text-gray-400">Masukkan akunmu untuk membuka cerita pribadi</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 block">Username</label>
            <input 
              type="text" 
              placeholder="elsya089" 
              defaultValue="elsya089"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-gray-50/50" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 block">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              defaultValue="12345678"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-gray-50/50" 
            />
          </div>

          {/* Tombol Login langsung mengarahkan ke halaman /diary */}
          <Link
            href="/diary"
            className="w-full py-3 bg-linear-to-r from-pink-400 to-rose-400 text-white font-medium text-sm rounded-xl shadow-sm hover:from-pink-500 hover:to-rose-500 transition-all flex items-center justify-center gap-2"
          >
            Masuk Sekarang ➔
          </Link>
        </form>

      </div>
    </div>
  );
}