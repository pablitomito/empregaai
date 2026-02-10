'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  Frown, 
  Meh, 
  Smile,
  Info
} from 'lucide-react';

export default function ProfissaoPage() {
  const router = useRouter();
  
  // Estados para controlar o que o usuário digita
  const [goal, setGoal] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [extraInfo, setExtraInfo] = useState(''); // Motivo da saída ou Satisfação

  // Efeito para carregar a escolha da página anterior
  useEffect(() => {
    const savedGoal = localStorage.getItem('emprega_ai_goal');
    if (!savedGoal) {
      // Se o usuário tentar acessar essa página sem passar pela 1, volta pro início
      router.push('/onboarding/objetivo');
    } else {
      setGoal(savedGoal);
    }
  }, [router]);

  const handleContinue = () => {
    // Salva os dados desta etapa para usar na criação final do currículo pela IA
    localStorage.setItem('emprega_ai_last_job', jobTitle);
    localStorage.setItem('emprega_ai_extra_info', extraInfo);

    // Próxima parada: Escolha de Áreas
    router.push('/onboarding/areas');
  };

  // Se ainda não carregou o "goal", não mostra nada (evita erro visual)
  if (!goal) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Barra de Progresso - Agora em 40% */}
      <div className="w-full bg-gray-200 h-2">
        <div className="bg-[#2563EB] h-2 transition-all duration-700" style={{ width: '40%' }}></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          
          {/* Botão de Voltar */}
          <button 
            onClick={() => router.back()} 
            className="text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-2 text-[#2563EB] font-bold mb-8 text-sm bg-blue-50 w-fit px-4 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4" />
              Experiência Profissional
            </div>

            {/* --- FLUXO A: URGENTE (Quem está sem trabalho) --- */}
            {goal === 'urgent' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">Última experiência</h1>
                  <p className="text-gray-500">Qual foi o último cargo que exerceu em Portugal ou no estrangeiro?</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cargo / Função</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="text" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Ex: Operador de Logística, Rececionista..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#2563EB] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Motivo da saída (Opcional)</label>
                    <textarea 
                      value={extraInfo}
                      onChange={(e) => setExtraInfo(e.target.value)}
                      placeholder="Ex: Fim de contrato, encerramento de atividade, busca por novos desafios..."
                      className="w-full p-5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#2563EB] outline-none h-32 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* --- FLUXO B: MUDANÇA (Quem está trabalhando) --- */}
            {goal === 'change' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">Onde está agora?</h1>
                  <p className="text-gray-500">Diga-nos a sua função atual para que a IA planeie a sua evolução.</p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sua profissão atual</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="text" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Ex: Consultor Comercial, Gestor de Equipa..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#10B981] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">Como se sente no trabalho atual?</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { val: 'sad', icon: Frown, label: 'Infeliz' },
                        { val: 'neutral', icon: Meh, label: 'Indiferente' },
                        { val: 'happy', icon: Smile, label: 'Satisfeito' }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => setExtraInfo(opt.val)}
                          className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all
                            ${extraInfo === opt.val 
                              ? 'border-[#10B981] bg-green-50 text-[#10B981] scale-105 shadow-md' 
                              : 'border-gray-100 bg-white text-gray-400 hover:border-green-200'
                            }
                          `}
                        >
                          <opt.icon className="w-8 h-8" />
                          <span className="text-xs font-bold uppercase tracking-wider">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rodapé e Botão */}
            <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
              <button
                onClick={handleContinue}
                disabled={!jobTitle || (goal === 'change' && !extraInfo)}
                className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                Próximo Passo 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          <div className="mt-6 flex items-center gap-2 justify-center text-gray-400 text-sm italic">
            <Info className="w-4 h-4" />
            As suas respostas são usadas para personalizar as cartas de apresentação.
          </div>
        </div>
      </div>
    </div>
  );
}