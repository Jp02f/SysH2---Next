'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Mail, Lock } from 'lucide-react';
import Logo from '@/components/logo';

const usuarios = [
  { email: 'sindica@gmail.com', senha: '123456', perfil: 'sindica' },
  { email: 'porteiro@gmail.com', senha: '123456', perfil: 'porteiro' },
  { email: 'morador@gmail.com', senha: '123456', perfil: 'morador' },
];

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      setErro('Email ou senha incorretos.');
      return;
    }

    if (usuario.perfil === 'sindica') router.push('/sindica/home');
    if (usuario.perfil === 'porteiro') router.push('/porteiro/home');
    if (usuario.perfil === 'morador') router.push('/morador/home');
  };

  return (
    <>
      {/* ============ VERSÃO MOBILE ============ */}
<div className="lg:hidden min-h-[100dvh] bg-white flex flex-col">
  <main
    className="
      min-h-[100dvh]
      bg-white
      flex
      flex-col
      pt-[env(safe-area-inset-top)]
      pb-[env(safe-area-inset-bottom)]
    "
  >
    {/* Logo no topo */}
    <div className="flex justify-center pt-8 pb-4 shrink-0">
      <Logo className="h-10 w-auto" />
    </div>

    {/* Ilustração */}
    <div className="px-4 shrink-0">
      <Image
        src="/ilustracao-login.svg"
        alt="Ilustração de login"
        width={500}
        height={300}
        priority
        className="w-full h-auto rounded-3xl"
      />
    </div>

    {/* Conteúdo do login */}
    <div
      className="
        bg-white
        rounded-t-[2.5rem]
        -mt-6
        flex-1
        px-6
        pt-8
        pb-10
        flex
        flex-col
        gap-5
        relative
        z-10
      "
    >
      <h1 className="text-2xl font-bold text-[#4B0082]">
        Faça login
      </h1>

      <div className="flex flex-col gap-4">
        <div className="relative flex items-center">
          <Mail
            size={20}
            className="absolute left-4 text-[#4B0082]"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErro('');
            }}
            className="
              w-full
              bg-[#F5F5F5]
              border
              border-zinc-300
              rounded-full
              py-3
              pl-12
              pr-4
              text-zinc-700
              placeholder-zinc-400
              focus:outline-none
              focus:border-[#4B0082]
            "
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="relative flex items-center">
            <Lock
              size={20}
              className="absolute left-4 text-[#4B0082]"
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setErro('');
              }}
              className="
                w-full
                bg-[#F5F5F5]
                border
                border-zinc-300
                rounded-full
                py-3
                pl-12
                pr-4
                text-zinc-700
                placeholder-zinc-400
                focus:outline-none
                focus:border-[#741582]
              "
            />
          </div>

          <div className="flex justify-end pr-2">
            <button
              type="button"
              className="
                text-sm
                text-zinc-500
                hover:text-[#741582]
                transition-colors
              "
            >
              Esqueceu a senha?
            </button>
          </div>
        </div>
      </div>

      {erro && (
        <p className="text-red-500 text-sm text-center">
          {erro}
        </p>
      )}

      <button
        type="button"
        onClick={handleLogin}
        className="
          w-full
          bg-[#C500E1]
          text-white
          font-bold
          py-3
          rounded-full
          hover:bg-[#3a006f]
          transition-colors
          shadow-md
        "
      >
        ENTRAR
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-zinc-200" />
        <span className="text-sm text-zinc-400">ou</span>
        <div className="flex-1 h-px bg-zinc-200" />
      </div>

      <button
        type="button"
        onClick={() => router.push('/cadastro')}
        className="
          w-full
          border-2
          border-[#C500E1]
          text-[#C500E1]
          font-bold
          py-3
          rounded-full
          hover:bg-[#C500E1]
          hover:text-white
          transition-colors
        "
      >
        Cadastrar-se
      </button>
    </div>
  </main>
</div>

      {/* ============ VERSÃO DESKTOP ============ */}
      <div className="hidden lg:flex h-screen overflow-hidden bg-[#F1F1EF] items-center justify-center">

        <div className="flex w-1/2 items-center justify-end pr-0">
          <Image
            src="/ilustracao-login.svg"
            alt="Ilustração de login"
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

            <h1 className="text-2xl font-bold text-[#4B0082]">Faça login</h1>

            <div className="flex flex-col gap-4">
              <div className="relative flex items-center">
                <Mail size={20} className="absolute left-4 text-[#4B0082]" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErro(''); }}
                  className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#4B0082]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="relative flex items-center">
                  <Lock size={20} className="absolute left-4 text-[#4B0082]" />
                  <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => { setSenha(e.target.value); setErro(''); }}
                    className="w-full bg-[#F5F5F5] border border-zinc-300 rounded-full py-3 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#741582]"
                  />
                </div>
                <div className="flex justify-end pr-2">
                  <button className="text-sm text-zinc-500 hover:text-[#741582] transition-colors">
                    Esqueceu a senha?
                  </button>
                </div>
              </div>
            </div>

            {erro && (
              <p className="text-red-500 text-sm text-center">{erro}</p>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-[#C500E1] text-white font-bold py-3 rounded-full hover:bg-[#3a006f] transition-colors shadow-md"
            >
              ENTRAR
            </button>

            <p className="text-center text-zinc-600 text-sm">
              Não possui conta?{' '}
              <button
                onClick={() => router.push('/cadastro')}
                className="text-[#C500E1] font-semibold hover:underline"
              >
                Cadastra-se
              </button>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}