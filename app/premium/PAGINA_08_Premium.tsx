// emprega-ai-frontend/app/premium/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, Zap, TrendingUp, Mail, FileText, ArrowRight } from 'lucide-react';

export default function PremiumPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);

    // Aqui você faria a integração real com Stripe
    // Por enquanto, simulamos um delay
    setTimeout(() => {
      // Redirecionar para sucesso
      router.push('/dashboard?payment=success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4 mx-auto w-full max-w-4xl">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">EMPREGA.AI</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              13 vagas encontradas
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-8 pb-32">
        <div className="space-y-8">
          {/* Título Principal */}
          <div className="text-center">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🎉 Parabéns!
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Você está a um passo de se candidatar
            </h1>
            <p className="text-xl text-gray-600">
              para essa e outras milhares de vagas de emprego
            </p>
          </div>

          {/* Explicação */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              A nossa plataforma nos gera custos, e para conseguirmos seguir com
              esse projeto que emprega milhares de pessoas por ano, cobramos
              uma taxa de{' '}
              <strong className="text-blue-600 text-xl">€3,99</strong>, e sua
              assinatura poderá ser cancelada a qualquer momento de forma
              gratuita.
            </p>
            <p className="text-lg font-semibold text-gray-900">
              Eu te garanto que esse será o melhor investimento da sua vida até
              o momento! 💼
            </p>
          </div>

          {/* Card de Preço */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-wide mb-2">
                Plano Premium
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-bold">€3,99</span>
                <span className="text-2xl text-blue-200">/mês</span>
              </div>
              <p className="text-blue-100 mt-2">
                Cancelamento gratuito a qualquer momento
              </p>
            </div>

            {/* Benefícios */}
            <div className="space-y-4">
              <h3 className="font-bold text-xl mb-4">
                O que está incluído nesse plano?
              </h3>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Currículos Premium Gratuitos</p>
                  <p className="text-sm text-blue-100">
                    Crie currículos ilimitados com nossa IA
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Envios Automáticos</p>
                  <p className="text-sm text-blue-100">
                    Até 50 candidaturas por dia às maiores empresas do mundo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold">
                    Acompanhamento em Tempo Real
                  </p>
                  <p className="text-sm text-blue-100">
                    Veja inscrições e processo seletivo gerido 100% pela nossa
                    IA
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Matching Inteligente</p>
                  <p className="text-sm text-blue-100">
                    IA encontra as vagas perfeitas para você
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold">
                    Cartas de Apresentação Personalizadas
                  </p>
                  <p className="text-sm text-blue-100">
                    Geradas automaticamente para cada vaga
                  </p>
                </div>
              </div>
            </div>

            {/* Botão de Assinatura */}
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full mt-8 bg-white text-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                  Processando...
                </>
              ) : (
                <>
                  Assinar agora
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-blue-100 mt-4">
              🔒 Pagamento 100% seguro via Stripe
            </p>
          </div>

          {/* Comparação */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Funcionalidade
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                    Grátis
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-blue-600">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Currículos gerados
                  </td>
                  <td className="px-4 py-3 text-center text-sm">1</td>
                  <td className="px-4 py-3 text-center text-sm text-blue-600 font-semibold">
                    Ilimitados
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Envios automáticos/dia
                  </td>
                  <td className="px-4 py-3 text-center">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-blue-600 font-semibold">
                    50
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Matching com IA
                  </td>
                  <td className="px-4 py-3 text-center">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Cartas personalizadas
                  </td>
                  <td className="px-4 py-3 text-center">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">Suporte prioritário</td>
                  <td className="px-4 py-3 text-center">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Garantia */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              Garantia de Satisfação
            </h3>
            <p className="text-gray-700">
              Cancele a qualquer momento, sem multas ou taxas adicionais.
              Estamos confiantes de que você conseguirá o emprego dos sonhos!
            </p>
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:block">
            <p className="text-sm text-gray-600">
              92% de empregabilidade em 2025
            </p>
            <p className="text-xs text-gray-500">
              Média de 3 dias para primeira entrevista
            </p>
          </div>
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all disabled:opacity-50"
          >
            {isLoading ? 'Processando...' : 'Assinar por €3,99/mês'}
          </button>
        </div>
      </div>
    </div>
  );
}
