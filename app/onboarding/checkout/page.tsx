"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, CreditCard, Download, Send, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CurriculoSucesso() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const createCheckout = trpc.subscription.createCheckout.useMutation({
    onSuccess: (data: { url: string | null }) => {
      if (data.url) {
        toast.info("A redirecionar para o checkout...");
        window.location.href = data.url;
      } else {
        toast.error("Erro: URL de checkout não encontrada.");
      }
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar checkout: ${error.message}`);
    },
  });

  const handleSubscribe = () => {
    createCheckout.mutate();
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Success Header */}
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

        {/* Actions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-blue-600" />
                Descarregar PDF
              </CardTitle>
              <CardDescription>
                Baixe seu currículo em formato profissional
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Seu currículo está pronto para ser enviado para qualquer empresa ou portal de emprego.
              </p>
              <Button className="w-full" variant="outline" onClick={() => toast.success("Download iniciado...")}>
                <Download className="mr-2 h-4 w-4" />
                Descarregar Agora
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-blue-100 bg-gradient-to-br from-blue-50/50 to-transparent shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Send className="h-5 w-5 text-blue-600" />
                  Distribuir Agora
                </CardTitle>
                <Badge className="bg-blue-600">Recomendado</Badge>
              </div>
              <CardDescription>
                Envie para 6 portais de emprego com um clique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Aumente suas chances distribuindo para Indeed, Talenter, Eurofirms e outros portais líderes.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-md" onClick={handleSubscribe} disabled={createCheckout.isPending}>
                {createCheckout.isPending ? "A processar..." : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Distribuir Agora
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Offer - O QUADRO QUE PEDISTE COM DEGRADÊ AZUL NA PONTA */}
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
              
              {/* Left side - Benefits (Sinais em AZUL) */}
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

              {/* Right side - Pricing Box (Como na imagem) */}
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

            {/* CTA Button Principal */}
            <Button
              size="lg"
              className="w-full text-lg h-14 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all font-bold"
              onClick={handleSubscribe}
              disabled={createCheckout.isPending}
            >
              {createCheckout.isPending ? "A processar..." : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
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

        {/* Portals Info */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Portais de Emprego Integrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Indeed Portugal", "Talenter", "Timing", "Eurofirms", "Net Empregos", "OLX Empregos"].map((portal) => (
                <div key={portal} className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">{portal}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center pb-12">
          <Button variant="ghost" onClick={() => router.push("/")} className="text-slate-500">
            Voltar à Página Inicial
          </Button>
        </div>
      </div>
    </div>
  );
}