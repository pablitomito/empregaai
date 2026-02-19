// emprega-ai-frontend/app/cadastro/page.tsx
// PÁGINA DE CADASTRO - SPLIT SCREEN PROFISSIONAL
'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { 
  Sparkles, 
  CheckCircle, 
  Mail, 
  Lock, 
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Zap,
  Target,
  FileText,
  Radar,
  Quote,
  AlertCircle
} from 'lucide-react';

export default function CadastroPage() {
  const router = useRouter();
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validação em tempo real
  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = 'Nome é obrigatório';
        } else if (value.trim().length < 2) {
          newErrors.firstName = 'Nome deve ter pelo menos 2 caracteres';
        } else {
          delete newErrors.firstName;
        }
        break;

      case 'lastName':
        if (!value.trim()) {
          newErrors.lastName = 'Apelido é obrigatório';
        } else if (value.trim().length < 2) {
          newErrors.lastName = 'Apelido deve ter pelo menos 2 caracteres';
        } else {
          delete newErrors.lastName;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = 'Email é obrigatório';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Email inválido';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Palavra-passe é obrigatória';
        } else if (value.length < 8) {
          newErrors.password = 'Mínimo de 8 caracteres';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password = 'Deve conter maiúsculas, minúsculas e números';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Confirme a palavra-passe';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'As palavras-passe não coincidem';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }

    setErrors(newErrors);
  };

  // Atualizar campo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Submeter formulário
// --- SUBSTITUA O SEU BLOCO PELO BLOCO ABAIXO ---
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await axios.post(
      'https://empregaai-api-production-9249.up.railway.app/api/auth/register',
      {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      },
      { withCredentials: true }
    );

    const data = response.data?.data || response.data;

    if (!data || !data.token) {
      throw new Error("Token não recebido do servidor.");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    router.push("/onboarding/objetivo");

  } catch (err: any) {
    console.error("Erro:", err.response?.data || err.message);
    setErrors({
      submit: err.response?.data?.message || "Erro ao criar conta.",
    });
  } finally {
    setIsLoading(false);
  }
};

  // --- FIM DO BLOCO ---
  // Login com Google
  const handleGoogleLogin = () => {
  signIn('google', { callbackUrl: '/onboarding/objetivo' });
  };

  return (
    <div className="min-h-screen flex">
      
      {/* ============================================ */}
      {/* LADO ESQUERDO - BRANDING/MOTIVAÇÃO */}
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
                O seu próximo capítulo profissional começa aqui.
              </h2>
            </div>

            {/* Lista de Benefícios */}
            <div className="space-y-5">
              
              {/* Benefício 1 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/30 transition-all">
                  <Zap className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Criação Instantânea</h3>
                  <p className="text-blue-100">
                    O seu currículo otimizado para o mercado português em segundos.
                  </p>
                </div>
              </div>

              {/* Benefício 2 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-all">
                  <Target className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Inteligência Adaptativa</h3>
                  <p className="text-blue-100">
                    A nossa IA reescreve o seu perfil para cada candidatura específica.
                  </p>
                </div>
              </div>

              {/* Benefício 3 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                  <FileText className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Cartas que Convencem</h3>
                  <p className="text-blue-100">
                    Geramos cartas de apresentação que os recrutadores realmente leem.
                  </p>
                </div>
              </div>

              {/* Benefício 4 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-all">
                  <Radar className="w-6 h-6 text-orange-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Radar de Vagas</h3>
                  <p className="text-blue-100">
                    Monitorizamos as maiores empresas de Portugal 24/7 por si.
                  </p>
                </div>
              </div>
            </div>

            {/* Depoimento Flutuante */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all">
              <Quote className="w-8 h-8 text-emerald-400 mb-3" />
              <p className="text-white leading-relaxed mb-4 italic">
                "Fui contratado pela Amazon em Lisboa apenas 10 dias após criar a minha conta. 
                A IA destacou competências que eu nem sabia que eram tão valiosas!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  TF
                </div>
                <div>
                  <p className="font-semibold text-white">Tiago F.</p>
                  <p className="text-sm text-blue-200">Gestor de Operações</p>
                </div>
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
      {/* LADO DIREITO - FORMULÁRIO */}
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
              Você está a um passo de transformar a sua carreira. 
            </h1>
            <p className="text-gray-600">
              Junte-se a <strong className="text-blue-600">+15.000 profissionais</strong> que já automatizaram a sua procura de emprego.
            </p>
          </div>

          {/* Botão Google */}
          <button
            onClick={handleGoogleLogin}
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
            Registar com o Google
          </button>

          {/* Divisor */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">ou use o seu e-mail</span>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Erro geral */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{errors.submit}</p>
              </div>
            )}

            {/* Nome e Apelido */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ex: Ricardo"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Apelido */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apelido
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Ex: Martins"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

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
                  placeholder="exemplo@email.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Palavra-passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Palavra-passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="No mínimo 8 caracteres"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirmar Palavra-passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Palavra-passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repita a sua senha"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Botão de Ação */}
            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Criando conta...
                </>
              ) : (
                <>
                  Desbloquear o meu Futuro
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Link para Login */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <Link href="/onboarding/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                  Entrar
                </Link>
              </p>
            </div>
          </form>

          {/* Rodapé Legal */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-start gap-2 mb-4">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600">
                Os seus dados estão seguros e encriptados. Não partilhamos informações sem o seu consentimento.
              </p>
            </div>
            
            <div className="flex justify-center gap-4 text-xs text-gray-500">
              <Link href="/termos" className="hover:text-gray-700 hover:underline">
                Termos de Serviço
              </Link>
              <span>•</span>
              <Link href="/privacidade" className="hover:text-gray-700 hover:underline">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// build force 