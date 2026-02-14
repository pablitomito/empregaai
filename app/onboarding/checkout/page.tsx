// pages/checkout.tsx - VERSÃO PROFISSIONAL

import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// Checkout Form Component
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const { clientSecret } = await response.json();

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Erro ao processar pagamento');
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        window.location.href = '/success';
      }
    } catch (err) {
      setError('Erro ao processar pagamento. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-300">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#1f2937',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                '::placeholder': {
                  color: '#9ca3af',
                },
              },
              invalid: {
                color: '#dc2626',
              },
            },
          }}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'A processar...' : 'Confirmar subscrição'}
      </button>

      <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-500 border-t border-gray-200">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Pagamento seguro
        </span>
        <span className="text-gray-300">|</span>
        <span>SSL/TLS encriptado</span>
      </div>
    </form>
  );
};

// Main Checkout Page
const CheckoutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Subscrição Premium | CurriculoJob</title>
        <meta name="description" content="Ative sua subscrição premium" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-900">
                CurriculoJob
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Conexão segura</span>
              </div>
            </div>
          </div>
        </header>

        {/* PROGRESS */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="text-xs font-medium text-gray-500">Passo 3 de 3</span>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Subscrição Premium
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Desbloqueie o acesso completo à nossa plataforma de recrutamento e impulsione a sua carreira profissional.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* LEFT: BENEFITS */}
            <div className="lg:col-span-3 space-y-6">
              {/* VALUE PROPOSITION */}
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Porquê CurriculoJob Premium?
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  A nossa plataforma utiliza tecnologia de Inteligência Artificial para conectar o seu perfil profissional com as melhores oportunidades de emprego em Portugal. Enquanto outros portais exigem que procure manualmente, nós trabalhamos continuamente para encontrar e candidatá-lo às vagas mais adequadas ao seu perfil.
                </p>
              </div>

              {/* FEATURES */}
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Funcionalidades incluídas
                </h2>

                <div className="space-y-5">
                  {[
                    {
                      title: 'Candidatura automática',
                      description: 'Sistema automatizado que preenche e submete candidaturas em seu nome.'
                    },
                    {
                      title: 'Acesso a vagas não publicadas',
                      description: 'Receba ofertas exclusivas de recrutadores parceiros antes de serem divulgadas publicamente.'
                    },
                    {
                      title: 'Currículos ilimitados',
                      description: 'Crie e gerencie múltiplas versões do seu CV adaptadas a diferentes sectores.'
                    },
                    {
                      title: 'Dashboard de análise',
                      description: 'Acompanhe visualizações do seu perfil e taxas de resposta em tempo real.'
                    },
                    {
                      title: 'Prioridade nos resultados',
                      description: 'O seu perfil recebe destaque nos sistemas de busca dos recrutadores parceiros.'
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TESTIMONIAL */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-3 italic">
                  "Obtive três entrevistas na primeira semana após activar a subscrição Premium. O investimento compensou rapidamente."
                </p>
                <p className="text-sm font-medium text-gray-900">
                  Mariana Silva, Consultora de Marketing - Lisboa
                </p>
              </div>
            </div>

            {/* RIGHT: PRICING */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg border border-gray-300 shadow-lg sticky top-24">
                <div className="text-center pb-6 border-b border-gray-200">
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Plano Premium
                  </div>
                  
                  <div className="flex items-baseline justify-center gap-2 mb-3">
                    <span className="text-4xl font-bold text-gray-900">3,99€</span>
                    <span className="text-gray-500">/mês</span>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Sem período de fidelização
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    Cancele a qualquer momento sem custos adicionais
                  </p>
                </div>

                <div className="py-6">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div className="text-sm">
                        <p className="font-semibold text-blue-900 mb-1">
                          Garantia de satisfação
                        </p>
                        <p className="text-blue-700">
                          Reembolso integral em caso de insatisfação nos primeiros 7 dias.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span>Visa</span>
                  <span>Mastercard</span>
                  <span>American Express</span>
                  <span>MB Way</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-6">
                <a href="/termos" className="hover:text-gray-900 transition-colors">
                  Termos de serviço
                </a>
                <a href="/privacidade" className="hover:text-gray-900 transition-colors">
                  Política de privacidade
                </a>
              </div>
              
              <div className="flex items-center gap-2 text-xs">
                <span>Pagamentos processados por</span>
                <svg className="h-4" viewBox="0 0 60 25" fill="none">
                  <path d="M16.5 12.5h5l-2.5-7.5-2.5 7.5z" fill="#635BFF"/>
                  <path d="M23 5h5v15h-5V5z" fill="#635BFF"/>
                  <path d="M30 12.5h5l-2.5-7.5-2.5 7.5z" fill="#635BFF"/>
                  <path d="M37 5h8v3h-5v3h4v3h-4v3h5v3h-8V5z" fill="#635BFF"/>
                </svg>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
              © 2026 CurriculoJob. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CheckoutPage;
