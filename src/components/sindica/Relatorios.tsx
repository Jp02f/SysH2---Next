'use client'
import Header from '../Header';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { UserPlus, Users, FileText, Building } from 'lucide-react';
import { getIniciais } from '@/lib/iniciais';
import LogoIcon from '../logoicon';
import Link from 'next/link';

export default function Relatorios() {
  const { carregando } = useAuthGuard();

  if (carregando) {
    return null;
  }

  return (
    <div>
      <h1>Relatórios</h1>
      <p>Em desenvolvimento.</p>
    </div>
  );
}