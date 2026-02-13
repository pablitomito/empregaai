import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Curriculo from '@/models/Curriculo';

export async function POST(req: Request) {
  try {
    // 1. Conectar ao banco
    await dbConnect();

    // 2. Pegar os dados que vêm do formulário
    const body = await req.json();

    // 3. Extrair o email (ajustado para aceitar o que vem do seu front-end)
    // Tentamos pegar de 'email' (que é o que você envia) ou 'userEmail'
    const emailFinal = body.email || body.userEmail;

    if (!emailFinal) {
      return NextResponse.json(
        { error: 'O email do usuário é obrigatório' },
        { status: 400 }
      );
    }

    // 4. Salvar ou Atualizar (Upsert)
    // Usamos o emailFinal para a busca
    const cvAtualizado = await Curriculo.findOneAndUpdate(
      { userEmail: emailFinal }, 
      { 
        ...body, 
        userEmail: emailFinal, // Garante que o campo no banco seja preenchido
        updatedAt: new Date() 
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      message: 'Currículo salvo com sucesso!',
      data: cvAtualizado
    }, { status: 200 });

  } catch (error: any) {
    console.error('Erro ao salvar no MongoDB:', error);
    return NextResponse.json(
      { error: 'Erro interno ao salvar os dados' },
      { status: 500 }
    );
  }
}