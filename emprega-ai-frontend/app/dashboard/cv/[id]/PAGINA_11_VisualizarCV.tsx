// emprega-ai-frontend/app/dashboard/cv/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Download,
  Send,
  FileText,
  Eye,
  Edit,
  Trash2,
  Share2,
} from 'lucide-react';

export default function VisualizarCVPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  // Dados mockados do CV
  const cv = {
    id: params.id,
    jobTitle: 'Desenvolvedor Full Stack',
    company: 'Microsoft Portugal',
    createdAt: '2026-02-05',
    template: 'modern',
    pdfUrl: '/cvs/cv-1.pdf',
    status: 'sent',
    stats: {
      views: 12,
      downloads: 3,
    },
  };

  const handleDownload = () => {
    alert('Download do CV iniciado!');
  };

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este CV?')) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 mx-auto w-full max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{cv.jobTitle}</h1>
                <p className="text-sm text-gray-600">{cv.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="btn btn-primary btn-sm gap-2"
              >
                <Download className="w-4 h-4" />
                Baixar PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Preview do CV */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Toolbar */}
              <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  Template: <span className="font-semibold">Modern Professional</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-ghost btn-xs gap-1">
                    <Eye className="w-3 h-3" />
                    {cv.stats.views}
                  </button>
                  <button className="btn btn-ghost btn-xs gap-1">
                    <Download className="w-3 h-3" />
                    {cv.stats.downloads}
                  </button>
                </div>
              </div>

              {/* CV Preview (Simulado) */}
              <div className="p-8 min-h-[800px] bg-white">
                <div className="max-w-2xl mx-auto">
                  {/* Header do CV */}
                  <div className="border-b-4 border-blue-600 pb-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      João Silva
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                      Desenvolvedor Full Stack | React & Node.js
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>📧 joao.silva@email.com</span>
                      <span>📱 +351 912 345 678</span>
                      <span>📍 Lisboa, Portugal</span>
                    </div>
                  </div>

                  {/* Resumo Profissional */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
                      Resumo Profissional
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Desenvolvedor Full Stack com 5+ anos de experiência em React,
                      Node.js e TypeScript. Especializado em criar aplicações web
                      escaláveis e performáticas. Paixão por resolver problemas
                      complexos e entregar soluções de alta qualidade.
                    </p>
                  </div>

                  {/* Experiência */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
                      Experiência Profissional
                    </h2>

                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            Desenvolvedor Sênior
                          </h3>
                          <p className="text-gray-600">Tech Solutions Lda</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          2021 - Atual
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>
                          Desenvolveu aplicações React escaláveis para +100k usuários
                        </li>
                        <li>
                          Implementou APIs REST com Node.js e Express
                        </li>
                        <li>Liderou equipe de 4 desenvolvedores</li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            Desenvolvedor Full Stack
                          </h3>
                          <p className="text-gray-600">StartupXYZ</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          2019 - 2021
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>Criou features para plataforma SaaS B2B</li>
                        <li>Otimizou performance em 40%</li>
                      </ul>
                    </div>
                  </div>

                  {/* Habilidades */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
                      Habilidades
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'React',
                        'Node.js',
                        'TypeScript',
                        'Next.js',
                        'MongoDB',
                        'PostgreSQL',
                        'AWS',
                        'Docker',
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Formação */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
                      Formação Acadêmica
                    </h2>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Engenharia Informática
                      </h3>
                      <p className="text-gray-600">
                        Universidade de Lisboa • 2015 - 2019
                      </p>
                    </div>
                  </div>

                  {/* Idiomas */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
                      Idiomas
                    </h2>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-semibold">Português:</span> Nativo
                      </div>
                      <div>
                        <span className="font-semibold">Inglês:</span> Fluente
                      </div>
                      <div>
                        <span className="font-semibold">Espanhol:</span>{' '}
                        Intermediário
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Ações e Info */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Status do CV</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Criado em</span>
                  <span className="font-semibold">
                    {new Date(cv.createdAt).toLocaleDateString('pt-PT')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                    Enviado
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Visualizações</span>
                  <span className="font-semibold">{cv.stats.views}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Downloads</span>
                  <span className="font-semibold">{cv.stats.downloads}</span>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Ações</h3>

              <div className="space-y-2">
                <button
                  onClick={handleDownload}
                  className="w-full btn btn-primary gap-2"
                >
                  <Download className="w-4 h-4" />
                  Baixar PDF
                </button>

                <button className="w-full btn btn-outline gap-2">
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </button>

                <button className="w-full btn btn-outline gap-2">
                  <Edit className="w-4 h-4" />
                  Editar Perfil
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full btn btn-outline btn-error gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir CV
                </button>
              </div>
            </div>

            {/* Dica */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                💡 <strong>Dica:</strong> CVs otimizados pela IA têm 3x mais
                chances de serem visualizados por recrutadores!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
