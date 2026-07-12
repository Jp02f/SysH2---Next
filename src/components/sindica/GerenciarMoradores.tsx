'use client'
import { useState, useEffect } from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import Header from '../Header';
import DrawerPerfil from '../DrawerPerfil';
import Logo from '../logo';
import {
  Users, CirclePause, CirclePlay, CircleX, ChevronDown, Search, FileDown,
  UserCircle, Bell, Mail, Phone, Building2, Upload
} from 'lucide-react';

type Status = "Pendente" | "Ativo" | "Inativo" | "Cancelado";

function StatusBadge({ status }: { status: Status }) {
  const styles = {
    Pendente: 'bg-amber-100 text-amber-800 border border-amber-300',
    Ativo: 'bg-green-100 text-green-800 border border-green-300',
    Inativo: 'bg-blue-100 text-blue-800 border border-blue-300',
    Cancelado: 'bg-red-100 text-red-800 border border-red-300'
  };
  const labels = { Pendente: 'Pendente', Ativo: 'Ativo', Inativo: 'Inativo', Cancelado: 'Cancelado' };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function Iniciais(nome: string) {
  const partes = nome.trim().split(' ');
  const primeira = partes[0]?.[0] || '';
  const segunda = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (primeira + segunda).toUpperCase();
}

interface Morador {
  id_usuario: number;
  nome: string;
  email: string;
  telefone: string;
  bloco: string;
  apartamento: number;
  situacao_cadastral: "Pendente" | "Ativo" | "Inativo" | "Cancelado";
}

export default function GerenciarMoradores() {
  const { usuario, carregando } = useAuthGuard();
  const [filtro, setFiltro] = useState<'todos' | Status>('todos');
  const [busca, setBusca] = useState('');
  const [moradores, setMoradores] = useState<Morador[]>([]);
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [confirmacao, setConfirmacao] = useState<{ visivel: boolean; moradorId: number | null; nomeMorador: string }>({
    visivel: false,
    moradorId: null,
    nomeMorador: ''
  });

  const moradoresFiltrados = moradores
    .filter(
      m =>
        filtro === 'todos' ||
        m.situacao_cadastral.toLowerCase() === filtro
    )
    .filter(m => m.nome.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => {
      if (a.situacao_cadastral === 'Pendente' && b.situacao_cadastral !== 'Pendente') return -1;
      if (a.situacao_cadastral !== 'Pendente' && b.situacao_cadastral === 'Pendente') return 1;
      return 0;
    });

  const updateStatus = async (id: number, novoStatus: Status) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          situacao_cadastral: novoStatus,
        }),
      });

      if (!response.ok) {
        alert('Erro ao atualizar a situação.');
        return;
      }

      setMoradores(prev =>
        prev.map(m =>
          m.id_usuario === id
            ? {
                ...m,
                situacao_cadastral: novoStatus,
              }
            : m
        )
      );
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const pedirConfirmacaoCancelamento = (id: number, nome: string) => {
    setConfirmacao({ visivel: true, moradorId: id, nomeMorador: nome });
  };

  const confirmarCancelamento = () => {
    if (confirmacao.moradorId !== null) {
      updateStatus(confirmacao.moradorId, 'Cancelado');
    }
    setConfirmacao({ visivel: false, moradorId: null, nomeMorador: '' });
  };

  const cancelarConfirmacao = () => {
    setConfirmacao({ visivel: false, moradorId: null, nomeMorador: '' });
  };

  const exportarPDF = () => {
    const linhas = moradoresFiltrados
      .map(m => `${m.nome} | ${m.email} | ${m.telefone} | Bloco ${m.bloco} | Ap ${m.apartamento} | ${m.situacao_cadastral}`)
      .join('\n');
    const conteudo = `RELATÓRIO DE MORADORES\n${'='.repeat(60)}\n\n${linhas}`;
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'moradores.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/?tipo_usuario=1`)
      .then(res => res.json())
      .then(data => {
        setMoradores(data);
      })
      .catch(err => console.error(err));
  }, []);

  if (carregando || !usuario) {
    return null;
  }

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

        {/* Título */}
        <div className="flex items-center gap-3 px-4 pt-4">
          <div className="w-12 h-12 rounded-full bg-[#C500E1]/10 flex items-center justify-center flex-shrink-0">
            <Users size={22} className="text-[#C500E1]" />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#4B0082]">Gerenciar Moradores</h1>
            <p className="text-xs text-zinc-500">Ative, inative ou cancele os acessos dos moradores</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 px-4 mt-4">
          <div className="relative">
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value as 'todos' | Status)}
              className="appearance-none bg-white border border-zinc-300 rounded-full h-11 pl-4 pr-8 text-sm text-zinc-700 font-medium focus:outline-none focus:border-[#7B00FF]"
            >
              <option value="todos">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
          </div>

          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar"
              className="w-full h-11 bg-white border border-zinc-300 rounded-full pl-10 pr-4 text-sm text-zinc-700 focus:outline-none focus:border-[#7B00FF]"
            />
          </div>

          <button
            onClick={exportarPDF}
            className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-[#C500E1] text-white rounded-full hover:bg-[#3a006f] transition-colors"
          >
            <Upload size={18} />
          </button>
        </div>

        {/* Lista de moradores */}
        <div className="flex-1 px-4 py-4 flex flex-col gap-3">
          {moradoresFiltrados.length === 0 && (
            <p className="text-zinc-500 text-center py-10 text-sm">Nenhum morador encontrado.</p>
          )}

          {moradoresFiltrados.map((morador) => {
            const cancelado = morador.situacao_cadastral.toLowerCase() === 'cancelado';
            return (
              <div key={morador.id_usuario} className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-4">
                <div className="flex items-stretch justify-between gap-3">

                  {/* Avatar + informações */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-[#C500E1]/10 flex items-center justify-center flex-shrink-0 font-bold text-[#C500E1] text-sm">
                      {Iniciais(morador.nome)}
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-bold text-sm text-[#4B0082] truncate">{morador.nome}</h2>

                      <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-500">
                        <Mail size={12} className="flex-shrink-0" />
                        <span className="truncate">{morador.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-zinc-500">
                        <Phone size={12} className="flex-shrink-0" />
                        <span>{morador.telefone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-zinc-500">
                        <Building2 size={12} className="flex-shrink-0" />
                        <span>Bloco {morador.bloco} · Apto {morador.apartamento}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status + Ações */}
                  <div className="flex flex-col items-end justify-center gap-2 flex-shrink-0 self-stretch">
                    <StatusBadge status={morador.situacao_cadastral} />

                    <div className="flex gap-3">
                      <button
                        onClick={() => updateStatus(morador.id_usuario, 'Ativo')}
                        disabled={cancelado || morador.situacao_cadastral === 'Ativo'}
                        title={cancelado ? 'Cancelamento é definitivo' : 'Ativar morador'}
                        className={`transition-colors ${cancelado || morador.situacao_cadastral === 'Ativo' ? 'text-zinc-300 cursor-not-allowed' : 'text-[#7B00FF] hover:text-green-500 cursor-pointer'}`}
                      >
                        <CirclePlay size={20} />
                      </button>

                      <button
                        onClick={() => updateStatus(morador.id_usuario, 'Inativo')}
                        disabled={cancelado || morador.situacao_cadastral === 'Inativo'}
                        title={cancelado ? 'Cancelamento é definitivo' : 'Inativar morador'}
                        className={`transition-colors ${cancelado || morador.situacao_cadastral === 'Inativo' ? 'text-zinc-300 cursor-not-allowed' : 'text-[#7B00FF] hover:text-zinc-600 cursor-pointer'}`}
                      >
                        <CirclePause size={20} />
                      </button>

                      <button
                        onClick={() => pedirConfirmacaoCancelamento(morador.id_usuario, morador.nome)}
                        disabled={cancelado}
                        title={cancelado ? 'Já cancelado' : 'Cancelar morador'}
                        className={`transition-colors ${cancelado ? 'text-zinc-300 cursor-not-allowed' : 'text-[#7B00FF] hover:text-red-500 cursor-pointer'}`}
                      >
                        <CircleX size={20} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
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
        <Header homeHref="/sindica/home" />

        {/* Modal de Confirmação de Cancelamento */}
        {confirmacao.visivel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-[20px] shadow-xl p-8 w-full max-w-3xl mx-4 relative min-h-[200px] flex flex-col gap-4">
              <h2 className="text-xl font-black text-[#3A1067]">Cancelar acesso?</h2>
              <p className="text-zinc-600">
                Você está prestes a cancelar o acesso de{' '}
                <span className="font-bold text-zinc-800">{confirmacao.nomeMorador}</span>.
              </p>
              <p className="text-red-600 font-semibold text-sm">
                ⚠️ Esta ação é definitiva e não poderá ser desfeita.
              </p>
              <div className="flex gap-3 justify-end mt-2">
                <button
                  onClick={cancelarConfirmacao}
                  className="px-5 py-2 rounded-[12px] border border-zinc-300 text-zinc-700 font-semibold hover:bg-zinc-50 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={confirmarCancelamento}
                  className="px-5 py-2 rounded-[12px] bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                >
                  Sim, cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 px-6 pb-6 pt-4 z-10 flex flex-col overflow-hidden">
          <div className="border border-zinc-300 rounded-[15px] p-4 lg:p-8 w-full h-full flex flex-col bg-transparent gap-3 lg:gap-6">

            {/* Cabeçalho */}
            <div className="flex items-center gap-4">
              <Users size={56} className="text-[#3A1067] lg:w-14 lg:h-14 w-8 h-8" />
              <div>
                <h1 className="text-2xl lg:text-4xl font-black text-[#3A1067]">Gerenciar Moradores</h1>
                <p className="text-[#3A1067] font-medium text-sm lg:text-lg">Ative, inative ou cancele os acessos dos moradores</p>
              </div>
            </div>

            {/* Filtros */}
            <div className="flex gap-3 items-center">
              <div className="relative inline-flex items-center">
                <select
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value as 'todos' | Status)}
                  className="appearance-none bg-white border border-zinc-300 rounded-[15px] py-2 pl-4 pr-10 text-zinc-700 font-medium focus:outline-none focus:border-[#7B00FF] cursor-pointer shadow-sm w-32"
                >
                  <option value="todos">Todos</option>
                  <option value="pendente">Pendente</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="cancelado">Cancelado</option>
                </select>
                <ChevronDown size={18} className="absolute right-3 text-zinc-500 pointer-events-none" />
              </div>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar um morador..."
                  className="w-full bg-white border border-zinc-300 rounded-[15px] py-2 pl-4 pr-10 text-zinc-700 font-medium focus:outline-none focus:border-[#7B00FF] shadow-sm"
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              </div>

              <button
                onClick={exportarPDF}
                className="flex items-center gap-2 bg-[#C500E1] text-white font-bold px-5 py-2 rounded-[15px] hover:bg-[#3a006f] transition-colors shadow-sm"
              >
                <FileDown size={18} />
                Exportar
              </button>
            </div>

            {/* Tabela */}
            <div className="flex-1 bg-white border border-zinc-300 rounded-[15px] shadow-sm overflow-hidden flex flex-col">
              <div className="relative z-10 flex-1 overflow-y-auto bg-white">

                <div className="sticky top-0 z-20 bg-[#C500E1] text-white font-bold py-2 grid grid-cols-[2fr_2fr_1.5fr_0.5fr_1fr_1fr_1fr] text-center rounded-t-[15px]">
                  <div>Morador</div>
                  <div>Email</div>
                  <div>Telefone</div>
                  <div>Bloco</div>
                  <div>Apartamento</div>
                  <div>Situação</div>
                  <div>Ações</div>
                </div>

                <div className="divide-y divide-zinc-300">
                  {moradoresFiltrados.map((morador) => {
                    const cancelado = morador.situacao_cadastral.toLowerCase() === 'cancelado';
                    return (
                      <div key={morador.id_usuario} className="grid grid-cols-[2fr_2fr_1.5fr_0.5fr_1fr_1fr_1fr] py-2 lg:py-4 text-zinc-700 text-center items-center hover:bg-zinc-50 transition-colors">
                        <div className="font-normal text-sm lg:text-base">{morador.nome}</div>
                        <div className="font-normal text-sm lg:text-base">{morador.email}</div>
                        <div className="font-normal text-sm lg:text-base">{morador.telefone}</div>
                        <div className="font-normal text-sm lg:text-base">{morador.bloco}</div>
                        <div className="font-normal text-sm lg:text-base">{morador.apartamento}</div>
                        <div className="flex justify-center">
                          <StatusBadge status={morador.situacao_cadastral} />
                        </div>
                        <div className="flex justify-center gap-4">

                          <button
                            onClick={() => updateStatus(morador.id_usuario, 'Ativo')}
                            disabled={cancelado || morador.situacao_cadastral === 'Ativo'}
                            title={cancelado ? 'Cancelamento é definitivo' : 'Ativar morador'}
                            className={`transition-colors ${cancelado || morador.situacao_cadastral === 'Ativo' ? 'text-zinc-300 cursor-not-allowed' : 'text-[#7B00FF] hover:text-green-500 cursor-pointer'}`}
                          >
                            <CirclePlay size={25} />
                          </button>

                          <button
                            onClick={() => updateStatus(morador.id_usuario, 'Inativo')}
                            disabled={cancelado || morador.situacao_cadastral === 'Inativo'}
                            title={cancelado ? 'Cancelamento é definitivo' : 'Inativar morador'}
                            className={`transition-colors ${cancelado || morador.situacao_cadastral === 'Inativo' ? 'text-zinc-300 cursor-not-allowed' : 'text-[#7B00FF] hover:text-zinc-600 cursor-pointer'}`}
                          >
                            <CirclePause size={25} />
                          </button>

                          <button
                            onClick={() => pedirConfirmacaoCancelamento(morador.id_usuario, morador.nome)}
                            disabled={cancelado}
                            title={cancelado ? 'Já cancelado' : 'Cancelar morador'}
                            className={`transition-colors ${cancelado ? 'text-zinc-300 cursor-not-allowed' : 'text-[#7B00FF] hover:text-red-500 cursor-pointer'}`}
                          >
                            <CircleX size={25} />
                          </button>

                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}