'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Euro,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Gift,
  Heart,
  Car,
  GraduationCap,
  Home,
  Plane,
  Shield,
  Coffee,
  Zap,
  Target
} from 'lucide-react';

export default function ExpectativasPage() {
  const router = useRouter();
  
  const [faixaSalarial, setFaixaSalarial] = useState<string | null>(null);
  const [beneficiosEscolhidos, setBeneficiosEscolhidos] = useState<string[]>([]);
  const [dealBreakers, setDealBreakers] = useState<string[]>([]);
  const [revelarSalario, setRevelarSalario] = useState<boolean | null>(null);

  // Faixas Salariais (Portugal)
  const faixasSalariais = [
    { id: 'ate_1500', label: 'Até €1.500', subtitle: 'Inicial', color: 'blue' },
    { id: '1500_2500', label: '€1.500 - €2.500', subtitle: 'Intermédio', color: 'purple' },
    { id: '2500_4000', label: '€2.500 - €4.000', subtitle: 'Sénior', color: 'indigo' },
    { id: 'acima_4000', label: 'Acima de €4.000', subtitle: 'Especialista', color: 'green' },
    { id: 'negociavel', label: 'Negociável', subtitle: 'Aberto', color: 'gray' },
  ];

  // Benefícios Populares
  const beneficiosDisponiveis = [
    { id: 'seguro_saude', nome: 'Seguro de Saúde', icon: Heart, popular: true },
    { id: 'veiculo', nome: 'Viatura da Empresa', icon: Car, popular: false },
    { id: 'formacao', nome: 'Formação Contínua', icon: GraduationCap, popular: true },
    { id: 'teletrabalho', nome: 'Dias de Teletrabalho', icon: Home, popular: true },
    { id: 'ferias_extra', nome: 'Férias Extra', icon: Plane, popular: false },
    { id: 'bonus', nome: 'Bónus/Prémios', icon: Gift, popular: true },
    { id: 'subsidio_alimentacao', nome: 'Subsídio Refeição Elevado', icon: Coffee, popular: false },
    { id: 'horario_flexivel', nome: 'Horário Flexível', icon: Shield, popular: true },
  ];

  // Deal Breakers (Red Flags)
  const dealBreakersOpcoes = [
    'Salário abaixo do mercado',
    'Sem contrato formal',
    'Horários irregulares não compensados',
    'Sem oportunidade de crescimento',
    'Ambiente tóxico (baseado em reviews)',
  ];

  const toggleBeneficio = (id: string) => {
    if (beneficiosEscolhidos.includes(id)) {
      setBeneficiosEscolhidos(beneficiosEscolhidos.filter(b => b !== id));
    } else {
      if (beneficiosEscolhidos.length >= 5) return;
      setBeneficiosEscolhidos([...beneficiosEscolhidos, id]);
    }
  };

  const toggleDealBreaker = (item: string) => {
    if (dealBreakers.includes(item)) {
      setDealBreakers(dealBreakers.filter(d => d !== item));
    } else {
      setDealBreakers([...dealBreakers, item]);
    }
  };

  const handleContinue = () => {
    if (!faixaSalarial || revelarSalario === null) return;
    
    localStorage.setItem('emprega_ai_faixa_salarial', faixaSalarial);
    localStorage.setItem('emprega_ai_beneficios', JSON.stringify(beneficiosEscolhidos));
    localStorage.setItem('emprega_ai_deal_breakers', JSON.stringify(dealBreakers));
    localStorage.setItem('emprega_ai_revelar_salario', String(revelarSalario));
    
    router.push('/onboarding/perfil');
  };

  const isComplete = faixaSalarial && revelarSalario !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 flex flex-col">
      {/* Barra de Progresso - 100% (última página) */}
      <div className="w-full bg-gray-200 h-1">
        <div 
          className="bg-gradient-to-r from-blue-900 to-blue-950 h-1 transition-all duration-700 shadow-lg shadow-blue-200" 
          style={{ width: '100%' }}
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
            <div className="flex items-center gap-2 text-blue-700 font-bold mb-8 text-sm bg-green-50 w-fit px-4 py-2 rounded-full">
              <Target className="w-4 h-4" />
              Passo 4 de 4 · Última Etapa!
            </div>

            {/* Título Principal */}
            <div className="space-y-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Vamos falar sobre{' '}
                <span className="bg-gradient-to-r text-gray-900">
                  expectativas
                </span>
                💰
              </h1>
              <p className="text-gray-600 text-lg">
                Para a IA filtrar apenas vagas compatíveis com o seu perfil financeiro e prioridades.
              </p>
            </div>

            {/* SEÇÃO 1: FAIXA SALARIAL */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Euro className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Qual a sua expectativa salarial?</h2>
                  <p className="text-sm text-gray-500">Salário bruto mensal (antes de impostos)</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {faixasSalariais.map((faixa, index) => (
                  <button
                    key={faixa.id}
                    onClick={() => setFaixaSalarial(faixa.id)}
                    className={`
                      relative p-5 rounded-2xl border-2 transition-all text-left
                      hover:scale-105 hover:shadow-lg
                      animate-in fade-in slide-in-from-bottom-4
                      ${faixaSalarial === faixa.id 
                        ? 'border-blue-500 bg-blue-50 shadow-md ring-4 ring-blue-100' 
                        : 'border-gray-200 bg-white hover:border-blue-200'
                      }
                    `}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`
                          text-lg font-bold
                          ${faixaSalarial === faixa.id ? 'text-blue-600' : 'text-gray-900'}
                        `}>
                          {faixa.label}
                        </span>
                        {faixaSalarial === faixa.id && (
                          <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        {faixa.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Aviso de Privacidade */}
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
                <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700 leading-relaxed">
                  <strong>Privacidade 100%:</strong> Esta informação nunca é partilhada com recrutadores. 
                  Serve apenas para a IA filtrar vagas compatíveis.
                </p>
              </div>
            </div>

            {/* SEÇÃO 2: BENEFÍCIOS IMPORTANTES */}
            <div className="space-y-6 mb-10 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Que benefícios são importantes para si?</h2>
                  <p className="text-sm text-gray-500">Escolha até 5 benefícios que valoriza</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {beneficiosDisponiveis.map((ben, index) => {
                  const isSelected = beneficiosEscolhidos.includes(ben.id);
                  const Icon = ben.icon;
                  
                  return (
                    <button
                      key={ben.id}
                      onClick={() => toggleBeneficio(ben.id)}
                      disabled={!isSelected && beneficiosEscolhidos.length >= 5}
                      className={`
                        relative p-4 rounded-xl border-2 transition-all text-center
                        hover:scale-105 disabled:hover:scale-100 disabled:opacity-40 disabled:cursor-not-allowed
                        animate-in fade-in zoom-in
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                          : 'border-gray-200 bg-white hover:border-blue-200'
                        }
                      `}
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      {ben.popular && !isSelected && (
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Popular
                        </div>
                      )}
                      
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                      <p className={`text-xs font-medium ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                        {ben.nome}
                      </p>
                      
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-blue-500 absolute top-2 right-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="text-sm text-gray-400 text-center">
                {beneficiosEscolhidos.length}/5 benefícios selecionados
              </p>
            </div>

            {/* SEÇÃO 3: DEAL BREAKERS */}
            <div className="space-y-6 mb-10 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">O que você definitivamente <u>não</u> aceita?</h2>
                  <p className="text-sm text-gray-500">A IA vai ignorar vagas com estas características</p>
                </div>
              </div>

              <div className="space-y-3">
                {dealBreakersOpcoes.map((item, index) => {
                  const isSelected = dealBreakers.includes(item);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => toggleDealBreaker(item)}
                      className={`
                        w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between
                        hover:shadow-md
                        animate-in fade-in slide-in-from-left
                        ${isSelected 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-200 bg-white hover:border-red-200'
                        }
                      `}
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <span className={`font-medium ${isSelected ? 'text-red-700' : 'text-gray-700'}`}>
                        {item}
                      </span>
                      <div className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${isSelected ? 'border-red-500 bg-red-500' : 'border-gray-300'}
                      `}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SEÇÃO 4: REVELAR SALÁRIO ATUAL? */}
            <div className="space-y-6 mb-10 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Quer partilhar o salário atual com a IA?</h2>
                  <p className="text-sm text-gray-500">Ajuda a IA a negociar aumentos realistas</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setRevelarSalario(true)}
                  className={`
                    p-6 rounded-2xl border-2 transition-all text-left
                    hover:scale-105 hover:shadow-lg
                    ${revelarSalario === true 
                      ? 'border-blue-500 bg-blue-50 shadow-md ring-4 ring-blue-100' 
                      : 'border-gray-200 bg-white hover:border-blue-200'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`
                      p-3 rounded-xl
                      ${revelarSalario === true ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'}
                    `}>
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    {revelarSalario === true && <CheckCircle2 className="w-6 h-6 text-black"/>}
                  </div>
                  <h3 className={`font-bold text-lg mb-1 ${revelarSalario === true ? 'text-gray-900' : 'text-gray-700'}`}>
                    Sim, vou partilhar
                  </h3>
                  <p className="text-sm text-gray-600">
                    A IA vai priorizar vagas com salário 20-30% superior ao atual
                  </p>
                </button>

                <button
                  onClick={() => setRevelarSalario(false)}
                  className={`
                    p-6 rounded-2xl border-2 transition-all text-left
                    hover:scale-105 hover:shadow-lg
                    ${revelarSalario === false 
                      ? 'border-gray-900 bg-gray-900 text-white shadow-md ring-4 ring-gray-200' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`
                      p-3 rounded-xl
                      ${revelarSalario === false ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}
                    `}>
                      <Shield className="w-6 h-6" />
                    </div>
                    {revelarSalario === false && <CheckCircle2 className="w-6 h-6 text-white" />}
                  </div>
                  <h3 className={`font-bold text-lg mb-1 ${revelarSalario === false ? 'text-white' : 'text-gray-900'}`}>
                    Não, prefiro não revelar
                  </h3>
                  <p className={`text-sm ${revelarSalario === false ? 'text-gray-300' : 'text-gray-600'}`}>
                    A IA vai usar apenas a expectativa que escolheu acima
                  </p>
                </button>
              </div>
            </div>

            {/* Resumo e Motivação */}
            {isComplete && (
              <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 p-6 rounded-2xl animate-in fade-in duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-600 text-lg">Tudo pronto!</h3>
                    <p className="text-sm text-blue-700">A IA já sabe exatamente o que procurar</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/60 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">Faixa Salarial</p>
                    <p className="font-bold text-gray-900">
                      {faixasSalariais.find(f => f.id === faixaSalarial)?.label}
                    </p>
                  </div>
                  <div className="bg-white/60 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">Benefícios</p>
                    <p className="font-bold text-gray-900">
                      {beneficiosEscolhidos.length} selecionados
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Botão Final */}
            <button
              onClick={handleContinue}
              disabled={!isComplete}
              className={`
                group w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3
                ${isComplete
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-2xl hover:shadow-blue-200 hover:-translate-y-1 active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Começar a criação do curriculo
              <ArrowRight className={`w-5 h-5 transition-transform ${isComplete ? 'group-hover:translate-x-1' : ''}`} />
            </button>

            {!isComplete && (
              <p className="text-center text-sm text-gray-400 mt-4">
                Responda todas as perguntas para continuar
              </p>
            )}
          </div>

          {/* Indicador de Progresso */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 font-medium">
              ✓ 100% concluído · Pronto para começar!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}