'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Rocket, ArrowRight, CheckCircle2, TrendingUp, Sparkles, Target, Zap } from 'lucide-react';

export default function OnboardingStep1() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleContinue = () => {
    if (!selectedOption) return;
    
    setIsAnimating(true);
    localStorage.setItem('emprega_ai_goal', selectedOption);
    
    // Pequeno delay para animação de sucesso
    setTimeout(() => {
      router.push('/onboarding/profissao');
    }, 400);
  };

  const options = [
    {
      id: 'urgent',
      icon: Rocket,
      color: 'blue',
      title: 'Preciso de emprego agora',
      subtitle: 'Modo Rápido',
      description: 'Estou desempregado ou à procura do primeiro emprego. Foco em volume e velocidade.',
      benefits: ['Candidaturas automáticas diárias', 'Prioridade em vagas urgentes', 'CV otimizado para ATS'],
      gradient: 'from-blue-500/20 to-blue-600/20',
      ringColor: 'ring-blue-100',
      borderColor: 'border-blue-500',
    },
    {
      id: 'change',
      icon: TrendingUp,
      color: 'green',
      title: 'Quero evoluir na carreira',
      subtitle: 'Modo Estratégico',
      description: 'Já trabalho, mas procuro melhores oportunidades e crescimento profissional.',
      benefits: ['Busca sigilosa e discreta', 'Foco em salários superiores', 'Match com cultura empresarial'],
      gradient: 'from-green-500/20 to-emerald-600/20',
      ringColor: 'ring-green-100',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex flex-col">
      {/* Barra de Progresso Melhorada */}
      <div className="w-full bg-gray-200 h-1">
        <div 
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 transition-all duration-1000 ease-out shadow-lg shadow-blue-200" 
          style={{ width: '25%' }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full">
          
          {/* Header com animação */}
          <div className="text-center mb-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 bg-white border border-blue-100 text-blue-600 px-5 py-2 rounded-full text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4" />
              Passo 1 de 4 · Personalização IA
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Olá! 👋 Qual é o seu{' '}
                <span className="bg-gradient text-gray-900">
                  objetivo
                </span>
                ?
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Para nossa IA traçar a estratégia perfeita, precisamos entender seu momento atual.
              </p>
            </div>
          </div>

          {/* Cards de Opções Melhorados */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`
                  group relative p-8 rounded-3xl border-2 text-left transition-all duration-300
                  hover:scale-[1.02] hover:shadow-2xl
                  animate-in fade-in slide-in-from-bottom-4
                  ${selectedOption === option.id 
                    ? `border-${option.color}-500 ${option.bgColor} shadow-xl ring-4 ${option.ringColor}` 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge de Recomendação */}
                {option.id === 'urgent' && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-blue-400 to-blue-950 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Mais Rápido
                  </div>
                )}
                
                {/* Header do Card */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`
                    p-4 rounded-2xl transition-all duration-300
                    ${selectedOption === option.id 
                      ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg` 
                      : `${option.bgColor} text-${option.color}-600`
                    }
                  `}>
                    <option.icon className="w-8 h-8" />
                  </div>
                  
                  {selectedOption === option.id && (
                    <div className="animate-in zoom-in duration-300">
                      <CheckCircle2 className={`w-7 h-7 text-${option.color}-500`} />
                    </div>
                  )}
                </div>

                {/* Conteúdo do Card */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`
                        text-2xl font-bold transition-colors
                        ${selectedOption === option.id ? `text-${option.color}-600` : 'text-gray-900'}
                      `}>
                        {option.title}
                      </h3>
                    </div>
                    <p className={`
                      text-xs font-semibold tracking-wide uppercase mb-3
                      ${selectedOption === option.id ? `text-${option.color}-500` : 'text-gray-400'}
                    `}>
                      {option.subtitle}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {option.description}
                    </p>
                  </div>

                  {/* Benefícios */}
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                      A IA vai priorizar:
                    </p>
                    {option.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`
                          w-1.5 h-1.5 rounded-full 
                          ${selectedOption === option.id ? `bg-${option.color}-500` : 'bg-gray-300'}
                        `} />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Indicador de Hover */}
                <div className={`
                  absolute inset-0 rounded-3xl transition-opacity duration-300
                  ${selectedOption === option.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}
                  bg-gradient-to-r ${option.gradient} opacity-5
                `} />
              </button>
            ))}
          </div>

          {/* CTA com Feedback Melhorado */}
          <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '300ms' }}>
            <button
              onClick={handleContinue}
              disabled={!selectedOption || isAnimating}
              className={`
                group flex items-center gap-3 px-12 py-5 rounded-2xl text-lg font-bold 
                transition-all duration-300 shadow-lg
                ${selectedOption && !isAnimating
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-2xl hover:shadow-blue-200 hover:-translate-y-1 active:scale-95' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {isAnimating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Continuar para o próximo passo
                  <ArrowRight className={`w-5 h-5 transition-transform ${selectedOption ? 'group-hover:translate-x-1' : ''}`} />
                </>
              )}
            </button>

            {/* Feedback Contextual */}
            <div className="text-center space-y-1">
              {selectedOption ? (
                <div className="flex items-center gap-2 text-sm text-gray-600 animate-in fade-in duration-300">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span>
                    Perfeito! A IA já está ajustando sua estratégia para modo{' '}
                    <strong>{selectedOption === 'urgent' ? 'Rápido' : 'Estratégico'}</strong>
                  </span>
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  Selecione uma opção acima para começar 👆
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Indicador de Progresso Textual */}
      <div className="pb-6 text-center">
        <p className="text-xs text-gray-400 font-medium">
          25% concluído · Tempo estimado restante: 2 minutos
        </p>
      </div>
    </div>
  );
}