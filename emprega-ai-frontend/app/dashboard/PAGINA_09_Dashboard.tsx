// emprega-ai-frontend/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FileText,
  Briefcase,
  TrendingUp,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  LogOut,
  Settings,
  Crown,
  Sparkles,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentStatus = searchParams?.get('payment');
  const [showSuccess, setShowSuccess] = useState(paymentStatus === 'success');

  useEffect(() => {
    // Esconder mensagem de sucesso após 5 segundos
    if (showSuccess) {
      const timeout = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [showSuccess]);

  // Dados mockados (em produção viriam da API)
  const stats = {
    cvGenerated: 5,
    jobsApplied: 12,
    interviewsScheduled: 3,
    cvViewsByRecruiters: 47,
  };

  const applications = [
    {
      id: 1,
      title: 'Desenvolvedor Full Stack',
      company: 'Microsoft Portugal',
      status: 'interview',
      sentAt: '2026-02-05',
      interviewDate: '2026-02-10',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'TAP Air Portugal',
      status: 'viewed',
      sentAt: '2026-02-04',
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'NOS Comunicações',
      status: 'sent',
      sentAt: '2026-02-03',
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      sent: 'bg-blue-100 text-blue-800',
      viewed: 'bg-yellow-100 text-yellow-800',
      interview: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };

    const labels = {
      sent: 'Enviado',
      viewed: 'Visualizado',
      interview: 'Entrevista',
      rejected: 'Rejeitado',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mensagem de Sucesso */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-bold">Parabéns! Agora você é Premium! 🎉</p>
              <p className="text-sm text-green-100">
                Em breve seu telefone começará a tocar
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 mx-auto w-full max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">EMPREGA.AI</h1>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Premium
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard/settings')}
                className="btn btn-ghost btn-sm gap-2"
              >
                <Settings className="w-4 h-4" />
                Configurações
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-sm gap-2 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo de volta! 👋
            </h2>
            <p className="text-gray-600">
              Veja o progresso das suas candidaturas e acompanhe novas
              oportunidades
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-600">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-bold text-gray-900">
                  {stats.cvGenerated}
                </span>
              </div>
              <p className="text-sm text-gray-600">CVs Gerados</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-600">
              <div className="flex items-center justify-between mb-4">
                <Briefcase className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-bold text-gray-900">
                  {stats.jobsApplied}
                </span>
              </div>
              <p className="text-sm text-gray-600">Candidaturas Enviadas</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-600">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
                <span className="text-3xl font-bold text-gray-900">
                  {stats.interviewsScheduled}
                </span>
              </div>
              <p className="text-sm text-gray-600">Entrevistas Agendadas</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-600">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
                <span className="text-3xl font-bold text-gray-900">
                  {stats.cvViewsByRecruiters}
                </span>
              </div>
              <p className="text-sm text-gray-600">Visualizações</p>
            </div>
          </div>

          {/* Próximas Entrevistas */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" />
              <h3 className="text-xl font-bold">Próximas Entrevistas</h3>
            </div>

            {applications
              .filter((app) => app.status === 'interview')
              .map((app) => (
                <div
                  key={app.id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{app.title}</p>
                      <p className="text-sm text-purple-100">{app.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(app.interviewDate!).toLocaleDateString('pt-PT', {
                          day: 'numeric',
                          month: 'long',
                        })}
                      </p>
                      <p className="text-xs text-purple-100">09:00</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Lista de Candidaturas */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Minhas Candidaturas
                </h3>
                <button className="text-sm text-blue-600 hover:underline">
                  Ver todas
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {app.title}
                      </h4>
                      <p className="text-sm text-gray-600">{app.company}</p>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Enviado em{' '}
                      {new Date(app.sentAt).toLocaleDateString('pt-PT')}
                    </div>
                    {app.interviewDate && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Calendar className="w-3 h-3" />
                        Entrevista em{' '}
                        {new Date(app.interviewDate).toLocaleDateString('pt-PT')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Já Consegui Emprego */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              Conseguiu o emprego? Parabéns! 🎉
            </h3>
            <p className="text-gray-600 mb-4">
              Quando conseguir seu emprego, clique aqui para a IA parar de
              enviar seus currículos
            </p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all">
              Já consegui meu emprego!
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
