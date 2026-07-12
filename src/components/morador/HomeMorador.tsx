'use client'
import { useState, useEffect } from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { KeyRound, Building, Package, Bell, CheckCircle2 } from 'lucide-react';
import LogoIcon from '../logoicon';
import Logo from '../logo';
import Header from '../Header';
import DrawerPerfil from '../DrawerPerfil';
import { getIniciais } from '@/lib/iniciais';

interface Encomenda {
  id_encomendas: number;
  codigo_rastreio: string;
  data_recebimento: string;
  hora_recebimento: string;
  retirar_urgencia: boolean;
  porteiro_nome: string | null;
  token_codigo: string;
  retirada_data: string | null;
  retirada_hora: string | null;
  retirada_por: string | null;
}

function formatarData(data: string) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

function formatarHora(hora: string) {
  return hora.slice(0, 5).replace(':', 'H');
}

export default function HomeMorador() {
  const { usuario, carregando } = useAuthGuard();
  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [tokenVisivel, setTokenVisivel] = useState<number | null>(null);
  const [carregandoEncomendas, setCarregandoEncomendas] = useState(true);
  const [abaMobile, setAbaMobile] = useState<'pendentes' | 'retiradas'>('pendentes');
  const [drawerAberto, setDrawerAberto] = useState(false);

  useEffect(() => {
    if (!usuario) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/encomendas/?usuario=${usuario.id_usuario}`)
      .then((res) => res.json())
      .then((data) => setEncomendas(data))
      .catch((err) => console.error('Erro ao buscar encomendas:', err))
      .finally(() => setCarregandoEncomendas(false));
  }, [usuario]);

  if (carregando || !usuario) {
    return null;
  }

  const pendentes = encomendas.filter((e) => !e.retirada_data);
  const retiradas = encomendas.filter((e) => !!e.retirada_data);
  const listaMobile = abaMobile === 'pendentes' ? pendentes : retiradas;

  return (
    <>
      {/* ============ VERSÃO MOBILE ============ */}
      <div className="lg:hidden min-h-screen bg-[#F8F9FA] flex flex-col">

        {/* Header mobile */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-zinc-100">
          <button type="button" onClick={() => setDrawerAberto(true)}>
            <div className="w-9 h-9 rounded-full bg-[#C500E1]/10 flex items-center justify-center font-black text-[#4B0082] text-sm">
              {getIniciais(usuario.nome)}
            </div>
          </button>
          <Logo className="h-7 w-auto" />
          <button type="button" className="relative">
            <Bell size={22} className="text-zinc-700" />
          </button>
        </header>

        {/* Banner roxo de resumo */}
        <div className="mx-4 mt-4 rounded-3xl bg-gradient-to-br from-[#7B00FF] to-[#C500E1] p-6 relative overflow-hidden">
          <h1 className="text-white text-2xl font-black relative z-10">
            Olá, {usuario.nome.split(' ')[0]}!
          </h1>
          <p className="text-white/90 text-sm mt-1 relative z-10 max-w-[70%]">
            Consulte suas encomendas pendentes e já retiradas.
          </p>

          <div className="flex gap-3 mt-5 relative z-10">
            <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Package size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white/80 text-xs font-medium">Pendentes</p>
                <p className="text-white text-2xl font-black leading-none">{pendentes.length}</p>
              </div>
            </div>

            <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white/80 text-xs font-medium">Retiradas</p>
                <p className="text-white text-2xl font-black leading-none">{retiradas.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Abas Pendentes / Retiradas */}
        <div className="flex gap-2 px-4 mt-4">
          <button
            type="button"
            onClick={() => setAbaMobile('pendentes')}
            className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-colors ${
              abaMobile === 'pendentes'
                ? 'bg-[#C500E1] text-white'
                : 'bg-white text-[#C500E1] border border-[#C500E1]/30'
            }`}
          >
            PENDENTES
          </button>
          <button
            type="button"
            onClick={() => setAbaMobile('retiradas')}
            className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-colors ${
              abaMobile === 'retiradas'
                ? 'bg-[#C500E1] text-white'
                : 'bg-white text-[#C500E1] border border-[#C500E1]/30'
            }`}
          >
            RETIRADAS
          </button>
        </div>

        {/* Lista de encomendas (mobile) */}
        <div className="flex-1 px-4 py-4 flex flex-col gap-4">
          {carregandoEncomendas && (
            <p className="text-zinc-500 text-center py-10">Carregando encomendas...</p>
          )}

          {!carregandoEncomendas && listaMobile.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-10">
              <div className="w-16 h-16 rounded-full bg-[#C500E1]/10 flex items-center justify-center">
                <Package size={32} className="text-[#C500E1]" />
              </div>
              <p className="text-zinc-500 text-sm text-center">
                {abaMobile === 'pendentes'
                  ? 'Nenhuma encomenda pendente'
                  : 'Nenhuma encomenda retirada ainda'}
              </p>
            </div>
          )}

          {listaMobile.map((encomenda) => {
            const retirada = !!encomenda.retirada_data;
            return (
              <div key={encomenda.id_encomendas} className="relative overflow-visible pt-3">
                {encomenda.retirar_urgencia && !retirada && (
                  <span className="absolute top-0 left-4 bg-red-500 text-white text-[11px] font-bold px-3 py-1 rounded-full z-10">
                    URGENTE
                  </span>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-[#C500E1]/10 flex items-center justify-center flex-shrink-0">
                      <Package
                        size={22}
                        className={retirada ? 'text-zinc-400' : 'text-[#C500E1]'}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className={`font-bold text-sm truncate ${retirada ? 'text-zinc-400' : 'text-zinc-900'}`}>
                        {encomenda.codigo_rastreio}
                      </p>
                      <p className={`text-xs ${retirada ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        Entregue em {formatarData(encomenda.data_recebimento)} às {formatarHora(encomenda.hora_recebimento)}
                      </p>
                      {encomenda.porteiro_nome && (
                        <p className={`text-xs ${retirada ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          Recebido por: {encomenda.porteiro_nome.split(' ')[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  {retirada ? (
                    <div className="w-full bg-zinc-100 text-zinc-500 text-xs font-bold py-2.5 rounded-full text-center">
                      RETIRADO EM {formatarData(encomenda.retirada_data!)} ÁS {formatarHora(encomenda.retirada_hora!)}
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setTokenVisivel(tokenVisivel === encomenda.id_encomendas ? null : encomenda.id_encomendas)
                      }
                      className="w-full bg-[#C500E1] text-white font-bold text-sm py-2.5 rounded-full hover:bg-[#5e00c2] transition-colors"
                    >
                      {tokenVisivel === encomenda.id_encomendas ? (
                        <span className="flex items-center justify-center gap-2">
                          <KeyRound size={14} /> {encomenda.token_codigo}
                        </span>
                      ) : (
                        'VER TOKEN'
                      )}
                    </button>
                  )}
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
        <Header homeHref="/morador/home" />

        <main className="flex-1 px-6 pb-6 pt-6 overflow-hidden flex flex-col">
          <div className="border border-zinc-200 rounded-[1.5rem] p-8 lg:p-10 w-full h-full flex flex-col bg-transparent overflow-hidden">
            {/* Boas-vindas */}
            <div className="flex items-start gap-4 mb-8">
              <div className="text-[#3A1067] mt-1">
                <Building size={40} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-[#3A1067]">Olá, {usuario.nome.split(' ')[0]}!</h1>
                <p className="text-[#3A1067] font-medium">
                  Consulte seu histórico de encomendas que já foram retiradas e as que estão pendentes.
                </p>
              </div>
            </div>

            {/* Lista de encomendas */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-5 pr-1 pt-6">
              {carregandoEncomendas && (
                <p className="text-zinc-500 text-center py-10">Carregando encomendas...</p>
              )}

              {!carregandoEncomendas && encomendas.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 relative z-10">
                  <div className="w-20 h-20 rounded-full bg-[#7B00FF]/10 flex items-center justify-center">
                    <Package size={40} className="text-[#7B00FF]" />
                  </div>
                  <p className="text-lg font-bold text-zinc-600">Nenhuma encomenda por aqui</p>
                  <p className="text-sm text-zinc-400 max-w-xs text-center">
                    Quando uma encomenda for cadastrada para o seu apartamento, ela vai aparecer aqui.
                  </p>
                </div>
              )}

              {encomendas.map((encomenda) => {
                const retirada = !!encomenda.retirada_data;
                return (
                  <div key={encomenda.id_encomendas} className="relative overflow-visible">
                    {encomenda.retirar_urgencia && !retirada && (
                      <span className="absolute -top-3 left-6 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-2xl z-10">
                        URGENTE
                      </span>
                    )}

                    <div className="border border-zinc-200 rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm bg-white/65 backdrop-blur-sm">
                      <div className="flex items-center gap-5">
                        <Package
                          size={56}
                          className={retirada ? 'text-zinc-400' : 'text-[#C500E1]'}
                          strokeWidth={1.5}
                        />
                        <div>
                          <p className={`font-black text-lg ${retirada ? 'text-zinc-400' : 'text-zinc-900'}`}>
                            {encomenda.codigo_rastreio}
                          </p>
                          <p className={`text-sm ${retirada ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Entregue: {formatarData(encomenda.data_recebimento)} {formatarHora(encomenda.hora_recebimento)}
                          </p>
                          {encomenda.porteiro_nome && (
                            <p className={`text-sm ${retirada ? 'text-zinc-400' : 'text-zinc-600'}`}>
                              Recebido por: {encomenda.porteiro_nome.split(' ')[0].toUpperCase()}
                            </p>
                          )}
                        </div>
                      </div>

                      {retirada ? (
                        <span className="bg-zinc-500 text-white text-xs font-bold px-4 py-2 rounded-full text-center leading-tight">
                          RETIRADO EM<br />
                          {formatarData(encomenda.retirada_data!)} ÁS {formatarHora(encomenda.retirada_hora!)}
                        </span>
                      ) : (
                        <button
                          onClick={() =>
                            setTokenVisivel(tokenVisivel === encomenda.id_encomendas ? null : encomenda.id_encomendas)
                          }
                          className="bg-[#C500E1] text-white font-bold px-6 py-3 rounded-full hover:bg-[#5e00c2] transition-colors"
                        >
                          {tokenVisivel === encomenda.id_encomendas ? (
                            <span className="flex items-center gap-2">
                              <KeyRound size={16} /> {encomenda.token_codigo}
                            </span>
                          ) : (
                            'VER TOKEN'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
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