'use client'
import { X, Lock, LogOut } from 'lucide-react';
import { getIniciais } from '@/lib/iniciais';
import { useRouter } from 'next/navigation';
import Logo from './logo';

interface UsuarioLogado {
  nome: string;
  tipo_usuario?: number;
}

interface DrawerPerfilProps {
  aberto: boolean;
  onClose: () => void;
  usuario: UsuarioLogado | null;
}

function labelPerfil(tipo?: number) {
  if (tipo === 1) return 'Morador(a)';
  if (tipo === 2) return 'Porteiro(a)';
  if (tipo === 3) return 'Síndico(a)';
  return '';
}

export default function DrawerPerfil({ aberto, onClose, usuario }: DrawerPerfilProps) {
  const router = useRouter();

  const handleSair = () => {
    localStorage.removeItem('usuario');
    router.push('/');
  };

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      {/* Overlay escurecido */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Painel deslizante */}
      <div className="relative w-[85%] max-w-sm h-full bg-white flex flex-col animate-in slide-in-from-left duration-200">

        {/* Botão fechar */}
        <div className="flex justify-end p-4">
          <button onClick={onClose} type="button">
            <X size={24} className="text-zinc-900" />
          </button>
        </div>

        {/* Avatar + nome */}
        <div className="flex flex-col items-center gap-2 px-6 pb-6">
          <div className="w-20 h-20 rounded-full bg-[#C500E1]/10 flex items-center justify-center font-black text-[#C500E1] text-2xl">
            {usuario ? getIniciais(usuario.nome) : '?'}
          </div>
          <p className="font-bold text-zinc-900 text-lg uppercase text-center">
            {usuario?.nome || 'Visitante'}
          </p>
          <p className="text-[#4B0082] text-sm font-medium">
            {labelPerfil(usuario?.tipo_usuario)}
          </p>
        </div>

        <div className="h-px bg-zinc-200" />

        {/* Opções */}
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => router.push('/alterar-senha')}
            className="flex items-center gap-4 px-6 py-5 text-left hover:bg-zinc-50 transition-colors"
          >
            <Lock size={22} className="text-[#4B0082]" />
            <div>
              <p className="font-bold text-[#4B0082]">Alterar Senha</p>
              <p className="text-sm text-zinc-500">Altere sua senha de acesso</p>
            </div>
          </button>

          <button
            type="button"
            onClick={handleSair}
            className="flex items-center gap-4 px-6 py-5 text-left hover:bg-zinc-50 transition-colors"
          >
            <LogOut size={22} className="text-[#4B0082]" />
            <div>
              <p className="font-bold text-[#4B0082]">Sair</p>
              <p className="text-sm text-zinc-500">Encerrar sua sessão</p>
            </div>
          </button>
        </div>

        {/* Rodapé com logo */}
        <div className="mt-auto mx-6 mb-6 bg-[#F3E8FF] rounded-2xl p-5 flex flex-col items-center gap-1">
          <Logo className="h-8 w-auto" />
          <p className="text-xs text-zinc-500">Gestão de Encomendas</p>
          <p className="text-xs text-[#7B00FF] font-semibold">Versão 1.0.0</p>
        </div>

      </div>
    </div>
  );
}