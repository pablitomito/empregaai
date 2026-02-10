// emprega-ai-frontend/app/recuperar-senha/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle, Loader } from 'lucide-react';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular envio de email
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 2000);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Email Enviado! 📧
            </h1>

            <p className="text-gray-600 mb-6">
              Enviamos um link de recuperação de senha para{' '}
              <strong className="text-gray-900">{email}</strong>
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">
                <strong>Não recebeu o email?</strong> Verifique sua caixa de spam
                ou aguarde alguns minutos. O link é válido por 1 hora.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Voltar para Login
              </Link>

              <button
                onClick={() => setEmailSent(false)}
                className="block w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Tentar outro email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Botão Voltar */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para login
        </Link>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Esqueceu sua senha?
            </h1>
            <p className="text-gray-600">
              Não se preocupe! Digite seu email e enviaremos instruções para
              redefinir sua senha.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Enviar link de recuperação
                </>
              )}
            </button>
          </form>

          {/* Informações Adicionais */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Como funciona?
              </h3>
              <ol className="text-xs text-gray-600 space-y-1">
                <li>1. Digite seu email cadastrado</li>
                <li>2. Verifique sua caixa de entrada</li>
                <li>3. Clique no link recebido</li>
                <li>4. Crie uma nova senha</li>
              </ol>
            </div>
          </div>

          {/* Link para Suporte */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Ainda com problemas?{' '}
              <a
                href="mailto:suporte@emprega.ai"
                className="text-blue-600 hover:underline font-semibold"
              >
                Entre em contato
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
