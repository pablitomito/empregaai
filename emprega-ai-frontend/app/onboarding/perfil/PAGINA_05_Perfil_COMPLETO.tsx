// emprega-ai-frontend/app/onboarding/perfil/page.tsx
// ESTA É A PÁGINA MAIS IMPORTANTE - IGUAL À SUA IMAGEM!
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
  ChevronUp,
  Plus,
  X,
  Trash2,
} from 'lucide-react';

// Tipos
interface Experience {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

interface Language {
  language: string;
  proficiency: string;
}

interface Project {
  title: string;
  description: string;
  link?: string;
}

export default function PerfilPage() {
  const router = useRouter();

  // Estados dos accordions
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dados: true,
    experiencias: false,
    educacao: false,
    habilidades: false,
    idiomas: false,
    projetos: false,
  });

  // Estados dos itens expandidos
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const [expandedEducation, setExpandedEducation] = useState<number | null>(null);

  // Dados do formulário
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    professionalSummary: '',
    profilePhoto: null as File | null,

    experiences: [] as Experience[],
    education: [] as Education[],
    skills: [] as string[],
    languages: [] as Language[],
    projects: [] as Project[],
  });

  // Estado para novo skill
  const [newSkill, setNewSkill] = useState('');

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Adicionar nova experiência
  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        {
          position: '',
          company: '',
          startDate: '',
          endDate: '',
          isCurrentJob: false,
          description: '',
        },
      ],
    });
    setExpandedExperience(formData.experiences.length);
  };

  // Remover experiência
  const removeExperience = (index: number) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.filter((_, i) => i !== index),
    });
    if (expandedExperience === index) {
      setExpandedExperience(null);
    }
  };

  // Atualizar experiência
  const updateExperience = (index: number, field: string, value: any) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setFormData({ ...formData, experiences: newExperiences });
  };

  // Adicionar educação
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: '',
          institution: '',
          startYear: '',
          endYear: '',
        },
      ],
    });
    setExpandedEducation(formData.education.length);
  };

  // Remover educação
  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index),
    });
    if (expandedEducation === index) {
      setExpandedEducation(null);
    }
  };

  // Atualizar educação
  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData({ ...formData, education: newEducation });
  };

  // Adicionar habilidade
  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  // Remover habilidade
  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  // Adicionar idioma
  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [
        ...formData.languages,
        { language: '', proficiency: 'basic' },
      ],
    });
  };

  // Adicionar projeto
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: '', description: '', link: '' },
      ],
    });
  };

  const handleSubmit = () => {
    // Validação básica
    if (!formData.fullName || !formData.email) {
      alert('Por favor, preencha nome e email');
      return;
    }

    if (formData.experiences.length === 0) {
      alert('Por favor, adicione pelo menos uma experiência');
      return;
    }

    // Salvar no localStorage
    localStorage.setItem('profileData', JSON.stringify(formData));

    // Continuar para próxima página
    router.push('/onboarding/descricao');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      {/* HEADER COM PROGRESS BAR */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 w-full">
        <div className="px-4 flex flex-col gap-2 mx-auto w-full pt-2">
          <div className="flex items-center gap-2 h-12">
            <button
              onClick={() => router.back()}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold flex-1">Gerar CV</h1>
            <span className="text-sm text-gray-500">4/10</span>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: '40%' }}
            />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full p-4 md:p-6 max-w-5xl mx-auto pb-32">
        <div className="space-y-6 h-full">
          {/* TÍTULO */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Suas Informações</h2>
            <p className="text-gray-600">
              Mantenha seu perfil atualizado para obter os melhores resultados.
            </p>
          </div>

          {/* IMPORTAR DADOS */}
          <section className="bg-white border rounded-lg p-4 space-y-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CloudDownload className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h2 className="font-bold">Importar Dados</h2>
                <p className="text-xs text-gray-500">
                  Substitua seus dados via LinkedIn ou PDF
                </p>
              </div>
            </div>

            <button className="btn btn-outline btn-lg w-full gap-2">
              <CloudDownload className="w-5 h-5" />
              Importar do LinkedIn ou PDF
            </button>
          </section>

          {/* ACCORDIONS */}
          <div className="space-y-4">
            {/* DADOS PESSOAIS */}
            <AccordionSection
              icon={<User className="w-4 h-4 text-blue-600" />}
              title="Dados Pessoais"
              bgColor="bg-blue-100"
              isOpen={openSections.dados}
              onToggle={() => toggleSection('dados')}
            >
              <div className="space-y-3 p-4">
                <FormField
                  label="Nome Completo"
                  value={formData.fullName}
                  onChange={(v) => setFormData({ ...formData, fullName: v })}
                  placeholder="Seu nome completo"
                />

                <FormField
                  label="Email"
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                  placeholder="seu@email.com"
                  type="email"
                  disabled
                />

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    label="Telefone"
                    value={formData.phone}
                    onChange={(v) => setFormData({ ...formData, phone: v })}
                    placeholder="+351 XXX XXX XXX"
                  />
                  <FormField
                    label="Localização"
                    value={formData.location}
                    onChange={(v) => setFormData({ ...formData, location: v })}
                    placeholder="Cidade, País"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Resumo Profissional
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-20 text-sm"
                    value={formData.professionalSummary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        professionalSummary: e.target.value,
                      })
                    }
                    placeholder="Breve resumo sobre você..."
                  />
                </div>
              </div>
            </AccordionSection>

            {/* EXPERIÊNCIAS */}
            <AccordionSection
              icon={<Briefcase className="w-4 h-4 text-blue-600" />}
              title="Experiências"
              count={formData.experiences.length}
              bgColor="bg-blue-100"
              isOpen={openSections.experiencias}
              onToggle={() => toggleSection('experiencias')}
              onAdd={addExperience}
            >
              <div className="space-y-3 p-2">
                {formData.experiences.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhuma experiência adicionada</p>
                  </div>
                ) : (
                  formData.experiences.map((exp, index) => (
                    <ExperienceCard
                      key={index}
                      experience={exp}
                      isExpanded={expandedExperience === index}
                      onToggle={() =>
                        setExpandedExperience(
                          expandedExperience === index ? null : index
                        )
                      }
                      onUpdate={(field, value) =>
                        updateExperience(index, field, value)
                      }
                      onRemove={() => removeExperience(index)}
                    />
                  ))
                )}
              </div>
            </AccordionSection>

            {/* FORMAÇÃO ACADÊMICA */}
            <AccordionSection
              icon={<GraduationCap className="w-4 h-4 text-purple-600" />}
              title="Formação Acadêmica"
              count={formData.education.length}
              bgColor="bg-purple-100"
              isOpen={openSections.educacao}
              onToggle={() => toggleSection('educacao')}
              onAdd={addEducation}
            >
              <div className="space-y-3 p-2">
                {formData.education.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <GraduationCap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhuma formação adicionada</p>
                  </div>
                ) : (
                  formData.education.map((edu, index) => (
                    <EducationCard
                      key={index}
                      education={edu}
                      isExpanded={expandedEducation === index}
                      onToggle={() =>
                        setExpandedEducation(
                          expandedEducation === index ? null : index
                        )
                      }
                      onUpdate={(field, value) =>
                        updateEducation(index, field, value)
                      }
                      onRemove={() => removeEducation(index)}
                    />
                  ))
                )}
              </div>
            </AccordionSection>

            {/* HABILIDADES */}
            <AccordionSection
              icon={<Lightbulb className="w-4 h-4 text-amber-600" />}
              title="Habilidades"
              count={formData.skills.length}
              bgColor="bg-amber-100"
              isOpen={openSections.habilidades}
              onToggle={() => toggleSection('habilidades')}
            >
              <div className="space-y-4 p-4">
                <div className="flex flex-wrap gap-2 min-h-[40px]">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="badge badge-lg gap-1.5 pr-1.5 pl-3 py-3 bg-white border border-gray-200 shadow-sm text-gray-700"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="w-4 h-4 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <X className="w-3 h-3 text-gray-500" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 border-t border-dashed">
                  <input
                    placeholder="Adicionar nova habilidade..."
                    className="input input-bordered w-full input-sm"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                  <button
                    onClick={addSkill}
                    className="btn btn-primary btn-sm btn-square"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </AccordionSection>

            {/* IDIOMAS */}
            <AccordionSection
              icon={<Languages className="w-4 h-4 text-pink-600" />}
              title="Idiomas"
              count={formData.languages.length}
              bgColor="bg-pink-100"
              isOpen={openSections.idiomas}
              onToggle={() => toggleSection('idiomas')}
              onAdd={addLanguage}
            >
              <div className="space-y-3 p-2">
                {formData.languages.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 border rounded-lg border-dashed">
                    <Languages className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum idioma adicionado</p>
                  </div>
                ) : (
                  formData.languages.map((lang, index) => (
                    <div
                      key={index}
                      className="border rounded-lg bg-white p-3 shadow-sm"
                    >
                      <p className="font-semibold text-gray-800">{lang.language || 'Idioma'}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{lang.proficiency}</p>
                    </div>
                  ))
                )}
              </div>
            </AccordionSection>

            {/* PROJETOS */}
            <AccordionSection
              icon={<FolderGit2 className="w-4 h-4 text-teal-600" />}
              title="Projetos"
              count={formData.projects.length}
              bgColor="bg-teal-100"
              isOpen={openSections.projetos}
              onToggle={() => toggleSection('projetos')}
              onAdd={addProject}
            >
              <div className="space-y-3 p-2">
                {formData.projects.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 border rounded-lg border-dashed">
                    <FolderGit2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum projeto registrado</p>
                  </div>
                ) : (
                  formData.projects.map((proj, index) => (
                    <div
                      key={index}
                      className="border rounded-lg bg-white p-3 shadow-sm"
                    >
                      <p className="font-semibold text-gray-800">{proj.title || 'Projeto'}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{proj.description}</p>
                    </div>
                  ))
                )}
              </div>
            </AccordionSection>
          </div>
        </div>
      </main>

      {/* BOTTOM BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-20">
        <div className="w-full max-w-5xl mx-auto">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

function AccordionSection({
  icon,
  title,
  count,
  bgColor,
  isOpen,
  onToggle,
  onAdd,
  children,
}: any) {
  return (
    <section className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div
        className="p-4 flex items-center justify-between cursor-pointer select-none"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${bgColor}`}
          >
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-gray-800">{title}</h2>
            {count !== undefined && (
              <span className="badge badge-sm badge-ghost font-mono">{count}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onAdd && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              className="btn btn-primary btn-sm gap-1"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Adicionar</span>
            </button>
          )}
          <button className="btn btn-ghost btn-sm btn-circle">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {isOpen && <div className="border-t">{children}</div>}
    </section>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
}: any) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <input
        type={type}
        className={`input input-bordered w-full ${disabled ? 'bg-gray-50' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}

function ExperienceCard({ experience, isExpanded, onToggle, onUpdate, onRemove }: any) {
  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
      <div
        className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex-1 pr-4">
          <p className="font-semibold text-gray-800 truncate">
            {experience.position || 'Nova Experiência'}
          </p>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {experience.company || 'Empresa'} •{' '}
            {experience.startDate || 'Data'} - {experience.endDate || 'Atual'}
          </p>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4 pt-2 space-y-3 bg-gray-50/50 border-t">
          <div className="grid md:grid-cols-2 gap-3">
            <input
              placeholder="Cargo"
              className="input input-sm input-bordered w-full"
              value={experience.position}
              onChange={(e) => onUpdate('position', e.target.value)}
            />
            <input
              placeholder="Empresa"
              className="input input-sm input-bordered w-full"
              value={experience.company}
              onChange={(e) => onUpdate('company', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Início (MM/YYYY)"
              className="input input-sm input-bordered w-full"
              value={experience.startDate}
              onChange={(e) => onUpdate('startDate', e.target.value)}
            />
            <div className="flex gap-2 items-center">
              <input
                placeholder="Fim (MM/YYYY)"
                className="input input-sm input-bordered w-full"
                value={experience.endDate}
                onChange={(e) => onUpdate('endDate', e.target.value)}
                disabled={experience.isCurrentJob}
              />
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs"
                  checked={experience.isCurrentJob}
                  onChange={(e) => onUpdate('isCurrentJob', e.target.checked)}
                />
                <span className="text-xs font-medium text-gray-600">Atual</span>
              </label>
            </div>
          </div>

          <textarea
            placeholder="Descreva suas principais responsabilidades..."
            className="textarea textarea-bordered w-full text-sm h-24"
            value={experience.description}
            onChange={(e) => onUpdate('description', e.target.value)}
          />

          <div className="flex justify-end pt-1">
            <button
              onClick={onRemove}
              className="btn btn-ghost btn-xs text-error hover:bg-error/10 gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remover
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function EducationCard({ education, isExpanded, onToggle, onUpdate, onRemove }: any) {
  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
      <div
        className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex-1 pr-4">
          <p className="font-semibold text-gray-800 truncate">
            {education.degree || 'Nova Formação'}
          </p>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {education.institution || 'Instituição'}
          </p>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4 pt-2 space-y-3 bg-gray-50/50 border-t">
          <div className="grid md:grid-cols-2 gap-3">
            <input
              placeholder="Curso/Grau"
              className="input input-sm input-bordered w-full"
              value={education.degree}
              onChange={(e) => onUpdate('degree', e.target.value)}
            />
            <input
              placeholder="Instituição"
              className="input input-sm input-bordered w-full"
              value={education.institution}
              onChange={(e) => onUpdate('institution', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Início (YYYY)"
              className="input input-sm input-bordered w-full"
              value={education.startYear}
              onChange={(e) => onUpdate('startYear', e.target.value)}
            />
            <input
              placeholder="Conclusão (YYYY)"
              className="input input-sm input-bordered w-full"
              value={education.endYear}
              onChange={(e) => onUpdate('endYear', e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={onRemove}
              className="btn btn-ghost btn-xs text-error hover:bg-error/10 gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remover
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
