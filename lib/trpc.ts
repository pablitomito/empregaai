import { createTRPCReact } from "@trpc/react-query";

// Criamos o trpc sem definir um router fixo (usando any)
// E forçamos o export a ser tratado como 'any' para aceitar .subscription
export const trpc = createTRPCReact<any>() as any;