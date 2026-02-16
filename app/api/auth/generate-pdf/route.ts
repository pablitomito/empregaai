import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export async function GET(request: Request) {
  try {
    // 1. Pegar o ID que vem na URL (ex: ?id=67b0eb...)
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

    const isLocal = process.env.NODE_ENV === 'development';
    
    // 2. Lançar o navegador
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1280, height: 720 },
      executablePath: isLocal 
        ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" 
        : await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();

    // 3. Configurar densidade de pixels para nitidez (Scale 2)
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });

    const baseUrl = isLocal ? "http://localhost:3000" : "https://seu-dominio.vercel.app";
    
    // 4. USAR O ID REAL NO LINK (Usando crases e ${id})
    await page.goto(`${baseUrl}/preview/${id}`, {
      waitUntil: "networkidle0",
      timeout: 60000, // Aumentado para não dar erro de timeout fácil
    });
    
    // 5. Gerar o PDF
  // No seu arquivo de API (GET)
const pdfBuffer = await page.pdf({
  format: "A4",
  printBackground: true, // ESSENCIAL para a sidebar escura aparecer
  preferCSSPageSize: true,
  displayHeaderFooter: false,
  margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
  scale: 1 // Deixe em 1 aqui, o deviceScaleFactor já cuida da nitidez
});
    await browser.close();

    // 6. Retornar o arquivo
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=curriculo-${id}.pdf`,
      },
    });

  } catch (error: any) {
    console.error("Erro ao gerar PDF:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}