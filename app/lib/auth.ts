import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Correção para o erro "credentials is possibly undefined"
        if (!credentials?.email || !credentials?.password) return null;

        if (credentials.email === "admin@teste.com" && credentials.password === "123") {
          return { id: "1", name: "Admin", email: "admin@teste.com" };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" }
};