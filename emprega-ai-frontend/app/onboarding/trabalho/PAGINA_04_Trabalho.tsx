// emprega-ai-frontend/app/onboarding/trabalho/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Building2, Laptop, Check } from 'lucide-react';

const WORK_MODELS = [
  {
    id: 'remote',
    name: 'Remoto',
    icon: Laptop,
    description: 'Trabalho 100% em casa',
  },
  {
    id: 'hybrid',
    name: 'Híbrido',
    icon: Home,
    description: 'Alguns dias em casa, outros no escritório',
  },
  {
    id: 'onsite',
    name: 'Presencial',
    icon: Building2,
    description: 'Trabalho 100% no escritório',
  },
];

export default function TrabalhoPage() {
  const router = useRouter();
  const [preferredWorkModel, setPreferredWorkModel] = useState('');
  const [availableWorkModels, setAvailableWorkModels] = useState<string[]>([]);

  const toggleAvailableModel = (model: string) => {
    if (availableWorkModels.includes(model)) {
      setAvailableWorkModels(availableWorkModels.filter((m) => m !== model));
    } else {
      setAvailableWorkModels([...availableWorkModels, model]);
    }
  };

  const selectAllModels = () => {
    if (availableWorkModels.length === 3) {
      setAvailableWorkModels([]);
    } else {
      setAvailableWorkModels(['remote', 'hybrid', 'onsite']);
    }
  };

  const handleContinue = () => {
    if (!preferredWorkModel) {
      alert('Por favor, selecione seu modelo de trabalho preferido');
      return;
    }
    if (availableWorkModels.length === 0) {
      alert('Por favor, selecione pelo menos um modelo disponível');
      return;
    }

    // Salvar no localStorage
    localStorage.setItem('preferredWorkModel', preferredWorkModel);
    localStorage.setItem(
      'availableWorkModels',
      JSON.stringify(availableWorkModels)
    );

    // Continuar para perfil
    router.push('/onboarding/perfil');
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
            <h1 className="font-bold flex-1">Modelo de Trabalho</h1>
            <span className="text-sm text-gray-500">3/8</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: '37.5%' }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full p-4 md:p-6 max-w-3xl mx-auto pb-32">
        <div className="space-y-8">
          {/* Seção 1: Modelo Preferido */}
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Qual modelo de trabalho faz mais sentido para você hoje?
              </h2>
              <p className="text-gray-600">Selecione apenas uma opção</p>
            </div>

            <div className="grid gap-4">
              {WORK_MODELS.map((model) => {
                const Icon = model.icon;
                const isSelected = preferredWorkModel === model.id;

                return (
                  <button
                    key={model.id}
                    onClick={() => setPreferredWorkModel(model.id)}
                    className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          isSelected ? 'bg-blue-600' : 'bg-gray-100'
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            isSelected ? 'text-white' : 'text-gray-600'
                          }`}
                        />
                      </div>

                      <div className="flex-1">
                        <h3
                          className={`font-bold text-lg mb-1 ${
                            isSelected ? 'text-blue-900' : 'text-gray-900'
                          }`}
                        >
                          {model.name}
                        </h3>
                        <p
                          className={`text-sm ${
                            isSelected ? 'text-blue-700' : 'text-gray-600'
                          }`}
                        >
                          {model.description}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-1">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divisor */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-4 text-sm text-gray-500">
                E também...
              </span>
            </div>
          </div>

          {/* Seção 2: Modelos Disponíveis */}
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Qual modelo de trabalho você estaria disponível para trabalhar
                caso seja preciso?
              </h2>
              <p className="text-gray-600">
                Selecione todas as opções possíveis
              </p>
            </div>

            <div className="grid gap-3">
              {WORK_MODELS.map((model) => {
                const Icon = model.icon;
                const isSelected = availableWorkModels.includes(model.id);

                return (
                  <button
                    key={model.id}
                    onClick={() => toggleAvailableModel(model.id)}
                    className={`p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        isSelected
                          ? 'bg-green-600 border-green-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>

                    <Icon
                      className={`w-5 h-5 ${
                        isSelected ? 'text-green-600' : 'text-gray-400'
                      }`}
                    />

                    <div className="flex-1 text-left">
                      <p
                        className={`font-semibold ${
                          isSelected ? 'text-green-900' : 'text-gray-900'
                        }`}
                      >
                        {model.name}
                      </p>
                    </div>
                  </button>
                );
              })}

              {/* Botão Todas as Opções */}
              <button
                onClick={selectAllModels}
                className={`p-4 rounded-lg border-2 transition-all font-semibold ${
                  availableWorkModels.length === 3
                    ? 'border-purple-600 bg-purple-50 text-purple-900'
                    : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                }`}
              >
                ✨ Todas as opções (flexível)
              </button>
            </div>
          </div>

          {/* Dica */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              💡 <strong>Dica:</strong> Quanto mais flexível você for em relação
              ao modelo de trabalho, mais oportunidades nossa IA encontrará para
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
            disabled={!preferredWorkModel || availableWorkModels.length === 0}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Continuar para Perfil
          </button>
        </div>
      </div>
    </div>
  );
}
