"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Ícones Simples
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    // Simulação de delay de pagamento
    setTimeout(() => {
      setIsLoading(false);
      router.push('/onboarding/analisando'); // Ou sua próxima página
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Animado (Blobs) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="animate-blob absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="animate-blob animation-delay-2000 absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl" />
      </div>

      <header className="w-full max-w-2xl flex justify-between items-center py-4 mb-6 z-10">
        <h1 className="text-2xl font-bold text-gray-800 italic">PABLITO.MY</h1> 
        <div className="flex items-center text-sm text-green-600 font-medium">
          <LockIcon /> Ambiente Seguro
        </div>
      </header>

      <main className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100 z-10 animate-fade-in">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase mb-2">
            <span>Passo Final</span>
            <span>95% Concluído</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary-blue to-primary-purple h-2 rounded-full w-[95%] shadow-sm" />
          </div>
        </div>

        <section className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 animate-slide-up">
            Sua candidatura está pronta!
          </h2>
          <p className="text-gray-600 leading-relaxed animate-slide-up">
            "Este projeto já empregou milhares de pessoas. Por uma taxa simbólica, nossa IA assume o trabalho pesado para você."
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">O que está incluído:</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center"><CheckIcon /> <span className="ml-2">Criação de currículos ilimitados</span></li>
              <li className="flex items-center"><CheckIcon /> <span className="ml-2">Envios automáticos para vagas</span></li>
              <li className="flex items-center"><CheckIcon /> <span className="ml-2">Gestão 100% por IA</span></li>
            </ul>
          </div>

          <div className="bg-primary-purple text-white p-6 rounded-xl flex flex-col justify-center items-center shadow-lg transform hover:scale-105 transition-transform">
            <p className="text-sm opacity-80 mb-1 font-medium text-center">Melhor investimento da sua vida</p>
            <div className="text-4xl font-black mb-1">3,99€</div>
            <p className="text-xs opacity-70">Cancele quando quiser</p>
          </div>
        </section>

        {/* Placeholder do Stripe */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 mb-8 text-center text-gray-400 text-sm">
          <p>Campos de Pagamento (Stripe)</p>
          <div className="flex justify-center mt-2 space-x-2">
            <div className="w-8 h-5 bg-gray-200 rounded" />
            <div className="w-8 h-5 bg-gray-200 rounded" />
            <div className="w-8 h-5 bg-gray-200 rounded" />
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full bg-action-green hover:bg-action-dark text-white font-bold py-4 rounded-xl shadow-xl transition-all active:scale-95 disabled:opacity-50"
        >
          {isLoading ? 'Processando...' : 'CANDIDATAR-ME AGORA'}
        </button>

        <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest font-bold">
          Segurança Garantida por Stripe & Pablito.my
        </p>
      </main>
    </div>
  );
}