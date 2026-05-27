'use client'
import Header from '../Header';
import { UserPlus, Users, FileText, Building } from 'lucide-react';
import LogoIcon from '../logoicon';
import Link from 'next/link';

export default function HomeSindica() {
  return (
    <div className="h-screen bg-[#F8F9FA] flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 px-6 pb-6 pt-4 z-10 flex flex-col overflow-hidden">

        
        <div className="border border-zinc-300 rounded-[2.5rem] p-4 lg:p-10 w-full h-full flex flex-col bg-transparent">
          {/* Bloco de Boas-Vindas */}
          <div className="flex items-center gap-4 mb-4 lg:mb-10">
            <Building size={56} className="text-[#4B0082] lg:w-14 lg:h-14 w-8 h-8" />
            <div>  
              <h1 className="text-2xl lg:text-4xl font-black text-[#4B0082]">Olá, Síndico(a)!</h1>
              <p className="text-[#3A1067] font-medium text-sm lg:text-lg">Navegue pelos módulos abaixo para acessar suas funcionalidades.</p>
              </div>
            </div>

          {/* Grid de Botões Principais */}
          <div className="flex flex-col gap-2 lg:gap-4">
            {/* Botão 1: Porteiros */}
            <Link href="/sindica/gerenciarporteiros" className="group flex items-center gap-4 lg:gap-6 bg-white/65 p-4 lg:p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-zinc-100 text-left">
              <UserPlus size={56} className="text-[#4B0082] group-hover:scale-110 transition-transform shrink-0 lg:w-14 lg:h-14 w-8 h-8" />
              <div>
                <h2 className="text-base lg:text-2xl font-bold text-[#4B0082]">Gerenciar Porteiros</h2>
                <p className="text-[#3A1067] text-sm lg:text-base">Cadastre, edite ou inative os porteiros do condomínio.</p>
              </div>
            </Link>

            {/* Botão 2: Moradores */}
            <Link href="/sindica/gerenciarmoradores" className="group flex items-center gap-4 lg:gap-6 bg-white/65 p-4 lg:p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-zinc-100 text-left">
              <Users size={56} className="text-[#4B0082] group-hover:scale-110 transition-transform shrink-0 lg:w-14 lg:h-14 w-8 h-8" />
              <div>
                <h2 className="text-base lg:text-2xl font-bold text-[#4B0082]">Gerenciar Moradores</h2>
                <p className="text-[#3A1067] text-sm lg:text-base">Gerencie os estados dos perfis dos moradores.</p>
              </div>
            </Link>

            {/* Botão 3: Relatórios */}
            <Link href="/sindica/relatorios" className="group flex items-center gap-4 lg:gap-6 bg-white/65 p-4 lg:p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-zinc-100 text-left">
              <FileText size={56} className="text-[#4B0082] group-hover:scale-110 transition-transform shrink-0 lg:w-14 lg:h-14 w-8 h-8" />
              <div>
                <h2 className="text-base lg:text-2xl font-bold text-[#4B0082]">Relatórios</h2>
                <p className="text-[#3A1067] text-sm lg:text-base">Acesse todo o registro de encomendas.</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Marca d'água no fundo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-[50%] -translate-y-1/2 opacity-[0.10]" style={{ width: 'min(600px, 55vh)' }}>
          <LogoIcon className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}