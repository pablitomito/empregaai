'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Mail, FileText, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import Confetti from 'react-confetti';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Carregando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [showConfetti, setShowConfetti] = useState(true);
  const [generatingCV, setGeneratingCV] = useState(true);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) setEmail(emailParam);

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    const cvTimer = setTimeout(() => setGeneratingCV(false), 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(cvTimer);
    };
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 300}
          height={typeof window !== 'undefined' ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🎉 Parabéns! Pagamento Confirmado
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            O seu CV Premium está a ser gerado pela nossa IA!
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            {generatingCV ? (
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                <p className="text-blue-700 font-semibold">
                  A IA está a criar o seu currículo personalizado...
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <p className="text-blue-700 font-semibold">
                  CV gerado com sucesso! Verifique o seu email.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 text-left bg-gray-50 rounded-lg p-4">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email enviado para:</h3>
                <p className="text-blue-600 font-medium">{email || 'seuemail@exemplo.com'}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Receberá o seu CV Premium em segundos. Verifique também a pasta de spam.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left bg-gray-50 rounded-lg p-4">
              <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">O que vem no email:</h3>
                <ul className="text-sm text-gray-600 space-y-1 mt-2">
                  <li>✅ CV Premium em PDF (otimizado para ATS)</li>
                  <li>✅ Carta de apresentação personalizada</li>
                  <li>✅ Acesso ao dashboard de candidaturas</li>
                  <li>✅ Guia de como usar a plataforma</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Passos:</h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="text-left p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
                <h4 className="font-semibold text-gray-900 mb-1">Verifique o Email</h4>
                <p className="text-sm text-gray-600">Abra o email e faça download do seu CV</p>
              </div>

              <div className="text-left p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
                <h4 className="font-semibold text-gray-900 mb-1">Acesse o Dashboard</h4>
                <p className="text-sm text-gray-600">Acompanhe suas candidaturas em tempo real</p>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Ir para o Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Não recebeu o email?{' '}
            <Link href="/suporte" className="text-blue-600 hover:underline font-semibold">
              Entre em contacto
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
