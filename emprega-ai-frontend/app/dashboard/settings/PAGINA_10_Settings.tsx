// emprega-ai-frontend/app/dashboard/settings/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  User,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Save,
  Crown,
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+351 912 345 678',
    location: 'Lisboa, Portugal',
  });

  const [notifications, setNotifications] = useState({
    emailNewJobs: true,
    emailApplications: true,
    emailInterviews: true,
    smsImportant: false,
  });

  const handleSave = () => {
    alert('Configurações salvas com sucesso!');
  };

  const handleCancelSubscription = () => {
    if (
      confirm(
        'Tem certeza que deseja cancelar sua assinatura? Você perderá todos os benefícios Premium.'
      )
    ) {
      alert('Assinatura cancelada. Você terá acesso até o fim do período atual.');
      router.push('/dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 mx-auto w-full max-w-5xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="space-y-6">
          {/* Dados Pessoais */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Dados Pessoais</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Para alterar seu email, entre em contato com o suporte
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localização
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Salvar Alterações
              </button>
            </div>
          </section>

          {/* Notificações */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Notificações</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    Novas vagas por email
                  </p>
                  <p className="text-sm text-gray-500">
                    Receba alertas quando encontrarmos vagas para você
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={notifications.emailNewJobs}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      emailNewJobs: e.target.checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    Status das candidaturas
                  </p>
                  <p className="text-sm text-gray-500">
                    Notificações quando empresas visualizam seu CV
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={notifications.emailApplications}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      emailApplications: e.target.checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    Lembretes de entrevistas
                  </p>
                  <p className="text-sm text-gray-500">
                    Receba lembretes 24h antes das entrevistas
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={notifications.emailInterviews}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      emailInterviews: e.target.checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    SMS para eventos importantes
                  </p>
                  <p className="text-sm text-gray-500">
                    Entrevistas agendadas e ofertas de emprego
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={notifications.smsImportant}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      smsImportant: e.target.checked,
                    })
                  }
                />
              </div>
            </div>
          </section>

          {/* Assinatura */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Assinatura Premium
              </h2>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Plano Atual</p>
                  <p className="text-2xl font-bold text-gray-900">
                    Premium €3,99/mês
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Próxima cobrança</p>
                  <p className="font-semibold text-gray-900">08 Mar 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 px-4 py-2 rounded-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Assinatura ativa
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/dashboard/subscription')}
                className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Gerenciar Pagamento
              </button>

              <button
                onClick={handleCancelSubscription}
                className="w-full border-2 border-red-300 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-all"
              >
                Cancelar Assinatura
              </button>
            </div>
          </section>

          {/* Segurança */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Segurança e Privacidade
              </h2>
            </div>

            <div className="space-y-3">
              <button className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all text-left">
                Alterar Senha
              </button>

              <button className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all text-left">
                Configurações de Privacidade
              </button>

              <button className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all text-left">
                Baixar Meus Dados
              </button>
            </div>
          </section>

          {/* Ajuda */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Ajuda e Suporte</h2>
            </div>

            <div className="space-y-3">
              <button className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all text-left">
                Central de Ajuda
              </button>

              <button className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all text-left">
                Falar com Suporte
              </button>

              <button className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all text-left">
                Termos de Uso
              </button>
            </div>
          </section>

          {/* Logout */}
          <section>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white px-6 py-4 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sair da Conta
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
