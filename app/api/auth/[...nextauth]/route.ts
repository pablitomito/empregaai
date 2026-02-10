import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Esta configuração garante que o NextAuth saiba onde estão suas páginas customizadas
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Após o login, manda o usuário para a página de Onboarding (que vamos criar)
      return `${baseUrl}/onboarding`;
    },
  },
});

export { handler as GET, handler as POST };