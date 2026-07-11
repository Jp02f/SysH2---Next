'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, Phone, Mail, Lock, ChevronDown, Eye, EyeOff, ShieldCheck } from 'lucide-react';
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
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/`, {
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

      if (!response.ok) {
        alert(data.erro || "Erro ao cadastrar.");
        return;
      }

      alert("Cadastro enviado com sucesso! Aguarde aprovação do síndico.");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blocos/`)
      .then((res) => res.json())
      .then((data) => setBlocos(data))
      .catch((err) => console.error('Erro ao buscar blocos:', err));
  }, []);

  useEffect(() => {
    if (!blocoSelecionado) {
      setApartamentos([]);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/apartamentos/?bloco=${blocoSelecionado}`)
      .then((res) => res.json())
      .then((data) => setApartamentos(data))
      .catch((err) => console.error('Erro ao buscar apartamentos:', err));
  }, [blocoSelecionado]);

  return (
    <>
      {/* ============ VERSÃO MOBILE ============ */}
      <div className="lg:hidden min-h-[100dvh] bg-white">
        <main
          className="
            min-h-[100dvh]
            bg-white
            pt-[env(safe-area-inset-top)]
            pb-[env(safe-area-inset-bottom)]
            px-5
            py-6
            flex
            flex-col
            gap-5
          "
        >
          {/* Logo */}
          <div className="flex justify-center pt-2">
            <Logo className="h-12 w-auto" />
          </div>

          <h1 className="text-2xl leading-tight font-bold text-[#4B0082]">
            Preencha as<br />informações abaixo
          </h1>

          <div className="flex flex-col gap-3">
            {/* Nome */}
            <div className="relative flex items-center">
              <User size={19} className="pointer-events-none absolute left-4 text-[#4B0082]" />
              <input
                type="text"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="h-12 w-full rounded-full border border-zinc-300 bg-[#F5F5F5] pl-12 pr-4 text-zinc-700 placeholder:text-zinc-400 focus:border-[#4B0082] focus:outline-none"
              />
            </div>

            {/* Celular */}
            <div className="relative flex items-center">
              <Phone size={19} className="pointer-events-none absolute left-4 text-[#4B0082]" />
              <input
                type="text"
                placeholder="Celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                className="h-12 w-full rounded-full border border-zinc-300 bg-[#F5F5F5] pl-12 pr-4 text-zinc-700 placeholder:text-zinc-400 focus:border-[#4B0082] focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative flex items-center">
              <Mail size={19} className="pointer-events-none absolute left-4 text-[#4B0082]" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-full border border-zinc-300 bg-[#F5F5F5] pl-12 pr-4 text-zinc-700 placeholder:text-zinc-400 focus:border-[#4B0082] focus:outline-none"
              />
            </div>

            {/* Bloco / Apartamento */}
            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-600 uppercase">Bloco</label>
                <div className="relative">
                  <select
                    value={blocoSelecionado}
                    onChange={(e) => {
                      setBlocoSelecionado(e.target.value);
                      setApartamentoSelecionado('');
                    }}
                    className="h-12 w-full appearance-none rounded-full border border-zinc-300 bg-[#F5F5F5] pl-4 pr-8 text-zinc-700 focus:border-[#4B0082] focus:outline-none"
                  >
                    <option value="">Selecione</option>
                    {blocos.map((bloco) => (
                      <option key={bloco.id_bloco} value={bloco.id_bloco}>
                        {bloco.bloco}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-600 uppercase">Apartamento</label>
                <div className="relative">
                  <select
                    value={apartamentoSelecionado}
                    onChange={(e) => setApartamentoSelecionado(e.target.value)}
                    className="h-12 w-full appearance-none rounded-full border border-zinc-300 bg-[#F5F5F5] pl-4 pr-8 text-zinc-700 focus:border-[#4B0082] focus:outline-none"
                  >
                    <option value="">Selecione</option>
                    {apartamentos.map((apto) => (
                      <option key={apto.id_apartamento} value={apto.id_apartamento}>
                        {apto.apartamento}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                </div>
              </div>
            </div>

            {/* Senha */}
            <div className="relative flex items-center">
              <Lock size={19} className="pointer-events-none absolute left-4 text-[#4B0082]" />
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="h-12 w-full rounded-full border border-zinc-300 bg-[#F5F5F5] pl-12 pr-11 text-zinc-700 placeholder:text-zinc-400 focus:border-[#4B0082] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-4 text-zinc-500"
              >
                {mostrarSenha ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            {/* Confirmar Senha */}
            <div className="relative flex items-center">
              <Lock size={19} className="pointer-events-none absolute left-4 text-[#4B0082]" />
              <input
                type={mostrarConfirmarSenha ? 'text' : 'password'}
                placeholder="Confirmar senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="h-12 w-full rounded-full border border-zinc-300 bg-[#F5F5F5] pl-12 pr-11 text-zinc-700 placeholder:text-zinc-400 focus:border-[#4B0082] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                className="absolute right-4 text-zinc-500"
              >
                {mostrarConfirmarSenha ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {/* Aviso de segurança */}
          <div className="flex items-start gap-3 rounded-2xl bg-[#F1E4FB] px-4 py-4">
            <ShieldCheck size={22} className="mt-0.5 flex-shrink-0 text-[#7B00FF]" />
            <div>
              <p className="text-sm font-bold text-[#4B0082]">Sua segurança é importante</p>
              <p className="text-sm text-zinc-500">
                Use pelo menos 6 caracteres com letras, números e símbolos.
              </p>
            </div>
          </div>

          {/* Cadastrar */}
          <button
            type="button"
            onClick={handleCadastro}
            disabled={carregando}
            className="h-12 w-full rounded-full bg-[#C500E1] font-bold text-white shadow-md transition-colors hover:bg-[#3a006f] disabled:opacity-60"
          >
            {carregando ? 'Enviando...' : 'CADASTRAR'}
          </button>

          <p className="text-center text-sm text-zinc-600">
            Já possui conta?{' '}
            <button
              type="button"
              onClick={() => router.push('/')}
              className="font-semibold text-[#C500E1] hover:underline"
            >
              Fazer login
            </button>
          </p>
        </main>
      </div>

      {/* ============ VERSÃO DESKTOP ============ */}
      <div className="hidden lg:flex h-screen overflow-hidden bg-[#F1F1EF] items-center justify-center">

        <div className="flex w-1/2 items-center justify-end pr-0">
          <Image
            src="/ilustracao-login.svg"
            alt="Ilustração de cadastro"
            width={600}
            height={600}
            className="w-full h-auto max-w-[500px]"
          />
        </div>

        <div className="w-1/2 flex items-center justify-start pl-0">
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
              disabled={carregando}
              className="w-full bg-[#C500E1] text-white font-bold py-3 rounded-full hover:bg-[#3a006f] transition-colors shadow-md disabled:opacity-60"
            >
              {carregando ? 'Enviando...' : 'CADASTRAR'}
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
    </>
  );
}