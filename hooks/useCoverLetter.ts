import axios from "axios";
import { useState } from "react";

export function useCoverLetter() {
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState("");

  async function generate(token: string, job: any) {
    setLoading(true);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/ai/generate-cover-letter`,
      { job },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setLetter(response.data.data.coverLetter);
    setLoading(false);
  }

  return { loading, letter, generate };
}
