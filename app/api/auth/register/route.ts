import { NextResponse } from "next/server";

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "https://empregaai.vercel.app");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(
      { message: "Sucesso!", data: body },
      { 
        status: 201,
        headers: { 
          "Access-Control-Allow-Origin": "https://empregaai.vercel.app",
          "Access-Control-Allow-Credentials": "true"
        }
      }
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}