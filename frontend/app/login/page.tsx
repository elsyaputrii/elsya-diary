'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/services/api';
import { Lock, Mail, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post('/login', { email, password });
      const token = response.data.token || response.data.data?.token;

      if (token) {
        sessionStorage.setItem('auth_token', token);
        router.push('/');
      } else {
        setError('Login gagal: Token tidak ditemukan dalam respons server.');
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ||
        'Terjadi kesalahan saat masuk. Periksa kembali kredensial Anda.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-4">
      <div className="max-w-md w-full bg-[#FFFDF9] border border-[#F0E6DD] rounded-3xl p-8 shadow-xl shadow-[#EFE6DC]/50">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#F7EBE8] text-[#7D5A50] mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-[#5A4D41]">Welcome Back to elsya cantik ❤️</h1>
          <p className="text-sm text-[#8C7A6B] mt-1">Silakan masuk untuk menulis dan membaca diary kamu.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FDF2F2] border border-[#F2D6D6] text-[#B96D6D] text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
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
                placeholder="elsya@example.com"
                className="w-full pl-12 pr-4 py-3 bg-[#F9F6F0] border border-[#EBE0D5] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A7A7] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A89888]">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-[#F9F6F0] border border-[#EBE0D5] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A7A7] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#7D5A50] hover:bg-[#684940] text-white font-medium rounded-2xl shadow-md transition disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Masuk ke Diary'}
          </button>
        </form>
      </div>
    </div>
  );
}