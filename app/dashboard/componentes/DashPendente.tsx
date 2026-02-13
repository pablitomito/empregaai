'use client';

import { FileText, PlusCircle, Sparkles } from 'lucide-react';

export default function DashPendente() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Ícone Animado */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <Sparkles className="w-16 h-16 text-blue-600" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Bem-vindo ao Emprega.AI! 🚀
          </h1>
          <p className="text-xl text-gray-500 max-w-lg mx-auto">
            Ainda não tens um currículo criado. Vamos criar um perfil campeão em menos de 5 minutos?
          </p>
        </div>

        {/* Cartões de Ação */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <button 
            onClick={() => window.location.reload()} // Aqui tu podes mudar o status para 'completed' depois
            className="group bg-white p-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PlusCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900">Criar do Zero</h3>
            <p className="text-sm text-gray-500 mt-1">Preencha passo a passo com nossa IA.</p>
          </button>

          <button className="group bg-white p-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all text-left">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900">Importar PDF</h3>
            <p className="text-sm text-gray-500 mt-1">Nós extraímos os dados para si.</p>
          </button>
        </div>
      </div>
    </div>
  );
}