'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  // State untuk kontrol modal Ubah Password
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // State dummy untuk form ubah password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle submit form ubah password (dummy)
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Konfirmasi password tidak cocok!');
      return;
    }
    alert('Password berhasil diperbarui (dummy)!');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsPasswordModalOpen(false);
  };

  // Handle logout (dummy)
  const handleLogout = () => {
    alert('Anda berhasil keluar dari akun.');
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
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Cerita Saya
            </Link>
            <Link 
              href="/calendar" 
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Kalender
            </Link>
            <Link 
              href="/mood" 
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Statistik Mood
            </Link>
            <Link 
              href="/profile" 
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-pink-100/70 text-pink-700 font-medium transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profil
            </Link>
          </nav>
        </div>

        <div className="hidden md:block p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 text-center border border-pink-100">
          <p className="text-xs italic text-gray-500">"Setiap hari adalah cerita baru."</p>
          <span className="text-pink-400 text-xs mt-1 block">♡</span>
        </div>
      </aside>

      {/* Main Content Profile */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto space-y-8">
        
        {/* Header Halaman */}
        <div className="border-b border-pink-100/80 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            Profil Saya 👤
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola informasi akun dan kata sandi milikmu.
          </p>
        </div>

        {/* Card Profil Utama */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-pink-100/70 space-y-8">
          
          {/* Avatar & Header Profil */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-pink-200 via-purple-200 to-rose-200 flex items-center justify-center text-4xl shadow-md border-4 border-white">
                🌸
              </div>
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full"></span>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-bold text-gray-800">Elsya</h2>
              <p className="text-sm font-medium text-pink-500">@elsya089</p>
              <span className="inline-block px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-semibold mt-2 border border-pink-100">
                Diary Writer
              </span>
            </div>
          </div>

          {/* Informasi Singkat */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-pink-400">
              Informasi Singkat
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-pink-100/60 space-y-1">
                <span className="text-xs text-gray-400">Nama Lengkap</span>
                <p className="text-sm font-semibold text-gray-700">Elsya</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-pink-100/60 space-y-1">
                <span className="text-xs text-gray-400">Username</span>
                <p className="text-sm font-semibold text-gray-700">@elsya089</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-pink-100/60 space-y-1">
                <span className="text-xs text-gray-400">Bio</span>
                <p className="text-sm font-medium text-gray-600 leading-relaxed">
                  Mahasiswa yang hobi mencatat momen harian, refleksi diri, dan melatih kreativitas lewat coding. ✨
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-pink-100/60 space-y-1">
                <span className="text-xs text-gray-400">Bergabung Sejak</span>
                <p className="text-sm font-semibold text-gray-700">Oktober 2025</p>
              </div>
            </div>
          </div>

          {/* Tombol Aksi (Ubah Password & Logout) */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="w-full sm:w-auto px-6 py-2.5 bg-pink-100/80 hover:bg-pink-200 text-pink-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Ubah Password
            </button>

            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 border border-red-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>

        </section>

      </main>

      {/* Modal / Form Ubah Password */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl border border-pink-100 space-y-6 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                🔒 Ubah Password
              </h3>
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-full p-1 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 block">
                  Password Lama
                </label>
                <input
                  type="password"
                  required
                  placeholder="Masukkan password lama"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-gray-50/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 block">
                  Password Baru
                </label>
                <input
                  type="password"
                  required
                  placeholder="Masukkan password baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-gray-50/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 block">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  required
                  placeholder="Ulangi password baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-gray-50/50"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 shadow-sm transition-all"
                >
                  Simpan
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}