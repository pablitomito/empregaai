import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { trpc } from "@/lib/trpc"; // Aponta para o trpc que você mostrou na pasta lib

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/auth/trpc", // Ajustado para o caminho da sua pasta
    req,
    router: trpc as any, // Usamos o 'any' aqui para ignorar o erro de tipo por enquanto
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };