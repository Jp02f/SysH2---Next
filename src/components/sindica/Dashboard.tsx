'use client'
import Header from '../Header';
import { UserPlus, Users, FileText, Building } from 'lucide-react';
import LogoIcon from '../logoicon';

export default function DashboardSindica() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Header />
      
      <main className="relative z-10 flex-1 w-full max-w-[1200px] mx-auto p-8">
        <div className="animate-fadeIn">
          {/* Bloco de Boas-Vindas */}
          <div className="flex items-center gap-4 mb-10">
            <Building size={56} className="text-[#4B0082]" />
            <div>  
              <h1 className="text-4xl font-black text-[#4B0082]">Olá, Síndico(a)!</h1>
              <p className="text-[#3A1067] font-medium text-lg">Navegue pelos módulos abaixo para acessar suas funcionalidades.</p>
              </div>
            </div>

          {/* Grid de Botões Principais */}
          <div className="flex flex-col gap-6">
            {/* Botão 1: Porteiros */}
            <button className="group flex items-center gap-8 bg-white/65 p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-zinc-100 text-left">
              <UserPlus size={56} className="text-[#4B0082] group-hover:scale-110 transition-transform" />
              <div>
                <h2 className="text-2xl font-bold text-[#4B0082]">Gerenciar Porteiros</h2>
                <p className="text-[#3A1067]">Cadastre, edite ou inative os porteiros do condomínio.</p>
              </div>
            </button>

            {/* Botão 2: Moradores */}
            <button className="group flex items-center gap-8 bg-white/65 p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-zinc-100 text-left">
              <Users size={56} className="text-[#4B0082] group-hover:scale-110 transition-transform" />
              <div>
                <h2 className="text-2xl font-bold text-[#4B0082]">Gerenciar Moradores</h2>
                <p className="text-[#3A1067]">Gerencie perfis e valide o cadastro de novos moradores.</p>
              </div>
            </button>

            {/* Botão 3: Relatórios */}
            <button className="group flex items-center gap-8 bg-white/65 p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-zinc-100 text-left">
              <FileText size={56} className="text-[#4B0082] group-hover:scale-110 transition-transform" />
              <div>
                <h2 className="text-2xl font-bold text-[#4B0082]">Relatórios</h2>
                <p className="text-[#3A1067]">Acesse todo o registro de encomendas.</p>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Marca d'água no fundo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-[50%] -translate-y-1/2 opacity-[0.10]">
          <LogoIcon className="w-[600px] h-auto" />
        </div>
      </div>
    </div>
  );
}