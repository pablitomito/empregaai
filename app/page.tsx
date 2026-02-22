// emprega-ai-frontend/app/page.tsx
// LANDING PAGE PROFISSIONAL - SEGUINDO DOCUMENTO DE COPYWRITING
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Target, 
  Zap, 
  Send, 
  CheckCircle, 
  Star,
  ArrowRight,
  TrendingUp,
  FileText,
  Mail,
  ChevronLeft,
  ChevronRight,
  Quote,
  Award,
  Clock,
  Heart
} from 'lucide-react';

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentTemplate, setCurrentTemplate] = useState(0);

  const testimonials = [
    {
      name: "João S.",
      location: "Lisboa",
      text: "Eu mandava 50 currículos por dia e nada. Com o Emprega.AI, a IA adaptou o meu CV para uma vaga na Microsoft e fui chamado na mesma semana!",
      role: "Engenheiro de Software"
    },
    {
      name: "Maria P.",
      location: "Porto",
      text: "A funcionalidade de carta de apresentação automática é genial. Poupei horas de trabalho e consegui um emprego na área que queria, não num subemprego.",
      role: "Marketing Manager"
    },
    {
      name: "Carlos R.",
      location: "Coimbra",
      text: "Depois de 6 meses desempregado, em apenas 10 dias com o Emprega.AI recebi 3 propostas de entrevista. Hoje trabalho na TAP!",
      role: "Gestor Comercial"
    }
  ];

  const templates = [
    { name: "Modern Professional", color: "from-blue-500 to-purple-500" },
    { name: "Creative Bold", color: "from-purple-500 to-pink-500" },
    { name: "Executive Minimal", color: "from-gray-700 to-gray-900" },
    { name: "Tech Innovator", color: "from-emerald-500 to-teal-500" }
  ];
