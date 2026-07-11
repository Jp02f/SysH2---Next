'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UsuarioLogado {
  id_usuario: number;
  nome: string;
  bloco?: string | null;
  apartamento?: number | null;
}

export function useAuthGuard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const dados = localStorage.getItem('usuario');

    if (!dados) {
      router.push('/');
      return;
    }

    setUsuario(JSON.parse(dados));
    setCarregando(false);
  }, [router]);

  return { usuario, carregando };
}