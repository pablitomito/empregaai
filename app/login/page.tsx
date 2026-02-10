// emprega-ai-frontend/app/login/page.tsx
// PÁGINA DE LOGIN - SPLIT SCREEN PROFISSIONAL
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { signIn } from "next-auth/react";

import { 
  Sparkles, 
  Mail, 
  Lock, 
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  TrendingUp,
  CheckCircle,
  Quote,
  AlertCircle,
  Zap
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Atualizar campo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Limpar erro ao digitar
  };

  // Submeter formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        formData
      );

      // Salvar token e dados do usuário
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));

      // Redirecionar para dashboard
      router.push('/dashboard');
      
    } catch (err: any) {
      console.error('Erro ao fazer login:', err);
      setError(
        err.response?.data?.message || 
        'Email ou palavra-passe incorretos. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Login com Google
  const handleGoogleLogin = () => {
    alert('Login com Google em breve! 🚀');
  };

  return (
    <div className="min-h-screen flex">
      
      {/* ============================================ */}
      {/* LADO ESQUERDO - BOAS-VINDAS DE VOLTA */}
      {/* ============================================ */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] relative overflow-hidden">
        
        {/* Padrão de grid tecnológico */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* Efeitos de luz */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          
          {/* Logo */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              EMPREGA.AI
            </Link>
          </div>

          {/* Conteúdo Central */}
          <div className="space-y-10">
            
            {/* Título Principal */}
            <div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Bom tê-lo de volta à sua evolução profissional.
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                As melhores empresas de Portugal não param de contratar. 
                Vamos ver quem entrou em contacto hoje?
              </p>
            </div>

            {/* Badge de Estatística */}
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white mb-1">+1.200 novas vagas</p>
                  <p className="text-emerald-100">
                    analisadas pela nossa IA nas últimas 24h.
                  </p>
                </div>
              </div>
            </div>

            {/* Depoimento Curto */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all">
              <Quote className="w-8 h-8 text-blue-300 mb-3" />
              <p className="text-white leading-relaxed mb-4 italic">
                "O sistema de login e acompanhamento de candidaturas é tão simples 
                que consigo gerir tudo pelo telemóvel no intervalo do café."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  AS
                </div>
                <div>
                  <p className="font-semibold text-white">Andreia S.</p>
                  <p className="text-sm text-blue-200">Administrativa</p>
                </div>
              </div>
            </div>

            {/* Indicadores de Atividade */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-300">93%</div>
                <div className="text-xs text-blue-200 mt-1">Taxa Sucesso</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-300">24/7</div>
                <div className="text-xs text-blue-200 mt-1">IA Ativa</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-300">50+</div>
                <div className="text-xs text-blue-200 mt-1">CVs/Dia</div>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="text-sm text-blue-200">
            <p>© 2026 EMPREGA.AI - Feito em Portugal 🇵🇹</p>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* LADO DIREITO - FORMULÁRIO DE LOGIN */}
      {/* ============================================ */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          
          {/* Logo mobile */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              EMPREGA.AI
            </Link>
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Entrar na sua conta
            </h1>
            <p className="text-gray-600">
              Introduza os seus dados para aceder ao seu painel.
            </p>
          </div>

          {/* Botão Google */}
          
          <button
           onClick={() => signIn('google')}
            className="w-full border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 mb-6 shadow-sm hover:shadow-md"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar com o Google
          </button>

          {/* Divisor */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">ou entre com o seu e-mail</span>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Erro geral */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="O seu e-mail de registo"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Palavra-passe */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Palavra-passe
                </label>
                <Link 
                  href="/recuperar-senha" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Esqueceu-se da senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Manter conectado (opcional) */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Manter-me conectado
              </label>
            </div>

            {/* Botão de Ação */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Entrando...
                </>
              ) : (
                <>
                  Aceder ao Painel de Candidaturas
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Link para Cadastro */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Ainda não tem conta?{' '}
                <Link href="/cadastro" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                  Criar conta gratuita
                </Link>
              </p>
            </div>
          </form>

          {/* Rodapé Legal */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Shield className="w-4 h-4 text-green-600" />
              <p>Acesso seguro via encriptação de 256 bits.</p>
            </div>
          </div>

          {/* Benefícios rápidos (mobile) */}
          <div className="lg:hidden mt-8 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>+1.200 vagas analisadas nas últimas 24h</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <TrendingUp className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span>93% de taxa de sucesso</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
