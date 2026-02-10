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
  AlertCircle
} from 'lucide-react';

export default function AreasPage() {
  const router = useRouter();
  
  // Estados
  const [inputValue, setInputValue] = useState('');
  const [areas, setAreas] = useState<string[]>([]);
  const [error, setError] = useState('');

  // 1. Adicionar uma nova área (máximo 3 como planeado)
  const addArea = () => {
    const value = inputValue.trim();
    
    if (!value) return;
    if (areas.length >= 3) {
      setError('A IA foca-se melhor se escolher até 3 áreas principais.');
      return;
    }
    if (areas.includes(value)) {
      setError('Essa área já foi adicionada.');
      return;
    }

    setAreas([...areas, value]);
    setInputValue('');
    setError('');
  };

  // 2. Remover uma área
  const removeArea = (indexToRemove: number) => {
    setAreas(areas.filter((_, index) => index !== indexToRemove));
    setError('');
  };

  const handleContinue = () => {
    if (areas.length === 0) return;
    
    // Guardamos a lista de áreas como uma string separada por vírgulas
    localStorage.setItem('emprega_ai_areas', JSON.stringify(areas));
    
    // Próxima parada: Modelo de Trabalho (Remoto/Presencial)
    router.push('/onboarding/modelo');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Barra de Progresso - 60% */}
      <div className="w-full bg-gray-200 h-2">
        <div className="bg-[#2563EB] h-2 transition-all duration-700" style={{ width: '60%' }}></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          
          <button 
            onClick={() => router.back()} 
            className="text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-2 text-[#2563EB] font-bold mb-8 text-sm bg-blue-50 w-fit px-4 py-1.5 rounded-full">
              <Target className="w-4 h-4" />
              Foco Profissional
            </div>

            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Em que áreas quer atuar?</h1>
                <p className="text-gray-500">Escreva até 3 áreas profissionais onde gostaria de trabalhar no momento.</p>
              </div>

              {/* Campo de Input */}
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addArea()}
                      placeholder="Ex: Marketing Digital, Logística, Vendas..."
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"
                    />
                  </div>
                  <button 
                    onClick={addArea}
                    className="bg-gray-900 text-white p-4 rounded-2xl hover:bg-black transition-colors"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>

                {/* Mensagem de Erro */}
                {error && (
                  <div className="flex items-center gap-2 text-red-500 text-sm font-medium animate-shake">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                {/* Lista de Tags (Áreas Selecionadas) */}
                <div className="flex flex-wrap gap-3 min-h-[50px]">
                  {areas.map((area, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium animate-in zoom-in duration-300 shadow-md"
                    >
                      {area}
                      <button onClick={() => removeArea(index)} className="hover:text-red-200 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {areas.length === 0 && (
                    <p className="text-gray-300 italic text-sm py-2">Nenhuma área adicionada ainda...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Rodapé e Botão */}
            <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-400 font-medium">
                {areas.length} de 3 áreas adicionadas
              </span>
              <button
                onClick={handleContinue}
                disabled={areas.length === 0}
                className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                Próximo Passo 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}