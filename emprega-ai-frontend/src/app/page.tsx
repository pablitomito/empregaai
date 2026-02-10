'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Cansado de enviar currículos em Portugal e não receber{' '}
            <span className="text-blue-600">nenhuma ligação?</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Eu sei, é chato e cansativo, mas não desanime, nós somos a sua solução!
          </p>
          
          <Link 
            href="/cadastro"
            className="inline-block bg-blue-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-xl"
          >
            Conseguir o meu emprego agora 🚀
          </Link>
        </div>
      </div>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            A nossa IA cria currículos perfeitos
          </h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            Temos capacidade de gerar até <strong>50 currículos por dia</strong> e 
            enviar para diversas vagas em simultâneo.
          </p>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Taxa de 92% de empregabilidade
          </h2>
          <p className="text-xl">
            Usuários conseguiram emprego nos primeiros 3 dias!
          </p>
        </div>
      </section>
    </main>
  );
}