"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import { useCoverLetter } from "@/hooks/useCoverLetter";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

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
} from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

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
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    photoUrl: undefined,
    linkedinUrl: undefined,
    experiences: [],
    education: [],
    skills: [],
    languages: [],
    objective: "",
  });

  const [isPremium, setIsPremium] = useState<boolean>(false);

  // -----------------------------
  // UPLOAD DE FOTO
  // -----------------------------
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

  // -----------------------------
  // VALIDAÇÃO LINKEDIN
  // -----------------------------
  const validateLinkedin = (url: string) => {
    const pattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    if (url && !pattern.test(url)) {
      toast.warning("Formato inválido. Exemplo: linkedin.com/in/seu-perfil");
    }
    setResumeData((prev) => ({ ...prev, linkedinUrl: url }));
  };

  // -----------------------------
  // GERAR CURRÍCULO COM IA
  // -----------------------------
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  // -----------------------------
  // GERAR CARTA DE APRESENTAÇÃO
  // -----------------------------
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

  // -----------------------------
  // ADICIONAR / REMOVER CAMPOS
  // -----------------------------
  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
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
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  // -----------------------------
  // IDIOMAS
  // -----------------------------
  const addLanguage = () => {
    const name = newLanguageName.trim();
    if (!name) return;
    // evita duplicados simples
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
    setResumeData((prev) => ({ ...prev, languages: prev.languages.filter((l) => l.id !== id) }));
  };

  // -----------------------------
  // OBJETIVO (contentEditable)
  // -----------------------------
  const handleObjectiveInput = (e: React.FormEvent<HTMLElement>) => {
    const text = (e.target as HTMLElement).innerText;
    setResumeData((prev) => ({ ...prev, objective: text }));
  };

  const isStep1Complete = Boolean(resumeData.fullName && resumeData.email && resumeData.phone);

  // -----------------------------
  // VERIFICAR PREMIUM
  // -----------------------------
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

  // -----------------------------
  // PROGRESS BAR HELPERS
  // -----------------------------
  const steps = [1, 2, 3, 4];

  const stepCircleClass = (s: number) =>
    `w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all cursor-pointer ${
      step >= s ? "bg-primary text-white shadow-lg" : "bg-slate-200 text-slate-500"
    }`;

  const progressBarSegmentClass = (s: number) =>
    `h-1 flex-1 mx-2 rounded ${step > s ? "bg-primary" : "bg-slate-200"}`;

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-4 md:p-10">
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1">
            Modelo base para moldar o seu currículo
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Crie o seu Currículo Profissional
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Pronto para ser distribuído nos maiores portais de emprego de Portugal.
          </p>
        </div>

        {/* Barra de Progresso (interativa) */}
        <div className="mb-10 flex items-center justify-between max-w-2xl mx-auto lg:mx-0">
          {steps.map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div
                onClick={() => setStep(s)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setStep(s)}
                className={stepCircleClass(s)}
                aria-label={`Ir para passo ${s}`}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < steps.length && <div className={progressBarSegmentClass(s)} />}
            </div>
          ))}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nome Completo *</Label>
                      <Input
                        value={resumeData.fullName}
                        onChange={(e) => setResumeData((prev) => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Ex: João Silva"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>LinkedIn URL</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input className="pl-9" placeholder="linkedin.com/in/perfil" value={resumeData.linkedinUrl || ""} onChange={(e) => validateLinkedin(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email Profissional *</Label>
                      <Input
                        type="email"
                        value={resumeData.email}
                        onChange={(e) => setResumeData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="joao@exemplo.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Telefone / WhatsApp *</Label>
                      <Input
                        value={resumeData.phone}
                        onChange={(e) => setResumeData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+351 9xx xxx xxx"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Localização</Label>
                    <Input
                      value={resumeData.location}
                      onChange={(e) => setResumeData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="Cidade, País"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Resumo Profissional</Label>
                    <Textarea
                      value={resumeData.summary}
                      onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
                      placeholder="Fale sobre suas principais conquistas..."
                      rows={4}
                    />
                  </div>

                  <Button onClick={() => setStep(2)} disabled={!isStep1Complete} className="w-full h-12 text-lg">
                    Próximo: Experiência
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* PASSO 2: EXPERIÊNCIA */}
            {step === 2 && (
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle>Experiência Profissional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.experiences.map((exp) => (
                    <div key={exp.id} className="p-4 border rounded-xl space-y-4 bg-white dark:bg-slate-900 shadow-sm relative">
                      <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="absolute right-2 top-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <Input
                          placeholder="Empresa"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = resumeData.experiences.map((x) => (x.id === exp.id ? { ...x, company: e.target.value } : x));
                            setResumeData((prev) => ({ ...prev, experiences: updated }));
                          }}
                        />
                        <Input
                          placeholder="Cargo"
                          value={exp.position}
                          onChange={(e) => {
                            const updated = resumeData.experiences.map((x) => (x.id === exp.id ? { ...x, position: e.target.value } : x));
                            setResumeData((prev) => ({ ...prev, experiences: updated }));
                          }}
                        />
                      </div>
                      <Textarea
                        placeholder="Descreva suas responsabilidades..."
                        value={exp.description}
                        onChange={(e) => {
                          const updated = resumeData.experiences.map((x) => (x.id === exp.id ? { ...x, description: e.target.value } : x));
                          setResumeData((prev) => ({ ...prev, experiences: updated }));
                        }}
                      />
                    </div>
                  ))}

                  <Button variant="outline" onClick={addExperience} className="w-full border-dashed py-6">
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Experiência
                  </Button>

                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Anterior
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1">
                      Próximo: Formação
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* PASSO 3: FORMAÇÃO */}
            {step === 3 && (
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle>Formação Académica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="p-4 border rounded-xl space-y-4 bg-white dark:bg-slate-900 relative">
                      <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)} className="absolute right-2 top-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <Input
                          placeholder="Instituição (Ex: Universidade de Lisboa)"
                          value={edu.school}
                          onChange={(e) => {
                            const updated = resumeData.education.map((x) => (x.id === edu.id ? { ...x, school: e.target.value } : x));
                            setResumeData((prev) => ({ ...prev, education: updated }));
                          }}
                        />
                        <Input
                          placeholder="Curso (Ex: Administração)"
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = resumeData.education.map((x) => (x.id === edu.id ? { ...x, degree: e.target.value } : x));
                            setResumeData((prev) => ({ ...prev, education: updated }));
                          }}
                        />
                      </div>
                      <Input
                        placeholder="Ano de Conclusão"
                        value={edu.graduationYear}
                        onChange={(e) => {
                          const updated = resumeData.education.map((x) => (x.id === edu.id ? { ...x, graduationYear: e.target.value } : x));
                          setResumeData((prev) => ({ ...prev, education: updated }));
                        }}
                      />
                    </div>
                  ))}

                  <Button variant="outline" onClick={addEducation} className="w-full border-dashed py-6">
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Formação
                  </Button>

                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Anterior
                    </Button>
                    <Button onClick={() => setStep(4)} className="flex-1">
                      Próximo: Competências
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
                <CardContent className="space-y-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ex: React, Inglês Fluente, Gestão..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    />
                    <Button onClick={addSkill}>Adicionar</Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="pl-3 pr-1 py-1 gap-2 text-sm">
                        {skill}
                        <Trash2 className="w-3 h-3 cursor-pointer hover:text-destructive ml-2" onClick={() => removeSkill(skill)} />
                      </Badge>
                    ))}
                  </div>

                  {/* Idiomas */}
                  <div className="pt-4 border-t">
                    <Label>Idiomas</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Ex: Português, Inglês, Espanhol..."
                        value={newLanguageName}
                        onChange={(e) => setNewLanguageName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addLanguage()}
                      />
                      <select
                        value={newLanguageLevel}
                        onChange={(e) => setNewLanguageLevel(e.target.value as LanguageLevel)}
                        className="border rounded px-3"
                      >
                        <option value="Básico">Básico</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                        <option value="Fluente">Fluente</option>
                        <option value="Nativo">Nativo</option>
                      </select>
                      <Button onClick={addLanguage}>Adicionar</Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {resumeData.languages.map((lang) => (
                        <Badge key={lang.id} variant="secondary" className="pl-3 pr-1 py-1 gap-2 text-sm flex items-center">
                          <span className="mr-2">{lang.name}</span>
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{lang.level}</span>
                          <Trash2 className="w-3 h-3 ml-2 cursor-pointer hover:text-destructive" onClick={() => removeLanguage(lang.id)} />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Objetivo / Carta curta (WYSIWYG-like) */}
                  <div className="pt-4 border-t">
                    <Label>Objetivo / Carta curta</Label>
                    <div className="mt-2">
                      <div className="mb-2 text-sm text-slate-500">
                        Isso aparece no topo do seu currículo. Impressione os empregadores com uma introdução que resume seus pontos fortes.
                      </div>
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleObjectiveInput}
                        className="min-h-[120px] p-3 border rounded bg-white dark:bg-slate-900"
                        aria-label="Objetivo do currículo"
                      >
                        {resumeData.objective}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-6 border-t mt-6">
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                        Anterior
                      </Button>
                      <Button type="button" onClick={() => router.push("/checkout")} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12">
                        Obter o meu currículo agora
                      </Button>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button type="button" variant="outline" disabled={!resumeData.fullName || loadingLetter} onClick={handleGenerateLetter}>
                        {loadingLetter ? "A gerar carta de apresentação..." : "Gerar Carta de Apresentação"}
                      </Button>

                      {!isPremium && (
                        <p className="text-xs text-red-500">
                          O download do currículo em PDF será liberado após a conclusão do pagamento no checkout.
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Coluna do Preview */}
          <div className="lg:col-span-5">
            <div className="sticky top-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Visualização em Tempo Real
                </h3>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden min-h-[700px] border border-slate-200">
                {/* Top Header do Currículo */}
                <div className="bg-slate-900 p-8 text-white flex gap-6 items-center">
                  <div className="w-24 h-24 rounded-lg bg-slate-700 overflow-hidden flex-shrink-0 border-2 border-slate-600">
                    {resumeData.photoUrl ? (
                      <img src={resumeData.photoUrl} className="w-full h-full object-cover" alt="Foto" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-8 h-8 opacity-20" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold uppercase tracking-wide">{resumeData.fullName || "SEU NOME"}</h2>
                    <p className="text-blue-400 font-medium">{resumeData.experiences[0]?.position || "Cargo Pretendido"}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-[10px] opacity-80">
                      {resumeData.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {resumeData.location}
                        </span>
                      )}
                      {resumeData.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {resumeData.email}
                        </span>
                      )}
                      {resumeData.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {resumeData.phone}
                        </span>
                      )}
                      {resumeData.linkedinUrl && (
                        <span className="flex items-center gap-1">
                          <Linkedin className="w-3 h-3" /> LinkedIn
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  {/* Objetivo */}
                  {resumeData.objective && (
                    <section>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-1 mb-2">Objetivo</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{resumeData.objective}</p>
                    </section>
                  )}

                  {/* Resumo */}
                  {resumeData.summary && (
                    <section>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-1 mb-2">Resumo</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{resumeData.summary}</p>
                    </section>
                  )}

                  {/* Experiência */}
                  {resumeData.experiences.length > 0 && (
                    <section>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-1 mb-3">Experiência Profissional</h4>
                      <div className="space-y-4">
                        {resumeData.experiences.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start">
                              <p className="font-bold text-slate-800 dark:text-slate-100">{exp.position}</p>
                              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">
                                {exp.startDate} - {exp.endDate || "Atual"}
                              </span>
                            </div>
                            <p className="text-xs text-blue-600 font-medium">{exp.company}</p>
                            <p className="text-xs mt-1 text-slate-500 line-clamp-2">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Skills */}
                  {resumeData.skills.length > 0 && (
                    <section>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-1 mb-3">Competências</h4>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-normal">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Idiomas */}
                  {resumeData.languages.length > 0 && (
                    <section>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-1 mb-3">Idiomas</h4>
                      <div className="flex flex-wrap gap-3">
                        {resumeData.languages.map((lang) => (
                          <div key={lang.id} className="text-sm">
                            <div className="font-medium">{lang.name}</div>
                            <div className="text-xs text-slate-500">{lang.level}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Carta de Apresentação (preview simples) */}
                  {letter && (
                    <section>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-1 mb-3">Carta de Apresentação (IA)</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{letter}</p>
                    </section>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                {isPremium ? (
                  <Button className="bg-green-600 hover:bg-green-700 text-white h-12">Baixar Currículo em PDF</Button>
                ) : (
                  <>
                    <Button disabled className="bg-gray-300 text-gray-600 cursor-not-allowed h-12">
                      Baixar Currículo (Premium)
                    </Button>

                    <Button onClick={() => router.push("/checkout")} className="bg-blue-600 hover:bg-blue-700 text-white h-12">
                      Fazer Upgrade para Desbloquear
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
