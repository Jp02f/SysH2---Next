'use client'
import { useState } from 'react';
import Header from '../Header';
import { Minus, Plus, ScanBarcode, ChevronDown, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Roboto_Flex } from 'next/font/google';

const robotoFlex = Roboto_Flex({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function HomePorteiro() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('cadastrar');
  const [showModal, setShowModal] = useState(false);
  const [terceiros, setTerceiros] = useState(false);
  const [nomeTerceiro, setNomeTerceiro] = useState('');
  const [token, setToken] = useState(['', '', '', '', '', '']);

  return (
    <div className="h-screen bg-[#F8F9FA] flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 px-6 pb-6 pt-4 z-10 flex flex-col overflow-hidden">

        {/* Abas */}
        <div className="flex gap-1 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab('cadastrar')}
            className={`px-6 py-3 text-sm font-bold uppercase rounded-t-2xl transition-colors ${
              activeTab === 'cadastrar'
                ? 'bg-[#741582] text-white'
                : 'bg-white text-zinc-700 border border-zinc-300 border-b-0'
            }`}
          >
            Cadastrar Encomenda
          </button>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className={`px-6 py-3 text-sm font-bold uppercase rounded-t-2xl transition-colors ${
              activeTab === 'entregar'
                ? 'bg-[#741582] text-white'
                : 'bg-white text-zinc-700 border border-zinc-300 border-b-0'
            }`}
          >
            Entregar Encomenda
          </button>
        </div>
        
        <div className="border border-zinc-300 rounded-[1.0rem] p-4 lg:p-10 w-full h-full flex flex-col bg-transparent">
          {/* Bloco de Boas-Vindas */}
          <div className="flex items-center gap-4 mb-4 lg:mb-10">
            <div className={robotoFlex.className}>  
              <h1 className="text-2xl lg:text-4xl font-black text-[#741582]">Bipe o Código de Rastreio</h1>
              <p className="text-2xl lg:text-4xl font-black text-[#741582]">e Preencha os Dados Abaixo</p>
            </div>
          </div>

          {/* Formulario - Linha 1 */}
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex flex-col gap-1 flex-[5] min-w-0">
              <label className="text-sm font-bold text-zinc-700 uppercase">
                  Código de Rastreio
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder=""
                  className="w-full border border-zinc-300 rounded-2xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#741582] bg-white text-zinc-900"
                />
                <ScanBarcode size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000] pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1 flex-[1]">
              <label className="text-sm font-bold text-zinc-700 uppercase">
                  Bloco
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none border border-zinc-300 rounded-2xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#741582] bg-white text-zinc-900 h-[42px]">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000] pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1 flex-[1]">
              <label className="text-sm font-bold text-zinc-700 uppercase">
                  Apt
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none border border-zinc-300 rounded-2xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#741582] bg-white text-zinc-900 h-[42px]">
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>  
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
              </select>
                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000] pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1 flex-[5]">
              <label className="text-sm font-bold text-zinc-700 uppercase">
                  Morador
              </label>
              <div className="relative">
              <select
                className="w-full appearance-none border border-zinc-300 rounded-2xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#741582] bg-white text-zinc-900 h-[42px]">
                  <option value="ana">Ana Giulia Belisario da Silva</option>
                  <option value="claudio">Claudio Humberto Rodrigues Custodio</option>
                  <option value="joao">João Pedro Ferreira de Morais</option>
                  <option value="thalita">Thalita Domingues de Jesus</option>
              </select>
                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000] pointer-events-none" />
              </div>
            </div>

            {/* Quantidade */}
            <div className="flex flex-col gap-1 w-[150px]">
              <label className="text-sm font-bold text-zinc-700 uppercase">
                  Quantidade
              </label>
              <div className="flex items-center justify-between border border-zinc-300 rounded-2xl px-2 h-[42px] bg-white">
                
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="p-2 text-zinc-600 hover:text-[#741582]"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>

                <span className="text-sm font-medium text-zinc-900">
                  {quantity} Pacote(s)
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.min(5, prev + 1))}
                  className="p-1 text-zinc-600 hover:text-[#741582]"
                  disabled={quantity >= 5}
                >
                  <Plus className="w-4 h-4" />
                </button>

              </div>
            </div>
          </div>
          {/* ↑ fecha a Linha 1 */}

          {/* Formulario - Linha 2 */}
          <div className="flex flex-wrap gap-6 mt-6">

            <div className="flex flex-col gap-1 w-[500px]">
              <label className="text-sm font-bold text-zinc-700 uppercase">
                  Observação
              </label>
              <textarea
                placeholder=""
                className="border border-zinc-300 rounded-2xl px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#741582] bg-white text-zinc-900"
              />
            </div>

            <div className="flex flex-col gap-1 w-[160px]">
              <label className="text-sm font-bold text-zinc-700 uppercase">
                  Data/Hora
              </label>
              <input
                type="text"
                placeholder="08/07/2026 14:30"
                className="border border-zinc-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#741582] bg-white text-zinc-900"
              />
            </div>

          </div>
          {/* ↑ fecha a Linha 2 */}

        </div> 
        {/* ↑ fecha o CARD */}

      </main> 

      {/* Modal - Entregar Encomenda */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-5xl mx-4 relative min-h-[700px] flex flex-col justify-between">
            
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-zinc-900 font-bold text-lg hover:text-[#741582]"
            >
              X
            </button>

            <h2 className="text-4xl font-black text-[#741582] mb-6">
              Entregar Encomenda
            </h2>

            {/* Retirado por terceiros */}
            <div className="mb-">
              <label className="text-sm font-bold text-zinc-700 uppercase block mb-1">
                Retirado por Terceiros?
              </label>
              <div className="flex items-center justify-between border border-zinc-300 rounded-xl px-4 py-3">
                <input
                  type="text"
                  placeholder="Nome de Quem Retirou"
                  value={nomeTerceiro}
                  onChange={(e) => setNomeTerceiro(e.target.value)}
                  disabled={!terceiros}
                  className="flex-1 outline-none text-zinc-900 placeholder:text-zinc-400 disabled:bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setTerceiros(!terceiros)}
                  className={`w-13 h-8 rounded-full transition-colors relative ${
                    terceiros ? 'bg-[#741582]' : 'bg-zinc-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full transition-transform ${
                      terceiros ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>

                </div>
              </div>

              {/* Bloco do Token */}
              <div className="border border-zinc-300 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 min-h-[300px]">
                <div className="flex items-center gap-6 w-full justify-center">
                  <ShieldCheck size={130} className="text-[#741582] flex-shrink-0" />
                  <p className="text-3xl font-bold text-[#741582] leading-snug text-center">
                    Digite o Token<br />
                    informado pelo<br />
                    morador
                  </p>
                  <div className="flex gap-3">
                    {token.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const newToken = [...token];
                          newToken[index] = e.target.value;
                          setToken(newToken);
                        }}
                        className="w-16 h-18 text-center border border-zinc-300 rounded-lg bg-zinc-100 text-zinc-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#741582]"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="px-10 py-3 bg-[#741582] text-white rounded-xl font-bold uppercase text-lg"
                >
                  Validar
                </button>
              </div>

              {/* Dados do morador (somente leitura) */}
              <div className="mt-6 flex flex-col gap-2">
                <p className="text-zinc-900">
                  <span className="font-bold">Nome do Morador:</span>{' '}
                  <span className="text-zinc-400">Ana Giulia Belisario da Silva</span>
                </p>
                <p className="text-zinc-900">
                  <span className="font-bold">Código de Rastreio:</span>{' '}
                  <span className="text-zinc-400">AA123456789BR</span>
                </p>
              </div>

          </div>
        </div>
      )}
      
    </div> 
  );
}