"use client";
import { useState, useRef } from "react"; // Adicionado imports de estado
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Plus, Trash2, Download, ChevronRight, CheckCircle2, Upload, Linkedin, User, MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  photoUrl?: string; // Campo para a imagem
  linkedinUrl?: string;
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    graduationYear: string;
  }>;
  skills: string[];
}

export default function CurriculoBuilder() {
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    photoUrl: "",
    linkedinUrl: "",
    experiences: [],
    education: [],
    skills: [],
  });
  const [newSkill, setNewSkill] = useState("");

  // Handler para Upload de Foto
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("A foto deve ter menos de 2MB");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setResumeData({ ...resumeData, photoUrl: imageUrl });
      toast.success("Foto carregada!");
    }
  };

  // Validação de LinkedIn
  const validateLinkedin = (url: string) => {
    const pattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    if (url && !pattern.test(url)) {
      toast.warning("Formato de LinkedIn inválido. Use: linkedin.com/in/seu-perfil");
    }
    setResumeData({ ...resumeData, linkedinUrl: url });
  };

  const createResume = trpc.resume.create.useMutation({
    onSuccess: () => {
      toast.success("Currículo criado com sucesso!");
      handleSuccessRedirect();
    },
   onError: (error: any) => {
  toast.error(`Erro ao criar currículo: ${error.message}`);
},
  });

  const handleSaveResume = async () => {
    if (!resumeData.fullName || !resumeData.email) {
      toast.error("Por favor, preencha os dados obrigatórios");
      return;
    }
    createResume.mutate({
      title: `Currículo de ${resumeData.fullName}`,
      summary: resumeData.summary,
    });
  };

  const handleSuccessRedirect = () => {
    setTimeout(() => setStep(5), 500);
  };

  // Funções de Gerenciamento (Experiencia/Educação/Skills) mantidas...
  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experiences: [...resumeData.experiences, { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", description: "" }],
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({ ...resumeData, experiences: resumeData.experiences.filter((exp) => exp.id !== id) });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { id: Date.now().toString(), school: "", degree: "", field: "", graduationYear: "" }],
    });
  };

  const removeEducation = (id: string) => {
    setResumeData({ ...resumeData, education: resumeData.education.filter((edu) => edu.id !== id) });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData({ ...resumeData, skills: [...resumeData.skills, newSkill] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setResumeData({ ...resumeData, skills: resumeData.skills.filter((s) => s !== skill) });
  };

  const isStep1Complete = resumeData.fullName && resumeData.email && resumeData.phone;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-4 md:p-10">
        
        {/* Header aprimorado */}
        <div className="mb-10 text-center lg:text-left">
          <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1"> Modelo base para moldar o seu curriculo</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Crie seu Currículo Profissional</h1>
          <p className="text-muted-foreground mt-2 text-lg">Pronto para ser distribuído nos maires portais de empregos de Portugal.</p>
        </div>

        {/* Barra de Progresso */}
        <div className="mb-10 flex items-center justify-between max-w-2xl mx-auto lg:mx-0">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? "bg-primary text-white shadow-lg" : "bg-slate-200 text-slate-500"}`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 4 && <div className={`h-1 flex-1 mx-2 rounded ${step > s ? "bg-primary" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Coluna do Formulário (8 colunas) */}
          <div className="lg:col-span-7">
            {step === 1 && (
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Upload de Foto Section */}
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
                      <Input value={resumeData.fullName} onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })} placeholder="Ex: João Silva" />
                    </div>
                    <div className="space-y-2">
                      <Label>LinkedIn URL</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input className="pl-9" placeholder="linkedin.com/in/perfil" value={resumeData.linkedinUrl} onChange={(e) => validateLinkedin(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email Profissional *</Label>
                      <Input type="email" value={resumeData.email} onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })} placeholder="joao@exemplo.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Telefone / WhatsApp *</Label>
                      <Input value={resumeData.phone} onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })} placeholder="+351 9xx xxx xxx" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Localização</Label>
                    <Input value={resumeData.location} onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })} placeholder="Cidade, País" />
                  </div>

                  <div className="space-y-2">
                    <Label>Resumo Profissional</Label>
                    <Textarea value={resumeData.summary} onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })} placeholder="Fale sobre suas principais conquistas..." rows={4} />
                  </div>

                  <Button onClick={() => setStep(2)} disabled={!isStep1Complete} className="w-full h-12 text-lg">
                    Próximo: Experiência <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            )}

          {/* PASSO 2: EXPERIÊNCIA */}
            {step === 2 && (
              <Card className="border-none shadow-xl">
                <CardHeader><CardTitle>Experiência Profissional</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.experiences.map((exp) => (
                    <div key={exp.id} className="p-4 border rounded-xl space-y-4 bg-white dark:bg-slate-900 shadow-sm relative">
                      <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="absolute right-2 top-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <Input placeholder="Empresa" value={exp.company} onChange={(e) => {
                          const updated = resumeData.experiences.map(x => x.id === exp.id ? { ...x, company: e.target.value } : x);
                          setResumeData({ ...resumeData, experiences: updated });
                        }} />
                        <Input placeholder="Cargo" value={exp.position} onChange={(e) => {
                          const updated = resumeData.experiences.map(x => x.id === exp.id ? { ...x, position: e.target.value } : x);
                          setResumeData({ ...resumeData, experiences: updated });
                        }} />
                      </div>
                      <Textarea placeholder="Descreva suas responsabilidades..." value={exp.description} onChange={(e) => {
                        const updated = resumeData.experiences.map(x => x.id === exp.id ? { ...x, description: e.target.value } : x);
                        setResumeData({ ...resumeData, experiences: updated });
                      }} />
                    </div>
                  ))}
                  <Button variant="outline" onClick={addExperience} className="w-full border-dashed py-6"><Plus className="mr-2 h-4 w-4" /> Adicionar Experiência</Button>
                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Anterior</Button>
                    <Button onClick={() => setStep(3)} className="flex-1">Próximo: Formação</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* PASSO 3: FORMAÇÃO ACADÊMICA */}
            {step === 3 && (
              <Card className="border-none shadow-xl">
                <CardHeader><CardTitle>Formação Acadêmica</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="p-4 border rounded-xl space-y-4 bg-white dark:bg-slate-900 relative">
                      <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)} className="absolute right-2 top-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <Input placeholder="Instituição (Ex: USP)" value={edu.school} onChange={(e) => {
                          const updated = resumeData.education.map(x => x.id === edu.id ? { ...x, school: e.target.value } : x);
                          setResumeData({ ...resumeData, education: updated });
                        }} />
                        <Input placeholder="Curso (Ex: Administração)" value={edu.degree} onChange={(e) => {
                          const updated = resumeData.education.map(x => x.id === edu.id ? { ...x, degree: e.target.value } : x);
                          setResumeData({ ...resumeData, education: updated });
                        }} />
                      </div>
                      <Input placeholder="Ano de Conclusão" value={edu.graduationYear} onChange={(e) => {
                        const updated = resumeData.education.map(x => x.id === edu.id ? { ...x, graduationYear: e.target.value } : x);
                        setResumeData({ ...resumeData, education: updated });
                      }} />
                    </div>
                  ))}
                  <Button variant="outline" onClick={addEducation} className="w-full border-dashed py-6"><Plus className="mr-2 h-4 w-4" /> Adicionar Formação</Button>
                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Anterior</Button>
                    <Button onClick={() => setStep(4)} className="flex-1">Próximo: Competências</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* PASSO 4: COMPETÊNCIAS E FINALIZAÇÃO */}
            {step === 4 && (
              <Card className="border-none shadow-xl">
                <CardHeader><CardTitle>Competências e Habilidades</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Ex: React, Inglês Fluente, Gestão..." 
                      value={newSkill} 
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill}>Adicionar</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="pl-3 pr-1 py-1 gap-2 text-sm">
                        {skill}
                        <Trash2 className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => removeSkill(skill)} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-6 border-t mt-6">
                    <Button variant="outline" onClick={() => setStep(3)} className="flex-1">Anterior</Button>
                    <Button 
                      onClick={handleSaveResume} 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12"
                      disabled={createResume.isPending}
                    >
                      {createResume.isPending ? "Salvando..." : "Gerar Meu Currículo"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            </div>
          {/* Coluna do Preview (5 colunas) - Onde a mágica acontece */}
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
                        <img src={resumeData.photoUrl} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><User className="w-8 h-8 opacity-20" /></div>
                      )}
                   </div>
                   <div>
                     <h2 className="text-2xl font-bold uppercase tracking-wide">{resumeData.fullName || "SEU NOME"}</h2>
                     <p className="text-blue-400 font-medium">{resumeData.experiences[0]?.position || "Cargo Pretendido"}</p>
                     <div className="mt-2 flex flex-wrap gap-3 text-[10px] opacity-80">
                        {resumeData.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {resumeData.location}</span>}
                        {resumeData.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {resumeData.email}</span>}
                        {resumeData.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {resumeData.phone}</span>}
                        {resumeData.linkedinUrl && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> LinkedIn</span>}
                     </div>
                   </div>
                </div>

                <div className="p-8 space-y-6">
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
                        {resumeData.experiences.map(exp => (
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
                        {resumeData.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-normal">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