/// hahahahaha
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextTemplate = () => {
    setCurrentTemplate((prev) => (prev + 1) % templates.length);
  };

  const prevTemplate = () => {
    setCurrentTemplate((prev) => (prev - 1 + templates.length) % templates.length);
  };

  return (
    <main className="min-h-screen bg-white">
      
      {/* ============================================ */}
      {/* 1. HERO SECTION - A PRIMEIRA IMPRESSÃO */}
      {/* ============================================ */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white">
        {/* Padrão de fundo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat"></div>
        </div>
        
        {/* Efeitos de luz */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Coluna Esquerda - Texto */}
              <div className="text-center lg:text-left space-y-8 animate-fadeIn">
                
                {/* Badge superior */}
                <div className="inline-block">
                  <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-full px-5 py-2.5 text-sm font-semibold text-emerald-200 backdrop-blur-sm">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Inteligência Artificial + Empregos Automatizados
                    </span>
                  </div>
                </div>
                
                {/* H1 - Título Principal */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                  O Seu Próximo Emprego em Portugal Encontrado Por{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-300">
                    Inteligência Artificial
                  </span>
                </h1>
                
                {/* H2 - Subtítulo */}
                <p className="text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed font-light">
                  Pare de enviar o mesmo currículo para toda a gente. O Emprega.AI analisa o seu perfil e cria{' '}
                  <strong className="text-white font-semibold">candidaturas personalizadas e únicas</strong> para centenas de vagas compatíveis.{' '}
                  <strong className="text-emerald-300 font-semibold">Deixe a IA trabalhar enquanto você descansa.</strong>
                </p>
                
                {/* CTA Principal */}
                <div className="space-y-4">
                  <Link 
                    href="onboarding/cadastro"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:scale-105"
                  >
                    Começar Meu Match Profissional
                    <ArrowRight className="w-6 h-6" />
                  </Link>
                  
                  <p className="text-sm text-blue-200 font-medium">
                    <CheckCircle className="w-4 h-4 inline mr-1 text-emerald-400" />
                    +5.000 utilizadores contratados este mês
                  </p>
                </div>
                
                {/* Estatísticas rápidas */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-300">93%</div>
                    <div className="text-xs md:text-sm text-blue-200 mt-1">Taxa de Sucesso</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-300">7 dias</div>
                    <div className="text-xs md:text-sm text-blue-200 mt-1">Até 1ª Entrevista</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-300">50+</div>
                    <div className="text-xs md:text-sm text-blue-200 mt-1">CVs por Dia</div>
                  </div>
                </div>
              </div>
              
              {/* Coluna Direita - Ilustração */}
              <div className="hidden lg:block relative animate-slideInRight">
                <div className="relative z-10">
                  {/* Mockup de CV */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                        JS
                      </div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-300 rounded-lg w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">React</div>
                      <div className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Node.js</div>
                      <div className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">TypeScript</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-100 rounded w-full"></div>
                      <div className="h-2 bg-gray-100 rounded w-4/5"></div>
                    </div>
                  </div>
                  
                  {/* Badge de IA */}
                  <div className="absolute -top-6 -right-6 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-pulse-glow">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-bold">IA Personalizada</span>
                  </div>
                  
                  {/* Indicador de match */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">Match Score</div>
                        <div className="text-2xl font-bold text-gray-900">98%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Efeitos decorativos */}
                <div className="absolute top-20 -left-20 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 2. O PROBLEMA (AGITAÇÃO) */}
      {/* ============================================ */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Título da seção */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
              Você tem potencial. Então, por que o telefone não toca?
            </h2>
            
            {/* Card do problema */}
            <div className="bg-slate-900 rounded-3xl shadow-xl p-8 md:p-12 border border-slate-800">
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
                Cansado de enviar dezenas de currículos e ser ignorado? O problema não é você, 
                é o "jogo" dos recrutadores. Empresas recebem{' '}
                <strong className="text-blue-600 font-bold">milhares de candidaturas iguais</strong>. 
                Se o seu currículo não contiver as palavras-chave exatas daquela vaga específica, 
                ele vai para o lixo antes mesmo de ser lido por um humano.
              </p>
              
              {/* Destaque da verdade dura */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-r-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-red-900 mb-2">
                      A Verdade Dura:
                    </p>
                    <p className="text-red-800 text-lg">
                      Currículos genéricos não funcionam mais. Você precisa de personalização em escala.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 3. A SOLUÇÃO (COMO FUNCIONA) */}
      {/* ============================================ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          
          {/* Título da seção */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Como o Emprega.AI coloca você na frente da concorrência
            </h2>
            <p className="text-xl text-gray-600">
              4 passos simples para transformar a sua procura de emprego
            </p>
          </div>
          
          {/* 4 Passos com ícones */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Passo 1 - Perfil Inteligente */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-300">
                  
                  {/* Número do passo */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                    1
                  </div>
                  
                  {/* Ícone */}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Texto */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Perfil Inteligente
                  </h3>
                  <p className="text-gray-700">
                    Você preenche os seus dados e objetivos apenas uma vez.
                  </p>
                </div>
              </div>

              {/* Passo 2 - Hiper-Personalização */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-300">
                  
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                    2
                  </div>
                  
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Hiper-Personalização
                  </h3>
                  <p className="text-gray-700">
                    A nossa IA analisa vagas abertas em tempo real e reescreve o seu currículo especificamente para cada uma delas, destacando o que aquele recrutador quer ler.
                  </p>
                </div>
              </div>

              {/* Passo 3 - Carta Automática */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-emerald-300">
                  
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                    3
                  </div>
                  
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Mail className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Carta de Apresentação Automática
                  </h3>
                  <p className="text-gray-700">
                    Além do CV, geramos uma carta de apresentação persuasiva e única para cada candidatura.
                  </p>
                </div>
              </div>

              {/* Passo 4 - Disparo Automático */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-orange-300">
                  
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                    4
                  </div>
                  
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Send className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Disparo Automático
                  </h3>
                  <p className="text-gray-700">
                    Nós enviamos a sua candidatura. Você só precisa ficar atento ao telefone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 4. PROVA SOCIAL (AUTORIDADE) - EMPRESAS */}
      {/* ============================================ */}
      {/* ============================================ */}
{/* 4. PROVA SOCIAL (AUTORIDADE) - EMPRESAS (CARROSSEL) */}
{/* ============================================ */}
<section className="py-20 bg-white border-b border-gray-100 overflow-hidden">
  <div className="container mx-auto px-4 mb-10">
    <p className="text-center text-2xl font-semibold text-gray-700 uppercase tracking-widest">
      Os nossos talentos são contratados por gigantes:
    </p>
  </div>

  {/* Container do Carrossel */}
  <div className="relative flex overflow-x-hidden">
    <div className="animate-marquee flex items-center">
      {/* Lista de Logos - Renderizada 2 vezes para o loop infinito */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
          {[
            { name: 'LVMH', src: '/logos/lv.svg', width: 140 },
            { name: 'TAP', src: '/logos/tap.svg', width: 120 },
            { name: 'NOS', src: '/logos/nos.svg', width: 100 },
            { name: 'Betano', src: '/logos/betano.svg', width: 140 },
            { name: 'Betano', src: '/logos/images.png', width: 140 },
            { name: 'Amazon', src: '/logos/amazon.svg', width: 130 },
            { name: 'Rolex', src: '/logos/rolex.svg', width: 120 },
            { name: 'BYD', src: '/logos/byd.svg', width: 110 },
            { name: 'Microsoft', src: '/logos/microsoft.svg', width: 150 },
          ].map((company, idx) => (
            <div 
              key={`${i}-${idx}`} 
              className="flex-shrink-0 flex items-center justify-center transition-transform hover:scale-110 duration-300"
            >
              <div style={{ width: company.width, height: '60px', position: 'relative' }}>
                <Image 
                  src={company.src} 
                  alt={`Logo ${company.name}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>

    {/* Efeito de desfoque nas bordas para o logo não "sumir" bruscamente */}
    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
  </div>
</section>
      {/* ============================================ */}
      {/* 5. BENEFÍCIOS E RESULTADOS */}
      {/* ============================================ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          
          {/* Título */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Diga adeus à precariedade.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
                Construa a carreira que merece.
              </span>
            </h2>
          </div>
          
          {/* 3 Colunas de benefícios */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            
            {/* Benefício 1 - Taxa de Sucesso */}
            <div className="group">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-10 text-white shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-6xl font-extrabold">93%</div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Taxa de Sucesso</h3>
                <p className="text-blue-100 leading-relaxed">
                  93% de taxa de empregabilidade entre os nossos utilizadores ativos.
                </p>
              </div>
            </div>

            {/* Benefício 2 - Rapidez */}
            <div className="group">
              <div className="bg-gradient-to-br from-cyan-600 to-sky-500 rounded-3xl p-10 text-white shadow-2xl hover:shadow-emerald-500/50 transition-all transform hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-6xl font-extrabold">7</div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Rapidez</h3>
                <p className="text-emerald-100 leading-relaxed">
                  Os nossos candidatos começam a receber agendamentos de entrevistas, em média, nos primeiros 7 dias.
                </p>
              </div>
            </div>

            {/* Benefício 3 - Design Premium */}
            <div className="group">
              <div className="bg-gradient-to-br from-blue-700 to-indigo-600 rounded-3xl p-10 text-white shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-extrabold">Premium</div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Design Premium</h3>
                <p className="text-purple-100 leading-relaxed">
                  Currículos visualmente impactantes, otimizados para passar pelos robôs de RH (ATS) e encantar recrutadores humanos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* ============================================ */}
{/* 6. VITRINE (O PRODUTO) - TEMPLATES DE CV */}
{/* ============================================ */}
<section className="py-24 bg-gray-50">
  <div className="container mx-auto px-4 text-center">
    <div className="max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
        Design Premium para <span className="text-primary-blue">Candidatos Premium</span>
      </h2>
      <p className="text-xl text-gray-600">
        Nossos modelos são desenhados por especialistas em RH para passar pelos filtros (ATS) 
        e impressionar os gestores à primeira vista.
      </p>
    </div>

    {/* Grid de Templates */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {[
        { 
          title: 'O Executivo', 
          desc: 'Ideal para cargos de gestão e finanças.',
          src: '/templates/Capturar.PNG', 
          tag: 'Mais Popular'
        },
        { 
          title: 'O Tech-Modern', 
          desc: 'Focado em programadores e áreas de TI.',
          src: '/templates/moderno.png', 
          tag: 'IA Optimized'
        },
        { 
          title: 'O Criativo', 
          desc: 'Para designers e áreas de marketing.',
          src: '/templates/criativo.png', 
          tag: 'Impacto Visual'
        },
      ].map((template, idx) => (
        <div key={idx} className="group bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all hover:-translate-y-2 hover:shadow-2xl">
          {/* Header do Card com Tag */}
          <div className="relative h-[450px] overflow-hidden bg-gray-200">
            <div className="absolute top-4 right-4 z-10 bg-primary-blue text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {template.tag}
            </div>
            
            {/* Imagem do Currículo */}
            <Image 
              src={template.src} 
              alt={template.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Overlay de Hover (Opcional) */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="bg-white text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg">
                Ver Modelo Completo
              </button>
            </div>
          </div>

          {/* Rodapé do Card */}
          <div className="p-6 text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{template.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{template.desc}</p>
            <div className="flex items-center text-primary-blue font-semibold text-sm">
              Conhecer este modelo <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-12">
      <Link href="/todos-os-modelos" className="text-gray-500 hover:text-primary-blue font-medium underline">
        Ver todos os +20 modelos disponíveis
      </Link>
    </div>
  </div>
</section>
      {/* ============================================ */}
      {/* 7. DEPOIMENTOS - CARROSSEL */}
      {/* ============================================ */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
        
        {/* Efeitos de fundo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          
          {/* Título */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Quem usou, foi contratado
            </h2>
            <p className="text-xl text-blue-100">
              Histórias reais de pessoas que transformaram suas carreiras
            </p>
          </div>
          
          {/* Carrossel de Depoimentos */}
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              
              {/* Ícone de aspas */}
              <Quote className="w-16 h-16 text-emerald-400 mb-6" />
              
              {/* Texto do depoimento */}
              <p className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-8 font-light italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              
              {/* Autor e controles */}
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div>
                  <p className="font-bold text-xl text-white mb-1">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-blue-200">
                    {testimonials[currentTestimonial].location} • {testimonials[currentTestimonial].role}
                  </p>
                </div>
                
                {/* Controles */}
                <div className="flex gap-3">
                  <button
                    onClick={prevTestimonial}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentTestimonial ? 'w-8 bg-emerald-400' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 8. RODAPÉ (FINAL CTA) */}
      {/* ============================================ */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Título */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              A sua carreira de sucesso está a um clique de distância
            </h2>
            
            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              Não deixe para amanhã a vaga que pode ser preenchida hoje.
            </p>
            
            {/* CTA Gigante */}
            <Link 
              href="onboarding/cadastro"
              className="inline-flex items-center gap-4 bg-[#10B981] hover:bg-[#059669] text-white px-12 py-6 rounded-2xl text-xl md:text-2xl font-bold shadow-2xl hover:shadow-emerald-500/50 transition-all transform hover:scale-105 hover:-translate-y-1"
            >
              Começar Teste Gratuito / Criar Meu Perfil
              <ArrowRight className="w-8 h-8" />
            </Link>
            
            {/* Texto de segurança */}
            <p className="text-sm text-gray-400 mt-8">
              ✅ Comece grátis • Sem cartão de crédito • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER FINAL */}
      {/* ============================================ */}
      <footer className="bg-gray-950 text-gray-400 py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Grid de colunas */}
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              
              {/* Coluna 1 - Logo e Descrição */}
              <div className="md:col-span-2">
                <h3 className="text-3xl font-bold text-white mb-4">EMPREGA.AI</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  A plataforma de empregos mais inteligente de Portugal. 
                  Inteligência artificial trabalhando 24/7 para o seu sucesso profissional.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Facebook
                  </a>
                </div>
              </div>
              
              {/* Coluna 2 - Produto */}
              <div>
                <h4 className="font-bold text-white mb-4 text-lg">Produto</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/funcionalidades" className="hover:text-white transition-colors">
                      Funcionalidades
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-white transition-colors">
                      Preços
                    </Link>
                  </li>
                  <li>
                    <Link href="/templates" className="hover:text-white transition-colors">
                      Templates
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Coluna 3 - Legal */}
              <div>
                <h4 className="font-bold text-white mb-4 text-lg">Legal</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/termos" className="hover:text-white transition-colors">
                      Termos de Uso
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacidade" className="hover:text-white transition-colors">
                      Privacidade
                    </Link>
                  </li>
                
                </ul>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-sm text-gray-500">
                © 2026 EMPREGA.AI - Todos os direitos reservados • Feito em Portugal 🇵🇹
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
