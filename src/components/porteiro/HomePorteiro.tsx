'use client'
import Header from '../Header';
import { UserPlus, Users, FileText, Building } from 'lucide-react';
import Link from 'next/link';

export default function HomePorteiro() {
  return (
    <div className="h-screen bg-[#F8F9FA] flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 px-6 pb-6 pt-4 z-10 flex flex-col overflow-hidden">
        
        <div className="border border-zinc-300 rounded-[2.5rem] p-4 lg:p-10 w-full h-full flex flex-col bg-transparent">
          {/* Bloco de Boas-Vindas */}
          <div className="flex items-center gap-4 mb-4 lg:mb-10">
            <Building size={56} className="text-[#741582] lg:w-14 lg:h-14 w-8 h-8" />
            <div>  
              <h1 className="text-2xl lg:text-4xl font-black text-[#741582]">Olá, Síndico(a)!</h1>
              <p className="text-[#3A1067] font-medium text-sm lg:text-lg">Navegue pelos módulos abaixo para acessar suas funcionalidades.</p>
            </div>
          </div>
          
        </div> {/* Fecha a div do border-zinc-300 */}
      </main> {/* Fecha o main */}
      
    </div> {/* Fecha a div principal container */}
  );
}