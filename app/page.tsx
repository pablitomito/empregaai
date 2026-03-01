'use client';

import { useState, useRef, useEffect } from 'react';
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
  Heart,
  Check
} from 'lucide-react';
import Navbar from "../components/Navbar";


export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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
    { 
      title: 'O Executivo', 
      desc: 'Ideal para cargos de gestão e finanças',
      src: '/templates/capturartemplate1.PNG', 
      tag: 'Mais Popular',
      features: ['ATS Optimizado', 'Layout Formal', 'Destaque em Resultados']
    },
    { 
      title: 'O Tech-Modern', 
      desc: 'Focado em programadores e áreas de TI',
      src: '/templates/capturartemplate2.PNG', 
      tag: 'IA Optimized',
      features: ['Skills Destacadas', 'GitHub Integration', 'Projetos em Foco']
    },
    { 
      title: 'O Criativo', 
      desc: 'Para designers e áreas de marketing',
      src: '/templates/capturartemplate3.PNG', 
      tag: 'Impacto Visual',
      features: ['Portfolio Visual', 'Design Ousado', 'Personalização Total']
    },
    { 
      title: 'O Criativo', 
      desc: 'Para designers e áreas de marketing',
      src: '/templates/capturartemplate4.PNG', 
      tag: 'Impacto Visual',
      features: ['Portfolio Visual', 'Design Ousado', 'Personalização Total']
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Navegação do carrossel de templates
  const nextTemplate = () => {
    setCurrentTemplate((prev) => (prev + 1) % templates.length);
  };

  const prevTemplate = () => {
    setCurrentTemplate((prev) => (prev - 1 + templates.length) % templates.length);
  };

  // Touch handlers para swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextTemplate();
    }
    if (isRightSwipe) {
      prevTemplate();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

 
  // Auto scroll no mobile
  useEffect(() => {
    if (carouselRef.current) {
      const scrollPosition = currentTemplate * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentTemplate]);

useEffect(() => {
  import("./gradiente/gradiente.js");
}, []);

  return (
    
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="relative bg-white pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
       <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/30 blur-[120px] rounded-full"></div>
       <div className="absolute top-40 -right-32 w-96 h-96 bg-blue-100/30 blur-[120px] rounded-full"></div>


  {/* Canvas do efeito visual */}
  <canvas
    id="gradient-canvas"
    className="absolute inset-0 w-full h-full"
    data-transition-in
  ></canvas>

        
  {/* O gradiente sutil de fundo que eles usam */}
  <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>

  <div className="relative container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center space-y-8">
      
      {/* Badge Superior */}
      <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-sm font-medium text-blue-700">
        <Sparkles className="w-4 h-4" />
        <span>Otimizado para o mercado de Portugal</span>
      </div>

      {/* Título Principal (Tipografia Onest/Inter) */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
        O Seu Copiloto de Carreira com <br />
        <span className="text-blue-600">Inteligência Artificial</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Automatize a sua procura de emprego. O Emprega.AI cria currículos, cartas de apresentação e candidaturas personalizadas enquanto você foca nas entrevistas.
      </p>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link 
          href="/signup"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-md"
        >
          Começar Meu Mach Profissional
        </Link>
      </div>

      {/* Prova Social Sutil */}
      {/* Prova Social Sutil com Fotos Reais */}
        <div className="pt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
          <div className="flex -space-x-2">
            {/* Substitua os links abaixo pelas fotos reais dos seus usuários */}
            <img src="/testemunhas/user.jpg" alt="Usuário 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
            <img src="/testemunhas/user2.jpg" alt="Usuário 2" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
            <img src="/testemunhas/user3.jpg" alt="Usuário 3" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
            <img src="/testemunhas/user1.jpg" alt="Usuário 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
          </div>
          <span className="font-medium">+5.000 utilizadores em Portugal</span>
        </div>
    </div>

    {/* Imagem do Dashboard (O "Pulo do Gato" do UI/UX deles) */}
    
  </div>
</section>

      {/* ============================================ */}
      {/* 3. COMO FUNCIONA - TIMELINE */}
      {/* ============================================ */}
      <section className="py-12 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-1">
            <h2 className="text-4xl md:text-2xl font-black text-blue-700 mb-4 tracking-tight">
              Nunca foi tão fácil conseguir o seu emprego
            </h2>
          </div>

          <div className="max-w-xl mx-auto relative">
            
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2">
              <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-600 to-cyan-500 transition-all duration-1000 ease-out animate-timeline-progress" />
            </div>

            <div className="space-y-6 md:space-y-12">
              
              <div className="relative group">
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                  
                  <div className="hidden md:flex justify-end items-center relative">
                    <div className="w-16 h-16 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center font-bold text-2xl text-blue-600 shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                      1
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all group-hover:-translate-y-1">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-6 group-hover:bg-blue-100 transition-colors">
                      <Target className="w-7 h-7 text-blue-600" />
                    </div>

                    <div className="md:hidden inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-sm font-semibold text-blue-600 mb-4">
                      Passo 1
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      Crie o seu perfil
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Preencha os seus dados profissionais uma única vez. A nossa IA aprende o seu perfil e objetivos de carreira.
                    </p>

                    <div className="space-y-2">
                      {[
                        'Onboarding em 5 minutos',
                        'Importação automática do LinkedIn',
                        'Sugestões inteligentes de skills'
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                  
                  <div className="md:col-start-1 bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all group-hover:-translate-y-1">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-6 group-hover:bg-blue-100 transition-colors">
                      <Sparkles className="w-7 h-7 text-blue-600" />
                    </div>

                    <div className="md:hidden inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-sm font-semibold text-blue-600 mb-4">
                      Passo 2
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      A IA trabalha por si
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Monitorizamos milhares de vagas diariamente. Para cada oportunidade compatível, criamos um currículo personalizado.
                    </p>

                    <div className="space-y-2">
                      {[
                        'Análise de 50+ portais de emprego',
                        'CV otimizado para cada vaga',
                        'Keywords específicas do recrutador'
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="hidden md:flex justify-start items-center relative md:col-start-2">
                    <div className="w-16 h-16 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center font-bold text-2xl text-blue-600 shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                      2
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                  
                  <div className="hidden md:flex justify-end items-center relative">
                    <div className="w-16 h-16 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center font-bold text-2xl text-blue-600 shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                      3
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all group-hover:-translate-y-1">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-6 group-hover:bg-blue-100 transition-colors">
                      <Mail className="w-7 h-7 text-blue-600" />
                    </div>

                    <div className="md:hidden inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-sm font-semibold text-blue-600 mb-4">
                      Passo 3
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      Carta de apresentação única
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Para cada candidatura, geramos uma carta persuasiva e contextualizada que destaca porque você é o candidato ideal.
                    </p>

                    <div className="space-y-2">
                      {[
                        'Adaptada à cultura da empresa',
                        'Tom profissional e convincente',
                        'Highlights dos seus pontos fortes'
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                  
                  <div className="md:col-start-1 bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all group-hover:-translate-y-1">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-6 group-hover:bg-blue-100 transition-colors">
                      <Send className="w-7 h-7 text-blue-600" />
                    </div>

                    <div className="md:hidden inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-sm font-semibold text-blue-600 mb-4">
                      Passo 4
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      Enviamos tudo automaticamente
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      As candidaturas são enviadas diretamente para as empresas. Você acompanha tudo pelo painel e aguarda as entrevistas.
                    </p>

                    <div className="space-y-2">
                      {[
                        'Até 50 candidaturas por dia',
                        'Tracking em tempo real',
                        'Notificações de respostas'
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="hidden md:flex justify-start items-center relative md:col-start-2">
                    <div className="w-16 h-16 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center font-bold text-2xl text-blue-600 shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                      4
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="text-center mt-5">
            <p className="text-sm text-gray-500 mb-6">
              Em média, os nossos utilizadores recebem a primeira resposta em 7 dias
            </p>
            <Link 
              href="onboarding/cadastro"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:scale-105"
            >
              Conseguir meu emprego dos sonhos
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>

        </div>
      </section>

      <style jsx>{`
        @keyframes timeline-progress {
          from { height: 0%; }
          to { height: 100%; }
        }
        .animate-timeline-progress {
          height: 0%;
          animation: timeline-progress 2s ease-out forwards;
          animation-delay: 0.5s;
        }
      `}</style>

      {/* ============================================ */}
      {/* 4. LOGOS EMPRESAS */}
      {/* ============================================ */}
      <section className="py-6 bg-white border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <p className="text-center text-1xl font-normal text-blue-700 ">
              os nossos talentos são contratados por gigantes:
          </p>
        </div>

        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-24 px-2 md:px-6">
                {[
                  { name: 'LVMH', src: '/logos/lv.svg', width: 50 },
                  { name: 'TAP', src: '/logos/tap.svg', width: 50 },
                  { name: 'NOS', src: '/logos/nos.svg', width: 50 },
                  { name: 'Betano', src: '/logos/betano.svg', width: 50 },
                  { name: 'Farfetch', src: '/logos/images.png', width: 50 },
                  { name: 'Amazon', src: '/logos/amazon.svg', width: 50 },
                  { name: 'Rolex', src: '/logos/rolex.svg', width: 50 },
                  { name: 'BYD', src: '/logos/byd.svg', width: 50 },
                  { name: 'Microsoft', src: '/logos/microsoft.svg', width: 50 },
                ].map((company, idx) => (
                  <div 
                    key={`${i}-${idx}`} 
                    className="flex-shrink-0 flex items-center justify-center transition-transform hover:scale-110 duration-300"
                  >
                    <div style={{ width: company.width, height: '30px', position: 'relative' }}>
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

          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
        
      </section>
      {/* ============================================ */}
      {/* 6. TEMPLATES COM CARROSSEL MOBILE */}
      {/* ============================================ */}
      <section className="py-6 bg-sky-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-blue-700 mb-4 tracking-tight">
              Design profissional para candidatos premium
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modelos desenhados por especialistas em RH para passar filtros ATS e impressionar gestores
            </p>
          </div>

          <div className="relative">
            
            {/* MOBILE - Carrossel */}
            <div className="md:hidden">
              <div 
                ref={carouselRef}
                className="flex overflow-x-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {templates.map((template, idx) => (
                  <div
                    key={idx}
                    className="min-w-full px-4"
                    style={{ 
                      transform: `translateX(-${currentTemplate * 100}%)`, 
                      transition: 'transform 0.5s ease-out' 
                    }}
                  >
                    <TemplateCard template={template} />
                  </div>
                ))}
              </div>

              {/* Controles Mobile */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevTemplate}
                  className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-blue-600 hover:bg-blue-50 transition-all"
                  aria-label="Template anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                <div className="flex gap-2">
                  {templates.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTemplate(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentTemplate 
                          ? 'w-8 bg-blue-600' 
                          : 'w-2 bg-gray-300'
                      }`}
                      aria-label={`Ir para template ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTemplate}
                  className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-blue-600 hover:bg-blue-50 transition-all"
                  aria-label="Próximo template"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* DESKTOP - Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {templates.map((template, idx) => (
                <TemplateCard key={idx} template={template} />
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/todos-os-modelos" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
            >
              Ver todos os +20 modelos disponíveis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 5. BENEFÍCIOS */}
      {/* ============================================ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-blue-700 mb-4">
              Diga adeus à precariedade. Construa a carreira que merece
            </h2>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            
            <div className="group">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-10 text-white shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-6xl font-extrabold">93%</div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Taxa de Sucesso</h3>
                <p className="text-blue-100 leading-relaxed">
                  93% de taxa de empregabilidade entre os nossos utilizadores ativos.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-cyan-600 to-sky-500 rounded-3xl p-10 text-white shadow-2xl hover:shadow-emerald-500/50 transition-all transform hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-6xl font-extrabold">7</div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Rapidez</h3>
                <p className="text-emerald-100 leading-relaxed">
                  Os nossos candidatos começam a receber agendamentos de entrevistas, em média, nos primeiros 7 dias.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-blue-700 to-indigo-600 rounded-3xl p-10 text-white shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-extrabold">Premium</div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Design Premium</h3>
                <p className="text-purple-100 leading-relaxed">
                  Currículos visualmente impactantes, otimizados para passar pelos robôs de RH (ATS) e encantar recrutadores humanos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 8. CTA FINAL */}
      {/* ============================================ */}
      <section className="py-6 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              A sua carreira de sucesso está a um clique de distância
            </h2>
            
            
            <Link 
              href="onboarding/cadastro"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:scale-105"
            >
              Criar meu perfil e começar a receber candidaturas personalizadas
              <ArrowRight className="w-8 h-8" />
            </Link>
            
          </div>
        </div>
      </section>
      

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="bg-gray-950 text-gray-400 py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              
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

// Componente do Card do Template
function TemplateCard({ template }: { template: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[450px] bg-gray-100 overflow-hidden">
        
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
          {template.tag}
        </div>
        
        <Image 
          src={template.src} 
          alt={template.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h4 className="font-semibold mb-3">O que está incluso:</h4>
            <ul className="space-y-2">
              {template.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-cyan-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {template.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {template.desc}
        </p>
        
        <button className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
          Ver modelo completo
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}