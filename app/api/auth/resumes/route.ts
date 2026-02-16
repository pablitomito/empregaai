import dbConnect from "@/lib/mongodb";
import Curriculo from "@/models/Curriculo";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json(); // Pega os dados do formulário

    // LOG DE SEGURANÇA: Verifique no terminal se os dados aparecem aqui
    console.log("DADOS RECEBIDOS DO FRONTEND:", body);

    // Cria o documento garantindo que os nomes batam com o Schema
    const novoCurriculo = await Curriculo.create({
      fullName: body.fullName || body.nome, // Aceita as duas variações
      aboutMe: body.aboutMe,
      email: body.email,
      phone: body.phone,
      address: body.address,
      experiences: body.experiences || [],
      education: body.education || [],
      skills: body.skills || [],
      languages: body.languages || []
    });

    return NextResponse.json(novoCurriculo, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}