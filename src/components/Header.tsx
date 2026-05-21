'use client'
import { Bell, MoonStar, UserCircle, Power } from 'lucide-react';
import Logo from './logo';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-zinc-100 px-8 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <Logo className="h-10 w-auto" />
        </div>

      <div className="flex items-center gap-6 text-zinc-400">
        <div className="flex items-center gap-4 border-r pr-6 border-zinc-200">
          <button className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-zinc-800">
            <Bell size={24} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </button>
          <button className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-zinc-800">
            <MoonStar size={24} />
            </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-black text-zinc-800 leading-none">CLEIDE SILVA</p>
          </div>
          <UserCircle size={32} className="text-[#4B0082]" />
          <Power size={24} className="text-red-500 ml-2" />
        </div>
      </div>
    </header>
  );
}