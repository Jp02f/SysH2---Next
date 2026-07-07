'use client'
import { useState } from 'react';
import Header from '../Header';
import { UserPlus, CirclePause, CirclePlay, CircleX, User, Mail, Phone, Plus, Search, ChevronDown } from 'lucide-react';

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

const porteirosIniciais = [
  { id: 1, nome: 'José Vieira da Silva', email: 'jose@gmail.com', telefone: '11975681643', status: 'ativo' as Status },
  { id: 2, nome: 'Carlos Mendes', email: 'carlos@gmail.com', telefone: '11987654321', status: 'inativo' as Status },
  { id: 3, nome: 'Roberta Lima', email: 'roberta@gmail.com', telefone: '11912345678', status: 'ativo' as Status },
  { id: 4, nome: 'Fernando Costa', email: 'fernando@gmail.com', telefone: '11923456789', status: 'cancelado' as Status },
  { id: 5, nome: 'Patrícia Souza', email: 'patricia@gmail.com', telefone: '11934567890', status: 'ativo' as Status },
  { id: 6, nome: 'Ricardo Alves', email: 'ricardo@gmail.com', telefone: '11945678901', status: 'inativo' as Status },
  { id: 7, nome: 'Juliana Ferreira', email: 'juliana@gmail.com', telefone: '11956789012', status: 'ativo' as Status },
  { id: 8, nome: 'Marcos Oliveira', email: 'marcos@gmail.com', telefone: '11967890123', status: 'cancelado' as Status },
];

