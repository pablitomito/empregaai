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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="group">
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          Dados do Cartão
        </label>
        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm focus-within:border-blue-500 transition-all">
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

      <div className="flex items-start gap-2 py-2">
        <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <p className="text-[12px] text-slate-500 leading-tight">
          Autorizo o pagamento de 3,99€ e aceito os <a href="#" className="underline text-slate-700">Termos de Serviço</a> e <a href="#" className="underline text-slate-700">Política de Privacidade</a>.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded bg-red-50 border border-red-100 text-red-600 text-xs font-bold animate-pulse">
          ⚠️ {error}
        </div>
      )}

      <button
        disabled={loading || !stripe}
        className="w-full bg-[#1e293b] hover:bg-black text-white font-bold py-4 rounded transition-all disabled:opacity-50 text-[14px] uppercase tracking-widest shadow-lg"
      >
        {loading ? 'A processar...' : 'Pagar 3,99€ — Ativar Agora'}
      </button>

      <p className="text-center text-[10px] text-slate-400 font-medium">
        Pagamento seguro processado por <strong>Stripe</strong>. Não guardamos os seus dados bancários.
      </p>
    </form>
  );
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white md:bg-[#F8FAFC] antialiased">
      {/* Header Minimalista Estilo SaaS */}
      <header className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className="text-xl font-black tracking-tighter text-slate-900">CURRICULO<span className="text-blue-600">JOB</span></span>
          <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[2px]">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
            Checkout Seguro
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Coluna Esquerda: A sua Copy e Prova Social */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
                Parabéns — falta apenas o pagamento para começar a candidatar‑se.
              </h1>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                A sua IA Sniper já processou o seu perfil. Ative a sua conta agora para que possamos enviar o seu currículo para milhares de empresas em Portugal.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Incluído no Plano Premium:</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Candidaturas Automáticas 24/7',
                  'Otimização IA para sistemas ATS',
                  'Acesso a Vagas Ocultas',
                  'Feedback de Especialistas'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded shadow-sm">
                    <div className="bg-blue-50 p-1 rounded-full">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testemunhos com logos de empresas (Referência: Rodrigo Borges) */}
            <div className="pt-8 border-t border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6 italic">Ajudamos candidatos a entrar em empresas como:</p>
              <div className="flex flex-wrap gap-8 opacity-40 grayscale mb-10">
                {/* Aqui você pode colocar logos pequenos se tiver, ou apenas nomes */}
                <span className="font-black text-xl">STARBUCKS</span>
                <span className="font-black text-xl">UBER</span>
                <span className="font-black text-xl">ITAÚ</span>
                <span className="font-black text-xl">GLOVO</span>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-slate-200 italic text-slate-600 text-sm shadow-sm relative">
                "Estou a adorar porque consegui montar um ótimo currículo em menos de meia hora. O editor é muito intuitivo e as dicas são realmente úteis para o mercado português."
                <div className="mt-4 not-italic flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-xs">RB</div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs leading-none">Rodrigo Borges</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter mt-1 text-blue-600">Barista · Starbucks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: O Bloco de Pagamento (Fixo em Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-10">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="bg-slate-900 p-6 text-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest opacity-60">Resumo do Pedido</span>
                  <span className="bg-blue-500 text-[10px] px-2 py-1 rounded font-black uppercase">Oferta Ativa</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-lg font-bold italic">Assinatura Total IA</p>
                    <p className="text-[11px] opacity-70">Acesso ilimitado por 14 dias</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black">3,99€</p>
                    <p className="text-[10px] opacity-50 italic">IVA incluído</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <p className="text-sm text-slate-500 mb-8 font-medium">
                  Só falta o pagamento. Os seus dados já estão guardados — vamos ativar a sua conta assim que o pagamento for confirmado.
                </p>

                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>

                <div className="mt-8 space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    <span className="text-[11px] font-bold uppercase tracking-tight">Garantia total de reembolso (14 dias)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span className="text-[11px] font-bold uppercase tracking-tight">Cancele quando quiser sem fidelização</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="py-12 bg-white border-t border-slate-100 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Termos</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contactos</a>
          </div>
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">© 2026 CurriculoJob Portugal. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}