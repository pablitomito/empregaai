"use client";

import React, { useState, useRef } from 'react';

export default function CurriculoPage() {
  // Estados para gerenciar listas dinâmicas
  const [experiences, setExperiences] = useState([{ id: 1 }]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Função para adicionar experiência
  const addExperience = () => {
    setExperiences([...experiences, { id: Date.now() }]);
  };

  // Função para remover experiência
  const removeExperience = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  // Função para adicionar skill
  const addSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4">
      {/* Estilos CSS embutidos para manter seu design original */}
      <style jsx>{`
        .container-cv {
          max-width: 850px;
          margin: 0 auto;
          background: white;
          border-radius: 24px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: white;
          padding: 60px 40px;
          text-align: center;
        }
        .section-header {
          margin-bottom: 24px;
          border-left: 4px solid #2563eb;
          padding-left: 16px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        input, textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 15px;
          background: #fff;
        }
        .btn-add {
          background: white;
          border: 1px solid #2563eb;
          color: #2563eb;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: 0.2s;
        }
        .btn-add:hover { background: #2563eb; color: white; }
        .tag {
          background: #e0e7ff;
          color: #4338ca;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="container-cv">
        {/* HERO */}
        <div className="hero">
          <h1 className="text-4xl font-extrabold mb-4">Criação de Currículo Profissional com IA</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Preencha os campos abaixo e deixe a nossa inteligência artificial cuidar da formatação e das palavras-chave.
          </p>
        </div>

        <div className="p-10">
          {/* IMPORT SECTION */}
          <div 
            className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center mb-10 cursor-pointer hover:bg-blue-100 transition-all"
            onClick={() => document.getElementById('pdfUpload')?.click()}
          >
            <svg className="w-12 h-12 mx-auto mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <h3 className="text-lg font-bold">Importar Currículo Existente (PDF)</h3>
            <p className="text-sm text-gray-500">A nossa IA preencherá os campos automaticamente para você.</p>
            <input type="file" id="pdfUpload" className="hidden" />
          </div>

          <form>
            {/* DADOS PESSOAIS */}
            <div className="mb-12">
              <div className="section-header">
                <h2 className="text-xl font-bold text-slate-900">Dados Pessoais & Identidade</h2>
                <p className="text-sm text-gray-500">Informações básicas de contacto e perfil.</p>
              </div>

              <div className="flex items-center gap-5 mb-8 bg-slate-100 p-5 rounded-2xl">
                <div className="w-[90px] h-[90px] bg-slate-300 rounded-xl flex items-center justify-center border-2 border-white overflow-hidden">
                  <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <button 
                  type="button" 
                  className="btn-add"
                  onClick={() => photoInputRef.current?.click()}
                >
                  Carregar Foto
                </button>
                <input type="file" ref={photoInputRef} accept="image/*" className="hidden" />
              </div>

              <div className="form-row">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Nome Completo</label>
                  <input type="text" placeholder="Ex: João Silva" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Profissional</label>
                  <input type="email" placeholder="joao@email.com" />
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Telemóvel</label>
                  <input type="tel" placeholder="+351 9xx xxx xxx" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Localização</label>
                  <input type="text" placeholder="Lisboa, Portugal" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Resumo de Impacto</label>
                <textarea className="h-32" placeholder="Ex: Especialista em Marketing com foco em ROI..."></textarea>
              </div>
            </div>

            {/* JORNADA PROFISSIONAL */}
            <div className="mb-12">
              <div className="section-header">
                <h2 className="text-xl font-bold text-slate-900">Jornada Profissional</h2>
                <p className="text-sm text-gray-500">Suas conquistas e experiências mais relevantes.</p>
              </div>
              
              <div id="experienceList">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border border-slate-200 rounded-xl p-5 mb-4 relative bg-white">
                    <div className="form-row">
                      <div><label className="block text-xs font-bold mb-1">Cargo</label><input type="text" /></div>
                      <div><label className="block text-xs font-bold mb-1">Empresa</label><input type="text" /></div>
                    </div>
                    <textarea placeholder="Principais conquistas..." className="h-24 mt-2"></textarea>
                    <button 
                      type="button" 
                      className="text-red-500 text-xs mt-3 font-medium hover:underline"
                      onClick={() => removeExperience(exp.id)}
                    >
                      Remover Experiência
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className="btn-add" onClick={addExperience}>
                + Adicionar Experiência
              </button>
            </div>

            {/* SKILLS */}
            <div className="mb-12">
              <div className="section-header">
                <h2 className="text-xl font-bold text-slate-900">Superpoderes (Skills)</h2>
                <p className="text-sm text-gray-500">Palavras-chave que os recrutadores procuram.</p>
              </div>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Ex: Gestão de Projetos, Python..." 
                />
                <button type="button" className="btn-add" onClick={addSkill}>Adicionar</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, index) => (
                  <div key={index} className="tag">
                    {skill}
                    <span 
                      className="cursor-pointer hover:text-red-500" 
                      onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                    >
                      ×
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* FOOTER CTA */}
        <div className="p-10 text-center border-t border-slate-200">
          <button 
            className="w-full max-w-md bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1"
            onClick={() => alert('IA Processando Dados...')}
          >
            GERAR MEU CURRÍCULO AGORA
          </button>
          <p className="text-xs text-gray-400 mt-4">Design otimizado para sistemas de triagem ATS.</p>
        </div>
      </div>
    </div>
  );
}