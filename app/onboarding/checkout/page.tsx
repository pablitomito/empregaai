// pages/checkout.tsx
"use client";

import { useState } from 'react';


import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
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
      // Create payment intent
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const { clientSecret } = await response.json();

      // Confirm card payment
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

      // Success - redirect
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
      {/* Card Element */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#1f2937',
                '::placeholder': {
                  color: '#9ca3af',
                },
              },
              invalid: {
                color: '#ef4444',
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-5 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processando...
          </span>
        ) : (
          '🚀 ATIVAR MINHA ASSINATURA E ENVIAR CANDIDATURA AGORA'
        )}
      </button>

      {/* Security Info */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Pagamento Seguro
        </span>
        <span>|</span>
        <span>Stripe Verified</span>
        <span>|</span>
        <span>SSL Encrypted</span>
      </div>
    </form>
  );
};

// Main Checkout Page
export default function CheckoutPage() {
  return (
    <>
    

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  CurriculoJob
                </span>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Ambiente 100% Seguro e Criptografado</span>
                <span className="sm:hidden">Seguro</span>
              </div>
            </div>
          </div>
        </header>

        {/* PROGRESS BAR */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: '95%' }}></div>
              </div>
              <span className="text-sm font-semibold text-gray-600">95% Concluído</span>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* HERO */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Sua candidatura está <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">pronta</span> para ser enviada!
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Você está a apenas um passo de colocar seu currículo na mesa dos recrutadores das melhores empresas de Portugal.
            </p>
          </div>

          {/* LAYOUT: Desktop 2 colunas, Mobile 1 coluna */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* LEFT SIDE: PITCH + BENEFITS */}
            <div className="space-y-8">
              {/* PITCH */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-100">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Não somos apenas uma plataforma de currículos; somos o seu <strong className="text-purple-700">agente pessoal de carreira</strong>. Enquanto portais comuns esperam você procurar vagas, nossa <strong className="text-purple-700">Inteligência Artificial trabalha 24h por dia</strong> para encontrar, adaptar e enviar seu perfil para oportunidades que pagam os melhores ordenados — muitas delas nem chegam a ser anunciadas publicamente.
                </p>
              </div>

              {/* BENEFITS BOX */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-3xl">🎁</span>
                  O que você desbloqueia agora:
                </h2>

                <ul className="space-y-4">
                  {[
                    {
                      icon: '🤖',
                      title: 'Candidatura Automática',
                      desc: 'Nossa IA preenche e envia formulários chatos por você.'
                    },
                    {
                      icon: '🔓',
                      title: 'Acesso a Vagas Ocultas',
                      desc: 'Receba ofertas exclusivas antes da concorrência.'
                    },
                    {
                      icon: '♾️',
                      title: 'Currículos Ilimitados',
                      desc: 'Crie versões diferentes para cada tipo de vaga.'
                    },
                    {
                      icon: '📊',
                      title: 'Gestor de Carreiras',
                      desc: 'Painel em tempo real para acompanhar quem visualizou seu perfil.'
                    },
                    {
                      icon: '⭐',
                      title: 'Destaque Premium',
                      desc: 'Seu currículo aparece no topo da lista dos recrutadores parceiros.'
                    }
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                      <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{benefit.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                        <p className="text-sm text-gray-600">{benefit.desc}</p>
                      </div>
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SOCIAL PROOF */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      M
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-2">
                      "Consegui 3 entrevistas na primeira semana usando a plataforma. Vale cada cêntimo."
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      — Mariana S., Lisboa
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: PRICING + PAYMENT */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-purple-200">
                {/* PRICING */}
                <div className="text-center mb-8">
                  <p className="text-gray-600 mb-4">
                    Tudo isso por menos que o valor de um café em Lisboa.
                  </p>
                  
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl text-gray-400 line-through">19,90€</span>
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      3,99€
                    </span>
                    <span className="text-gray-600">/mês</span>
                  </div>

                  <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    💰 Economize 80% agora!
                  </div>

                  <p className="text-sm text-gray-500">
                    Sem fidelização. Cancele gratuitamente a qualquer momento com um clique.
                  </p>
                </div>

                {/* STRIPE FORM */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>

                {/* MONEY BACK GUARANTEE */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-semibold text-blue-900">Garantia de 7 dias</p>
                      <p className="text-sm text-blue-700">Se não conseguir nenhuma entrevista, devolvemos 100% do seu dinheiro.</p>
                    </div>
                  </div>
                </div>

                {/* PAYMENT METHODS */}
                <div className="mt-6 flex items-center justify-center gap-4 opacity-60">
                  <svg className="h-8" viewBox="0 0 38 24" fill="none">
                    <rect width="38" height="24" rx="3" fill="#1434CB"/>
                    <path d="M23.5 12C23.5 15.59 20.59 18.5 17 18.5C13.41 18.5 10.5 15.59 10.5 12C10.5 8.41 13.41 5.5 17 5.5C20.59 5.5 23.5 8.41 23.5 12Z" fill="#EB001B"/>
                    <path d="M27.5 12C27.5 15.59 24.59 18.5 21 18.5C17.41 18.5 14.5 15.59 14.5 12C14.5 8.41 17.41 5.5 21 5.5C24.59 5.5 27.5 8.41 27.5 12Z" fill="#F79E1B"/>
                  </svg>
                  <svg className="h-8" viewBox="0 0 38 24" fill="none">
                    <rect width="38" height="24" rx="3" fill="#0066CB"/>
                    <path d="M14 12L16 8H22L20 12H26L18 20L20 14H14Z" fill="white"/>
                  </svg>
                  <span className="text-xs text-gray-400">Apple Pay</span>
                  <span className="text-xs text-gray-400">Google Pay</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <a href="/termos" className="hover:text-gray-700 transition-colors">Termos de Uso</a>
                <span>|</span>
                <a href="/privacidade" className="hover:text-gray-700 transition-colors">Política de Privacidade</a>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">Powered by</span>
                <svg className="h-6" viewBox="0 0 60 25" fill="none">
                  <path d="M11 12L13 8H19L17 12H23L15 20L17 14H11Z" fill="#635BFF"/>
                </svg>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};


