'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Mail, Lock } from 'lucide-react';
import Logo from '@/components/logo';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    setErro("");
    setCarregando(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.erro || "Email ou senha incorretos.");
        return;
      }

      localStorage.setItem('usuario', JSON.stringify(data));

      switch (data.tipo_usuario) {
        case 1:
          router.push("/morador/home");
          break;
        case 2:
          router.push("/porteiro/home");
          break;
        case 3:
          router.push("/sindica/home");
          break;
        default:
          setErro("Perfil de usuário inválido.");
      }

    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      {/* ============ VERSÃO MOBILE ============ */}
      <div className="lg:hidden h-[100dvh] overflow-hidden bg-white">
        <main
          className="
            h-full
            grid
            grid-rows-[auto_minmax(0,42%)_1fr]
            bg-white
            pt-[env(safe-area-inset-top)]
            pb-[env(safe-area-inset-bottom)]
          "
        >
          {/* Logo */}
          <div className="flex justify-center py-2">
            <Logo className="h-10 w-auto" />
          </div>

          {/* Ilustração */}
          <div className="relative mx-3 min-h-0 overflow-hidden rounded-t-3xl">
            <Image
              src="/ilustracao-login-mobile.png"
              alt="Ilustração de login"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Área do formulário */}
          <div
            className="
              relative
              z-10
              -mt-5
              min-h-0
              rounded-t-[2rem]
              bg-white
              px-5
              pt-4
              pb-4
              flex
              flex-col
              justify-evenly
            "
          >
            <h1 className="text-3xl leading-none font-bold text-[#4B0082]">
              Faça login
            </h1>

            <div className="flex flex-col gap-3">
              {/* Email */}
              <div className="relative flex items-center">
                <Mail
                  size={19}
                  className="pointer-events-none absolute left-4 text-[#4B0082]"
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
                    h-12
                    w-full
                    rounded-full
                    border
                    border-zinc-300
                    bg-[#F5F5F5]
                    pl-12
                    pr-4
                    text-zinc-700
                    placeholder:text-zinc-400
                    focus:border-[#4B0082]
                    focus:outline-none
                  "
                />
              </div>

              {/* Senha */}
              <div>
                <div className="relative flex items-center">
                  <Lock
                    size={19}
                    className="pointer-events-none absolute left-4 text-[#4B0082]"
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
                      h-12
                      w-full
                      rounded-full
                      border
                      border-zinc-300
                      bg-[#F5F5F5]
                      pl-12
                      pr-4
                      text-zinc-700
                      placeholder:text-zinc-400
                      focus:border-[#4B0082]
                      focus:outline-none
                    "
                  />
                </div>

                <div className="flex justify-end pt-1 pr-2">
                  <button
                    type="button"
                    className="text-sm text-zinc-500 hover:text-[#741582]"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              </div>
            </div>

            {erro && (
              <p className="text-center text-sm text-red-500">
                {erro}
              </p>
            )}

            {/* Entrar */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={carregando}
              className="
                h-12
                w-full
                rounded-full
                bg-[#C500E1]
                font-bold
                text-white
                shadow-md
                transition-colors
                hover:bg-[#3a006f]
                disabled:opacity-60
              "
            >
              {carregando ? 'Conectando...' : 'ENTRAR'}
            </button>

            {/* Divisor */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="text-sm text-zinc-400">ou</span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            {/* Cadastro */}
            <button
              type="button"
              onClick={() => router.push('/cadastro')}
              className="
                h-12
                w-full
                rounded-full
                border-2
                border-[#C500E1]
                font-bold
                text-[#C500E1]
                transition-colors
                hover:bg-[#C500E1]
                hover:text-white
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
              disabled={carregando}
              className="w-full bg-[#C500E1] text-white font-bold py-3 rounded-full hover:bg-[#3a006f] transition-colors shadow-md"
            >
              {carregando ? 'Conectando...' : 'ENTRAR'}
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