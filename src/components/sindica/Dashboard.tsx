'use client'
import { useState } from 'react';
import Header from '../Header';
import { Users, UserPlus, FileText, CheckCircle, XCircle, Trash2 } from 'lucide-react';

export default function DashboardSindica() {
  const [view, setView] = useState('home');

  const moradoresMock = [
    { id: 1, nome: "ANA GIULLIA BELISÁRIO DA SILVA", email: "ana.giullia@fatec.sp.gov.br", bloco: "B", ap: "11", situacao: "Pendente" },
    { id: 2, nome: "CLAUDIO HUMBERTO RODRIGUES CUSTODIO", email: "claudio.h@fatec.sp.gov.br", bloco: "C", ap: "23", situacao: "Ativo" },
    { id: 3, nome: "THALITA DOMINGUES DE JESUS", email: "thalita.d@fatec.sp.gov.br", bloco: "A", ap: "05", situacao: "Inativo" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto p-8">
        {view === 'home' ? (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-[#4B0082]/10 p-3 rounded-2xl text-[#4B0082]">
                <FileText size={40} />
              </div>
              <div>
                <h1 className="text-4xl font-black text-[#4B0082]">Olá, Síndico(a)!</h1>
                <p className="text-zinc-500 font-medium text-lg">Navegue pelos módulos para gerenciar o CDHU H2.</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <button className="group flex items-center gap-8 bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-zinc-100 text-left">
                <UserPlus size={56} className="text-[#4B0082] group-hover:scale-110 transition-transform" />
                <div>
                  <h2 className="text-2xl font-bold text-[#4B0082]">Gerenciar Porteiros</h2>
                  <p className="text-zinc-500">Controle o acesso dos funcionários da portaria.</p>
                </div>
              </button>

              <button onClick={() => setView('moradores')} className="group flex items-center gap-8 bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-zinc-100 text-left">
                <Users size={56} className="text-[#4B0082] group-hover:scale-110 transition-transform" />
                <div>
                  <h2 className="text-2xl font-bold text-[#4B0082]">Gerenciar Moradores</h2>
                  <p className="text-zinc-500">Valide cadastros e veja a lista de moradores ativos.</p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <button onClick={() => setView('home')} className="text-[#4B0082] font-bold mb-6 flex items-center gap-2 hover:underline">← Voltar</button>
            <h1 className="text-3xl font-bold text-[#4B0082] mb-6">Lista de Moradores</h1>
            <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#4B0082] text-white text-xs uppercase">
                  <tr>
                    <th className="p-5 font-black">Nome Completo</th>
                    <th className="p-5 text-center font-black">Bloco/Ap</th>
                    <th className="p-5 text-center font-black">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {moradoresMock.map(m => (
                    <tr key={m.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="p-5 font-bold text-zinc-700">{m.nome}</td>
                      <td className="p-5 text-center text-zinc-600">{m.bloco} - {m.ap}</td>
                      <td className="p-5 flex justify-center gap-3">
                        <button className="text-green-600 hover:bg-green-50 p-2 rounded-xl"><CheckCircle size={22}/></button>
                        <button className="text-red-600 hover:bg-red-50 p-2 rounded-xl"><XCircle size={22}/></button>
                        <button className="text-zinc-300 hover:text-zinc-500 p-2 rounded-xl"><Trash2 size={22}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}