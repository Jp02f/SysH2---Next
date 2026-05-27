'use client'
import { useState } from 'react';
import Header from '../Header';
import { Users, CirclePause, CirclePlay, CircleX, ChevronDown, Search, FileDown } from 'lucide-react';

type Status = 'ativo' | 'inativo' | 'cancelado';

function StatusBadge({ status }: { status: Status }) {
  const styles = {
    ativo: 'bg-green-100 text-green-800 border border-green-300',
    inativo: 'bg-blue-100 text-blue-800 border border-blue-300',
    cancelado: 'bg-red-100 text-red-800 border border-red-300'
  };
  const labels = { ativo: 'Ativo', inativo: 'Inativo', cancelado: 'Cancelado' };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

const moradoresIniciais = [
  { id: 1, nome: 'Fulano da Silva', email: 'fulano@gmail.com', telefone: '11975681643', bloco: 'C', apartamento: '11', status: 'cancelado' as Status },
  { id: 2, nome: 'Beltrano de Souza', email: 'beltrano@gmail.com', telefone: '11987654321', bloco: 'B', apartamento: '13', status: 'ativo' as Status },
  { id: 3, nome: 'Ciclano Pereira', email: 'ciclano@gmail.com', telefone: '11912345678', bloco: 'A', apartamento: '21', status: 'inativo' as Status },
  { id: 4, nome: 'Maria Oliveira', email: 'maria@gmail.com', telefone: '11987654321', bloco: 'A', apartamento: '34', status: 'ativo' as Status },
  { id: 5, nome: 'João Santos', email: 'joao@gmail.com', telefone: '11912345678', bloco: 'C', apartamento: '32', status: 'cancelado' as Status },
  { id: 6, nome: 'Ana Costa', email: 'ana@gmail.com', telefone: '11923456789', bloco: 'B', apartamento: '24', status: 'inativo' as Status },
  { id: 7, nome: 'Pedro Lima', email: 'pedro@gmail.com', telefone: '11934567890', bloco: 'B', apartamento: '13', status: 'ativo' as Status },
  { id: 8, nome: 'Lucas Almeida', email: 'lucas@gmail.com', telefone: '11945678901', bloco: 'C', apartamento: '1', status: 'cancelado' as Status },
  { id: 9, nome: 'Mariana Rodrigues', email: 'mariana@gmail.com', telefone: '11956789012', bloco: 'A', apartamento: '25', status: 'inativo' as Status },
  { id: 10, nome: 'Rafael Ferreira', email: 'rafael@gmail.com', telefone: '11967890123', bloco: 'B', apartamento: '35', status: 'ativo' as Status },
];

export default function GerenciarMoradores() {
  const [filtro, setFiltro] = useState<'todos' | Status>('todos');
  const [busca, setBusca] = useState('');
  const [moradores, setMoradores] = useState(moradoresIniciais);
  const [confirmacao, setConfirmacao] = useState<{ visivel: boolean; moradorId: number | null; nomeMorador: string }>({
    visivel: false,
    moradorId: null,
    nomeMorador: ''
  });

  const moradoresFiltrados = moradores
    .filter(m => filtro === 'todos' || m.status === filtro)
    .filter(m => m.nome.toLowerCase().includes(busca.toLowerCase()));

  const updateStatus = (id: number, novoStatus: Status) => {
    setMoradores(prev => prev.map(m => m.id === id ? { ...m, status: novoStatus } : m));
  };

  const pedirConfirmacaoCancelamento = (id: number, nome: string) => {
    setConfirmacao({ visivel: true, moradorId: id, nomeMorador: nome });
  };

  const confirmarCancelamento = () => {
    if (confirmacao.moradorId !== null) {
      updateStatus(confirmacao.moradorId, 'cancelado');
    }
    setConfirmacao({ visivel: false, moradorId: null, nomeMorador: '' });
  };

  const cancelarConfirmacao = () => {
    setConfirmacao({ visivel: false, moradorId: null, nomeMorador: '' });
  };

  const exportarPDF = () => {
    const linhas = moradoresFiltrados
      .map(m => `${m.nome} | ${m.email} | ${m.telefone} | Bloco ${m.bloco} | Ap ${m.apartamento} | ${m.status}`)
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

  return (
    <div className="h-screen bg-[#F8F9FA] flex flex-col overflow-hidden">
      <Header homeHref="/sindica/home" />

      {/* Modal de Confirmação de Cancelamento */}
      {confirmacao.visivel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-[20px] shadow-xl p-8 max-w-md w-full mx-4 flex flex-col gap-4">
            <h2 className="text-xl font-black text-[#4B0082]">Cancelar acesso?</h2>
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
            <Users size={56} className="text-[#4B0082] lg:w-14 lg:h-14 w-8 h-8" />
            <div>
              <h1 className="text-2xl lg:text-4xl font-black text-[#4B0082]">Gerenciar Moradores</h1>
              <p className="text-[#3A1067] font-medium text-sm lg:text-lg">Ative, inative ou cancele os acessos dos moradores</p>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-3 items-center">
            <div className="relative inline-flex items-center">
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value as 'todos' | Status)}
                className="appearance-none bg-white border border-zinc-300 rounded-[15px] py-2 pl-4 pr-10 text-zinc-700 font-medium focus:outline-none focus:border-[#4B0082] cursor-pointer shadow-sm w-32"
              >
                <option value="todos">Todos</option>
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
                className="w-full bg-white border border-zinc-300 rounded-[15px] py-2 pl-4 pr-10 text-zinc-700 font-medium focus:outline-none focus:border-[#4B0082] shadow-sm"
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>

            <button
              onClick={exportarPDF}
              className="flex items-center gap-2 bg-[#4B0082] text-white font-bold px-5 py-2 rounded-[15px] hover:bg-[#3a006f] transition-colors shadow-sm"
            >
              <FileDown size={18} />
              Exportar
            </button>
          </div>

          {/* Tabela */}
          <div className="flex-1 bg-white border border-zinc-300 rounded-[15px] shadow-sm overflow-hidden flex flex-col">
            <div className="relative z-10 flex-1 overflow-y-auto bg-white">

              <div className="sticky top-0 z-20 bg-[#4B0082] text-white font-bold py-2 grid grid-cols-[2fr_2fr_1.5fr_0.5fr_1fr_1fr_1fr] text-center rounded-t-[15px]">
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
                  const cancelado = morador.status === 'cancelado';
                  return (
                    <div key={morador.id} className="grid grid-cols-[2fr_2fr_1.5fr_0.5fr_1fr_1fr_1fr] py-2 lg:py-4 text-zinc-700 text-center items-center hover:bg-zinc-50 transition-colors">
                      <div className="font-normal text-sm lg:text-base">{morador.nome}</div>
                      <div className="font-normal text-sm lg:text-base">{morador.email}</div>
                      <div className="font-normal text-sm lg:text-base">{morador.telefone}</div>
                      <div className="font-normal text-sm lg:text-base">{morador.bloco}</div>
                      <div className="font-normal text-sm lg:text-base">{morador.apartamento}</div>
                      <div className="flex justify-center">
                        <StatusBadge status={morador.status} />
                      </div>
                      <div className="flex justify-center gap-4">

                        {/* Ativar */}
                        <button
                          onClick={() => updateStatus(morador.id, 'ativo')}
                          disabled={cancelado || morador.status === 'ativo'}
                          title={cancelado ? 'Cancelamento é definitivo' : 'Ativar morador'}
                          className={`transition-colors ${cancelado || morador.status === 'ativo' ? 'text-zinc-300 cursor-not-allowed' : 'text-[#4B0082] hover:text-green-500 cursor-pointer'}`}
                        >
                          <CirclePlay size={25} />
                        </button>

                        {/* Inativar */}
                        <button
                          onClick={() => updateStatus(morador.id, 'inativo')}
                          disabled={cancelado || morador.status === 'inativo'}
                          title={cancelado ? 'Cancelamento é definitivo' : 'Inativar morador'}
                          className={`transition-colors ${cancelado || morador.status === 'inativo' ? 'text-zinc-300 cursor-not-allowed' : 'text-[#4B0082] hover:text-zinc-600 cursor-pointer'}`}
                        >
                          <CirclePause size={25} />
                        </button>

                        {/* Cancelar */}
                        <button
                          onClick={() => pedirConfirmacaoCancelamento(morador.id, morador.nome)}
                          disabled={cancelado}
                          title={cancelado ? 'Já cancelado' : 'Cancelar morador'}
                          className={`transition-colors ${cancelado ? 'text-zinc-300 cursor-not-allowed' : 'text-[#4B0082] hover:text-red-500 cursor-pointer'}`}
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
  );
}