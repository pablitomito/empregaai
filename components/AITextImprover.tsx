// components/AITextImprover.tsx
"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

type ContextType = "summary" | "responsibilities" | "cover_letter" | "objective";

interface AITextImproverProps {
  currentText: string;
  context: ContextType;
  onImprove: (improvedText: string) => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "default";
}

const CONTEXT_PROMPTS: Record<ContextType, string> = {
  summary: "Reescreva este resumo profissional de forma concisa e impactante, adequado para impressionar recrutadores de alto nível. Foque em competências-chave, anos de experiência e valor agregado único. Máximo 3 frases.",
  
  responsibilities: "Reescreva estas responsabilidades profissionais usando: 1) Verbos de ação fortes no início de cada frase, 2) Métricas e números concretos sempre que possível, 3) Resultados e impacto mensuráveis, 4) Conquistas específicas. Formato em bullet points.",
  
  cover_letter: "Reescreva esta carta de apresentação em formato formal português de Portugal, com tom profissional, persuasivo e entusiasta. Estrutura: parágrafo de abertura forte, corpo demonstrando adequação, encerramento com call-to-action. Máximo 300 palavras.",
  
  objective: "Reescreva este objetivo profissional em exatamente 1-2 frases curtas e impactantes. Deve comunicar claramente: área de atuação, nível de experiência e proposta de valor única. Tom profissional e confiante."
};

export function AITextImprover({ 
  currentText, 
  context, 
  onImprove, 
  disabled = false,
  className = "",
  size = "sm"
}: AITextImproverProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleImprove = async () => {
    // Validações
    if (!currentText?.trim()) {
      toast.error("Escreva algo primeiro para a IA melhorar");
      return;
    }

    if (currentText.trim().length < 10) {
      toast.error("Texto muito curto. Escreva pelo menos 10 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("Faça login para usar a IA");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/improve-text`,
        {
          text: currentText,
          context: context,
          prompt: CONTEXT_PROMPTS[context]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          timeout: 30000 // 30 segundos
        }
      );

      const improvedText = response.data.improvedText || response.data.data?.improvedText || response.data.text;

      if (!improvedText) {
        throw new Error("Resposta vazia da API");
      }

      onImprove(improvedText);
      toast.success("✨ Texto melhorado com IA!");

    } catch (error: any) {
      console.error("Erro ao melhorar texto:", error);
      
      if (error.code === 'ECONNABORTED') {
        toast.error("Tempo esgotado. Tente com um texto menor.");
      } else if (error.response?.status === 401) {
        toast.error("Sessão expirada. Faça login novamente.");
      } else if (error.response?.status === 403) {
        toast.error("⭐ Funcionalidade Premium. Faça upgrade para usar a IA.");
      } else if (error.response?.status === 429) {
        toast.error("Muitas requisições. Aguarde 1 minuto e tente novamente.");
      } else if (error.response?.status === 500) {
        toast.error("Erro no servidor. Tente novamente em alguns instantes.");
      } else {
        toast.error("Erro ao melhorar texto. Verifique sua conexão.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const buttonSize = size === "sm" ? "sm" : "default";

  return (
    <Button
      type="button"
      variant="outline"
      size={buttonSize}
      onClick={handleImprove}
      disabled={disabled || isLoading || !currentText?.trim()}
      className={`
        gap-2 border-purple-300 text-purple-700 hover:bg-purple-50
        hover:border-purple-400 transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3 h-3 animate-spin" />
          <span className="hidden sm:inline">Melhorando...</span>
        </>
      ) : (
        <>
          <Sparkles className="w-3 h-3" />
          <span className="hidden sm:inline">Melhorar com IA</span>
          <span className="sm:hidden">IA</span>
        </>
      )}
    </Button>
  );
}