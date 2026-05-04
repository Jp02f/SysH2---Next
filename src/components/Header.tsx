'use client'
import { Bell, Moon, UserCircle, Power } from 'lucide-react';
import Logo from './logo';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-zinc-100 px-8 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <Logo className="h-10 w-auto" />
        </div>

      <div className="flex items-center gap-6 text-zinc-400">
        <div className="flex items-center gap-4 border-r pr-6 border-zinc-200">
          <button><Bell size={24} /></button>
          <button><Moon size={24} /></button>
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