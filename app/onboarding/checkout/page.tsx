"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Plus, Trash2, ChevronRight, CheckCircle2, Upload, Linkedin, User, MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Alterado para o router do Next

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  photoUrl?: string;
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
  const router = useRouter(); // Inicializa o router
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newSkill, setNewSkill] = useState("");
  
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

  // MUTAÇÃO TRPC PARA SALVAR E REDIRECIONAR
  const createResume = trpc.resume.create.useMutation({
    onSuccess: () => {
      toast.success("Currículo salvo com sucesso!");
      // REDIRECIONAMENTO PARA O CHECKOUT
      router.push("/onboarding/checkout");
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar currículo: ${error.message}`);
      // Fallback para teste: caso o banco falhe mas você queira ver o checkout
      // router.push("/onboarding/checkout"); 
    },
  });

  const handleSaveResume = async () => {
    if (!resumeData.fullName || !resumeData.email) {
      toast.error("Por favor, preencha os dados obrigatórios");
      return;
    }
    
    // Envia os dados para o backend
    createResume.mutate({
      title: `Currículo de ${resumeData.fullName}`,
      summary: resumeData.summary,
    });
  };

  // Handlers de UI
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
        
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1">Modelo base para o seu currículo</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Crie seu Currículo Profissional</h1>
        </div>

        {/* Progresso */}
        <div className="mb-10 flex items-center justify-between max-w-2xl mx-auto lg:mx-0">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? "bg-primary text-white" : "bg-slate-200 text-slate-500"}`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 4 && <div className={`h-1 flex-1 mx-2 rounded ${step > s ? "bg-primary" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            {step === 1 && (
              <Card>
                <CardHeader><CardTitle>Dados Pessoais</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border-2 border-dashed">
                    <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                      {resumeData.photoUrl ? <img src={resumeData.photoUrl} className="w-full h-full object-cover" /> : <User className="text-slate-400" />}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>Escolher Foto</Button>
                    <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
                  </div>
                  <Input placeholder="Nome Completo" value={resumeData.fullName} onChange={(e) => setResumeData({...resumeData, fullName: e.target.value})} />
                  <Input placeholder="Email" value={resumeData.email} onChange={(e) => setResumeData({...resumeData, email: e.target.value})} />
                  <Input placeholder="Telefone" value={resumeData.phone} onChange={(e) => setResumeData({...resumeData, phone: e.target.value})} />
                  <Input placeholder="Localização" value={resumeData.location} onChange={(e) => setResumeData({...resumeData, location: e.target.value})} />
                  <Textarea placeholder="Resumo" value={resumeData.summary} onChange={(e) => setResumeData({...resumeData, summary: e.target.value})} />
                  <Button onClick={() => setStep(2)} disabled={!isStep1Complete} className="w-full">Próximo</Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader><CardTitle>Experiência</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.experiences.map((exp) => (
                    <div key={exp.id} className="p-4 border rounded-lg relative">
                      <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => removeExperience(exp.id)}><Trash2 className="h-4 w-4" /></Button>
                      <Input className="mb-2" placeholder="Empresa" value={exp.company} onChange={(e) => {
                        const updated = resumeData.experiences.map(x => x.id === exp.id ? { ...x, company: e.target.value } : x);
                        setResumeData({ ...resumeData, experiences: updated });
                      }} />
                      <Input placeholder="Cargo" value={exp.position} onChange={(e) => {
                        const updated = resumeData.experiences.map(x => x.id === exp.id ? { ...x, position: e.target.value } : x);
                        setResumeData({ ...resumeData, experiences: updated });
                      }} />
                    </div>
                  ))}
                  <Button variant="outline" onClick={addExperience} className="w-full">+ Adicionar</Button>
                  <div className="flex gap-2"><Button variant="outline" onClick={() => setStep(1)} className="flex-1">Voltar</Button><Button onClick={() => setStep(3)} className="flex-1">Próximo</Button></div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader><CardTitle>Educação</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="p-4 border rounded-lg relative">
                       <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => removeEducation(edu.id)}><Trash2 className="h-4 w-4" /></Button>
                       <Input placeholder="Escola/Universidade" value={edu.school} onChange={(e) => {
                         const updated = resumeData.education.map(x => x.id === edu.id ? { ...x, school: e.target.value } : x);
                         setResumeData({ ...resumeData, education: updated });
                       }} />
                    </div>
                  ))}
                  <Button variant="outline" onClick={addEducation} className="w-full">+ Adicionar</Button>
                  <div className="flex gap-2"><Button variant="outline" onClick={() => setStep(2)} className="flex-1">Voltar</Button><Button onClick={() => setStep(4)} className="flex-1">Próximo</Button></div>
                </CardContent>
              </Card>
            )}

            {step === 4 && (
              <Card>
                <CardHeader><CardTitle>Competências</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Ex: React" />
                    <Button onClick={addSkill}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map(s => <Badge key={s} variant="secondary">{s} <Trash2 className="w-3 h-3 ml-2 cursor-pointer" onClick={() => removeSkill(s)} /></Badge>)}
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={() => setStep(3)} className="flex-1">Voltar</Button>
                    <Button 
                      onClick={handleSaveResume} 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={createResume.isPending}
                    >
                      {createResume.isPending ? "A salvar..." : "Gerar Meu Currículo"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview Col */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 bg-white border rounded-xl shadow-lg min-h-[600px] overflow-hidden">
               <div className="bg-slate-900 p-6 text-white">
                  <h2 className="text-xl font-bold uppercase">{resumeData.fullName || "Seu Nome"}</h2>
                  <p className="text-blue-400 text-sm">{resumeData.experiences[0]?.position || "Cargo"}</p>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 border-b mb-2">Contato</h4>
                    <p className="text-xs text-slate-600">{resumeData.email}</p>
                    <p className="text-xs text-slate-600">{resumeData.phone}</p>
                  </div>
                  {resumeData.summary && (
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-400 border-b mb-2">Resumo</h4>
                      <p className="text-xs text-slate-700">{resumeData.summary}</p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}