export default function GerenciarPorteiros() {
  const [porteiros, setPorteiros] = useState(porteirosIniciais);
  const [filtro, setFiltro] = useState<'todos' | Status>('todos');
  const [busca, setBusca] = useState('');

  // Modal de cadastro
  const [modalCadastro, setModalCadastro] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  // Modal de cancelamento
  const [confirmacao, setConfirmacao] = useState<{ visivel: boolean; porteiroId: number | null; nomePorteiro: string }>({
    visivel: false, porteiroId: null, nomePorteiro: ''
  });

  const porteirosExibidos = porteiros
    .filter(p => filtro === 'todos' || p.status === filtro)
    .filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));

  const updateStatus = (id: number, novoStatus: Status) => {
    setPorteiros(prev => prev.map(p => p.id === id ? { ...p, status: novoStatus } : p));
  };

  const cadastrarPorteiro = () => {
    if (!nome.trim() || !email.trim() || !telefone.trim()) return;
    setPorteiros(prev => [...prev, {
      id: Date.now(),
      nome, email, telefone,
      status: 'inativo' as Status
    }]);
    setNome(''); setEmail(''); setTelefone('');
    setModalCadastro(false);
  };

  const pedirConfirmacaoCancelamento = (id: number, nome: string) => {
    setConfirmacao({ visivel: true, porteiroId: id, nomePorteiro: nome });
  };

  const confirmarCancelamento = () => {
    if (confirmacao.porteiroId !== null) updateStatus(confirmacao.porteiroId, 'cancelado');
    setConfirmacao({ visivel: false, porteiroId: null, nomePorteiro: '' });
  };

  return (
    <div className="h-screen bg-[#F8F9FA] flex flex-col overflow-hidden">
      <Header homeHref="/sindica/home" />

      {/* Modal de Cadastro */}
      {modalCadastro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-[20px] shadow-xl p-8 max-w-md w-full mx-4 flex flex-col gap-5">
            <h2 className="text-2xl font-black text-[#741582]">Cadastrar Porteiro</h2>

            <div className="flex flex-col gap-4">
              <div className="relative flex items-center">
                <User size={20} className="absolute left-4 text-[#741582]" />
                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#741582]"
                />
              </div>

              <div className="relative flex items-center">
                <Mail size={20} className="absolute left-4 text-[#741582]" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#741582]"
                />
              </div>

              <div className="relative flex items-center">
                <Phone size={20} className="absolute left-4 text-[#741582]" />
                <input
                  type="text"
                  placeholder="Celular"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#741582]"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-2">
              <button
                onClick={() => { setModalCadastro(false); setNome(''); setEmail(''); setTelefone(''); }}
                className="px-5 py-2 rounded-full border border-zinc-300 text-zinc-700 font-semibold hover:bg-zinc-50 transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={cadastrarPorteiro}
                className="px-5 py-2 rounded-full bg-[#741582] text-white font-bold hover:bg-[#3a006f] transition-colors"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Cancelamento */}
      {confirmacao.visivel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-[20px] shadow-xl p-8 max-w-md w-full mx-4 flex flex-col gap-4">
            <h2 className="text-xl font-black text-[#741582]">Cancelar acesso?</h2>
            <p className="text-zinc-600">
              Você está prestes a cancelar o acesso de{' '}
              <span className="font-bold text-zinc-800">{confirmacao.nomePorteiro}</span>.
            </p>
            <p className="text-red-600 font-semibold text-sm">
              ⚠️ Esta ação é definitiva e não poderá ser desfeita.
            </p>
            <div className="flex gap-3 justify-end mt-2">
              <button
                onClick={() => setConfirmacao({ visivel: false, porteiroId: null, nomePorteiro: '' })}
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
            <UserPlus size={56} className="text-[#741582] lg:w-14 lg:h-14 w-8 h-8" />
            <div>
              <h1 className="text-2xl lg:text-4xl font-black text-[#741582]">Gerenciar Porteiros</h1>
              <p className="text-[#3A1067] font-medium text-sm lg:text-lg">Cadastre, edite ou inative porteiros</p>
            </div>
          </div>

          {/* Filtros + Busca + Botão Cadastrar */}
          <div className="flex gap-3 items-center">

            <div className="relative inline-flex items-center">
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value as 'todos' | Status)}
                className="appearance-none bg-white border border-zinc-300 rounded-[15px] py-2 pl-4 pr-10 text-zinc-700 font-medium focus:outline-none focus:border-[#741582] cursor-pointer shadow-sm w-32"
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
                placeholder="Busque um porteiro..."
                className="w-full bg-white border border-zinc-300 rounded-[15px] py-2 pl-4 pr-10 text-zinc-700 font-medium focus:outline-none focus:border-[#741582] shadow-sm"
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>

            <button
              onClick={() => setModalCadastro(true)}
              className="flex items-center gap-2 bg-[#C500E1] text-white font-bold px-5 py-2 rounded-[15px] hover:bg-[#3a006f] transition-colors shadow-sm"
            >
              <Plus size={18} />
              Cadastrar
            </button>
          </div>

          {/* Tabela */}
          <div className="flex-1 bg-white border border-zinc-300 rounded-[15px] shadow-sm overflow-hidden flex flex-col">
            <div className="relative z-10 flex-1 overflow-y-auto bg-white">

              <div className="sticky top-0 z-20 bg-[#C500E1] text-white font-bold py-2 grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr] text-center rounded-t-[15px]">
                <div>Porteiro</div>
                <div>Email</div>
                <div>Telefone</div>
                <div>Situação</div>
                <div>Ações</div>
              </div>

              <div className="divide-y divide-zinc-300">
                {porteirosExibidos.map((porteiro) => {
                  const cancelado = porteiro.status === 'cancelado';
                  return (
                    <div key={porteiro.id} className="grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr] py-2 lg:py-4 text-zinc-700 text-center items-center hover:bg-zinc-50 transition-colors">
                      <div className="font-normal text-sm lg:text-base">{porteiro.nome}</div>
                      <div className="font-normal text-sm lg:text-base">{porteiro.email}</div>
                      <div className="font-normal text-sm lg:text-base">{porteiro.telefone}</div>
                      <div className="flex justify-center">
                        <StatusBadge status={porteiro.status} />
                      </div>
                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() => updateStatus(porteiro.id, 'ativo')}
                          disabled={cancelado || porteiro.status === 'ativo'}
                          title={cancelado ? 'Cancelamento é definitivo' : 'Ativar porteiro'}
                          className={`transition-colors ${cancelado || porteiro.status === 'ativo' ? 'text-zinc-300 cursor-not-allowed' : 'text-[#741582] hover:text-green-500 cursor-pointer'}`}
                        >
                          <CirclePlay size={22} />
                        </button>

                        <button
                          onClick={() => updateStatus(porteiro.id, 'inativo')}
                          disabled={cancelado || porteiro.status === 'inativo'}
                          title={cancelado ? 'Cancelamento é definitivo' : 'Inativar porteiro'}
                          className={`transition-colors ${cancelado || porteiro.status === 'inativo' ? 'text-zinc-300 cursor-not-allowed' : 'text-[#741582] hover:text-zinc-600 cursor-pointer'}`}
                        >
                          <CirclePause size={22} />
                        </button>

                        <button
                          onClick={() => pedirConfirmacaoCancelamento(porteiro.id, porteiro.nome)}
                          disabled={cancelado}
                          title={cancelado ? 'Já cancelado' : 'Cancelar porteiro'}
                          className={`transition-colors ${cancelado ? 'text-zinc-300 cursor-not-allowed' : 'text-[#741582] hover:text-red-500 cursor-pointer'}`}
                        >
                          <CircleX size={22} />
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