'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Zap
} from 'lucide-react';

export default function FinalPerfilPage() {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  // Simulação de processamento da IA para criar autoridade no produto
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000); // 3 segundos de "análise"
    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    // Aqui no futuro faremos o POST para o seu Banco de Dados
    
    // REDIRECIONAMENTO CORRIGIDO:
    router.push('/onboarding/curriculo'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      
      <div className="max-w-md w-full text-center">
        
        {isAnalyzing ? (
          /* ESTADO 1: ANALISANDO (Animação de IA) */
          <div className="space-y-6 animate-pulse">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Configurando seu perfil...</h2>
              <p className="text-gray-500">A nossa IA está a processar as suas respostas para otimizar a sua experiência.</p>
            </div>

            <div className="flex flex-col gap-2 max-w-xs mx-auto text-left">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Cruzando objetivos...
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Definindo prioridades de busca...
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" /> Ajustando algoritmo...
              </div>
            </div>
          </div>
        ) : (
          /* ESTADO 2: FINALIZADO */
          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShieldCheck className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tudo pronto!</h1>
            <p className="text-gray-500 mb-10 leading-relaxed">
              O seu perfil estratégico foi configurado com sucesso. Agora, vamos construir o seu currículo de alto impacto.
            </p>

            <div className="space-y-4">
              <button
                onClick={handleFinish}
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 group text-lg"
              >
                Começar a Criar Currículo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                Dica: Leva apenas 5 minutos para terminar.
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER DE CONFIANÇA */}
      {!isAnalyzing && (
        <div className="mt-12 flex items-center gap-6 opacity-50 grayscale">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Emprega-AI Engine v1.0</span>
          <Sparkles className="w-5 h-5" />
        </div>
      )}

    </div>
  );
}