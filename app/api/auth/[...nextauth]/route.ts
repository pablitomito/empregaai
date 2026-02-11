import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Resolve o erro "credentials is possibly undefined"
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

const handler = NextAuth(authOptions);

// Tipagem explícita para evitar erro de "implicitly has an any type"
function setCorsHeaders(response: Response): Response {
  response.headers.set("Access-Control-Allow-Origin", "https://empregaai.vercel.app");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function GET(req: Request) {
  const res = await handler(req);
  return setCorsHeaders(res);
}

export async function POST(req: Request) {
  const res = await handler(req);
  return setCorsHeaders(res);
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response);
}