"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// --- FORMULÁRIO DE PAGAMENTO (MESMAS CORES E BORDAS) ---
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
        setError("Pagamento não autorizado. Verifique os dados ou tente outro método.");
      } else if (paymentIntent?.status === 'succeeded') {
        router.push('/success');
      }
    } catch (err) {
      setError('Erro de conexão. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="group">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">
          Dados do Cartão
        </label>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm focus-within:border-[#2563EB] transition-all">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1e293b',
                  fontFamily: 'Inter, sans-serif',
                  '::placeholder': { color: '#94a3b8' },
                },
              },
              hidePostalCode: true
            }} 
          />
        </div>
      </div>

      <div className="flex items-start gap-3 py-2">
        <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]" />
        <p className="text-[12px] text-slate-500 font-medium leading-tight">
          Autorizo o pagamento único de 3,99€ e aceito os <a href="#" className="underline text-slate-900 font-bold">Termos</a> e <a href="#" className="underline text-slate-900 font-bold">Privacidade</a>.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-[12px] font-bold animate-in fade-in slide-in-from-top-1">
          ⚠️ {error}
        </div>
      )}

      <button
        disabled={loading || !stripe}
        className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-20 uppercase text-[12px] tracking-widest flex items-center justify-center gap-2 group"
      >
        {loading ? 'A processar...' : 'Confirmar Subscrição'}
        {!loading && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>}
      </button>

      <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/></svg>
        Pagamento Seguro · Stripe
      </div>
    </form>
  );
};

// --- PÁGINA PRINCIPAL ---
export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans">
      {/* Header com a mesma Tipografia de Marca */}
      <header className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className="text-xl font-black tracking-tighter uppercase italic">
            Curriculo<span className="text-[#2563EB]">Job</span>
          </span>
          <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
            SSL Encrypted
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Lado Esquerdo: Copy Profissional */}
          <div className="lg:col-span-7 space-y-10">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 text-[#2563EB] font-bold mb-6 text-[11px] uppercase tracking-[2px] bg-blue-50/50 w-fit px-3 py-1 rounded">
                Último Passo
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                Parabéns — falta apenas o pagamento para começar.
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                A sua IA Sniper já processou o seu currículo. Ative o envio automático agora para entrar no topo da lista das empresas em Portugal.
              </p>
            </div>

            {/* Benefícios com ícones finos */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                'Candidaturas Automáticas 24/7',
                'Otimização IA para sistemas ATS',
                'Acesso a Vagas Ocultas',
                'Destaque Premium no topo'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <div className="bg-blue-50 p-1 rounded-full">
                    <svg className="w-4 h-4 text-[#2563EB]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lado Direito: Checkout Dinâmico (Mesa Tipografia e Cores) */}
          <div className="lg:col-span-5 lg:sticky lg:top-10">
            <div className="bg-white rounded-xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[2px] opacity-50">Resumo da Ordem</span>
                  <span className="bg-[#2563EB] text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider">Acesso Total</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xl font-black tracking-tight italic">Assinatura IA Sniper</p>
                    <p className="text-[11px] opacity-60 font-medium">14 Dias de Candidaturas Ilimitadas</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black tracking-tighter">3,99€</p>
                    <p className="text-[9px] opacity-40 font-bold uppercase tracking-widest">IVA Incluído</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <p className="text-[13px] text-slate-500 mb-8 font-medium italic">
                  "Os seus dados já foram guardados. Ative a conta agora para iniciarmos o envio imediato para as empresas parceiras."
                </p>

                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>

                <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-3 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    <span className="text-[10px] font-black uppercase tracking-widest">Garantia de Satisfação 14 Dias</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="py-12 bg-white border-t border-slate-100 mt-20 text-center">
        <div className="flex justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-4">
          <a href="#" className="hover:text-[#2563EB] transition-colors">Termos</a>
          <a href="#" className="hover:text-[#2563EB] transition-colors">Privacidade</a>
          <a href="#" className="hover:text-[#2563EB] transition-colors">Contactos</a>
        </div>
        <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest italic">© 2026 CurriculoJob Portugal</p>
      </footer>
    </div>
  );
}