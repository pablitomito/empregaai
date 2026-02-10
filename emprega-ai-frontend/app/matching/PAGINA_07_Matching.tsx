// emprega-ai-frontend/app/matching/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Briefcase, TrendingUp, Check } from 'lucide-react';

export default function MatchingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Analisando seu perfil...',
    'Otimizando seu currículo com IA...',
    'Buscando vagas compatíveis...',
    'Calculando matches...',
    'Encontrando as melhores oportunidades...',
  ];

  useEffect(() => {
    // Simular progresso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Mudar etapas
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 1000);

    // Após 5 segundos, redirecionar
    const timeout = setTimeout(() => {
      router.push('/premium');
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          {/* Animação de Loading */}
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-blue-200 rounded-full animate-ping"></div>
          </div>

          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossa IA está trabalhando para você...
          </h1>

          {/* Etapa Atual */}
          <p className="text-xl text-gray-600 mb-8">
            {steps[currentStep]}
          </p>

          {/* Barra de Progresso */}
          <div className="w-full max-w-md mx-auto mb-8">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{progress}%</p>
          </div>

          {/* Etapas Completadas */}
          <div className="space-y-3 max-w-md mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  index <= currentStep
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    index < currentStep
                      ? 'bg-green-600'
                      : index === currentStep
                      ? 'bg-blue-600 animate-pulse'
                      : 'bg-gray-300'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-xs text-white font-bold">
                      {index + 1}
                    </span>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    index <= currentStep
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500'
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card de Resultados (aparece aos poucos) */}
        {progress > 80 && (
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center border-4 border-green-500 animate-bounce">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Que maravilha! 🎉
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                A nossa IA encontrou{' '}
                <strong className="text-green-600">13 vagas</strong> que
                combinam exatamente com o seu perfil e bem remuneradas!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">13</p>
                <p className="text-xs text-gray-600">Vagas encontradas</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <Check className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">98%</p>
                <p className="text-xs text-gray-600">Match médio</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">Premium</p>
                <p className="text-xs text-gray-600">Vagas de qualidade</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/premium')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all"
            >
              Candidatar-me agora 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
