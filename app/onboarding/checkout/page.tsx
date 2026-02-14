"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="group">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">Método de Pagamento</label>
        <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="border-2 border-[#2563EB] bg-blue-50/30 p-3 rounded-xl flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-4 border-[#2563EB]"></div>
                <span className="text-xs font-bold">Cartão de Crédito</span>
            </div>
            <div className="border border-slate-200 p-3 rounded-xl flex items-center gap-3 opacity-40 grayscale cursor-not-allowed">
                <div className="w-4 h-4 rounded-full border-2 border-slate-200"></div>
                <span className="text-xs font-bold">MB WAY</span>
            </div>
        </div>
        
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
        <p className="text-[11px] text-slate-500 font-medium leading-tight">
          Autorizo o pagamento de 3,99€ e aceito a ativação imediata da distribuição automática. Cancele a qualquer momento.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[12px] font-bold">
          ⚠️ {error}
        </div>
      )}

      <button
        disabled={loading || !stripe}
        className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-20 uppercase text-[13px] tracking-widest flex items-center justify-center gap-2 group"
      >
        {loading ? 'A processar...' : 'Pagar 3,99€ — Ativar Agora'}
        {!loading && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>}
      </button>

      <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/></svg>
        Pagamento Seguro · Stripe
      </div>
    </form>
  );
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans">
      <header className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className="text-xl font-black tracking-tighter uppercase italic">
            Curriculo<span className="text-[#2563EB]">Job</span>
          </span>
          <div className="hidden md:flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Sistema Ativo em Portugal
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Lado Esquerdo: Benefícios (Baseado no código da Claude) */}
          <div className="lg:col-span-7 space-y-10">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 text-[#2563EB] font-bold mb-6 text-[11px] uppercase tracking-[2px] bg-blue-50 w-fit px-3 py-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                Oferta Especial Ativada
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                Distribua o seu currículo automaticamente por 3,99€.
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                Aumente as suas chances distribuindo o seu perfil profissional para os principais portais de emprego em Portugal com apenas um clique.
              </p>
            </div>

            {/* Portais Integrados (Adaptado da Claude) */}
            <div className="space-y-4 pt-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portais de Emprego Integrados:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 font-bold text-xs">
                {['Indeed Portugal', 'Talenter', 'Timing', 'Eurofirms', 'Net Empregos', 'OLX Empregos'].map(portal => (
                  <div key={portal} className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    <span className="text-slate-700 uppercase tracking-tighter">{portal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lista de Recursos (Adaptado da Claude) */}
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 border-t border-slate-100 pt-8">
                {[
                  'Matching inteligente com IA',
                  'Notificações em tempo real',
                  'Estatísticas detalhadas',
                  'Histórico completo de envios',
                  'Suporte prioritário 24/7',
                  'Cancele quando quiser'
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-[#2563EB]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                    <span className="text-sm font-bold text-slate-600">{item}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Lado Direito: Checkout Premium */}
          <div className="lg:col-span-5 lg:sticky lg:top-10">
            <div className="bg-white rounded-xl shadow-2xl shadow-blue-900/10 border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-8 text-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[2px] text-blue-400">Pagamento de Ativação</span>
                  <div className="px-2 py-1 bg-white/10 rounded text-[9px] font-black">14 DIAS DE ACESSO</div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xl font-black tracking-tight italic">Assinatura IA Sniper</p>
                    <p className="text-[11px] opacity-60 font-medium italic">Distribuição em 6 portais</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black tracking-tighter text-white">3,99€</p>
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">IVA Incluído</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100 text-[13px] text-blue-900 font-bold leading-relaxed italic">
                  "Só falta o pagamento. Os seus dados já estão guardados — vamos ativar a sua conta assim que o pagamento for confirmado."
                </div>

                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="py-12 bg-white border-t border-slate-100 mt-20 text-center">
        <div className="flex justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
          <a href="#" className="hover:text-blue-600">Termos</a>
          <a href="#" className="hover:text-blue-600">Privacidade</a>
          <a href="#" className="hover:text-blue-600">Ajuda</a>
        </div>
        <p className="text-[9px] text-slate-300 font-black uppercase tracking-tighter">© 2026 CurriculoJob Portugal · Tecnologia IA</p>
      </footer>
    </div>
  );
}