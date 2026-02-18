// frontend/src/lib/api/ai.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ============================================================================
// 1. Gerar Carta de Apresentação com IA
// ============================================================================
export async function generateCoverLetter(token: string, job: any) {
  try {
    const response = await axios.post(
      `${API_URL}/ai/generate-cover-letter`,
      { job },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data.coverLetter;
  } catch (error: any) {
    console.error("Erro ao gerar carta de apresentação:", error);
    throw new Error("Falha ao gerar carta de apresentação");
  }
}
