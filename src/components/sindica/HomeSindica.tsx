'use client'
import { useState } from 'react';
import Header from '../Header';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { UserPlus, Users, FileText, Building, UserCircle, Bell, ChevronRight } from 'lucide-react';
import LogoIcon from '../logoicon';
import Logo from '../logo';
import Link from 'next/link';
import DrawerPerfil from '../DrawerPerfil';

export default function HomeSindica() {
  const { usuario, carregando } = useAuthGuard();
  const [drawerAberto, setDrawerAberto] = useState(false);

  if (carregando || !usuario) {
    return null;
  }

  const modulos = [
    {
      href: '/sindica/gerenciarporteiros',
      icon: UserPlus,
      titulo: 'Gerenciar Porteiros',
      descricao: 'Cadastre, edite ou inative os porteiros do condomínio.',
    },
    {
      href: '/sindica/gerenciarmoradores',
      icon: Users,
      titulo: 'Gerenciar Moradores',
      descricao: 'Gerencie perfis e valide o cadastro de novos moradores.',
    },
    {
      href: '/sindica/relatorios',
      icon: FileText,
      titulo: 'Relatórios',
      descricao: 'Acesse todo o registro de encomendas.',
    },
  ];

  return (
    <>
      {/* ============ VERSÃO MOBILE ============ */}
      <div className="lg:hidden min-h-screen bg-[#F8F9FA] flex flex-col">

        {/* Header mobile */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-zinc-100">
          <button type="button" onClick={() => setDrawerAberto(true)}>
            <UserCircle size={32} className="text-[#4B0082]" />
          </button>
          <Logo className="h-7 w-auto" />
          <button type="button" className="relative">
            <Bell size={22} className="text-zinc-700" />
          </button>
        </header>

        {/* Card de boas-vindas */}
        <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm border-l-4 border-[#C500E1] p-4 flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-[#C500E1]/10 flex items-center justify-center flex-shrink-0">
            <Building size={24} className="text-[#C500E1]" />
          </div>
          <div>
            <h1 className="text-lg font-black text-[#4B0082]">Olá, Síndico(a)!</h1>
            <p className="text-sm text-zinc-500">
              Navegue pelos módulos abaixo para acessar suas funcionalidades.
            </p>
          </div>
        </div>

        {/* Lista de módulos */}
        <div className="flex-1 px-4 py-4 flex flex-col gap-3">
          {modulos.map((modulo) => {
            const Icone = modulo.icon;
            return (
              <Link
                key={modulo.href}
                href={modulo.href}
                className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#C500E1]/10 flex items-center justify-center flex-shrink-0">
                  <Icone size={22} className="text-[#C500E1]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-sm text-[#4B0082]">{modulo.titulo}</h2>
                  <p className="text-xs text-zinc-500">{modulo.descricao}</p>
                </div>
                <ChevronRight size={20} className="text-[#C500E1] flex-shrink-0" />
              </Link>
            );
          })}
        </div>

        <DrawerPerfil
          aberto={drawerAberto}
          onClose={() => setDrawerAberto(false)}
          usuario={usuario}
        />
      </div>

      {/* ============ VERSÃO DESKTOP ============ */}
      <div className="hidden lg:flex h-screen bg-[#F8F9FA] flex-col overflow-hidden">
        <Header />

        <main className="flex-1 px-6 pb-6 pt-4 z-10 flex flex-col overflow-hidden">

          <div className="border border-zinc-300 rounded-[1.5rem] p-4 lg:p-10 w-full h-full flex flex-col bg-transparent">
            {/* Bloco de Boas-Vindas */}
            <div className="flex items-center gap-4 mb-4 lg:mb-10">
              <Building size={56} className="text-[#741582] lg:w-14 lg:h-14 w-8 h-8" />
              <div>
                <h1 className="text-2xl lg:text-4xl font-black text-[#741582]">Olá, Síndico(a)!</h1>
                <p className="text-[#3A1067] font-medium text-sm lg:text-lg">Navegue pelos módulos abaixo para acessar suas funcionalidades.</p>
              </div>
            </div>

            {/* Grid de Botões Principais */}
            <div className="flex flex-col gap-2 lg:gap-4">
              <Link href="/sindica/gerenciarporteiros" className="group flex items-center gap-4 lg:gap-6 bg-white/65 p-4 lg:p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-zinc-100 text-left">
                <UserPlus size={56} className="text-[#741582] group-hover:scale-110 transition-transform shrink-0 lg:w-14 lg:h-14 w-8 h-8" />
                <div>
                  <h2 className="text-base lg:text-2xl font-bold text-[#741582]">Gerenciar Porteiros</h2>
                  <p className="text-[#3A1067] text-sm lg:text-base">Cadastre, edite ou inative os porteiros do condomínio.</p>
                </div>
              </Link>

              <Link href="/sindica/gerenciarmoradores" className="group flex items-center gap-4 lg:gap-6 bg-white/65 p-4 lg:p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-zinc-100 text-left">
                <Users size={56} className="text-[#741582] group-hover:scale-110 transition-transform shrink-0 lg:w-14 lg:h-14 w-8 h-8" />
                <div>
                  <h2 className="text-base lg:text-2xl font-bold text-[#741582]">Gerenciar Moradores</h2>
                  <p className="text-[#3A1067] text-sm lg:text-base">Gerencie os estados dos perfis dos moradores.</p>
                </div>
              </Link>

              <Link href="/sindica/relatorios" className="group flex items-center gap-4 lg:gap-6 bg-white/65 p-4 lg:p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-zinc-100 text-left">
                <FileText size={56} className="text-[#741582] group-hover:scale-110 transition-transform shrink-0 lg:w-14 lg:h-14 w-8 h-8" />
                <div>
                  <h2 className="text-base lg:text-2xl font-bold text-[#741582]">Relatórios</h2>
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
    </>
  );
}