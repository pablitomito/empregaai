'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Rocket, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Target,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function OnboardingStep1() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  // Função para salvar e avançar
  const handleContinue = () => {
    if (!selectedOption) return;

    // Salvamos a escolha no navegador para usar na próxima página
    localStorage.setItem('emprega_ai_goal', selectedOption);

    // Redirecionamento inteligente baseado na escolha (Lógica de Ramificação)
    // Se for 'urgent' -> Vai para perguntas de desempregado
    // Se for 'change' -> Vai para perguntas de transição de carreira
    
    // Por enquanto, vamos mandar ambos para a step2, mas levando esse "flag"
    router.push('/onboarding/step2'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* --- BARRA DE PROGRESSO --- */}
      <div className="w-full bg-gray-200 h-2">
        <div 
          className="bg-[#2563EB] h-2 transition-all duration-1000 ease-out" 
          style={{ width: '15%' }} // 15% concluído
        ></div>
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        
        <div className="max-w-4xl w-full">
          
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#2563EB] px-4 py-1 rounded-full text-sm font-bold mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              Passo 1 de 4
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Olá! 👋 Vamos alinhar o seu objetivo.
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Para a nossa Inteligência Artificial traçar a melhor estratégia, qual é o seu momento atual de carreira?
            </p>
          </div>

          {/* Cards de Seleção */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            
            {/* OPÇÃO A: URGENTE */}
            <button
              onClick={() => setSelectedOption('urgent')}
              onMouseEnter={() => setIsHovering('urgent')}
              onMouseLeave={() => setIsHovering(null)}
              className={`relative p-8 rounded-2xl border-2 text-left transition-all duration-300 group
                ${selectedOption === 'urgent' 
                  ? 'border-[#2563EB] bg-blue-50 shadow-xl shadow-blue-100 ring-4 ring-blue-100' 
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg'
                }
              `}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-xl transition-colors ${selectedOption === 'urgent' ? 'bg-[#2563EB] text-white' : 'bg-blue-100 text-[#2563EB]'}`}>
                  <Rocket className="w-8 h-8" />
                </div>
                {selectedOption === 'urgent' && (
                  <CheckCircle2 className="w-6 h-6 text-[#2563EB] animate-in zoom-in duration-300" />
                )}
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${selectedOption === 'urgent' ? 'text-[#2563EB]' : 'text-gray-900'}`}>
                Conseguir uma entrevista urgente
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Estou sem trabalhar ou à procura do primeiro emprego. O meu foco é volume de candidaturas e rapidez.
              </p>
            </button>

            {/* OPÇÃO B: MUDANÇA */}
            <button
              onClick={() => setSelectedOption('change')}
              onMouseEnter={() => setIsHovering('change')}
              onMouseLeave={() => setIsHovering(null)}
              className={`relative p-8 rounded-2xl border-2 text-left transition-all duration-300 group
                ${selectedOption === 'change' 
                  ? 'border-[#10B981] bg-green-50 shadow-xl shadow-green-100 ring-4 ring-green-100' 
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-lg'
                }
              `}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-xl transition-colors ${selectedOption === 'change' ? 'bg-[#10B981] text-white' : 'bg-green-100 text-[#10B981]'}`}>
                  <TrendingUp className="w-8 h-8" />
                </div>
                {selectedOption === 'change' && (
                  <CheckCircle2 className="w-6 h-6 text-[#10B981] animate-in zoom-in duration-300" />
                )}
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${selectedOption === 'change' ? 'text-[#10B981]' : 'text-gray-900'}`}>
                Estou a trabalhar, mas quero mudar
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Procuro melhores condições salariais ou mudar de área. O meu foco é qualidade e sigilo.
              </p>
            </button>

          </div>

          {/* Rodapé da Ação */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleContinue}
              disabled={!selectedOption}
              className={`
                group flex items-center gap-3 px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300
                ${selectedOption 
                  ? 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-lg shadow-blue-200 hover:-translate-y-1' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Continuar para o próximo passo
              <ArrowRight className={`w-5 h-5 ${selectedOption ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
            </button>
            
            <p className="text-sm text-gray-400 animate-pulse">
              {selectedOption 
                ? "Ótima escolha! A IA já está a ajustar o tom do seu perfil..." 
                : "Selecione uma opção acima para continuar"
              }
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}