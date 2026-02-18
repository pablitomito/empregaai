'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// Importa os dois componentes que criámos
import DashPendente from './componentes/DashPendente';
import DashCompleto from './componentes/DashCompleto';

export default function DashboardPage() {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>(''); // Novo estado para o nome

  useEffect(() => {
    // 1. Verifica se existe Token e Dados do Usuário
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    // 2. Lê os dados e o status do usuário
    try {
      const user = JSON.parse(userData);
      
      // Extraímos o nome (ou usamos 'Recruta' como fallback)
      // .split(' ')[0] serve para pegar apenas o primeiro nome e ficar mais amigável
      const firstName = user.fullName ? user.fullName.split(' ')[0] : 'Usuário';
      setUserName(firstName);
      
      // Define o status para decidir qual dash mostrar
      setStatus(user.profileStatus || 'pending');
    } catch (error) {
      console.error("Erro ao ler dados do usuário", error);
      localStorage.clear(); 
      router.push('/login');
    }
  }, [router]);

  // Tela de Carregamento (Spinner)
  if (status === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-gray-500 font-medium">A carregar o seu espaço...</p>
        </div>
      </div>
    );
  }

  // 3. A Decisão Final: Passamos o userName para o DashPendente
  return (
    <>
      {status === 'completed' ? (
        <DashCompleto />
      ) : (
        <DashPendente nome={userName} />
      )}
    </>
  );
}