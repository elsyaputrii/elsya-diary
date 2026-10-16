'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, Calendar, Home, Smile, User, LogOut } from 'lucide-react';
import { apiClient } from '@/services/api';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiClient.post('/logout');
    } catch (e) {
      console.error(e);
    } finally {
      sessionStorage.removeItem('auth_token');
      router.push('/login');
    }
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Diaries', href: '/diary', icon: BookOpen },
    { name: 'Mood Tracker', href: '/mood', icon: Smile },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-[#F0E6DD] shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[#7D5A50] tracking-tight hover:opacity-80 transition">
          ✨ Elsya Diary
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#EFC3C3]/40 text-[#6B443D] shadow-xs'
                    : 'text-[#6D5D53] hover:bg-[#F7F0EB]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#B96D6D] hover:bg-[#FDF2F2] transition border border-[#F2D6D6]"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FFFDF9] border-t border-[#F0E6DD] px-4 py-2 flex justify-around items-center z-50 shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-xl text-xs font-medium transition ${
                isActive ? 'text-[#7D5A50] font-bold' : 'text-[#8C7A6B]'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}