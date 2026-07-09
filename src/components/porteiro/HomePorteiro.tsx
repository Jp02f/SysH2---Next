'use client'
import { useState } from 'react';
import Header from '../Header';
import { Minus, Plus, ScanBarcode, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Roboto_Flex } from 'next/font/google';

const robotoFlex = Roboto_Flex({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function HomePorteiro() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="h-screen bg-[#F8F9FA] flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 px-6 pb-6 pt-4 z-10 flex flex-col overflow-hidden">
        
        <div className="border border-zinc-300 rounded-[2.5rem] p-4 lg:p-10 w-full h-full flex flex-col bg-transparent">
          {/* Bloco de Boas-Vindas */}
          <div className="flex items-center gap-4 mb-4 lg:mb-10">
            <div className={robotoFlex.className}>  
              <h1 className="text-2xl lg:text-4xl font-black text-[#741582]">Bipe o Código de Rastreio</h1>
              <p className="text-2xl lg:text-4xl font-black text-[#741582]">e Preencha os Dados Abaixo</p>
            </div>
          </div>

          {/* Formulario - Linha 1 */}
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex flex-col gap-1 flex-[3] min-w-0">
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
                  Apartamento
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

            <div className="flex flex-col gap-1 flex-[3]">
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
      
    </div> 
  );
}