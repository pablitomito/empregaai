"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// --- FORMULÁRIO DE PAGAMENTO OTIMIZADO ---
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
        setError("Pagamento não autorizado. Verifique os dados do cartão ou tente outro método.");
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
      {/* Seleção de Método (Simulado para UI) */}
      <div className="space-y-3">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Método de Pagamento</label>
        <div className="grid grid-cols-2 gap-3">
          <div className="border-2 border-[#2563EB] bg-blue-50/50 p-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer">
            <div className="w-4 h-4 rounded-full border-4 border-[#2563EB]"></div>
            <span className="text-[12px] font-bold text-slate-900">Cartão</span>
          </div>
          <div className="border border-slate-200 p-3 rounded-xl flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
            <div className="w-4 h-4 rounded-full border-2 border-slate-200"></div>
            <span className="text-[12px] font-bold text-slate-500">MB WAY</span>
          </div>
        </div>
      </div>

      <div className="group">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">Dados do Cartão</label>
        <div className="bg-white p-4 rounded-xl border border-slate-200 focus-within:border-[#2563EB] transition-all shadow-sm">
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

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]" />
          <p className="text-[11px] text-slate-500 font-medium leading-snug">
            Ao subscrever, concorda com os <a href="#" className="text-slate-900 underline font-bold">Termos</a> e <a href="#" className="text-slate-900 underline font-bold">Privacidade</a>. Pode cancelar a qualquer momento.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[12px] font-bold animate-in fade-in">
          ⚠️ {error}
        </div>
      )}

      <button
        disabled={loading || !stripe}
        className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-100 transition-all disabled:opacity-30 uppercase text-[13px] tracking-widest flex items-center justify-center gap-2 group"
      >
        {loading ? 'A processar...' : 'Pagar 3,99€ — Confirmar Subscrição'}
        {!loading && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>}
      </button>

      <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-tight">
        Pagamento seguro processado por Stripe. Não armazenamos números de cartão.
      </p>
    </form>
  );
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans">
      <header className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className="text-xl font-black tracking-tighter uppercase italic text-slate-900">
            Curriculo<span className="text-[#2563EB]">Job</span>
          </span>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Ativo em Portugal
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-20">
          
          {/* COLUNA ESQUERDA: RESUMO DO PEDIDO (Wireframe Item 2) */}
          <div className="lg:col-span-6 space-y-10 order-2 lg:order-1">
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Parabéns — falta apenas o pagamento para começar.
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Pagamento seguro de 3,99€. Cancelamento gratuito a qualquer momento. Reembolso total se não ficar satisfeito.
              </p>
            </div>

            {/* Prova Social Curta (Wireframe Item 1) */}
            <div className="flex items-center gap-4 py-4 border-y border-slate-200/60">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>)}
               </div>
               <p className="text-[12px] font-black text-slate-400 uppercase tracking-tight">
                 +1.200 candidatos colocados em Portugal este mês
               </p>
            </div>

            {/* Benefícios Principais (Wireframe Item 2) */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">O que inclui a sua ativação:</h3>
              <ul className="grid gap-3">
                {[
                  'CV otimizado pela IA para o mercado PT',
                  'Envios automáticos para milhares de vagas',
                  'Acompanhamento de candidaturas em tempo real',
                  'Prioridade máxima nos algoritmos de seleção'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COLUNA DIREITA: FORMULÁRIO (Wireframe Item 3) */}
          <div className="lg:col-span-6 order-1 lg:order-2 lg:sticky lg:top-10">
            <div className="bg-white rounded-xl shadow-2xl shadow-blue-900/5 border border-slate-200 overflow-hidden">
              {/* Header do Card: Resumo do Pedido Fixo */}
              <div className="bg-slate-900 p-8 text-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[2px] text-blue-400">Checkout Seguro</span>
                  <svg className="w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/></svg>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest opacity-60 mb-1">Plano Selecionado</p>
                    <p className="text-xl font-black tracking-tight">Assinatura IA Sniper</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black tracking-tighter">3,99€</p>
                    <p className="text-[10px] font-bold text-blue-400 uppercase">IVA Incluído</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Mensagem Introdutória (Wireframe Item 3) */}
                <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-[13px] text-blue-900 font-bold leading-relaxed">
                    Só falta o pagamento. Os seus dados já estão guardados — vamos ativar a sua conta assim que o pagamento for confirmado.
                  </p>
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
        <div className="flex justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-4">
          <a href="#" className="hover:text-[#2563EB] transition-colors">Termos</a>
          <a href="#" className="hover:text-[#2563EB] transition-colors">Privacidade</a>
          <a href="#" className="hover:text-[#2563EB] transition-colors">Ajuda</a>
        </div>
        <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest italic tracking-tighter">
          CURRICULOJOB PORTUGAL · TECNOLOGIA DE RECRUTAMENTO IA
        </p>
      </footer>
    </div>
  );
}