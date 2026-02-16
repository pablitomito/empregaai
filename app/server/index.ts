// server/index.ts
import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import dbConnect from '@/lib/mongodb';
import ResumeModel from '@/models/Curriculo';

const t = initTRPC.create();

const resumeRouter = t.router({
  create: t.procedure
    .input(z.any())
    .mutation(async ({ input }) => {
  try {
    await dbConnect();
    
    const userEmail = input.userEmail || input.email;

    // Em vez de 'create', usamos 'findOneAndUpdate'
    // Se existir o e-mail, ele atualiza. Se não existir, ele cria (upsert: true)
    const resultado = await ResumeModel.findOneAndUpdate(
      { userEmail: userEmail }, // Filtro: busca por este e-mail
      { $set: input },          // Dados: o que será salvo/atualizado
      { upsert: true, new: true, runValidators: true } 
    );

    console.log("✅ Dados processados para:", userEmail);
    return { success: true, id: resultado._id.toString() };

  } catch (error: any) {
    console.error("❌ ERRO NO MONGODB:", error.message);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: error.message,
    });
  }
}),
});

export const appRouter = t.router({
  resume: resumeRouter,
});

export type AppRouter = typeof appRouter;