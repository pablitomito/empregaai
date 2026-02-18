"use client";

import { useCoverLetter } from "@/hooks/useCoverLetter";

export default function CoverLetterPage() {
  const { loading, letter, generate } = useCoverLetter();

  async function handleGenerate() {
    const token = localStorage.getItem("token");

    await generate(token!, {
      title: "Assistente Administrativo",
      company: "Empresa XPTO",
      description: "Responsável por atendimento, organização e suporte administrativo."
    });
  }

  return (
    <div className="p-6">
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Gerando..." : "Gerar Carta"}
      </button>

      {letter && (
        <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
          {letter}
        </pre>
      )}
    </div>
  );
}
