'use client';

import { useState, useRef } from 'react';
import { 
  User, Briefcase, GraduationCap, Lightbulb, Languages, 
  FolderGit2, Plus, ChevronDown, ChevronUp, Trash2, 
  Upload, Linkedin, FileText, X, Check, Loader2
} from 'lucide-react';

export default function EditorCurriculo() {
  const [openSection, setOpenSection] = useState<string | null>('pessoais');
  const [isImporting, setIsImporting] = useState(false);
  
  // --- ESTADOS DOS DADOS ---
  const [pessoais, setPessoais] = useState({
    nome: 'Pablo Mota',
    email: 'pablomota9955@gmail.com',
    telefone: '+351 965 739 220',
    localizacao: 'Loures, Portugal',
    resumo: 'Sou comunicativo, responsável e orientado a resultados...'
  });

  const [experiencias, setExperiencias] = useState([
    { id: 1, cargo: 'Rececionista', empresa: 'Hotel Moov', inicio: '08/2023', fim: '06/2024', atual: false, descricao: 'Check-in e check-out...', isOpen: false }
  ]);

  const [formacoes, setFormacoes] = useState([
    { id: 1, curso: 'Ensino Médio', instituicao: 'Escola Marista', inicio: '2019', fim: '2021', isOpen: false }
  ]);

  const [idiomas, setIdiomas] = useState([
    { id: 1, nome: 'Português', nivel: 'Nativo', isOpen: false }
  ]);

  const [habilidades, setHabilidades] = useState(['Excel', 'Word', 'Vendas']);
  const [newSkill, setNewSkill] = useState('');

  // --- FUNÇÕES DE MANIPULAÇÃO ---
  const addItem = (type: string) => {
    if (type === 'exp') {
      setExperiencias([{ id: Date.now(), cargo: '', empresa: '', inicio: '', fim: '', atual: false, descricao: '', isOpen: true }, ...experiencias]);
    } else if (type === 'edu') {
      setFormacoes([{ id: Date.now(), curso: '', instituicao: '', inicio: '', fim: '', isOpen: true }, ...formacoes]);
    } else if (type === 'lang') {
      setIdiomas([{ id: Date.now(), nome: '', nivel: 'Básico', isOpen: true }, ...idiomas]);
    }
    setOpenSection(type === 'exp' ? 'experiencias' : type === 'edu' ? 'formacao' : 'idiomas');
  };

  const addSkill = () => {
    if (newSkill.trim() && !habilidades.includes(newSkill)) {
      setHabilidades([...habilidades, newSkill.trim()]);
      setNewSkill('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Suas Informações</h2>
          <p className="text-gray-500">Mantenha seu perfil atualizado para obter os melhores resultados.</p>
        </div>

        {/* 1. IMPORTAR DADOS */}
        <section className="bg-white border p-6 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold">Importar Dados</h2>
              <p className="text-xs text-gray-500">Preencha tudo automaticamente via PDF</p>
            </div>
          </div>
          <button className="w-full py-3 border-2 border-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
            <FileText className="w-5 h-5 text-red-500" /> Importar do LinkedIn ou PDF
          </button>
        </section>

        {/* 2. DADOS PESSOAIS */}
        <SectionWrapper title="Dados Pessoais" icon={<User className="text-primary w-4 h-4" />} color="bg-blue-50" isOpen={openSection === 'pessoais'} onToggle={() => setOpenSection(openSection === 'pessoais' ? null : 'pessoais')}>
          <div className="space-y-4 p-2">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Nome Completo</label>
              <input className="w-full p-3 border rounded-lg text-sm" type="text" value={pessoais.nome} onChange={e => setPessoais({...pessoais, nome: e.target.value})} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Email</label>
                <input className="w-full p-3 border rounded-lg text-sm bg-gray-50" type="email" value={pessoais.email} />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Telefone</label>
                <input className="w-full p-3 border rounded-lg text-sm" type="tel" value={pessoais.telefone} />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Resumo Profissional</label>
              <textarea className="w-full p-3 border rounded-lg text-sm h-24" value={pessoais.resumo} onChange={e => setPessoais({...pessoais, resumo: e.target.value})} />
            </div>
          </div>
        </SectionWrapper>

        {/* 3. EXPERIÊNCIAS */}
        <SectionWrapper title="Experiências" count={experiencias.length} icon={<Briefcase className="text-blue-600 w-4 h-4" />} color="bg-blue-100" isOpen={openSection === 'experiencias'} onToggle={() => setOpenSection('experiencias')} onAdd={() => addItem('exp')}>
          <div className="space-y-3">
            {experiencias.map(exp => (
              <div key={exp.id} className="border rounded-lg bg-white overflow-hidden shadow-sm">
                <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50" onClick={() => setExperiencias(experiencias.map(e => e.id === exp.id ? {...e, isOpen: !e.isOpen} : e))}>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{exp.cargo || 'Novo Cargo'}</p>
                    <p className="text-[11px] text-gray-500">{exp.empresa || 'Empresa'} • {exp.inicio} - {exp.atual ? 'Atual' : exp.fim}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${exp.isOpen ? 'rotate-180' : ''}`} />
                </div>
                {exp.isOpen && (
                  <div className="p-4 pt-0 border-t bg-gray-50/30 space-y-3">
                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <input placeholder="Cargo" className="p-2.5 border rounded-lg text-sm" value={exp.cargo} onChange={e => setExperiencias(experiencias.map(item => item.id === exp.id ? {...item, cargo: e.target.value} : item))} />
                      <input placeholder="Empresa" className="p-2.5 border rounded-lg text-sm" value={exp.empresa} />
                    </div>
                    <textarea placeholder="Responsabilidades..." className="w-full p-2.5 border rounded-lg text-sm h-20" value={exp.descricao} />
                    <button onClick={() => setExperiencias(experiencias.filter(e => e.id !== exp.id))} className="text-red-500 text-xs font-bold flex items-center gap-1 hover:underline"><Trash2 className="w-3 h-3" /> Remover</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* 4. FORMAÇÃO */}
        <SectionWrapper title="Formação Académica" count={formacoes.length} icon={<GraduationCap className="text-purple-600 w-4 h-4" />} color="bg-purple-100" isOpen={openSection === 'formacao'} onToggle={() => setOpenSection('formacao')} onAdd={() => addItem('edu')}>
          <div className="space-y-3">
            {formacoes.map(edu => (
              <div key={edu.id} className="border rounded-lg bg-white overflow-hidden shadow-sm">
                <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => setFormacoes(formacoes.map(f => f.id === edu.id ? {...f, isOpen: !f.isOpen} : f))}>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{edu.curso || 'Curso'}</p>
                    <p className="text-[11px] text-gray-500">{edu.instituicao || 'Instituição'}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 ${edu.isOpen ? 'rotate-180' : ''}`} />
                </div>
                {edu.isOpen && (
                  <div className="p-4 border-t bg-gray-50/50 grid grid-cols-2 gap-3">
                    <input placeholder="Curso/Grau" className="p-2.5 border rounded-lg text-sm col-span-2" value={edu.curso} />
                    <input placeholder="Instituição" className="p-2.5 border rounded-lg text-sm col-span-2" value={edu.instituicao} />
                    <input placeholder="Ano Início" className="p-2.5 border rounded-lg text-sm" value={edu.inicio} />
                    <input placeholder="Ano Fim" className="p-2.5 border rounded-lg text-sm" value={edu.fim} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* 5. HABILIDADES (Tags) */}
        <SectionWrapper title="Habilidades" count={habilidades.length} icon={<Lightbulb className="text-amber-600 w-4 h-4" />} color="bg-amber-100" isOpen={openSection === 'habilidades'} onToggle={() => setOpenSection('habilidades')}>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {habilidades.map(skill => (
                <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-full text-sm text-gray-700 shadow-sm">
                  {skill}
                  <X className="w-3 h-3 cursor-pointer text-gray-400 hover:text-red-500" onClick={() => setHabilidades(habilidades.filter(s => s !== skill))} />
                </span>
              ))}
            </div>
            <div className="flex gap-2 pt-2 border-t border-dashed">
              <input placeholder="Ex: Excel Avançado..." className="flex-1 p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} />
              <button onClick={addSkill} className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700"><Plus className="w-5 h-5" /></button>
            </div>
          </div>
        </SectionWrapper>

        {/* 6. IDIOMAS */}
        <SectionWrapper title="Idiomas" count={idiomas.length} icon={<Languages className="text-pink-600 w-4 h-4" />} color="bg-pink-100" isOpen={openSection === 'idiomas'} onToggle={() => setOpenSection('idiomas')} onAdd={() => addItem('lang')}>
          <div className="space-y-3">
            {idiomas.map(lang => (
              <div key={lang.id} className="border rounded-lg bg-white overflow-hidden shadow-sm flex items-center justify-between p-4">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <input placeholder="Idioma" className="p-2 border rounded text-sm" value={lang.nome} onChange={e => setIdiomas(idiomas.map(l => l.id === lang.id ? {...l, nome: e.target.value} : l))} />
                  <select className="p-2 border rounded text-sm bg-white" value={lang.nivel} onChange={e => setIdiomas(idiomas.map(l => l.id === lang.id ? {...l, nivel: e.target.value} : l))}>
                    <option>Básico</option>
                    <option>Intermediário</option>
                    <option>Fluente</option>
                    <option>Nativo</option>
                  </select>
                </div>
                <button onClick={() => setIdiomas(idiomas.filter(l => l.id !== lang.id))} className="ml-4 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </SectionWrapper>

      </main>

      {/* FOOTER FIXO */}
      <footer className="fixed bottom-0 w-full bg-white border-t p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto">
          <button className="w-full bg-[#2563EB] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all text-lg shadow-lg shadow-blue-100">
            Gerar Currículo com IA
          </button>
        </div>
      </footer>
    </div>
  );
}

// --- COMPONENTE DE SEÇÃO REUTILIZÁVEL ---
function SectionWrapper({ title, icon, count, color, children, isOpen, onToggle, onAdd }: any) {
  return (
    <section className="bg-white border rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-md">
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>{icon}</div>
          <h2 className="font-bold text-gray-800">{title}</h2>
          {count !== undefined && <span className="bg-gray-100 text-[10px] font-mono px-1.5 py-0.5 rounded border">{count}</span>}
        </div>
        <div className="flex items-center gap-2">
          {onAdd && (
            <button onClick={(e) => { e.stopPropagation(); onAdd(); }} className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
              <Plus className="w-3 h-3" /> Adicionar
            </button>
          )}
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      <div className={`transition-all duration-300 ${isOpen ? 'max-h-[2000px] p-4 pt-0 border-t bg-gray-50/20' : 'max-h-0 overflow-hidden opacity-0'}`}>
        {children}
      </div>
    </section>
  );
}