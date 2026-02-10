// emprega-ai-frontend/app/onboarding/areas/page.tsx
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
  'Limpeza',
  'Segurança',
  'Contabilidade',
  'Engenharia',
];

export default function AreasPage() {
  const router = useRouter();
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
    if (selectedAreas.length === 0) {
      alert('Por favor, selecione pelo menos 1 área de interesse');
      return;
    }

    // Salvar no localStorage
    localStorage.setItem('interestedAreas', JSON.stringify(selectedAreas));

    // Continuar para próxima página
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
            <h1 className="font-bold flex-1">Áreas de Interesse</h1>
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
          {/* Título */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Qual área profissional você tem em mente?
            </h2>
            <p className="text-gray-600">
              Você pode escolher até 3 áreas diferentes
            </p>
          </div>

          {/* Áreas Selecionadas */}
          {selectedAreas.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-900 mb-3">
                Áreas selecionadas ({selectedAreas.length}/3):
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {area}
                    <button
                      onClick={() => removeArea(area)}
                      className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Adicionar Área Personalizada */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adicionar área personalizada
            </label>
            <div className="flex gap-2">
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
                placeholder="Ex: Energia Renovável, E-commerce..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={selectedAreas.length >= 3}
              />
              <button
                onClick={addCustomArea}
                disabled={!customArea.trim() || selectedAreas.length >= 3}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Adicionar
              </button>
            </div>
          </div>

          {/* Áreas Sugeridas */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Áreas sugeridas:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AREAS_SUGERIDAS.map((area) => (
                <button
                  key={area}
                  onClick={() => toggleArea(area)}
                  disabled={
                    !selectedAreas.includes(area) && selectedAreas.length >= 3
                  }
                  className={`p-4 rounded-lg border-2 text-left transition-all font-medium ${
                    selectedAreas.includes(area)
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Dica */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              💡 <strong>Dica:</strong> Escolha áreas onde você tem experiência ou
              interesse genuíno. Nossa IA vai encontrar as melhores vagas para
              você!
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <div className="w-full max-w-3xl mx-auto">
          <button
            onClick={handleContinue}
            disabled={selectedAreas.length === 0}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
