'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, Phone, Mail, Lock, ChevronDown } from 'lucide-react';
import Logo from '@/components/logo';

interface Bloco {
  id_bloco: number;
  bloco: string;
}

interface Apartamento {
  id_apartamento: number;
  apartamento: number;
  id_bloco: number;
}

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [blocos, setBlocos] = useState<Bloco[]>([]);
  const [apartamentos, setApartamentos] = useState<Apartamento[]>([]);
  const [blocoSelecionado, setBlocoSelecionado] = useState('');
  const [apartamentoSelecionado, setApartamentoSelecionado] = useState('');

  const handleCadastro = async () => {
    // lógica de cadastro vem aqui depois

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                telefone: celular,
                email,
                senha,
                id_apartamento: apartamentoSelecionado,
            }),
         });

        const data = await response.json();
        console.log("Status:", response.status);
        console.log(JSON.stringify(data, null, 2));

        if (!response.ok) {
            alert(data.erro || "Erro ao cadastrar.");
            return;
        }

        alert("Cadastro enviado com sucesso! Aguarde aprovação do síndico.");
        router.push("/");
    }   catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
    } 

    };


  useEffect(() => {
  fetch('http://127.0.0.1:8000/api/blocos/')
    .then((res) => res.json())
    .then((data) => setBlocos(data))
    .catch((err) => console.error('Erro ao buscar blocos:', err));
  }, []);

  useEffect(() => {
  if (!blocoSelecionado) {
    setApartamentos([]);
    return;
  }
  fetch(`http://127.0.0.1:8000/api/apartamentos/?bloco=${blocoSelecionado}`)
    .then((res) => res.json())
    .then((data) => setApartamentos(data))
    .catch((err) => console.error('Erro ao buscar apartamentos:', err));
  }, [blocoSelecionado]);

  return (
    <div className="h-screen flex overflow-hidden bg-[#F1F1EF] items-center justify-center">

      {/* Lado esquerdo — ilustração */}
      <div className="hidden lg:flex w-1/2 items-center justify-end pr-0">
        <Image
          src="/ilustracao-login.svg"
          alt="Ilustração de cadastro"
          width={600}
          height={600}
          className="w-full h-auto max-w-[500px]"
        />
      </div>

      {/* Lado direito — formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-start pl-0">
        <div className="bg-[#F1F1EF] rounded-[2rem] p-14 w-full max-w-lg flex flex-col gap-6 min-h-[600px] justify-center" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>

          <div className="flex justify-center">
            <Logo className="h-16 w-auto" />
          </div>

          <h1 className="text-2xl font-bold text-[#4B0082]">
            Preencha as informações abaixo
          </h1>

          <div className="flex flex-col gap-4">

            <div className="relative flex items-center">
              <User size={20} className="absolute left-4 text-[#4B0082]" />
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#4B0082]"
              />
            </div>

            <div className="relative flex items-center">
              <Phone size={20} className="absolute left-4 text-[#4B0082]" />
              <input
                type="text"
                placeholder="Celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#4B0082]"
              />
            </div>

            <div className="relative flex items-center">
              <Mail size={20} className="absolute left-4 text-[#4B0082]" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#4B0082]"
              />
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-zinc-600 uppercase">Bloco</label>
                <div className="relative">
                  <select 
                  value={blocoSelecionado}
                  onChange={(e) => {
                    setBlocoSelecionado(e.target.value);
                    setApartamentoSelecionado('');
                }}
                  className="appearance-none bg-[#F5F5F5] border border-zinc-300 rounded-full pl-4 pr-8 py-2 text-zinc-700 focus:outline-none focus:border-[#4B0082]">
                    <option value="">-</option>
                    {blocos.map((bloco) => (
                        <option key={bloco.id_bloco} value={bloco.id_bloco}>
                            {bloco.bloco}
                        </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-zinc-600 uppercase">Apartamento</label>
                <div className="relative">
                  <select 
                  value={apartamentoSelecionado}
                  onChange={(e) => setApartamentoSelecionado(e.target.value)}
                  className="appearance-none bg-[#F5F5F5] border border-zinc-300 rounded-full pl-4 pr-8 py-2 text-zinc-700 focus:outline-none focus:border-[#4B0082]">
                <option value="">-</option>
                {apartamentos.map((apto) => (
                    <option key={apto.id_apartamento} value={apto.id_apartamento}>
                        {apto.apartamento}
                    </option>
                ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="relative flex items-center">
              <Lock size={20} className="absolute left-4 text-[#4B0082]" />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#4B0082]"
              />
            </div>

            <div className="relative flex items-center">
              <Lock size={20} className="absolute left-4 text-[#4B0082]" />
              <input
                type="password"
                placeholder="Confirmar Senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#4B0082]"
              />
            </div>

          </div>

          <button
            onClick={handleCadastro}
            className="w-full bg-[#C500E1] text-white font-bold py-3 rounded-full hover:bg-[#3a006f] transition-colors shadow-md"
          >
            CADASTRAR
          </button>

          <p className="text-center text-zinc-600 text-sm">
            Já possui conta?{' '}
            <button
              onClick={() => router.push('/')}
              className="text-[#C500E1] font-semibold hover:underline"
            >
              Fazer login
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}