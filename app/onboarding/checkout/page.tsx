"use client";

import { useState, useEffect } from "react"; // Adicionado useEffect e useState
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
  
  // ESTA É A CHAVE PARA O BUILD PASSAR:
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

  // Se estiver no servidor (durante o build), não renderiza nada que use tRPC
  if (!isMounted) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
              <CheckCircle2 className="h-20 w-20 text-green-600 relative" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">Currículo Criado com Sucesso!</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Parabéns! Seu currículo está pronto e profissional. Agora você pode descarregá-lo ou distribuir para os principais portais de emprego.
          </p>
        </div>

        {/* Actions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Download Card */}
          <Card className="border-2">
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

          {/* Distribution Card */}
          <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Distribuir Automaticamente
                </CardTitle>
                <Badge className="bg-primary">Recomendado</Badge>
              </div>
              <CardDescription>
                Envie para 6 portais de emprego com um clique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Aumente suas chances de encontrar o emprego ideal distribuindo para Indeed, Talenter, Timing, Eurofirms, Net Empregos e OLX.
              </p>
              <Button className="w-full" onClick={handleSubscribe} disabled={createCheckout.isPending}>
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

        {/* Subscription Offer */}
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mx-auto">
              <Sparkles className="h-4 w-4" />
              Oferta Especial
            </div>
            <CardTitle className="text-2xl">Distribua Seu Currículo Automaticamente</CardTitle>
            <CardDescription className="text-base">
              Por apenas €2,99 por mês
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left side - Benefits */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">O que você recebe:</h3>
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
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Pricing */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Plano Mensal</h3>
                <div className="bg-card rounded-lg p-6 border border-border space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Preço mensal</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">€2,99</span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <p className="text-xs text-muted-foreground">✓ Sem cartão de crédito agora</p>
                    <p className="text-xs text-muted-foreground">✓ Cancele a qualquer momento</p>
                    <p className="text-xs text-muted-foreground">✓ Sem compromissos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="w-full text-lg h-12"
              onClick={handleSubscribe}
              disabled={createCheckout.isPending}
            >
              {createCheckout.isPending ? (
                "A processar..."
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Subscrever Agora
                </>
              )}
            </Button>

            {/* Trust Badges */}
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Pagamento seguro processado pelo Stripe. Seus dados estão protegidos.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Portals Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Portais de Emprego Integrados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Seu currículo será distribuído automaticamente para:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Indeed Portugal",
                "Talenter",
                "Timing",
                "Eurofirms",
                "Net Empregos",
                "OLX Empregos"
              ].map((portal) => (
                <div key={portal} className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">{portal}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Ainda tem dúvidas? Veja como funciona a distribuição automática
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" onClick={() => router.push("/")}>
              Voltar à Página Inicial
            </Button>
            <Button onClick={handleSubscribe} disabled={createCheckout.isPending}>
              Subscrever e Distribuir
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}