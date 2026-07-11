'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, Building, Package } from 'lucide-react';
import LogoIcon from '../logoicon';
import Header from '../Header';


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

interface UsuarioLogado {
  id_usuario: number;
  nome: string;
  bloco: string | null;
  apartamento: number | null;
}

function formatarData(data: string) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

function formatarHora(hora: string) {
  return hora.slice(0, 5).replace(':', 'H');
}

export default function HomeMorador() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);
  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [tokenVisivel, setTokenVisivel] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const dados = localStorage.getItem('usuario');
    if (!dados) {
      router.push('/');
      return;
    }
    setUsuario(JSON.parse(dados));
  }, [router]);

  useEffect(() => {
    if (!usuario) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/encomendas/?usuario=${usuario.id_usuario}`)
      .then((res) => res.json())
      .then((data) => setEncomendas(data))
      .catch((err) => console.error('Erro ao buscar encomendas:', err))
      .finally(() => setCarregando(false));
  }, [usuario]);

  if (!usuario) {
    return null;
  }

  return (
    <div className="h-screen bg-[#F8F9FA] flex flex-col overflow-hidden">
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
            {carregando && (
              <p className="text-zinc-500 text-center py-10">Carregando encomendas...</p>
            )}

            {!carregando && encomendas.length === 0 && (
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
  );
}