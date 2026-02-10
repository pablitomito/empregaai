'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Laptop, 
  Building, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function ModeloPage() {
  const router = useRouter();
  
  // Estado para a Preferência Ideal (Pergunta 1)
  const [ideal, setIdeal] = useState<string | null>(null);
  
  // Estado para a Disponibilidade Real (Pergunta 2)
  const [disponibilidade, setDisponibilidade] = useState<string | null>(null);

  const modelos = [
    { id: 'presencial', title: 'Presencial', icon: Building },
    { id: 'hibrido', title: 'Híbrido', icon: MapPin },
    { id: 'remoto', title: 'Remoto', icon: Laptop },
  ];

  const opcionaisDisponibilidade = [
    { id: 'apenas_remoto', label: 'Apenas Remoto' },
    { id: 'hibrido_presencial', label: 'Híbrido ou Presencial' },
    { id: 'qualquer', label: 'Estou aberto a todas as opções' },
  ];

  const handleContinue = () => {
    if (!ideal || !disponibilidade) return;
    
    // Salvamos as duas métricas
    localStorage.setItem('emprega_ai_modelo_ideal', ideal);
    localStorage.setItem('emprega_ai_disponibilidade_real', disponibilidade);
    
    router.push('/onboarding/perfil');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full bg-gray-200 h-2">
        <div className="bg-[#2563EB] h-2 transition-all duration-700" style={{ width: '80%' }}></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full">
          
          <button 
            onClick={() => router.back()} 
            className="text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-2 text-[#2563EB] font-bold mb-8 text-sm bg-blue-50 w-fit px-4 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4" />
              Flexibilidade
            </div>

            {/* PERGUNTA 1: O DESEJO */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Qual seria o seu modelo de trabalho ideal?</h2>
              <p className="text-gray-500 text-center mb-6 text-sm">Onde você produz melhor?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {modelos.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setIdeal(item.id)}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3
                      ${ideal === item.id 
                        ? 'border-[#2563EB] bg-blue-50 shadow-md ring-2 ring-blue-100' 
                        : 'border-gray-100 bg-white hover:border-gray-300'
                      }
                    `}
                  >
                    <item.icon className={`w-8 h-8 ${ideal === item.id ? 'text-[#2563EB]' : 'text-gray-400'}`} />
                    <span className={`font-bold ${ideal === item.id ? 'text-[#2563EB]' : 'text-gray-700'}`}>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SEÇÃO ESTRATÉGICA: A DISPONIBILIDADE REAL */}
            {ideal && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="h-px bg-gray-100 w-full my-8"></div>
                
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3 mb-6">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <p className="text-xs text-amber-700 leading-relaxed">
                    <strong>Dica de Carreira:</strong> Vagas 100% remotas são muito concorridas. Estar aberto a outros modelos pode aumentar suas chances de contratação em até 5x.
                  </p>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-4">Caso seja necessário, você aceitaria trabalhar em outros modelos?</h2>
                
                <div className="grid grid-cols-1 gap-3">
                  {opcionaisDisponibilidade.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDisponibilidade(opt.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all
                        ${disponibilidade === opt.id 
                          ? 'border-gray-900 bg-gray-900 text-white' 
                          : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                        }
                      `}
                    >
                      <span className="font-medium">{opt.label}</span>
                      {disponibilidade === opt.id && <CheckCircle2 className="w-5 h-5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BOTÃO FINAL */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <button
                onClick={handleContinue}
                disabled={!ideal || !disponibilidade}
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                Continuar para o passo final
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}