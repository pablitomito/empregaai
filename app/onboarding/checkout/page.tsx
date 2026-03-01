"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { CheckCircle2, CreditCard, Download, Send, Sparkles,  } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Quote, Star, CheckCircle, TrendingUp, Clock, Users } from 'lucide-react';


export default function CheckoutPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const createCheckout = async (priceId: string) => {
  try {
    const res = await fetch("../config/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error(err);
  }
};

  const handleDistribute = () => {
    createCheckout(process.env.STRIPE_PRICE_DISTRIBUIR!);
  };

  const handleDownload = () => {
    createCheckout(process.env.STRIPE_PRICE_PDF!);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-5xl mx-auto px-4 space-y-16">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
              <CheckCircle2 className="h-20 w-20 text-green-600 relative" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Currículo Criado com Sucesso!</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Parabéns! Seu currículo está pronto e profissional. Agora você pode descarregá-lo ou distribuir para os principais portais de emprego.
          </p>
        </div>

        {/* OPÇÕES */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* DISTRIBUIR */}
          <Card className="border-2 border-blue-100 shadow-xl bg-gradient-to-br from-blue-50/60 to-transparent">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Send className="h-5 w-5 text-blue-600" />
                  Distribuir Agora
                </CardTitle>
                <Badge className="bg-blue-600 text-white">Mais vendido</Badge>
              </div>
              <CardDescription>
                Envio automático para 6 portais de emprego
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Ideal para quem quer máxima exposição e mais entrevistas.
              </p>

              <Button
                size="lg"
                className="w-full bg-blue-600 border-blue-900 text-white hover:border-blue-900
                     shadow-lg shadow-blue-500 hover:shadow-xl hover:shadow-blue-900
                     transition-all duration-300"
                onClick={() =>
                  document.getElementById("section-distribute")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver detalhes
              </Button>
            </CardContent>
          </Card>

          {/* BAIXAR */}
          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-slate-800" />
                Apenas Baixar PDF
              </CardTitle>
              <CardDescription>
                Download imediato do currículo
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Perfeito se quiser enviar manualmente.
              </p>

              <Button
                variant="outline"
                size="lg"
                className="w-full bg-white border-blue-300 text-slate-800 hover:border-blue-400
                     shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 
                     transition-all duration-300"
                onClick={() =>
                  document.getElementById("section-download")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver detalhes 
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* SEÇÃO DISTRIBUIÇÃO */}
        <Card className="border-2 border-blue-100 shadow-xl overflow-hidden bg-white bg-gradient-to-br from-blue-100/60 via-white to-white">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-semibold mx-auto shadow-sm">
              <Sparkles className="h-4 w-4" />
              Oferta Especial
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">
              Distribua Seu Currículo Automaticamente
            </CardTitle>
            <CardDescription className="text-lg font-medium text-slate-600">
              Por apenas <span className="text-blue-600 font-bold">€2,99</span> por mês
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-lg">O que você recebe:</h3>
                <div className="space-y-3">
                  {[
                    "Distribuição automática para 6 portais",
                    "Matching inteligente com IA",
                    "Notificações em tempo real",
                    "Estatísticas detalhadas",
                    "Histórico completo",
                    "Suporte prioritário",
                    "Cancele quando quiser"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                      <span className="text-slate-700 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-lg text-center md:text-left">Plano Mensal</h3>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 shadow-inner space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Preço mensal</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">€2,99</span>
                      <span className="text-slate-500 font-medium">/mês</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 pt-4 space-y-2">
                    <p className="text-xs text-slate-600 font-medium flex items-center gap-2">✓ Sem cartão de crédito agora</p>
                    <p className="text-xs text-slate-600 font-medium flex items-center gap-2">✓ Cancele a qualquer momento</p>
                    <p className="text-xs text-slate-600 font-medium flex items-center gap-2">✓ Sem compromissos</p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full text-lg h-14 text-white bg-blue-600 border-blue-300 hover:border-blue-400
                     shadow-lg shadow-blue-500
                     transition-all duration-300"
              onClick={() => createCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_DISTRIBUIR!)}
              disabled={isPending}
            >
              {isPending ? "A processar..." : (
                <>
                  <CreditCard className="mr-2 h-5 w-5 text-white" />
                  Subscrever Agora
                </>
              )}
            </Button>

            <Alert className="bg-white border-slate-200">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-slate-500 text-xs font-medium">
                Pagamento seguro processado pelo Stripe. Seus dados estão protegidos.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* SEÇÃO DOWNLOAD */}
        <Card id="section-download" className="border shadow-lg scroll-mt-24">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">
              Download em PDF
            </CardTitle>
            <CardDescription>
              Baixe agora seu currículo profissional
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <ul className="space-y-3">
              {[
                "Layout profissional",
                "Formato PDF pronto para envio",
                "Compatível com ATS",
                "Download imediato",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-700 shrink-0" />
                  <span className="font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              variant="outline"
              className="w-full h-14 font-bold text-lg bg-white border-blue-300 text-slate-800 hover:border-blue-400
                     shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 
                     transition-all duration-300"
              onClick={() => createCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_PDF!)}
              disabled={isPending}
            >
              {isPending ? "A processar..." : "Baixar agora — €1,99"}
            </Button>
          </CardContent>
        </Card>

        {/* DEPOIMENTOS */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-4">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">
                  +10.842 profissionais contratados
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Eles pagaram €2,99.{' '}
                <span className="text-blue-600">Foram contratados.</span>
              </h2>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Histórias reais de pessoas que transformaram a procura de emprego em resultados concretos
              </p>
            </div>

            {/* Grid de Depoimentos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
              {[
                {
                  name: "Ricardo Silva",
                  city: "Lisboa",
                  role: "Analista de Sistemas",
                  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop",
                  text: "Em 3 dias recebi 2 chamadas para entrevista. Antes enviava manualmente e nada acontecia. Valeu cada cêntimo.",
                  result: "3 dias → 2 entrevistas"
                },
                {
                  name: "Ana Costa",
                  city: "Porto",
                  role: "Gestora Comercial",
                  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop",
                  text: "Passei 6 meses a enviar CVs sem resposta. Com o EmpregaAI foram 5 entrevistas na primeira semana. Inacreditável.",
                  result: "0 → 5 entrevistas em 7 dias"
                },
                {
                  name: "Miguel Santos",
                  city: "Braga",
                  role: "Desenvolvedor Front-end",
                  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop",
                  text: "Paguei €2,99 e poupei horas. O CV foi distribuído automaticamente. Resultado: contratado pela Farfetch em 2 semanas.",
                  result: "Contratado em 14 dias"
                },
                {
                  name: "Sofia Pereira",
                  city: "Coimbra",
                  role: "Marketing Digital",
                  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop",
                  text: "Super fácil de usar. Em 10 minutos estava tudo pronto e a correr. Não precisei de fazer mais nada, só esperar as chamadas.",
                  result: "10 minutos → automatizado"
                },
                {
                  name: "João Martins",
                  city: "Faro",
                  role: "Gestor de Projetos",
                  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop",
                  text: "Antes: 50 CVs manuais por semana, 0 respostas. Depois: deixei o sistema trabalhar, 4 propostas em 10 dias. Mudou tudo.",
                  result: "De 0 para 4 propostas"
                },
                {
                  name: "Catarina Lopes",
                  city: "Aveiro",
                  role: "Contabilista",
                  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop",
                  text: "Por menos de 3€ consegui o que não consegui em meses. A diferença é brutal. Hoje trabalho no banco que sempre quis.",
                  result: "Emprego dos sonhos"
                },
                {
                  name: "Pedro Oliveira",
                  city: "Setúbal",
                  role: "Técnico de Qualidade",
                  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop",
                  text: "Não acreditei no início, mas funciona mesmo. Enviei para 50+ portais sem mexer um dedo. Recebi 3 entrevistas em 5 dias.",
                  result: "50+ portais automaticamente"
                },
                {
                  name: "Inês Rodrigues",
                  city: "Viseu",
                  role: "Assistente Administrativa",
                  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop",
                  text: "Melhor que pagar €50 por um CV premium que fica numa gaveta. Aqui o meu CV vai para todo o lado e funciona de verdade.",
                  result: "Melhor investimento"
                }
              ].map((testimonial, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Header do Card */}
                  <div className="flex items-start gap-3 mb-4">
                    {/* Avatar com Iniciais */}
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-gray-400">
                        {testimonial.city}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Texto */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                    "{testimonial.text}"
                  </p>

                  {/* Badge de Resultado */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg text-xs font-semibold text-blue-700 w-fit">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {testimonial.result}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Bar */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900">93%</div>
                    <div className="text-sm text-gray-600">Taxa de sucesso</div>
                  </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-gray-200"></div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900">7 dias</div>
                    <div className="text-sm text-gray-600">Até 1ª entrevista</div>
                  </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-gray-200"></div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900">+10.842</div>
                    <div className="text-sm text-gray-600">Contratados</div>
                  </div>
                </div>

              </div>
            </div>

            {/* CTA de Confiança */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                <span className="inline-flex items-center gap-1.5 font-semibold text-blue-600">
                  <CheckCircle className="w-4 h-4" />
                  Garantia de 30 dias
                </span>
                {' '}• Se não funcionar, devolvemos o seu dinheiro
              </p>
            </div>

          </div>
        </section>

        <div className="text-center">
          <Button variant="ghost" onClick={() => router.push("/")}>
            Voltar para página inicial
          </Button>
        </div>

      </div>
    </div>
  );
}