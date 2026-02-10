// emprega-ai-frontend/app/onboarding/profissao/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, X } from 'lucide-react';

const AREAS_SUGERIDAS = [
  'Tecnologia',
  'Vendas',
  'Marketing',
  'Recursos Humanos',
  'Administração',
  'Finanças',
  'Atendimento ao Cliente',
  'Restauração',
  'Hotelaria',
  'Construção Civil',
  'Saúde',
  'Educação',
  'Design',
  'Logística',
];

export default function ProfissaoPage() {
  const router = useRouter();
  const [currentProfession, setCurrentProfession] = useState('');
  const [isHappyWithJob, setIsHappyWithJob] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [customArea, setCustomArea] = useState('');

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area));
    } else {
      if (selectedAreas.length < 3) {
        setSelectedAreas([...selectedAreas, area]);
      } else {
        alert('Você pode selecionar no máximo 3 áreas');
      }
    }
  };

  const addCustomArea = () => {
    if (!customArea.trim()) return;
    if (selectedAreas.length < 3) {
      setSelectedAreas([...selectedAreas, customArea.trim()]);
      setCustomArea('');
    } else {
      alert('Você pode selecionar no máximo 3 áreas');
    }
  };

  const removeArea = (area: string) => {
    setSelectedAreas(selectedAreas.filter((a) => a !== area));
  };

  const handleContinue = () => {
    if (!currentProfession.trim()) {
      alert('Por favor, informe sua profissão atual');
      return;
    }
    if (!isHappyWithJob) {
      alert('Por favor, responda se está feliz com seu trabalho');
      return;
    }
    if (selectedAreas.length === 0) {
      alert('Por favor, selecione pelo menos 1 área de interesse');
      return;
    }

    // Salvar no localStorage
    localStorage.setItem('currentProfession', currentProfession);
    localStorage.setItem('isHappyWithJob', isHappyWithJob);
    localStorage.setItem('interestedAreas', JSON.stringify(selectedAreas));

    // Continuar
    router.push('/onboarding/trabalho');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 flex flex-col gap-2 mx-auto w-full max-w-3xl pt-2">
          <div className="flex items-center gap-2 h-12">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold flex-1">Sua Situação Atual</h1>
            <span className="text-sm text-gray-500">2/8</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: '25%' }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full p-4 md:p-6 max-w-3xl mx-auto pb-32">
        <div className="space-y-6">
          {/* Profissão Atual */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qual a sua profissão atual?
            </label>
            <input
              type="text"
              value={currentProfession}
              onChange={(e) => setCurrentProfession(e.target.value)}
              placeholder="Ex: Rececionista, Vendedor, Técnico de TI..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Felicidade com Trabalho */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Você está feliz com o seu trabalho?
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setIsHappyWithJob('yes')}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                  isHappyWithJob === 'yes'
                    ? 'border-green-600 bg-green-50 text-green-900'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                }`}
              >
                😊 Sim
              </button>
              <button
                onClick={() => setIsHappyWithJob('no')}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                  isHappyWithJob === 'no'
                    ? 'border-red-600 bg-red-50 text-red-900'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                }`}
              >
                😔 Não
              </button>
              <button
                onClick={() => setIsHappyWithJob('maybe')}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                  isHappyWithJob === 'maybe'
                    ? 'border-yellow-600 bg-yellow-50 text-yellow-900'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                }`}
              >
                🤔 Talvez
              </button>
            </div>
          </div>

          {/* Áreas de Interesse */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qual área profissional você tem em mente?
            </label>
            <p className="text-sm text-gray-500 mb-4">
              Você pode escolher até 3 áreas diferentes
            </p>

            {/* Áreas Selecionadas */}
            {selectedAreas.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {area}
                    <button
                      onClick={() => removeArea(area)}
                      className="hover:bg-blue-700 rounded-full p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Input Personalizado */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={customArea}
                onChange={(e) => setCustomArea(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomArea();
                  }
                }}
                placeholder="Digite uma área..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={selectedAreas.length >= 3}
              />
              <button
                onClick={addCustomArea}
                disabled={!customArea.trim() || selectedAreas.length >= 3}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Áreas Sugeridas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AREAS_SUGERIDAS.map((area) => (
                <button
                  key={area}
                  onClick={() => toggleArea(area)}
                  disabled={
                    !selectedAreas.includes(area) && selectedAreas.length >= 3
                  }
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                    selectedAreas.includes(area)
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700 disabled:opacity-40'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Frase Motivacional */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 text-center">
            <p className="text-lg font-semibold text-gray-800 italic">
              "A medida da inteligência é a capacidade de mudar quando
              necessário"
            </p>
            <p className="text-sm text-gray-600 mt-2">— Albert Einstein</p>
          </div>
        </div>
      </main>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <div className="w-full max-w-3xl mx-auto">
          <button
            onClick={handleContinue}
            disabled={
              !currentProfession.trim() ||
              !isHappyWithJob ||
              selectedAreas.length === 0
            }
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
