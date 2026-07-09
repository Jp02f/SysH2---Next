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

  const handleLogin = async () => {
  setErro("");

  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
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
  }
};

  return (
    <div className="h-screen flex overflow-hidden bg-[#F1F1EF] items-center justify-center">

      {/* Lado esquerdo — ilustração */}
      <div className="hidden lg:flex w-1/2 items-center justify-end pr-0">
        <Image
          src="/ilustracao-login.svg"
          alt="Ilustração de login"
          width={600}
          height={600}
          className="w-full h-auto max-w-[500px]"
        />
      </div>

      {/* Lado direito — formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-start pl-0">
        <div className="bg-[#F1F1EF] rounded-[2rem] p-14 w-full max-w-lg flex flex-col gap-6 min-h-[600px] justify-center" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>

          {/* Logo */}
          <div className="flex justify-center">
            <Logo className="h-16 w-auto" />
          </div>

          {/* Título */}
          <h1 className="text-2xl font-bold text-[#4B0082]">Faça login</h1>

          {/* Inputs */}
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

          {/* Erro */}
          {erro && (
            <p className="text-red-500 text-sm text-center">{erro}</p>
          )}

          {/* Botão entrar */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#C500E1] text-white font-bold py-3 rounded-full hover:bg-[#3a006f] transition-colors shadow-md"
          >
            ENTRAR
          </button>

          {/* Cadastro */}
          <p className="text-center text-zinc-600 text-sm">
            Não possui conta?{' '}
            <button 
            onClick={() => router.push('/cadastro')}
            className="text-[#C500E1] font-semibold hover:underline">
              Cadastra-se
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}