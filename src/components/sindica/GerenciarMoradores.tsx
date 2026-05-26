'use client'
import { useState } from 'react';
import Header from '../Header';
import { Users, CirclePause, CirclePlay, CircleX, ChevronDown } from 'lucide-react';

function StatusBadge({ status }: { status: 'ativo' | 'inativo' | 'cancelado' }) {
  const styles = {
    ativo: 'bg-green-100 text-green-800 border border-green-300',
    inativo: 'bg-black-100 text-black border border-zinc-300',
    cancelado: 'bg-red-100 text-red-800 border border-red-300'
  };

  const labels = {
    ativo: 'Ativo',
    inativo: 'Inativo',
    cancelado: 'Cancelado'
  };


  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function GerenciarMoradores() {
    const [filtro, setFiltro] = useState<'todos' | 'ativo' | 'inativo' | 'cancelado'>('todos');

    const moradores = [
      { id: 1,nome: 'Fulano da Silva', email: 'fulano@gmail.com', telefone: '11975681643', bloco: 'C', apartamento: '11', status: 'cancelado' },
      { id: 2,nome: 'Beltrano de Souza', email: 'beltrano@gmail.com', telefone: '11987654321', bloco: 'B', apartamento: '13', status: 'ativo' },
      { id: 3,nome: 'Ciclano Pereira', email: 'ciclano@gmail.com', telefone: '11912345678', bloco: 'A', apartamento: '21', status: 'inativo' },
      { id: 4,nome: 'Maria Oliveira', email: 'maria@gmail.com', telefone: '11987654321', bloco: 'A', apartamento: '34', status: 'ativo' },
      { id: 5,nome: 'João Santos', email: 'joao@gmail.com', telefone: '11912345678', bloco: 'C', apartamento: '32', status: 'cancelado' },
      { id: 6,nome: 'Ana Costa', email: 'ana@gmail.com', telefone: '11923456789', bloco: 'B', apartamento: '24', status: 'inativo' },
      { id: 7,nome: 'Pedro Lima', email: 'pedro@gmail.com', telefone: '11934567890', bloco: 'B', apartamento: '13', status: 'ativo' },
      { id: 8,nome: 'Lucas Almeida', email: 'lucas@gmail.com', telefone: '11945678901', bloco: 'C', apartamento: '1', status: 'cancelado' },
      { id: 9,nome: 'Mariana Rodrigues', email: 'mariana@gmail.com', telefone: '11956789012', bloco: 'A', apartamento: '25', status: 'inativo' },
      { id: 10,nome: 'Rafael Ferreira', email: 'rafael@gmail.com', telefone: '11967890123', bloco: 'B', apartamento: '35', status: 'ativo' },
    ];

    const moradoresFiltrados = filtro === 'todos' ? moradores : moradores.filter(m => m.status === filtro);
    

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col relative overflow-hidden">
      <Header />
      
      {/* Mantendo a mesma estrutura absoluta idêntica à Home */}
      <main className="absolute top-[100px] bottom-6 left-6 right-6 z-10 flex flex-col">
        
        {/* Moldura externa idêntica */}
        <div className="border border-zinc-300 rounded-[15px] p-10 w-full h-full flex flex-col bg-transparent gap-8">
          
          {/* Cabeçalho da Página */}
          <div className="flex items-center gap-4">
            <Users size={56} className="text-[#4B0082]" />
            <div>  
              <h1 className="text-4xl font-black text-[#4B0082]">Gerenciar Moradores</h1>
              <p className="text-[#3A1067] font-medium text-lg">Aprove, inative ou cancele os acessos dos moradores</p>
            </div>
          </div>

          {/*Filtroooooo*/ }
            <div className="flex gap-4">
                <div className="relative inline-flex items-center">

                    <select
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value as 'todos' | 'ativo' | 'inativo' | 'cancelado')}
                    className="appearance-none bg-white border border-zinc-300 rounded-[15px] py-2 pl-4 pr-10 text-zinc-700 font-medium focus:outline-none focus:border-[#4B0082] cursor-pointer shadow-sm w-32"
                    >
                    <option value="todos">Todos</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                    <option value="cancelado">Cancelado</option>
                    </select>

                    <ChevronDown size={18} className="absolute right-3 text-zinc-500 pointer-events-none" />
            </div>
        </div>

            {/* Tabela de Moradores com Scroll Interno */}
            <div className="flex-1 bg-white border border-zinc-300 rounded-[15px] shadow-sm overflow-hidden flex flex-col relative">

                <div className="relative z-10 flex-1 overflow-y-auto bg-white">

                
            
              
              {/* Header Fixo da Tabela */}
              <div className="sticky top-0 z-20 bg-[#4B0082] text-white font-bold py-2 grid grid-cols-[2fr_2fr_1.5fr_0.5fr_1fr_1fr_1fr] text-center rounded-t-[15px]">
                <div className="text-center">Morador</div>
                <div className="text-center">Email</div>
                <div className="text-center">Telefone</div>
                <div className="text-center">Bloco</div>
                <div className="text-center">Apartamento</div>
                <div className="text-center">Situação</div>
                <div>Ações</div>
              </div>

              {/* Corpo da Tabela com Scroll */}
              <div className="divide-y divide-zinc-300">
                {/* Linhas de exemplo repetidas para simular o layout */}
                {moradoresFiltrados.map((morador, index) => (
                  <div key={index} className="grid grid-cols-[2fr_2fr_1.5fr_0.5fr_1fr_1fr_1fr] py-4 text-zinc-700 text-center items-center hover:bg-zinc-50 transition-colors">
                    <div className="text-center font-normal">{morador.nome}</div>
                    <div className="text-center font-normal">{morador.email}</div>
                    <div className="text-center font-normal">{morador.telefone}</div>
                    <div className="text-center font-normal">{morador.bloco}</div>
                    <div className="text-center font-normal">{morador.apartamento}</div>
                    <div className="flex justify-center">
                      <StatusBadge status={morador.status} />
                    </div>
                    <div className="flex justify-center gap-4 text-[#4B0082]">
                      <button className="hover:text-green-500 transition-colors">
                        <CirclePlay size={25} />
                      </button>
                      <button className="hover:text-black transition-colors">
                        <CirclePause size={25} />
                      </button>
                      <button className="hover:text-red-500 transition-colors">
                        <CircleX size={25} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}