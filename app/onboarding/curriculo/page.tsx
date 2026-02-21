"use client";
import { AITextImprover } from "@/components/AITextImprover";
import {
  Briefcase,
  GraduationCap,
  Award,
  Globe,
} from "lucide-react"; // Adicione estes ícones
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useCoverLetter } from "@/hooks/useCoverLetter";
import type { Experience } from "app/types/cv.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import intlTelInput from "intl-tel-input";
import {
  Plus,
  Trash2,
  Upload,
  Linkedin,
  User,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Save,
} from "lucide-react";

interface Education {
  id: string;
  school: string;
  degree: string;
  graduationYear: string;
}

type LanguageLevel = "Básico" | "Intermediário" | "Avançado" | "Fluente" | "Nativo";

interface Language {
  id: string;
  name: string;
  level: LanguageLevel;
}

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  photoUrl?: string;
  linkedinUrl?: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  languages: Language[];
  objective?: string;
}

export default function CurriculoBuilder() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { loading: loadingLetter, letter, generate } = useCoverLetter();

  const [step, setStep] = useState<number>(1);
  const [newSkill, setNewSkill] = useState<string>("");
  const [newLanguageName, setNewLanguageName] = useState<string>("");
  const [newLanguageLevel, setNewLanguageLevel] = useState<LanguageLevel>("Básico");
  
  // ✅ NOVO: Estados para validação
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // ✅ NOVO: Estado para AI generation
  const [generatingAI, setGeneratingAI] = useState<string | null>(null);
  
  // ✅ NOVO: Estado para sugestões de skills
  const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);
  
  // ✅ NOVO: Estado para indicador de atualização do preview
  const [isUpdating, setIsUpdating] = useState(false);

  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    photoUrl: undefined,
    linkedinUrl: undefined,
    experiences: [] as Experience[],
    education: [],
    skills: [],
    languages: [],
    objective: "",
  });

  const [isPremium, setIsPremium] = useState<boolean>(false);
  const phoneRef = useRef<HTMLInputElement | null>(null);

  // ✅ MELHORIA #1: AUTO-SAVE + CARREGAR RASCUNHO
  useEffect(() => {
    // Carregar dados salvos do localStorage
    const saved = localStorage.getItem('resume-draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setResumeData(parsed);
        toast.success('✓ Rascunho recuperado!', { duration: 2000 });
      } catch (error) {
        console.error('Erro ao carregar rascunho:', error);
      }
    }
  }, []);

  // Auto-save a cada mudança (com debounce de 2 segundos)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (resumeData.fullName || resumeData.email) {
        localStorage.setItem('resume-draft', JSON.stringify(resumeData));
        toast.success('Progresso salvo automaticamente', { 
          duration: 1000,
          icon: <Save className="w-4 h-4" />
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [resumeData]);

  // ✅ MELHORIA #2: VALIDAÇÃO DE EMAIL
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors(prev => ({ ...prev, email: '' }));
      return false;
    }
    if (!regex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Email inválido' }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  };

  // ✅ MELHORIA #2: VALIDAÇÃO DE TELEFONE
  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (!phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
      return false;
    }
    if (cleaned.length < 9) {
      setErrors(prev => ({ ...prev, phone: 'Telefone incompleto (mínimo 9 dígitos)' }));
      return false;
    }
    setErrors(prev => ({ ...prev, phone: '' }));
    return true;
  };

  // ✅ MELHORIA #3: VALIDAÇÃO DE LINKEDIN
  const validateLinkedin = (url: string) => {
    if (!url) {
      setErrors(prev => ({ ...prev, linkedin: '' }));
      return true;
    }
    const pattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    if (!pattern.test(url)) {
      setErrors(prev => ({ ...prev, linkedin: 'Formato inválido. Ex: linkedin.com/in/seu-perfil' }));
      return false;
    }
    setErrors(prev => ({ ...prev, linkedin: '' }));
    setResumeData((prev) => ({ ...prev, linkedinUrl: url }));
    return true;
  };

  // ✅ MELHORIA #4: GERAR SUGESTÕES DE SKILLS BASEADAS NO CARGO
  useEffect(() => {
    const position = resumeData.experiences[0]?.position?.toLowerCase() || '';
    if (!position) {
      setSkillSuggestions([]);
      return;
    }

    const suggestions: {[key: string]: string[]} = {
      'desenvolvedor': ['JavaScript', 'Git', 'React', 'Node.js', 'TypeScript', 'Python'],
      'designer': ['Figma', 'Photoshop', 'Illustrator', 'UI/UX', 'Prototipagem', 'InDesign'],
      'gestor': ['Liderança', 'Excel', 'PowerPoint', 'Gestão de Equipas', 'Planeamento'],
      'marketing': ['SEO', 'Google Ads', 'Analytics', 'Social Media', 'Content Marketing'],
      'vendas': ['Negociação', 'CRM', 'Prospeção', 'Relacionamento', 'Metas'],
      'analista': ['Excel Avançado', 'Power BI', 'SQL', 'Análise de Dados', 'Relatórios'],
      'engenheiro': ['AutoCAD', 'SolidWorks', 'Gestão de Projetos', 'Normas Técnicas'],
    };

    const key = Object.keys(suggestions).find(k => position.includes(k));
    if (key) {
      setSkillSuggestions(suggestions[key]);
    } else {
      setSkillSuggestions([]);
    }
  }, [resumeData.experiences]);

  // ✅ MELHORIA #5: GERAR RESPONSABILIDADES COM IA
  const generateAISuggestions = async (expId: string, position: string, company: string) => {
    if (!position) {
      toast.error('Preencha o cargo primeiro');
      return;
    }

    setGeneratingAI(expId);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/generate-responsibilities`,
        { position, company },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const suggestions = response.data.suggestions || response.data.data;

      // Atualizar experiência com sugestões
      const updated = resumeData.experiences.map((x) =>
        x.id === expId ? { ...x, description: suggestions } : x
      );
      setResumeData((prev) => ({ ...prev, experiences: updated }));

      toast.success('✨ Sugestões geradas com IA!');
    } catch (error) {
      console.error('Erro ao gerar sugestões:', error);
      toast.error('Erro ao gerar sugestões. Tente novamente.');
    } finally {
      setGeneratingAI(null);
    }
  };

  // ✅ MELHORIA #6: INDICADOR DE PREVIEW ATUALIZANDO
  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 300);
    return () => clearTimeout(timer);
  }, [resumeData]);

  // Otimização: useMemo para preview
  const previewData = useMemo(() => resumeData, [resumeData]);

  // Configuração do telefone (mantido do original)
  useEffect(() => {
    if (!phoneRef.current) return;

    const iti = intlTelInput(phoneRef.current, {
      initialCountry: "pt",
      separateDialCode: false,
      preferredCountries: ["pt", "br"],
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.1.1/js/utils.js",
    } as any);

    const handleInput = () => {
      const fullNumber = iti.getNumber();
      setResumeData((prev) => ({ ...prev, phone: fullNumber }));
      validatePhone(fullNumber);
    };

    phoneRef.current.addEventListener("input", handleInput);

    return () => {
      phoneRef.current?.removeEventListener("input", handleInput);
      iti.destroy();
    };
  }, []);

  // Upload de foto (mantido)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("A foto deve ter menos de 2MB");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setResumeData((prev) => ({ ...prev, photoUrl: imageUrl }));
    toast.success("Foto carregada!");
  };

  // Gerar currículo (mantido)
  const handleGenerateResume = async () => {
    if (!resumeData.fullName) {
      toast.error("Por favor, preencha o nome completo.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Sessão expirada. Faça login novamente.");
      return;
    }

    const loadingToast = toast.loading("A gerar o seu currículo com IA...");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/generate-resume`,
        { resumeData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.dismiss(loadingToast);
      toast.success("Currículo gerado com sucesso!");
      router.push("/onboarding/checkout");
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
      toast.error("Ocorreu um erro ao gerar o currículo.");
    }
  };

  // Gerar carta (mantido)
  const handleGenerateLetter = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Sessão expirada. Faça login novamente.");
      return;
    }

    await generate(token, {
      title: resumeData.experiences[0]?.position || "Profissional",
      company: "Empresa de Interesse",
      description: "Carta gerada automaticamente com base no seu perfil profissional.",
    });
  };

  // Funções de adicionar/remover (mantidas)
  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          description: "",
          startMonth: "",
          startYear: "",
          endMonth: "",
          endYear: "",
          current: false,
        },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          school: "",
          degree: "",
          graduationYear: "",
        },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (resumeData.skills.includes(trimmed)) {
      toast.warning('Competência já adicionada');
      return;
    }
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setNewSkill("");
    toast.success(`"${trimmed}" adicionada`);
  };

  const removeSkill = (skill: string) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const addLanguage = () => {
    const name = newLanguageName.trim();
    if (!name) return;
    if (resumeData.languages.some((l) => l.name.toLowerCase() === name.toLowerCase())) {
      toast.warning("Idioma já adicionado.");
      return;
    }
    const lang: Language = {
      id: Date.now().toString(),
      name,
      level: newLanguageLevel,
    };
    setResumeData((prev) => ({ ...prev, languages: [...prev.languages, lang] }));
    setNewLanguageName("");
    setNewLanguageLevel("Básico");
  };

 const removeLanguage = (id: string) => {
  setResumeData(prev => ({
    ...prev,
    languages: prev.languages.filter(lang => lang.id !== id)
  }));
};

  const handleObjectiveInput = (e: React.FormEvent<HTMLElement>) => {
    const text = (e.target as HTMLElement).innerText;
    setResumeData((prev) => ({ ...prev, objective: text }));
  };

  // ✅ MELHORIA: Validação mais robusta do step 1
  const isStep1Complete = Boolean(
    resumeData.fullName && 
    resumeData.email && 
    resumeData.phone &&
    !errors.email &&
    !errors.phone
  );

  // Verificar premium (mantido)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setIsPremium(res.data?.data?.subscription === "premium");
      })
      .catch(() => setIsPremium(false));
  }, []);

  const steps = [1, 2, 3, 4];

  // ✅ FUNÇÃO PARA LIMPAR RASCUNHO
  const clearDraft = () => {
    if (confirm('Tem certeza que deseja recomeçar? Todo o progresso será perdido.')) {
      localStorage.removeItem('resume-draft');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-4 md:p-10">
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1">
              Modelo base para moldar o seu currículo
            </Badge>
            
            {/* ✅ NOVO: Botão Limpar Rascunho */}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearDraft}
              className="text-gray-500 hover:text-red-600"
            >
              Recomeçar
            </Button>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Crie o seu Currículo Profissional
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Pronto para ser distribuído nos maiores portais de emprego de Portugal.
          </p>
        </div>

        {/* ✅ MELHORIA #7: BARRA DE PROGRESSO MELHORADA */}
        <div className="mb-10 max-w-4xl mx-auto">
          {/* Título do passo atual */}
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">
              {step === 1 && "Dados Pessoais"}
              {step === 2 && "Experiência Profissional"}
              {step === 3 && "Formação Académica"}
              {step === 4 && "Finalização"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Passo {step} de 4 · Tempo estimado: {[5, 8, 4, 6][step - 1]} minutos
            </p>
          </div>

          {/* Barra visual */}
          <div className="flex items-center justify-between">
            {steps.map((s) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div
                  onClick={() => setStep(s)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setStep(s)}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center 
                    font-bold cursor-pointer transition-all
                    ${step >= s 
                      ? 'bg-blue-600 text-white shadow-lg scale-110' 
                      : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                    }
                  `}
                  aria-label={`Ir para passo ${s}`}
                >
                  {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                </div>
                
                {s < steps.length && (
                  <div className={`
                    h-1 flex-1 mx-2 rounded transition-all
                    ${step > s ? 'bg-blue-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>

          {/* Labels dos passos */}
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Dados</span>
            <span>Experiência</span>
            <span>Formação</span>
            <span>Finalizar</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Coluna do Formulário */}
          <div className="lg:col-span-7">
            {/* PASSO 1 */}
            {step === 1 && (
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* ✅ NOVO: LinkedIn Import Placeholder */}
                  <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Linkedin className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Importar do LinkedIn
                          </h4>
                          <p className="text-sm text-gray-600">
                            Economize 70% do tempo de preenchimento
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                        onClick={() => {
                          toast.info('🚀 Funcionalidade em desenvolvimento! Por agora, preencha manualmente.');
                        }}
                      >
                        Importar Perfil
                      </Button>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    ou preencha manualmente
                  </div>

                  {/* Upload de Foto */}
                  <div className="flex flex-col items-center sm:flex-row gap-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-200">
                    <div className="relative w-24 h-24 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-md flex items-center justify-center">
                      {resumeData.photoUrl ? (
                        <img src={resumeData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label className="text-base">Foto de Perfil</Label>
                      <p className="text-xs text-muted-foreground">Recomendado: Quadrada, JPG ou PNG. Máx 2MB.</p>
                      <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                      <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="mt-1">
                        <Upload className="w-4 h-4 mr-2" /> Escolher Foto
                      </Button>
                    </div>
                  </div>

                  {/* Nome Completo */}
                  <div className="space-y-2">
                    <p className="text-black font-medium text-sm">Nome Completo *</p>
                    <input
                      type="text"
                      value={resumeData.fullName}
                      onChange={(e) =>
                        setResumeData((prev) => ({ ...prev, fullName: e.target.value }))
                      }
                      placeholder="Ex: João Silva"
                      className="py-4 w-full rounded-xl bg-white/10 backdrop-blur-md border border-black/20 text-black placeholder:text-gray-400 shadow-[0_0_20px_rgba(0,0,0,0.05)] transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* ✅ MELHORIA: LinkedIn com validação */}
                  <div className="space-y-2">
                    <p className="text-black font-medium text-sm">LinkedIn URL</p>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="linkedin.com/in/perfil"
                        value={resumeData.linkedinUrl || ""}
                        onChange={(e) => validateLinkedin(e.target.value)}
                        onBlur={(e) => validateLinkedin(e.target.value)}
                        className={`py-4 pl-9 w-full rounded-xl bg-white/10 backdrop-blur-md border ${errors.linkedin ? 'border-red-500' : 'border-black/20'} text-black placeholder:text-gray-400 transition-all focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.linkedin && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.linkedin}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* ✅ MELHORIA: Email com validação inline */}
                    <div className="space-y-2">
                      <p className="text-black font-medium text-sm">Email Profissional *</p>
                      <div className="relative">
                        <input
                          type="email"
                          value={resumeData.email}
                          onChange={(e) => {
                            setResumeData((prev) => ({ ...prev, email: e.target.value }));
                            validateEmail(e.target.value);
                          }}
                          onBlur={(e) => validateEmail(e.target.value)}
                          placeholder="joao@exemplo.pt"
                          className={`py-4 w-full rounded-xl bg-white/10 backdrop-blur-md border ${errors.email ? 'border-red-500' : 'border-black/20'} text-black placeholder:text-gray-400 transition-all focus:ring-2 focus:ring-blue-500`}
                        />
                        {resumeData.email && !errors.email && (
                          <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                        )}
                        {errors.email && (
                          <AlertCircle className="absolute right-3 top-3 h-5 w-5 text-red-500" />
                        )}
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Telefone */}
                    <div className="space-y-2">
                      <p className="text-black font-medium text-sm">Telefone / WhatsApp *</p>
                      <input
                        ref={phoneRef}
                        type="tel"
                        placeholder="9xx xxx xxx"
                        className={`pl-[90px] py-4 w-full rounded-xl bg-white/10 backdrop-blur-md border ${errors.phone ? 'border-red-500' : 'border-black/20'} text-black placeholder:text-gray-400 transition-all focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Localização */}
                  <div className="space-y-2">
                    <p className="text-black font-medium text-sm">Localização</p>
                    <input
                      value={resumeData.location}
                      onChange={(e) =>
                        setResumeData((prev) => ({ ...prev, location: e.target.value }))
                      }
                      placeholder="Cidade, País"
                      className="py-4 w-full rounded-xl bg-white/10 backdrop-blur-md border border-black/20 text-black placeholder:text-gray-400 transition-all focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Resumo Pessoal */}
               <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Resumo Pessoal</Label>
                    
                    {/* ✅ BOTÃO AI AQUI */}
                    <AITextImprover
                      currentText={resumeData.summary}
                      context="summary"
                      onImprove={(improved) => setResumeData(prev => ({ 
                        ...prev, 
                        summary: improved 
                      }))}
                    />
                  </div>

                  <Textarea
                    value={resumeData.summary}
                    onChange={(e) => setResumeData((prev) => ({ 
                      ...prev, 
                      summary: e.target.value 
                    }))}
                    placeholder="Profissional experiente com sólida trajetória em..."
                    rows={4}
                    className="resize-none"
                  />
                  
                  <p className="text-xs text-gray-500">
                    {resumeData.summary?.length || 0} caracteres 
                    {resumeData.summary?.length < 100 && ' · Mínimo recomendado: 100'}
                  </p>
                </div>

                  <Button 
                    onClick={() => setStep(2)} 
                    disabled={!isStep1Complete} 
                    className="w-full h-12 text-lg"
                  >
                    Próximo: Experiência →
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* PASSO 2: EXPERIÊNCIA */}
            {step === 2 && (
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-black">
                    Experiência Profissional
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* ✅ MELHORIA: Empty state quando não tem experiências */}
                  {resumeData.experiences.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-gray-600 mb-6 text-lg">
                        Ainda não adicionou nenhuma experiência profissional
                      </p>
                      <button
                        onClick={addExperience}
                        className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        Adicionar Primeira Experiência
                      </button>
                    </div>
                  )}

                  {resumeData.experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-6 rounded-xl bg-white shadow-lg border-2 border-gray-100 space-y-6 relative hover:shadow-xl transition-shadow"
                    >
                      {/* Botão de remover */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExperience(exp.id)}
                        className="absolute right-3 top-3 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>

                      {/* Empresa + Cargo */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-black font-medium text-sm">Empresa</p>
                          <input
                            placeholder="Nome da empresa"
                            value={exp.company}
                            onChange={(e) => {
                              const updated = resumeData.experiences.map((x) =>
                                x.id === exp.id ? { ...x, company: e.target.value } : x
                              );
                              setResumeData((prev) => ({ ...prev, experiences: updated }));
                            }}
                            className="py-4 w-full rounded-xl bg-white/10 backdrop-blur-md border border-black/20 text-black placeholder:text-gray-400 transition-all focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <p className="text-black font-medium text-sm">Cargo</p>
                          <input
                            placeholder="Cargo ocupado"
                            value={exp.position}
                            onChange={(e) => {
                              const updated = resumeData.experiences.map((x) =>
                                x.id === exp.id ? { ...x, position: e.target.value } : x
                              );
                              setResumeData((prev) => ({ ...prev, experiences: updated }));
                            }}
                            className="py-4 w-full rounded-xl bg-white/10 backdrop-blur-md border border-black/20 text-black placeholder:text-gray-400 transition-all focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Datas */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <p className="text-black font-medium text-sm">Início</p>
                          <div className="grid grid-cols-2 gap-3">
                            <select
                              value={exp.startMonth}
                              onChange={(e) => {
                                const updated = resumeData.experiences.map((x) =>
                                  x.id === exp.id ? { ...x, startMonth: e.target.value } : x
                                );
                                setResumeData((prev) => ({ ...prev, experiences: updated }));
                              }}
                              className="py-3 rounded-xl bg-white/10 border border-black/20 text-black focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Mês</option>
                              {["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].map((m) => (
                                <option key={m} value={m}>{m}</option>
                              ))}
                            </select>

                            <select
                              value={exp.startYear}
                              onChange={(e) => {
                                const updated = resumeData.experiences.map((x) =>
                                  x.id === exp.id ? { ...x, startYear: e.target.value } : x
                                );
                                setResumeData((prev) => ({ ...prev, experiences: updated }));
                              }}
                              className="py-3 rounded-xl bg-white/10 border border-black/20 text-black focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Ano</option>
                              {Array.from({ length: 45 }, (_, i) => 1980 + i).map((year) => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-black font-medium text-sm">Fim</p>
                            <label className="flex items-center gap-2 text-black text-sm">
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => {
                                  const updated = resumeData.experiences.map((x) =>
                                    x.id === exp.id ? { ...x, current: e.target.checked } : x
                                  );
                                  setResumeData((prev) => ({ ...prev, experiences: updated }));
                                }}
                                className="w-4 h-4"
                              />
                              Trabalho atual
                            </label>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <select
                              disabled={exp.current}
                              value={exp.endMonth}
                              onChange={(e) => {
                                const updated = resumeData.experiences.map((x) =>
                                  x.id === exp.id ? { ...x, endMonth: e.target.value } : x
                                );
                                setResumeData((prev) => ({ ...prev, experiences: updated }));
                              }}
                              className={`py-3 rounded-xl bg-white/10 border border-black/20 text-black focus:ring-2 focus:ring-blue-500 ${exp.current ? 'opacity-40 cursor-not-allowed' : ''}`}
                            >
                              <option value="">Mês</option>
                              {["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].map((m) => (
                                <option key={m} value={m}>{m}</option>
                              ))}
                            </select>

                            <select
                              disabled={exp.current}
                              value={exp.endYear}
                              onChange={(e) => {
                                const updated = resumeData.experiences.map((x) =>
                                  x.id === exp.id ? { ...x, endYear: e.target.value } : x
                                );
                                setResumeData((prev) => ({ ...prev, experiences: updated }));
                              }}
                              className={`py-3 rounded-xl bg-white/10 border border-black/20 text-black focus:ring-2 focus:ring-blue-500 ${exp.current ? 'opacity-40 cursor-not-allowed' : ''}`}
                            >
                              <option value="">Ano</option>
                              {Array.from({ length: 45 }, (_, i) => 1980 + i).map((year) => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* ✅ MELHORIA: Descrição com botão de IA */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-black font-medium text-sm">Responsabilidades</p>
                          
                          {/* ✅ BOTÃO AI AQUI */}
                          <AITextImprover
                            currentText={exp.description}
                            context="responsibilities"
                            onImprove={(improved) => {
                              const updated = resumeData.experiences.map((x) =>
                                x.id === exp.id ? { ...x, description: improved } : x
                              );
                              setResumeData((prev) => ({ ...prev, experiences: updated }));
                            }}
                            disabled={!exp.position} // Só habilita se preencheu o cargo
                          />
                        </div>

                        <textarea
                          placeholder="• Desenvolvi aplicações web usando React
                      - Implementei testes aumentando cobertura em 40%
                      - Liderei equipe de 3 desenvolvedores"
                          value={exp.description}
                          onChange={(e) => {
                            const updated = resumeData.experiences.map((x) =>
                              x.id === exp.id ? { ...x, description: e.target.value } : x
                            );
                            setResumeData((prev) => ({ ...prev, experiences: updated }));
                          }}
                          className="w-full h-32 rounded-xl bg-white/10 border border-black/20 text-black placeholder:text-gray-400 p-4 focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                        
                        <p className="text-xs text-gray-500">
                          {exp.description?.length || 0} caracteres
                          {exp.description && exp.description.length < 50 && ' · Mínimo recomendado: 50'}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* ✅ MELHORIA: Botão adicionar mais chamativo */}
                  {resumeData.experiences.length > 0 && (
                    <button
                      onClick={addExperience}
                      className="w-full py-6 rounded-xl border-2 border-dashed border-blue-400 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold transition-all hover:border-solid hover:shadow-lg flex items-center justify-center gap-3"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Adicionar Nova Experiência</span>
                    </button>
                  )}

                  {/* Navegação */}
                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      ← Anterior
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1">
                      Próximo: Formação →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* PASSO 3: FORMAÇÃO - ✅ BUG CORRIGIDO */}
            {step === 3 && (
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold tracking-tight">
                    Formação Académica
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-10">
                  {resumeData.education.map((edu) => (
                    <div
                      key={edu.id}
                      className="rounded-2xl border-2 border-gray-100 bg-white shadow-lg p-8 space-y-6 relative hover:shadow-xl transition-shadow"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEducation(edu.id)}
                        className="absolute right-4 top-4 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>

                      {/* ✅ CORRIGIDO: Instituição usa edu.school */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                          Instituição
                        </h4>
                        <input
                          placeholder="Ex: Universidade de Lisboa"
                          value={edu.school}
                          onChange={(e) => {
                            const updated = resumeData.education.map((x) =>
                              x.id === edu.id ? { ...x, school: e.target.value } : x
                            );
                            setResumeData((prev) => ({ ...prev, education: updated }));
                          }}
                          className="py-4 w-full rounded-xl bg-white/10 backdrop-blur-md border border-black/20 text-black placeholder:text-gray-400 text-center transition-all focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* ✅ CORRIGIDO: Curso usa edu.degree */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                          Curso
                        </h4>
                        <input
                          placeholder="Ex: Engenharia Informática"
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = resumeData.education.map((x) =>
                              x.id === edu.id ? { ...x, degree: e.target.value } : x
                            );
                            setResumeData((prev) => ({ ...prev, education: updated }));
                          }}
                          className="py-4 w-full rounded-xl bg-white/10 backdrop-blur-md border border-black/20 text-black placeholder:text-gray-400 text-center transition-all focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* ✅ CORRIGIDO: Ano usa edu.graduationYear */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                          Ano de Conclusão
                        </h4>
                        <input
                          placeholder="Ex: 2025"
                          value={edu.graduationYear}
                          onChange={(e) => {
                            const updated = resumeData.education.map((x) =>
                              x.id === edu.id ? { ...x, graduationYear: e.target.value } : x
                            );
                            setResumeData((prev) => ({ ...prev, education: updated }));
                          }}
                          className="py-4 w-full rounded-xl bg-white/10 backdrop-blur-md border border-black/20 text-black placeholder:text-gray-400 text-center transition-all focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Botão adicionar */}
                  <button
                    onClick={addEducation}
                    className="w-full py-6 rounded-xl border-2 border-dashed border-purple-400 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold transition-all hover:border-solid hover:shadow-lg flex items-center justify-center gap-3"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Adicionar Formação</span>
                  </button>

                  {/* Navegação */}
                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      ← Anterior
                    </Button>
                    <Button onClick={() => setStep(4)} className="flex-1">
                      Próximo: Competências →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* PASSO 4: COMPETÊNCIAS, IDIOMAS E FINALIZAÇÃO */}
            {step === 4 && (
  <Card className="border-none shadow-xl">
    <CardHeader>
      <CardTitle>Competências, Idiomas e Finalização</CardTitle>
    </CardHeader>

    {/* 🔥 Compactado: antes era space-y-8 */}
    <CardContent className="space-y-4">

      {/* ============================
          COMPETÊNCIAS
      ============================ */}
      <div className="space-y-3">

        {/* 🔥 Responsivo: input em cima no mobile, lado a lado no PC */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Ex: React, Inglês Fluente, Gestão..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            className="
              flex-1
              py-4 min-h-[48px] w-full
              rounded-xl bg-white/10 backdrop-blur-md 
              border border-black/20 text-black placeholder:text-gray-400 
              shadow-[0_0_20px_rgba(0,0,0,0.05)]
              transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            "
          />

          <Button 
            onClick={addSkill} 
            className="h-12 w-full sm:w-auto px-4 text-sm sm:text-base"
          >
            Adicionar
          </Button>
        </div>

        {/* Sugestões */}
        {skillSuggestions.length > 0 && (
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm font-medium text-gray-700 mb-2">
              💡 Sugestões baseadas no cargo "{resumeData.experiences[0]?.position}":
            </p>
            <div className="flex flex-wrap gap-2">
              {skillSuggestions
                .filter(s => !resumeData.skills.includes(s))
                .map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      setResumeData(prev => ({ 
                        ...prev, 
                        skills: [...prev.skills, skill] 
                      }));
                      toast.success(`"${skill}" adicionada`);
                    }}
                    className="
                      px-3 py-1 bg-white border border-blue-300 rounded-full 
                      text-sm hover:bg-blue-100 transition-colors
                    "
                  >
                    + {skill}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Lista de skills */}
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="pl-3 pr-1 py-1 gap-2 text-sm"
            >
              {skill}
              <Trash2 
                className="w-3 h-3 cursor-pointer hover:text-destructive ml-2" 
                onClick={() => removeSkill(skill)} 
              />
            </Badge>
          ))}
        </div>
      </div>


      {/* ============================
          IDIOMAS
      ============================ */}
      <div className="pt-4 border-t space-y-3">
        <Label>Idiomas</Label>

        {/* 🔥 Responsivo */}
        <div className="flex flex-col sm:flex-row gap-3">

          <input
            type="text"
            placeholder="Ex: Português, Inglês, Espanhol..."
            value={newLanguageName}
            onChange={(e) => setNewLanguageName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
            className="
              flex-1
              py-4 min-h-[48px] w-full
              rounded-xl bg-white/10 backdrop-blur-md 
              border border-black/20 text-black placeholder:text-gray-400 
              shadow-[0_0_20px_rgba(0,0,0,0.05)]
              transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            "
          />

          <select
            value={newLanguageLevel}
            onChange={(e) => setNewLanguageLevel(e.target.value as LanguageLevel)}
            className="
              py-4 min-h-[48px]
              rounded-xl bg-white/10 backdrop-blur-md 
              border border-black/20 text-black shadow 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            "
          >
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
            <option value="Fluente">Fluente</option>
            <option value="Nativo">Nativo</option>
          </select>

          <Button 
            onClick={addLanguage} 
            className="h-12 w-full sm:w-auto px-4 text-sm sm:text-base"
          >
            Adicionar
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {resumeData.languages.map((lang) => (
            <Badge 
              key={lang.id} 
              variant="secondary" 
              className="pl-3 pr-1 py-1 gap-2 text-sm flex items-center"
            >
              <span className="mr-2">{lang.name}</span>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                {lang.level}
              </span>
              <Trash2 
                  className="w-3 h-3 ml-2 cursor-pointer hover:text-destructive" 
                  onClick={() => removeLanguage(lang.id)} 
                />

            </Badge>
          ))}
        </div>
      </div>


      {/* ============================
          OBJETIVO / CARTA CURTA
      ============================ */}
     <div className="pt-4 border-t space-y-2">
        <div className="flex items-center justify-between">
          <Label>Objetivo Profissional</Label>
          
          {/* ✅ BOTÃO AI AQUI */}
          <AITextImprover
            currentText={resumeData.objective || ""}
            context="objective"
            onImprove={(improved) => setResumeData(prev => ({ 
              ...prev, 
              objective: improved 
            }))}
          />
        </div>

        <p className="text-sm text-slate-500">
          Resuma em 1-2 frases seu objetivo e proposta de valor.
        </p>

        <Textarea
          value={resumeData.objective || ""}
          onChange={(e) => setResumeData(prev => ({ 
            ...prev, 
            objective: e.target.value 
          }))}
          placeholder="Profissional de TI com 5+ anos buscando posição sênior..."
          rows={3}
          className="resize-none"
        />
        
        <p className="text-xs text-gray-500">
          {resumeData.objective?.length || 0} caracteres
        </p>
      </div>

      {/* ============================
          BOTÕES FINAIS
      ============================ */}
      <div className="flex flex-col gap-3 pt-4 border-t">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => setStep(3)} className="flex-1 h-12">
            ← Anterior
          </Button>

          <Button 
            type="button" 
            onClick={() => router.push("/checkout")} 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12"
          >
            Obter o meu currículo agora
          </Button>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          disabled={!resumeData.fullName || loadingLetter} 
          onClick={handleGenerateLetter}
          className="h-12"
        >
          {loadingLetter ? "A gerar carta de apresentação..." : "Gerar Carta de Apresentação"}
        </Button>

        {!isPremium && (
          <p className="text-xs text-red-500 text-center">
            O download do currículo em PDF será liberado após o pagamento.
          </p>
        )}
      </div>

    </CardContent>
  </Card>
)}


          </div>

          {/* ✅ MELHORIA: Preview com indicador de atualização */}
          

{/* ✅ PREVIEW COMPLETAMENTE REDESENHADO */}
          <div className="lg:col-span-5">
            <div className="sticky top-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${isUpdating ? 'bg-yellow-500' : 'bg-green-500'}`} />
                  {isUpdating ? 'Atualizando...' : 'Visualização em Tempo Real'}
                </h3>
              </div>

              {/* ✅ NOVO PREVIEW - DESIGN MODERNO */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                
                {/* HEADER MODERNO COM GRADIENTE */}
                <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 pb-12">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
                  
                  <div className="relative flex items-start gap-6">
                    {/* Foto */}
                    <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur-sm overflow-hidden border-4 border-white/30 shadow-2xl flex-shrink-0">
                      {previewData.photoUrl ? (
                        <img src={previewData.photoUrl} className="w-full h-full object-cover" alt="Foto" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/10">
                          <User className="w-12 h-12 text-white/50" />
                        </div>
                      )}
                    </div>

                    {/* Info Principal */}
                    <div className="flex-1 text-white">
                      <h2 className="text-3xl font-bold mb-2 tracking-tight">
                        {previewData.fullName || "Seu Nome Completo"}
                      </h2>
                      <p className="text-blue-100 text-lg font-medium mb-4">
                        {previewData.experiences[0]?.position || "Título Profissional"}
                      </p>
                      
                      {/* Contatos em cards */}
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {previewData.email && (
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate text-xs">{previewData.email}</span>
                          </div>
                        )}
                        {previewData.phone && (
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs">{previewData.phone}</span>
                          </div>
                        )}
                        {previewData.location && (
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs">{previewData.location}</span>
                          </div>
                        )}
                        {previewData.linkedinUrl && (
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                            <Linkedin className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs">LinkedIn</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONTEÚDO */}
                <div className="p-8 space-y-8">
                  
                  {/* Objetivo - Destaque */}
                  {previewData.objective && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-600">
                      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        Objetivo Profissional
                      </h3>
                      <p className="text-gray-800 leading-relaxed font-medium">
                        {previewData.objective}
                      </p>
                    </div>
                  )}

                  {/* Resumo */}
                  {previewData.summary && (
                    <section>
                      <h3 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-200">
                        Resumo
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {previewData.summary}
                      </p>
                    </section>
                  )}

                  {/* Experiência */}
                  {previewData.experiences.length > 0 && (
                    <section>
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-200">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        <h3 className="text-base font-bold text-gray-900">
                          Experiência Profissional
                        </h3>
                      </div>
                      
                      <div className="space-y-6">
                        {previewData.experiences.map((exp, index) => (
                          <div key={exp.id} className="relative pl-8">
                            {/* Timeline */}
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200">
                              <div className="absolute top-0 -left-1.5 w-3 h-3 bg-blue-600 rounded-full border-2 border-white"></div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h4 className="font-bold text-gray-900">
                                    {exp.position || "Cargo"}
                                  </h4>
                                  <p className="text-sm font-medium text-blue-600">
                                    {exp.company}
                                  </p>
                                </div>
                                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600 whitespace-nowrap">
                                  {exp.startMonth}/{exp.startYear} – {exp.current ? "Atual" : `${exp.endMonth}/${exp.endYear}`}
                                </span>
                              </div>
                              
                              {exp.description && (
                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Educação */}
                  {previewData.education.length > 0 && (
                    <section>
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-200">
                        <GraduationCap className="w-5 h-5 text-purple-600" />
                        <h3 className="text-base font-bold text-gray-900">
                          Formação Académica
                        </h3>
                      </div>
                      
                      <div className="space-y-4">
                        {previewData.education.map((edu) => (
                          <div key={edu.id} className="flex gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <GraduationCap className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{edu.degree || "Curso"}</h4>
                              <p className="text-sm text-gray-600">{edu.school || "Instituição"}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {edu.graduationYear && `Conclusão: ${edu.graduationYear}`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Competências */}
                  {previewData.skills.length > 0 && (
                    <section>
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-200">
                        <Award className="w-5 h-5 text-amber-600" />
                        <h3 className="text-base font-bold text-gray-900">
                          Competências
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {previewData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Idiomas */}
                  {previewData.languages.length > 0 && (
                    <section>
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-200">
                        <Globe className="w-5 h-5 text-green-600" />
                        <h3 className="text-base font-bold text-gray-900">
                          Idiomas
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {previewData.languages.map((lang) => (
                          <div key={lang.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                            <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-sm text-gray-900">{lang.name}</p>
                              <p className="text-xs text-gray-500">{lang.level}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Carta de Apresentação */}
                  {letter && (
                    <section className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                      <h3 className="text-sm font-bold text-purple-900 uppercase tracking-wide mb-3">
                        Carta de Apresentação
                      </h3>
                      <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                        {letter}
                      </p>
                    </section>
                  )}
                </div>
              </div>

              {/* Botões de ação */}
              <div className="mt-6 flex flex-col gap-3">
                {isPremium ? (
                  <Button className="bg-green-600 hover:bg-green-700 text-white h-12 w-full shadow-lg hover:shadow-xl transition-all">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Baixar Currículo em PDF
                  </Button>
                ) : (
                  <>
                    <Button disabled className="bg-gray-200 text-gray-500 cursor-not-allowed h-12 w-full">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Baixar Currículo (Premium)
                    </Button>
                    <Button 
                      onClick={() => router.push("/checkout")} 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-12 w-full shadow-lg hover:shadow-xl transition-all"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Fazer Upgrade para Premium
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}