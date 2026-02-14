"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Inicialização do Stripe com a chave do seu .env
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// --- COMPONENTE DO FORMULÁRIO (DESIGN CLEAN) ---
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
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
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });

      if (stripeError) {
        setError(stripeError.message || 'Ocorreu um erro no processamento.');
      } else if (paymentIntent?.status === 'succeeded') {
        router.push('/success');
      }
    } catch (err) {
      setError('Falha na comunicação com o servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="bg-white p-4 rounded-md border border-slate-300 shadow-sm">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#1e293b',
                '::placeholder': { color: '#94a3b8' },
              },
            },
            hidePostalCode: true
          }} 
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded border border-red-100">
          {error}
        </div>
      )}

      <button
        disabled={loading || !stripe}
        className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold py-4 rounded shadow-md transition-all disabled:opacity-50 uppercase tracking-wide text-sm"
      >
        {loading ? 'Processando...' : 'Ativar minha candidatura agora'}
      </button>
      
      <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/></svg>
        Pagamento Seguro via Stripe
      </div>
    </form>
  );
};

// --- PÁGINA PRINCIPAL ---
export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] antialiased">
      {/* Header de Progresso Profissional */}
      <header className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <span className="text-xl font-bold tracking-tight text-slate-900 underline decoration-[#2563EB]">CurriculoJob</span>
          <div className="flex items-center gap-8 text-[12px] font-bold text-slate-400 uppercase tracking-tighter">
            <span className="text-slate-900 border-b-2 border-[#2563EB]">1. Checkout</span>
            <span>2. Finalização</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Sua Copy de Ontem */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Parabéns! Você está a um passo de se candidatar para esses e outros milhares de empregos em Portugal.
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Sua IA Sniper já identificou as melhores oportunidades. Ative o envio agora para entrar no topo da lista dos recrutadores.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Lado Esquerdo: Valor e Prova Social */}
          <div className="md:col-span-7 space-y-8">
            <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#2563EB] rounded-full"></span>
                Benefícios do Acesso Total (14 dias)
              </h2>
              <ul className="space-y-4">
                {[
                  'Candidaturas Automáticas 24h/dia',
                  'Otimização técnica para sistemas de triagem (ATS)',
                  'Acesso exclusivo a vagas não publicadas',
                  'Suporte prioritário ao candidato'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Testemunhos Sóbrios */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { nome: 'Rodrigo Borges', cargo: 'Barista · Starbucks', texto: 'Consegui montar um ótimo currículo em menos de meia hora. O editor é bem fácil de usar.' },
                { nome: 'Lauro Soares', cargo: 'Web Developer · Uber', texto: 'O suporte foi super prestativo. Foi com este currículo que consegui meu emprego atual.' }
              ].map((t) => (
                <div key={t.nome} className="p-5 bg-slate-100 rounded border border-slate-200">
                  <p className="text-xs italic text-slate-600 mb-3">"{t.texto}"</p>
                  <p className="text-[13px] font-bold text-slate-900">{t.nome}</p>
                  <p className="text-[11px] text-slate-500 uppercase font-semibold">{t.cargo}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lado Direito: Checkout */}
          <div className="md:col-span-5">
            <div className="bg-white p-8 rounded-lg border-2 border-slate-900 shadow-xl sticky top-8">
              <div className="text-center pb-6 border-b border-slate-100">
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Acesso Total</span>
                <div className="mt-2 flex items-center justify-center gap-3">
                   <span className="text-4xl font-black text-slate-900 underline decoration-[#2563EB]">3,99€</span>
                </div>
                <p className="text-[12px] text-slate-400 mt-2 font-bold uppercase">Pagamento Único · 14 Dias de Acesso</p>
              </div>

              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>

              <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-100 flex gap-3">
                <svg className="w-10 h-10 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <div className="text-[12px]">
                  <p className="font-bold text-blue-900">Garantia de 14 dias</p>
                  <p className="text-blue-700 font-medium">Reembolso total caso não esteja satisfeito com as candidaturas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="mt-20 border-t border-slate-200 py-8 bg-white text-center">
        <div className="flex justify-center gap-6 text-[12px] font-bold text-slate-400 uppercase tracking-tighter">
          <a href="#" className="hover:text-slate-900 transition-colors">Termos</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Privacidade</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Contato</a>
        </div>
        <p className="text-[10px] text-slate-300 mt-4 font-bold">© 2026 CURRICULOJOB PORTUGAL - TODOS OS DIREITOS RESERVADOS</p>
      </footer>
    </div>
  );
}