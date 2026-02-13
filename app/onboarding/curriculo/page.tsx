'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  CloudDownload, 
  User, 
  Briefcase, 
  GraduationCap, 
  Lightbulb, 
  Languages, 
  FolderGit2, 
  ChevronDown, 
  Plus, 
  X 
} from 'lucide-react';

export default function CurriculoPage() {
  const router = useRouter();
  
  // Estado para controlar qual seção está aberta (acordeão)
  const [openSection, setOpenSection] = useState<string | null>('pessoais');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      {/* HEADER COM PROGRESSO */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 w-full">
        <div className="px-4 flex flex-col gap-2 mx-auto w-full max-w-5xl pt-2">
          <div className="flex items-center gap-2 h-12">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="font-bold flex-1 text-gray-800">Gerar CV</h1>
            <span className="text-sm text-gray-400 font-medium">4/10</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-blue-600 transition-all duration-500 ease-out" style={{ width: '40%' }}></div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full p-4 md:p-6 max-w-5xl mx-auto pb-32">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Suas Informações</h2>
          <p className="text-gray-500">Mantenha seu perfil atualizado para obter os melhores resultados.</p>
        </div>

        <div className="space-y-4">
          {/* IMPORTAR DADOS */}
          <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CloudDownload className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">Importar Dados</h2>
                <p className="text-xs text-gray-500">Substitua seus dados via LinkedIn ou PDF</p>
              </div>
            </div>
            <button className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 font-semibold text-gray-600 hover:bg-gray-50 transition-all">
              <CloudDownload className="w-5 h-5" />
              Importar do LinkedIn ou PDF
            </button>
          </section>

          {/* DADOS PESSOAIS */}
          <AccordionSection 
            title="Dados Pessoais" 
            icon={<User className="w-4 h-4 text-blue-600" />} 
            iconBg="bg-blue-50"
            isOpen={openSection === 'pessoais'}
            onClick={() => toggleSection('pessoais')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="col-span-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Nome Completo</label>
                <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500" placeholder="Ex: Pablo Mota" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">E-mail</label>
                <input type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500" placeholder="seu@email.com" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Telefone</label>
                <input type="tel" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500" placeholder="+351 000 000 000" />
              </div>
            </div>
          </AccordionSection>

          {/* EXPERIÊNCIAS */}
          <AccordionSection 
            title="Experiências" 
            count={3}
            icon={<Briefcase className="w-4 h-4 text-blue-600" />} 
            iconBg="bg-blue-50"
            isOpen={openSection === 'experiencias'}
            onClick={() => toggleSection('experiencias')}
            showAdd
          >
            <div className="space-y-3 pt-2">
              {['Responsável de Gelateria', 'Recepcionista'].map((job, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-lg flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                  <div>
                    <p className="font-bold text-gray-800">{job}</p>
                    <p className="text-xs text-gray-500">Empresa Exemplo • 2023 - Atual</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </AccordionSection>

          {/* HABILIDADES */}
          <AccordionSection 
            title="Habilidades" 
            count={5}
            icon={<Lightbulb className="w-4 h-4 text-amber-600" />} 
            iconBg="bg-amber-50"
            isOpen={openSection === 'habilidades'}
            onClick={() => toggleSection('habilidades')}
          >
            <div className="flex flex-wrap gap-2 pt-2">
              {['Excel', 'Word', 'Software', 'Hardware'].map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 flex items-center gap-2 shadow-sm">
                  {skill} <X className="w-3 h-3 text-gray-400 hover:text-red-500 cursor-pointer" />
                </span>
              ))}
            </div>
          </AccordionSection>

        </div>
      </main>

      {/* FOOTER FIXO */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-20">
        <div className="max-w-5xl mx-auto">
          <button 
            onClick={() => router.push('/onboarding/modelo')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

// Sub-componente para organizar os acordões
function AccordionSection({ title, icon, iconBg, children, isOpen, onClick, count, showAdd }: any) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-gray-800">{title}</h2>
            {count !== undefined && (
              <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                {count}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {showAdd && (
            <button className="hidden sm:flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              <Plus className="w-3 h-3" /> Adicionar
            </button>
          )}
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 pt-0 border-t border-gray-50 animate-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </section>
  );
}