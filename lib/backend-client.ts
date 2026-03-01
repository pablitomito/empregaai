export async function requestCVGeneration(userData: any, userId: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  
  try {
    const response = await fetch(`${backendUrl}/api/cv/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userData, userId })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao chamar backend:', error);
    throw error;
  }
}