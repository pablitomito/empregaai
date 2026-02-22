'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  X, 
  Target,
  AlertCircle,
  Lightbulb,
  TrendingUp,
  Zap
} from 'lucide-react';

export default function AreasPage() {
  const router = useRouter();
  
  const [inputValue, setInputValue] = useState('');
  const [areas, setAreas] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Sugestões populares baseadas em dados reais do mercado
  const sugestoesPopulares = [
    { nome: 'Tecnologia & TI', trending: true },
    { nome: 'Marketing Digital', trending: true },
    { nome: 'Vendas & Comercial', trending: false },
    { nome: 'Recursos Humanos', trending: false },
    { nome: 'Atendimento ao Cliente', trending: false },
    { nome: 'Administração', trending: false },
    { nome: 'Logística', trending: true },
    { nome: 'Design & Criação', trending: false },
    { nome: 'Financeiro', trending: false },
    { nome: 'Engenharia', trending: false },
  ];

  // Adicionar área
  const addArea = () => {
    const value = inputValue.trim();
    
    if (!value) {
      setError('Digite o nome da área primeiro');
      return;
    }
    
    if (areas.length >= 3) {
      setError('Máximo de 3 áreas. A IA foca melhor com menos opções!');
      return;
    }
    
    if (areas.some(a => a.toLowerCase() === value.toLowerCase())) {
      setError('Você já adicionou essa área');
      return;
    }

    setAreas([...areas, value]);
    setInputValue('');
    setError('');
    
    // Esconde sugestões após adicionar a primeira
    if (areas.length === 0) {
      setShowSuggestions(false);
    }
  };

  // Adicionar área da sugestão
  const addSuggestion = (nome: string) => {
    if (areas.length >= 3) {
      setError('Máximo de 3 áreas atingido');
      return;
    }
    
    if (areas.some(a => a.toLowerCase() === nome.toLowerCase())) {
      return;
    }

    setAreas([...areas, nome]);
    setError('');
    setShowSuggestions(false);
  };

  // Remover área
  const removeArea = (indexToRemove: number) => {
    setAreas(areas.filter((_, index) => index !== indexToRemove));
    setError('');
    
    // Mostra sugestões novamente se remover todas
    if (areas.length === 1) {
      setShowSuggestions(true);
    }
  };

  const handleContinue = () => {
    if (areas.length === 0) {
      setError('Adicione pelo menos 1 área para continuar');
      return;
    }
    
    localStorage.setItem('emprega_ai_areas', JSON.stringify(areas));
    router.push('/onboarding/modelo');
  };

  // Limpar erro após 3 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 flex flex-col">
      {/* Barra de Progresso */}
      <div className="w-full bg-gray-200 h-1">
        <div 
          className="bg-gradient-to-r from-blue-600 to-cyan-500 h-1 transition-all duration-700 shadow-lg shadow-purple-200" 
          style={{ width: '50%' }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full">
          
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
            <div className="flex items-center gap-2 text-blue-600 font-bold mb-8 text-sm bg-purple-50 w-fit px-4 py-2 rounded-full">
              <Target className="w-4 h-4" />
              Passo 2 de 4 · Definindo Foco
            </div>

            {/* Título e Descrição */}
            <div className="space-y-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Em que áreas você quer{' '}
                <span className="bg-gradient-to-r text-gray-900">
                  trabalhar
                </span>
                ?
              </h1>
              <p className="text-gray-600 text-lg">
                Escolha até 3 áreas. Menos é mais — a IA consegue focar melhor! 🎯
              </p>
            </div>

            {/* Campo de Input Melhorado */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addArea();
                      }
                    }}
                    placeholder="Ex: Marketing Digital, Vendas, Tecnologia..."
                    className="w-full px-6 py-4 rounded-2xl focus:ring-purple-100 outline-none transition-all text-lg placeholder:text-gray-400"
                    maxLength={50}
                  />
                  {inputValue && (
                    <button
                      onClick={() => setInputValue('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <button 
                  onClick={addArea}
                  disabled={areas.length >= 3}
                  className={`
                    p-4 rounded-2xl font-bold transition-all shadow-lg
                    ${areas.length >= 3
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-xl hover:scale-105 active:scale-95'
                    }
                  `}
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              {/* Mensagem de Erro Melhorada */}
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium bg-red-50 px-4 py-3 rounded-xl animate-shake border border-red-100">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Contador Visual */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {areas.length === 0 && 'Nenhuma área adicionada'}
                  {areas.length === 1 && '1 área adicionada · Pode adicionar mais 2'}
                  {areas.length === 2 && '2 áreas adicionadas · Pode adicionar mais 1'}
                  {areas.length === 3 && '✓ Limite atingido'}
                </span>
                <span className={`font-bold ${areas.length === 3 ? 'text-purple-600' : 'text-gray-400'}`}>
                  {areas.length}/3
                </span>
              </div>

              {/* Tags das Áreas Selecionadas */}
              <div className="flex flex-wrap gap-3 min-h-[60px] p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                {areas.length === 0 ? (
                  <p className="text-gray-400 text-sm flex items-center gap-2 m-auto">
                    <Lightbulb className="w-4 h-4" />
                    Suas áreas aparecerão aqui
                  </p>
                ) : (
                  areas.map((area, index) => (
                    <div 
                      key={index}
                      className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-full font-medium shadow-lg animate-in zoom-in duration-300 hover:shadow-xl transition-all"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {area}
                      <button 
                        onClick={() => removeArea(index)} 
                        className="hover:bg-white/20 rounded-full p-0.5 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Sugestões Populares */}
            {showSuggestions && areas.length < 3 && (
              <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <h3 className="text-sm font-bold text-gray-700">
                    Áreas mais procuradas em Portugal
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {sugestoesPopulares.slice(0, 6).map((sugestao, index) => (
                    <button
                      key={index}
                      onClick={() => addSuggestion(sugestao.nome)}
                      disabled={areas.some(a => a.toLowerCase() === sugestao.nome.toLowerCase())}
                      className={`
                        group relative px-4 py-3 rounded-xl text-sm font-medium transition-all text-left
                        ${areas.some(a => a.toLowerCase() === sugestao.nome.toLowerCase())
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-purple-50 text-blue-700 hover:bg-purple-100 hover:shadow-md active:scale-95 border border-purple-100'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span>{sugestao.nome}</span>
                        {sugestao.trending && (
                          <TrendingUp className="w-3 h-3 text-orange-500" />
                        )}
                      </div>
                      {!areas.some(a => a.toLowerCase() === sugestao.nome.toLowerCase()) && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-cyan-500/10 group-hover:from-blue-600/10 group-hover:to-cyan-500/10 transition-all" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dica Contextual */}
            {areas.length > 0 && (
              <div className="mb-8 bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3 animate-in fade-in duration-300">
                <Zap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700 leading-relaxed">
                  <strong>Dica da IA:</strong> {areas.length === 1 ? 'Foco total! A IA vai encontrar as melhores vagas nesta área.' : areas.length === 2 ? 'Ótimo balanço. Duas áreas dão mais opções sem perder o foco.' : 'Você atingiu o limite ideal. A IA vai otimizar entre estas 3 áreas.'}
                </div>
              </div>
            )}

            {/* Botão de Continuar */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleContinue}
                disabled={areas.length === 0}
                className={`
                  group w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3
                  ${areas.length > 0
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-2xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Continuar para Modelo de Trabalho
                <ArrowRight className={`w-5 h-5 transition-transform ${areas.length > 0 ? 'group-hover:translate-x-1' : ''}`} />
              </button>

              {areas.length === 0 && (
                <p className="text-center text-sm text-gray-400">
                  Adicione pelo menos 1 área para continuar
                </p>
              )}
            </div>
          </div>

          {/* Indicador de Progresso */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 font-medium">
              50% concluído · Só mais 2 passos!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}