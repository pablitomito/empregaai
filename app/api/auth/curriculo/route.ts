import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Curriculo from '@/models/Curriculo';

export async function POST(req: Request) {
  try {
    // 1. Conectar ao banco
    await dbConnect();

    // 2. Pegar os dados que vêm do formulário
    const body = await req.json();

    // 3. Extrair o email do usuário para saber de quem é o currículo
    // IMPORTANTE: No futuro, você pegará isso da sessão (auth)
    const { userEmail } = body;

    if (!userEmail) {
      return NextResponse.json(
        { error: 'O email do usuário é obrigatório' },
        { status: 400 }
      );
    }

    // 4. Salvar ou Atualizar (Upsert)
    // Se encontrar o email, atualiza. Se não encontrar, cria um novo.
    const cvAtualizado = await Curriculo.findOneAndUpdate(
      { userEmail: userEmail },
      { 
        ...body, 
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