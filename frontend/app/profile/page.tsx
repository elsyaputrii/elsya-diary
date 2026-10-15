'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { apiClient } from '@/services/api';
import { User as UserIcon, Mail, Save, Sparkles, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      try {
        const res = await apiClient.get('/user');
        const data = res.data.data || res.data;
        if (cancelled) return;
        setName(data.name);
        setEmail(data.email);
      } catch (err) {
        console.error('Gagal mengambil profil:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setError('');

    try {
      const res = await apiClient.put('/user/profile', { name, email });
      const data = res.data.data || res.data;
      setName(data.name ?? name);
      setEmail(data.email ?? email);
      setSuccessMessage('Profil berhasil diperbarui.');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || 'Gagal memperbarui profil.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7EBE8] text-[#7D5A50] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Account Settings
          </span>
          <h1 className="text-2xl font-bold text-[#5A4D41]">Profil Pengguna</h1>
          <p className="text-sm text-[#8C7A6B]">Kelola informasi akun pribadi Elsya&apos;s Diary.</p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-[#EFF6EE] border border-[#D4E8D1] text-[#4A7C43] text-sm flex items-center gap-3">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FDF2F2] border border-[#F2D6D6] text-[#B96D6D] text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-[#8C7A6B]">Memuat profil...</div>
        ) : (
          <form onSubmit={handleUpdate} className="bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] mb-2">Nama Lengkap</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A89888]">
                  <UserIcon className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#F9F6F0] border border-[#EBE0D5] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A7A7]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A89888]">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#F9F6F0] border border-[#EBE0D5] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A7A7]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5EBE6] flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#7D5A50] hover:bg-[#684940] text-white font-medium rounded-2xl text-sm shadow-md transition"
              >
                <Save className="w-4 h-4" /> Simpan Perubahan
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}