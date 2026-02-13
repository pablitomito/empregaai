"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Target, Briefcase, Zap } from "lucide-react";

export default function AnalisandoPerfil() {
  // Inicializa o router corretamente dentro do componente
  const router = useRouter();
  
  // Estados para controlar a animação e as mensagens
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [concluido, setConcluido] = useState(false);

  const etapas = [
    { id: 1, texto: "Analisando seu perfil...", ícone: <Target className="w-6 h-6" /> },
    { id: 2, texto: "Otimizando palavras-chave para o mercado...", ícone: <Zap className="w-6 h-6" /> },
    { id: 3, texto: "Buscando oportunidades compatíveis...", ícone: <Briefcase className="w-6 h-6" /> },
  ];

  useEffect(() => {
    if (etapaAtual < etapas.length) {
      const timer = setTimeout(() => {
        setEtapaAtual((prev) => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setConcluido(true);
    }
  }, [etapaAtual, etapas.length]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      {!concluido ? (
        <div className="max-w-md w-full space-y-8">
          <div className="relative flex justify-center">
             <div className="absolute inset-0 bg-blue-200 blur-3xl opacity-30 rounded-full"></div>
             <Loader2 className="w-16 h-16 text-blue-600 animate-spin relative z-10" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800">Processando Inteligência...</h2>
          
          <div className="space-y-4">
            {etapas.map((etapa, index) => (
              <div 
                key={etapa.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                  index <= etapaAtual ? "opacity-100" : "opacity-30"
                } ${index < etapaAtual ? "bg-green-50 text-green-700" : "bg-white border border-slate-200"}`}
              >
                {index < etapaAtual ? <CheckCircle2 className="text-green-500" /> : etapa.ícone}
                <span className="font-medium">{etapa.texto}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-lg w-full bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
          <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
            <CheckCircle2 className="text-white w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
            Temos uma ótima notícia!
          </h1>
          
          <p className="text-lg text-slate-600 mb-8">
            Encontramos <span className="font-bold text-blue-600 text-xl">41 vagas</span> em aberto nesse exato momento que são <span className="underline decoration-blue-400">perfeitas para você.</span>
          </p>

          <button 
            onClick={() => router.push('/onboarding/vagas')} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 text-lg"
          >
            Candidatar-me agora
            <Zap className="w-5 h-5 fill-current" />
          </button>
        </div>
      )}
    </div>
  );
}