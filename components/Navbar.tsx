"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Sparkles, Target, Mail, Users, FileText, TrendingUp } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Detecta scroll para adicionar sombra
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha menu mobile ao mudar de rota
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  // Previne scroll quando menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <>
      {/* NAVBAR */}
      <header 
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-lg shadow-sm" 
            : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* LOGO */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Emprega.AI
              </span>
            </Link>

            {/* MENU DESKTOP */}
            <nav className="hidden lg:flex items-center gap-1">

              {/* Criar CV */}
              <Link 
                href="/resume-builder" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors rounded-lg hover:bg-blue-50"
              >
                Criar CV
              </Link>

              {/* FEATURES DROPDOWN */}
              <div className="relative group">
                <button
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors rounded-lg hover:bg-blue-50 flex items-center gap-1"
                >
                  Funcionalidades
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </button>

                {/* MEGA MENU */}
                <div className="absolute top-full left-0 mt-2 w-[500px] bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                  <div className="grid grid-cols-2 gap-2">
                    
                    <Link 
                      href="/job-tracker" 
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group/item"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600 transition-colors">
                        <Target className="w-5 h-5 text-blue-600 group-hover/item:text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Job Tracker</p>
                        <p className="text-xs text-gray-600">Acompanhe todas as candidaturas</p>
                      </div>
                    </Link>

                    <Link 
                      href="/ai-cover-letter" 
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group/item"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600 transition-colors">
                        <Mail className="w-5 h-5 text-blue-600 group-hover/item:text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Carta de Apresentação</p>
                        <p className="text-xs text-gray-600">Gerada automaticamente por IA</p>
                      </div>
                    </Link>

                    <Link 
                      href="/linkedin-optimizer" 
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group/item"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600 transition-colors">
                        <Users className="w-5 h-5 text-blue-600 group-hover/item:text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Otimizador LinkedIn</p>
                        <p className="text-xs text-gray-600">Melhore o seu perfil</p>
                      </div>
                    </Link>

                    <Link 
                      href="/resume-templates" 
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group/item"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600 transition-colors">
                        <FileText className="w-5 h-5 text-blue-600 group-hover/item:text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">Templates Premium</p>
                        <p className="text-xs text-gray-600">+20 modelos profissionais</p>
                      </div>
                    </Link>

                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link 
                      href="/features" 
                      className="flex items-center justify-between text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Ver todas as funcionalidades
                      <TrendingUp className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recursos */}
              <Link 
                href="/recursos" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors rounded-lg hover:bg-blue-50"
              >
                Recursos
              </Link>

              {/* Preços */}
              <Link 
                href="/precos" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors rounded-lg hover:bg-blue-50"
              >
                Preços
              </Link>

            </nav>

            {/* BUTTONS DESKTOP */}
            <div className="hidden lg:flex items-center gap-3">
              <Link 
                href="/login" 
                className="px-5 py-2 text-gray-700 font-semibold hover:text-blue-600 transition-colors"
              >
                Entrar
              </Link>
              <Link 
                href="/onboarding/cadastro" 
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Começar Grátis
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR MENU */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            
            {/* HEADER DO MENU MOBILE */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <Link 
                href="/" 
                className="flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Emprega.AI
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* NAVIGATION MOBILE */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <div className="space-y-2">

                {/* Criar CV */}
                <Link
                  href="/resume-builder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                >
                  <FileText className="w-5 h-5" />
                  Criar CV
                </Link>

                {/* FUNCIONALIDADES ACCORDION */}
                <div>
                  <button
                    onClick={() => toggleDropdown("features")}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5" />
                      Funcionalidades
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform ${
                        openDropdown === "features" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "features" && (
                    <div className="mt-2 ml-4 space-y-1 border-l-2 border-blue-100 pl-4">
                      <Link
                        href="/job-tracker"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Job Tracker
                      </Link>
                      <Link
                        href="/ai-cover-letter"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Carta de Apresentação IA
                      </Link>
                      <Link
                        href="/linkedin-optimizer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Otimizador LinkedIn
                      </Link>
                      <Link
                        href="/resume-templates"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Templates Premium
                      </Link>
                    </div>
                  )}
                </div>

                {/* Recursos */}
                <Link
                  href="/recursos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                >
                  <Target className="w-5 h-5" />
                  Recursos
                </Link>

                {/* Preços */}
                <Link
                  href="/precos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                >
                  <TrendingUp className="w-5 h-5" />
                  Preços
                </Link>

              </div>
            </nav>

            {/* FOOTER DO MENU MOBILE - BUTTONS */}
            <div className="px-6 py-4 border-t border-gray-100 space-y-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full px-5 py-3 text-center text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/onboarding/cadastro"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full px-5 py-3 text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Começar Grátis
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* SPACER para evitar que conteúdo fique atrás do navbar fixo */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}