'use client'
import Link from 'next/link';
import { Bell, MoonStar, UserCircle, Power } from 'lucide-react';
import Logo from './logo';

export default function Header({ homeHref = '/' }: { homeHref?: string }) {
  return (
    <header className="w-full bg-white border-b border-zinc-100 px-8 py-1 lg:py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <Link href={homeHref} >
          <Logo className="h-10 w-auto" />
        </Link>
      </div>

      <div className="flex items-center gap-6 text-zinc-400">
        <div className="flex items-center gap-4 border-r pr-6 border-zinc-200">
          <button className="relative flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-zinc-800">
            <Bell size={20} className="lg:w-6 lg:h-6 w-4 h-4" />
            <span className="absolute top-0 right-0 w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full border-2 border-white" />
            </button>
          <button className="relative flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-zinc-800">
            <MoonStar size={20} className="lg:w-6 lg:h-6 w-4 h-4" />
            </button>
        </div>
        <div className="flex items-center gap-3">
          <UserCircle size={40} className="text-[#4B0082] flex-shrink-0 lg:w-10 lg:h-10 w-7 h-7" />
          <div className="flex flex-col items-center text-center">
            <p className="text-sm lg:text-base font-black text-zinc-800 leading-tight">CLEIDE SILVA</p>
            <button className="text-xs font-semibold text-zinc-500 hover:text-[#4B0082] underline leading-none mt-0.5">
              Alterar Senha
              </button>
          </div>
          <Power size={24} className="text-red-500 ml-2 lg:w-6 lg:h-6 w-4 h-4" />
        </div>
      </div>
    </header>
  );
}