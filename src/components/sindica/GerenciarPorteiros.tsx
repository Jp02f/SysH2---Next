'use client'
import Header from '../Header';
import { UserPlus, CirclePause, CirclePlay, CircleX, User, Mail, Phone } from 'lucide-react';

export default function GerenciarPorteiros() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col relative overflow-hidden">
      <Header />
      
      {/* Mantendo a mesma estrutura absoluta idêntica à Home */}
      <main className="absolute top-[100px] bottom-6 left-6 right-6 z-10 flex flex-col">
        
        {/* Moldura externa idêntica */}
        <div className="border border-zinc-300 rounded-[15px] p-10 w-full h-full flex flex-col bg-transparent gap-8">
          
          {/* Cabeçalho da Página */}
          <div className="flex items-center gap-4">
            <UserPlus size={56} className="text-[#4B0082]" />
            <div>  
              <h1 className="text-4xl font-black text-[#4B0082]">Gerenciar Porteiros</h1>
              <p className="text-[#3A1067] font-medium text-lg">Cadastre, edite ou inative porteiros</p>
            </div>
          </div>

          {/* Área de Conteúdo: Lado a Lado (Formulário | Tabela) */}
          <div className="flex-1 flex gap-8 min-h-0 w-full items-stretch">
            
            {/* LADO ESQUERDO: Formulário de Cadastro */}
            <div className="w-[38%] bg-[#EBEBEB] rounded-[15px] p-8 flex flex-col gap-6 shadow-sm relative h-fit">
              <div>
                <h2 className="text-3xl font-black text-[#4B0082] mb-8 text-left">
                  Cadastre um porteiro
                </h2>
                
                {/* Inputs estilizados com ícones */}
                <div className="flex flex-col gap-5">
                  <div className="relative flex items-center">
                    <User size={20} className="absolute left-4 text-[#4B0082]" />
                    <input 
                      type="text" 
                      placeholder="Nome" 
                      className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#4B0082]"
                    />
                  </div>

                  <div className="relative flex items-center">
                    <Mail size={20} className="absolute left-4 text-[#4B0082]" />
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#4B0082]"
                    />
                  </div>

                  <div className="relative flex items-center">
                    <Phone size={20} className="absolute left-4 text-[#4B0082]" />
                    <input 
                      type="text" 
                      placeholder="Celular" 
                      className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#4B0082]"
                    />
                  </div>
                </div>
              </div>

              {/* Botão de Cadastrar na base */}
              <div className="flex justify-end mt-6">
                <button className="bg-[#4B0082] text-white font-bold px-6 py-3 rounded-full hover:bg-[#3A1067] transition-colors shadow-md">
                  CADASTRAR
                </button>
              </div>
            </div>

            {/* LADO DIREITO: Tabela de Porteiros com Scroll Interno */}
            <div className="flex-1 bg-whiteborder border-zinc-300 rounded-[15px] shadow-sm overflow-hidden flex flex-col relative"
              style={{
                backgroundImage: "url('/logoicon.svg')",
                backgroundSize: "900px",
                backgroundPosition: "center", 
              }}
            >
            
              {/* Overlay para não atrapalhar a leitura */}
              <div className="absolute inset-0 bg-white/90" />
              
              {/* Header Fixo da Tabela */}
              <div className="relative z-10 bg-[#4B0082] text-white font-bold py-2 px-6 grid grid-cols-4 text-center rounded-t-[15px]">
                <div>Porteiro</div>
                <div>Email</div>
                <div>Telefone</div>
                <div>Ações</div>
              </div>

              {/* Corpo da Tabela com Scroll */}
              <div className="relative z-10 flex-1 overflow-y-auto divide-y divide-zinc-100">
                {/* Linhas de exemplo repetidas para simular o layout */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="grid grid-cols-4 py-4 px-6 text-zinc-700 text-center items-center hover:bg-zinc-50 transition-colors">
                    <div className="truncate font-semibold">José Vieira da Silva</div>
                    <div className="truncate font-semibold">josevieira@gmail.com</div>
                    <div className="truncate font-semibold">11975681643</div>
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