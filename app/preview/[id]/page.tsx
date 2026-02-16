"use client";
import React, { useEffect, useState } from 'react';
import ModernEuropean from '@/components/templates/ModernEuropean'; 
import { useParams } from 'next/navigation';

export default function PreviewPage() {
  const params = useParams();
  const id = params.id as string;

  const [resume, setResume] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResume() {
      try {
        // CORREÇÃO: Adicionado o /auth/ no caminho
        const response = await fetch(`/api/auth/resumes/${id}`);
        
        if (response.ok) {
          const data = await response.json();
          setResume(data);
        } else {
          console.error("Currículo não encontrado. Status:", response.status);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) fetchResume();
  }, [id]);

  // ... (o resto da função handleDownload e os retornos de isLoading e !resume continuam iguais ao que te mandei antes)
  
  const handleDownload = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('resume-pdf'); 
    if (!element) return;

    const opt = {
      margin: 0,
      filename: `curriculo-${resume?.fullName || 'download'}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 }, 
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };
    (html2pdf() as any).set(opt).from(element).save();
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!resume) return <div className="text-center p-20">Currículo não encontrado (ID: {id}).</div>;

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-[210mm] mx-auto mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm no-print">
        <h1 className="text-slate-700 font-bold">Prévia do seu Currículo</h1>
        <button onClick={handleDownload} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
          <span>📥</span> Baixar PDF Grátis
        </button>
      </div>
      <div id="resume-pdf" className="mx-auto bg-white shadow-lg">
        <ModernEuropean data={resume} />
      </div>
    </div>
  );
}