'use client';

import { useRouter } from 'next/navigation'; // 1. Importamos o roteador
import { Sparkles, ClipboardCheck, ArrowRight, Target } from 'lucide-react';

interface DashPendenteProps {
  nome: string;
}

export default function DashPendente({ nome }: DashPendenteProps) {
  const router = useRouter(); // 2. Inicializamos o roteador

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        
        {/* Cabeçalho de Boas-Vindas */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium animate-bounce">
            <Target className="w-4 h-4" />
            O seu sucesso começa aqui
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Seja bem-vindo de volta, <span className="text-blue-600">Senhor(a) {nome}</span>! 
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Você está a apenas <span className="font-bold text-gray-800">um passo</span> de encontrar o emprego dos seus sonhos. Mas, antes de abrirmos as portas das melhores oportunidades, <span className="italic">nós queremos te conhecer melhor.</span>
          </p>
        </div>

        {/* Card de Ação Principal */}
        <div className="mt-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          
          <div className="relative bg-white border border-gray-100 p-8 md:p-12 rounded-2xl shadow-2xl flex flex-col items-center text-center space-y-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
              <ClipboardCheck className="w-10 h-10 text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Mapeamento de Perfil Profissional</h2>
              <p className="text-gray-500">Leva menos de 3 minutos e nossa IA cuidará do resto.</p>
            </div>

            {/* 3. BOTÃO COM REDIRECIONAMENTO */}
            <button 
              onClick={() => router.push('/onboarding/objetivo')} // Redireciona para a pasta da imagem
              className="w-full md:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center gap-3 group"
            >
              Responder questionários sobre mim
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center gap-6 text-sm text-gray-400 font-medium">
              <div className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-amber-400" /> IA Otimizada</div>
              <div className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-amber-400" /> 100% Gratuito</div>
            </div>
          </div>
        </div>

        <p className="text-center mt-10 text-gray-400 text-sm italic">
          "A melhor forma de prever o futuro é criá-lo." — Peter Drucker
        </p>
      </div>
    </div>
  );
}