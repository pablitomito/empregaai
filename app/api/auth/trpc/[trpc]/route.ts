import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
// ❌ REMOVA ESSA LINHA: import { trpc } from "@/lib/trpc"; 

// ✅ ADICIONE O SEU ROUTER DO SERVIDOR (o caminho depende de onde você criou ele)
import { appRouter } from "@/app/server/index"; // <--- Ajuste para o seu caminho real

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/auth/trpc",
    req,
    router: appRouter, // <--- Aqui TEM que ser o router do servidor
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };