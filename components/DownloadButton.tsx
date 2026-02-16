"use client";

import React from 'react';

// 1. Definimos a interface para o TypeScript saber o que o componente recebe
interface DownloadButtonProps {
  fileName: string;
}

export default function DownloadButton({ fileName }: DownloadButtonProps) {
  
  const handleDownload = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('resume-content');

    // 2. Check de segurança para o erro de 'null'
    if (!element) {
      alert("Erro: O conteúdo do currículo não foi encontrado.");
      return;
    }

    const opt = {
      margin: 0,
      filename: fileName, // Agora ele reconhece pois vem das props acima
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true 
      },
      jsPDF: { 
        unit: 'mm' as const, 
        format: 'a4' as const, 
        orientation: 'portrait' as const 
      }
    };

    // 3. 'as any' para evitar brigas de tipagem da biblioteca
    (html2pdf() as any).set(opt).from(element).save();
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl flex items-center gap-2 no-print"
    >
      <span>📥</span> Baixar PDF Premium
    </button>
  );
}