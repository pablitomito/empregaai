// emprega-ai-frontend/app/onboarding/descricao/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function DescricaoPage() {
  const router = useRouter();
  const [personalDescription, setPersonalDescription] = useState('');

  const characterCount = personalDescription.length;
  const minCharacters = 100;
  const isValid = characterCount >= minCharacters;

  const handleContinue = () => {
    if (!isValid) {
      alert(`Por favor, escreva pelo menos ${minCharacters} caracteres`);
      return;
    }

    // Salvar no localStorage
    localStorage.setItem('personalDescription', personalDescription);

    // Continuar para matching
    router.push('/matching');
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
            <h1 className="font-bold flex-1">Sobre Você</h1>
            <span className="text-sm text-gray-500">8/10</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: '80%' }}
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
              Agora escreva um pouco sobre você
            </h2>
            <p className="text-gray-600">
              Seus hobbies, objetivos e o que te motiva
            </p>
          </div>

          {/* Card com Textarea */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Descrição pessoal
                </label>
                <span
                  className={`text-xs font-medium ${
                    isValid ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {characterCount}/{minCharacters} caracteres
                </span>
              </div>

              <textarea
                value={personalDescription}
                onChange={(e) => setPersonalDescription(e.target.value)}
                className="textarea textarea-bordered w-full h-48 text-base leading-relaxed resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Meu nome é Ana, eu gosto muito de estudar e meu objetivo é trabalhar muito e ficar milionária..."
              />

              {/* Barra de Progresso */}
              <div className="mt-2">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isValid ? 'bg-green-600' : 'bg-blue-600'
                    }`}
                    style={{
                      width: `${Math.min((characterCount / minCharacters) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Dicas */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    💡 Dica importante:
                  </p>
                  <p className="text-sm text-blue-800">
                    É importante que você faça uma descrição bem detalhada sobre
                    si, assim como o seu coração mandar. Pois é a partir dessa
                    informação que iremos encontrar a vaga ideal para si!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sugestões */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              O que você pode incluir:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>
                  <strong>Hobbies e interesses:</strong> O que você gosta de
                  fazer no tempo livre?
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>
                  <strong>Objetivos profissionais:</strong> Onde você se vê nos
                  próximos anos?
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>
                  <strong>Valores:</strong> O que é importante para você no
                  trabalho?
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>
                  <strong>Motivação:</strong> O que te faz levantar todos os
                  dias?
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>
                  <strong>Personalidade:</strong> Como você se descreveria?
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <div className="w-full max-w-3xl mx-auto">
          <button
            onClick={handleContinue}
            disabled={!isValid}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isValid
              ? 'Continuar'
              : `Escreva mais ${minCharacters - characterCount} caracteres`}
          </button>
        </div>
      </div>
    </div>
  );
}
