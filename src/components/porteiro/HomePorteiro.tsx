'use client'
import Header from '../Header';
import { UserPlus, Users, FileText, Building } from 'lucide-react';
import Link from 'next/link';
import { Roboto_Flex } from 'next/font/google';

const robotoFlex = Roboto_Flex({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function HomePorteiro() {
  return (
    <div className="h-screen bg-[#F8F9FA] flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 px-6 pb-6 pt-4 z-10 flex flex-col overflow-hidden">
        
        <div className="border border-zinc-300 rounded-[2.5rem] p-4 lg:p-10 w-full h-full flex flex-col bg-transparent">
          {/* Bloco de Boas-Vindas */}
          <div className="flex items-center gap-4 mb-4 lg:mb-10">
            <div className={robotoFlex.className}>  
              <h1 className="text-2xl lg:text-4xl font-black text-[#741582]">Bipe o Código de Rastreio</h1>
              <p className="text-2xl lg:text-4xl font-black text-[#741582]">e Preencha os Dados Abaixo</p>
            </div>
          </div>

          {/*Formulario*/}
          <div className="flex flex-col gap-1 flex-1 min-w-[250px]">
            <label className="text-sm font-bold text-zinc-700 uppercase">
                Código de Rastreio
            </label>
            <input
              type="text"
              placeholder=""
              className="border border-zinc-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#741582] bg-white"
            />
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-[250px]">
            <label className="text-sm font-bold text-zinc-700 uppercase">
                Bloco
            </label>
            <select
              className="border border-zinc-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#741582] bg-white">
                <option value="">A</option>
                <option value="">B</option>
                <option value="">C</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-[250px]">
            <label className="text-sm font-bold text-zinc-700 uppercase">
                Apartamento
            </label>
            <select
              className="border border-zinc-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#741582] bg-white">
                <option value="">A</option>
                <option value="">B</option>
                <option value="">C</option>
            </select>
          </div>

        </div> 

      </main> 
      
    </div> 
  );
}