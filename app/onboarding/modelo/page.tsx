'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Laptop, 
  Building, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Info,
  Zap
} from 'lucide-react';

export default function ModeloPage() {
  const router = useRouter();
  
  const [ideal, setIdeal] = useState<string | null>(null);
  const [disponibilidade, setDisponibilidade] = useState<string | null>(null);
  const [showTip, setShowTip] = useState(false);

  const modelos = [
    { 
      id: 'presencial', 
      title: 'Presencial', 
      icon: Building,
      color: 'blue',
      subtitle: 'No escritório',
      description: 'Prefiro o contato direto com a equipe e a estrutura física da empresa'
    },
    { 
      id: 'hibrido', 
      title: 'Híbrido', 
      icon: MapPin,
      color: 'purple',
      subtitle: 'Mix equilibrado',
      description: 'Melhor dos dois mundos: alguns dias presencial, outros remoto'
    },
    { 
      id: 'remoto', 
      title: '100% Remoto', 
      icon: Laptop,
      color: 'green',
      subtitle: 'De qualquer lugar',
      description: 'Trabalho melhor com flexibilidade total de localização'
    },
  ];

  const opcionaisDisponibilidade = [
    { 
      id: 'apenas_ideal', 
      label: 'Apenas no meu modelo ideal',
      description: 'Não aceito outras opções',
      restrictive: true
    },
    { 
      id: 'flexivel_similar', 
      label: 'Aceito modelos similares',
      description: 'Ex: Se escolhi remoto, aceito híbrido também',
      restrictive: false
    },
    { 
      id: 'totalmente_flexivel', 
      label: 'Estou aberto a qualquer modelo',
      description: 'Priorizo a oportunidade, não o modelo',
      recommended: true,
      restrictive: false
    },
  ];

  const handleContinue = () => {
    if (!ideal || !disponibilidade) return;
    
    localStorage.setItem('emprega_ai_modelo_ideal', ideal);
    localStorage.setItem('emprega_ai_disponibilidade_real', disponibilidade);
    
    router.push('/onboarding/expectativas');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 flex flex-col">
      {/* Barra de Progresso */}
      <div className="w-full bg-gray-200 h-1">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-blue-900 h-1 transition-all duration-700 shadow-lg shadow-indigo-200" 
          style={{ width: '75%' }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          
          {/* Botão Voltar */}
          <button 
            onClick={() => router.back()} 
            className="group text-gray-400 hover:text-gray-700 mb-8 flex items-center gap-2 text-sm font-medium transition-all hover:-translate-x-1"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar
          </button>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
            
            {/* Badge do Passo */}
            <div className="flex items-center gap-2 text-blue-800 font-bold mb-8 text-sm bg-indigo-50 w-fit px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              Passo 3 de 4 · Flexibilidade
            </div>

            {/* PERGUNTA 1: O IDEAL */}
            <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4 mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Qual seria o seu modelo de trabalho{' '}
                  <span className="bg-gradient-to-r text-gray-900">
                    ideal
                  </span>
                  ?
                </h1>
                <p className="text-gray-600 text-lg">
                  Onde você se sente mais produtivo e feliz? 🎯
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {modelos.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIdeal(item.id);
                      setShowTip(true);
                    }}
                    className={`
                      group relative p-6 rounded-2xl border-2 transition-all duration-300
                      hover:scale-105 hover:shadow-xl
                      animate-in fade-in slide-in-from-bottom-4
                      ${ideal === item.id 
                        ? 'border-indigo-500 bg-indigo-50 shadow-lg ring-4 ring-indigo-100' 
                        : 'border-gray-200 bg-white hover:border-indigo-200'
                      }
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Ícone */}
                    <div className="flex justify-center mb-4">
                      <div className={`
                        p-4 rounded-2xl transition-all
                        ${ideal === item.id 
                          ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-50 group-hover:text-blue-800'
                        }
                      `}>
                        <item.icon className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="text-center space-y-2">
                      <h3 className={`
                        text-xl font-bold transition-colors
                        ${ideal === item.id ? 'text-blue-800' : 'text-gray-900'}
                      `}>
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        {item.subtitle}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Checkmark */}
                    {ideal === item.id && (
                      <div className="absolute -top-2 -right-2 bg-indigo-500 rounded-full p-1 shadow-lg animate-in zoom-in duration-300">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* PERGUNTA 2: A FLEXIBILIDADE */}
            {ideal && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                
                {/* Dica Estratégica */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-5 rounded-2xl">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-amber-900">Dica Estratégica</h4>
                        <TrendingUp className="w-4 h-4 text-amber-600" />
                      </div>
                      <p className="text-sm text-amber-800 leading-relaxed">
                        {ideal === 'remoto' && (
                          <>
                            Vagas 100% remotas são <strong>3x mais concorridas</strong>. 
                            Aceitar híbrido pode aumentar suas chances em <strong>400%</strong>.
                          </>
                        )}
                        {ideal === 'presencial' && (
                          <>
                            Ótima escolha! Vagas presenciais têm <strong>40% menos concorrência</strong> 
                            e empresas valorizam quem prefere presença física.
                          </>
                        )}
                        {ideal === 'hibrido' && (
                          <>
                            Perfeito! Híbrido é o modelo <strong>mais procurado por empresas</strong> 
                            em 2024, com 60% das vagas neste formato.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Segunda Pergunta */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Agora seja sincero(a): você seria flexível?
                    </h2>
                    <p className="text-gray-600">
                      Esta resposta <strong>não</strong> aparece para recrutadores. É só para a IA saber onde procurar.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {opcionaisDisponibilidade.map((opt, index) => (
                      <button
                        key={opt.id}
                        onClick={() => setDisponibilidade(opt.id)}
                        className={`
                          group relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all
                          hover:scale-[1.02] hover:shadow-lg
                          animate-in fade-in slide-in-from-bottom-4
                          ${disponibilidade === opt.id 
                            ? 'border-gray-900 bg-gray-900 shadow-xl' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                          }
                        `}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex-1 text-left space-y-1">
                          <div className="flex items-center gap-3">
                            <span className={`
                              font-bold text-lg
                              ${disponibilidade === opt.id ? 'text-white' : 'text-gray-900'}
                            `}>
                              {opt.label}
                            </span>
                            {opt.recommended && (
                              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">
                                Recomendado
                              </span>
                            )}
                            {opt.restrictive && (
                              <Info className="w-4 h-4 text-amber-500" />
                            )}
                          </div>
                          <p className={`
                            text-sm
                            ${disponibilidade === opt.id ? 'text-gray-300' : 'text-gray-500'}
                          `}>
                            {opt.description}
                          </p>
                        </div>
                        
                        <div className="flex-shrink-0">
                          {disponibilidade === opt.id ? (
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-gray-400 transition-colors" />
                          )}
                        </div>

                        {opt.restrictive && disponibilidade === opt.id && (
                          <div className="absolute -bottom-12 left-0 right-0 animate-in fade-in duration-300">
                            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-700 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 flex-shrink-0" />
                              <span>Atenção: Esta escolha pode reduzir o número de vagas encontradas</span>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estatística Motivacional */}
                {disponibilidade && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-5 rounded-2xl animate-in fade-in duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-blue-900 mb-1">Sua estratégia está definida!</p>
                        <p className="text-sm text-blue-700">
                          {disponibilidade === 'apenas_ideal' && 'A IA vai buscar apenas vagas no seu modelo ideal. Foco total!'}
                          {disponibilidade === 'flexivel_similar' && 'A IA vai priorizar seu modelo ideal, mas não vai perder boas oportunidades similares.'}
                          {disponibilidade === 'totalmente_flexivel' && 'Ótima estratégia! A IA vai encontrar 3-4x mais vagas compatíveis.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Botão de Continuar */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <button
                onClick={handleContinue}
                disabled={!ideal || !disponibilidade}
                className={`
                  group w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3
                  ${ideal && disponibilidade
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-2xl hover:shadow-indigo-200 hover:-translate-y-1 active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Continuar para Expectativas
                <ArrowRight className={`w-5 h-5 transition-transform ${ideal && disponibilidade ? 'group-hover:translate-x-1' : ''}`} />
              </button>
            </div>
          </div>

          {/* Indicador de Progresso */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 font-medium">
              75% concluído · Falta só mais 1 passo!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}