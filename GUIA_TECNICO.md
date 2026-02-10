# 🔧 GUIA TÉCNICO COMPLETO - EMPREGA.AI

## 📋 RESPOSTAS PARA SUAS DÚVIDAS

---

## 1️⃣ CONEXÃO COM PLATAFORMAS DE EMPREGO EM PORTUGAL

### 🎯 Plataformas Principais em Portugal:

1. **Net-Empregos** (www.net-empregos.com)
2. **Indeed Portugal** (pt.indeed.com)
3. **LinkedIn Jobs**
4. **SAPO Emprego** (emprego.sapo.pt)
5. **Expresso Emprego**
6. **OLX Emprego**
7. **Randstad**
8. **Adecco**

### 🔌 MÉTODOS DE INTEGRAÇÃO:

#### **Opção 1: APIs Oficiais (RECOMENDADO)**

**LinkedIn Jobs API:**
```javascript
// Requer LinkedIn Partner Program
// https://developer.linkedin.com/

const getLinkedInJobs = async (keywords, location) => {
  const response = await axios.get('https://api.linkedin.com/v2/jobs', {
    headers: {
      'Authorization': `Bearer ${LINKEDIN_API_KEY}`,
    },
    params: {
      keywords,
      location,
      count: 50
    }
  });
  return response.data;
};
```

**Indeed API:**
```javascript
// Indeed Publisher API
// https://opensource.indeedeng.io/api-documentation/

const getIndeedJobs = async (query, location) => {
  const response = await axios.get('http://api.indeed.com/ads/apisearch', {
    params: {
      publisher: process.env.INDEED_PUBLISHER_ID,
      q: query,
      l: location,
      co: 'pt', // Portugal
      format: 'json',
      v: '2'
    }
  });
  return response.data.results;
};
```

#### **Opção 2: Web Scraping (Para plataformas sem API)**

**Usando Puppeteer:**
```javascript
import puppeteer from 'puppeteer';

const scrapeNetEmpregos = async (keyword) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto(`https://www.net-empregos.com/pesquisa/?q=${keyword}`);
  
  const jobs = await page.evaluate(() => {
    const jobCards = document.querySelectorAll('.job-card');
    return Array.from(jobCards).map(card => ({
      title: card.querySelector('.job-title')?.textContent,
      company: card.querySelector('.company-name')?.textContent,
      location: card.querySelector('.location')?.textContent,
      link: card.querySelector('a')?.href,
      description: card.querySelector('.description')?.textContent,
    }));
  });
  
  await browser.close();
  return jobs;
};
```

**⚠️ IMPORTANTE - Respeitar robots.txt e termos de serviço!**

#### **Opção 3: RSS Feeds (Simples e Legal)**

Muitas plataformas oferecem feeds RSS:
```javascript
import Parser from 'rss-parser';

const parser = new Parser();

const getJobsFromRSS = async (feedUrl) => {
  const feed = await parser.parseURL(feedUrl);
  return feed.items.map(item => ({
    title: item.title,
    link: item.link,
    description: item.contentSnippet,
    pubDate: item.pubDate,
  }));
};

// Exemplo:
const jobs = await getJobsFromRSS('https://www.net-empregos.com/rss/jobs');
```

### 📦 RECOMENDAÇÃO FINAL:

**Estratégia Híbrida:**
1. **LinkedIn + Indeed** → APIs oficiais (vagas de qualidade)
2. **Net-Empregos + SAPO** → Web Scraping (vagas locais PT)
3. **Cron Job** → Rodar scraping 2x por dia
4. **Cache** → Salvar vagas no MongoDB por 7 dias

---

## 2️⃣ PLATAFORMA DE EMAIL

### ✉️ MELHORES OPÇÕES:

#### **Opção 1: SendGrid (RECOMENDADO) ⭐**

**Por quê?**
- ✅ 100 emails GRÁTIS por dia (suficiente para MVP)
- ✅ API simples e confiável
- ✅ Alta taxa de entrega
- ✅ Templates HTML
- ✅ Tracking de opens/clicks

**Configuração:**
```bash
npm install @sendgrid/mail
```

```javascript
// src/services/emailService.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendWelcomeEmail = async (to: string, name: string) => {
  const msg = {
    to,
    from: 'noreply@emprega.ai',
    subject: 'Bem-vindo ao EMPREGA.AI! 🎉',
    html: `
      <h1>Olá ${name}!</h1>
      <p>A sua jornada para o emprego dos sonhos começa agora!</p>
    `,
  };
  
  await sgMail.send(msg);
};

export const sendCVReadyEmail = async (to: string, cvUrl: string) => {
  const msg = {
    to,
    from: 'noreply@emprega.ai',
    subject: 'Seu currículo está pronto! 📄',
    html: `
      <h2>Currículo Gerado com Sucesso!</h2>
      <p>Baixe seu currículo aqui: <a href="${cvUrl}">Download CV</a></p>
    `,
  };
  
  await sgMail.send(msg);
};

export const sendJobApplicationEmail = async (
  recruiterEmail: string,
  candidateName: string,
  cvUrl: string,
  coverLetter: string
) => {
  const msg = {
    to: recruiterEmail,
    from: 'candidaturas@emprega.ai',
    replyTo: candidate.email,
    subject: `Candidatura: ${candidateName}`,
    html: `
      <p>${coverLetter}</p>
      <p>Currículo em anexo.</p>
    `,
    attachments: [
      {
        filename: 'curriculo.pdf',
        path: cvUrl,
      },
    ],
  };
  
  await sgMail.send(msg);
};
```

**Preços SendGrid:**
- Grátis: 100 emails/dia
- Essentials ($19.95/mês): 50k emails
- Pro ($89.95/mês): 100k emails

#### **Opção 2: Resend (Alternativa Moderna)**

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'onboarding@emprega.ai',
  to: user.email,
  subject: 'Bem-vindo!',
  html: '<h1>Hello World</h1>',
});
```

**Preços Resend:**
- Grátis: 100 emails/dia
- Pro ($20/mês): 50k emails

#### **Opção 3: Nodemailer (SMTP)**

```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

await transporter.sendMail({
  from: '"EMPREGA.AI" <noreply@emprega.ai>',
  to: user.email,
  subject: 'Bem-vindo',
  html: '<h1>Hello</h1>',
});
```

### 🎯 RECOMENDAÇÃO:

**Use SendGrid** → É grátis até 100 emails/dia e é o mais confiável.

---

## 3️⃣ GERAÇÃO DE CURRÍCULOS COM MODELOS CANVA

### 🎨 VOCÊ TEM 3 OPÇÕES:

#### **Opção 1: Usar Templates do Canva como Referência Visual + PDFKit ⭐**

**Como funciona:**
1. Você cria/compra templates no Canva
2. Exporta como imagem (para referência visual)
3. **Recria o layout programaticamente** com PDFKit no backend

**Vantagens:**
- ✅ 100% sob seu controle
- ✅ Totalmente automatizado
- ✅ Sem custos por PDF gerado
- ✅ Personalização infinita

**Exemplo com PDFKit:**

```javascript
// src/services/pdfService.ts
import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generateModernCV = async (userData, jobData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });
    
    const filePath = `./temp/cv-${userData._id}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));
    
    // HEADER com foto
    if (userData.profilePhoto) {
      doc.image(userData.profilePhoto, 450, 50, { width: 100 });
    }
    
    // NOME (Grande e bold)
    doc.fontSize(28)
       .font('Helvetica-Bold')
       .fillColor('#1a1a1a')
       .text(userData.fullName.toUpperCase(), 50, 60);
    
    // CARGO DESEJADO
    doc.fontSize(14)
       .font('Helvetica')
       .fillColor('#666')
       .text(jobData?.title || userData.interestedAreas[0], 50, 95);
    
    // LINHA SEPARADORA
    doc.moveTo(50, 120)
       .lineTo(545, 120)
       .stroke('#e0e0e0');
    
    // CONTATO
    doc.fontSize(10)
       .fillColor('#333')
       .text(`📧 ${userData.email}  |  📱 ${userData.phone}  |  📍 ${userData.location}`, 50, 135);
    
    // RESUMO PROFISSIONAL
    doc.moveDown(2);
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .fillColor('#2563eb')
       .text('RESUMO PROFISSIONAL', 50);
    
    doc.moveDown(0.5);
    doc.fontSize(11)
       .font('Helvetica')
       .fillColor('#333')
       .text(userData.professionalSummary || 'Profissional dedicado...', {
         width: 495,
         align: 'justify'
       });
    
    // EXPERIÊNCIA PROFISSIONAL
    doc.moveDown(2);
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .fillColor('#2563eb')
       .text('EXPERIÊNCIA PROFISSIONAL', 50);
    
    userData.experiences.forEach((exp, index) => {
      doc.moveDown(1);
      
      // Cargo e empresa
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor('#1a1a1a')
         .text(exp.position, 50);
      
      doc.fontSize(11)
         .font('Helvetica')
         .fillColor('#666')
         .text(`${exp.company}  •  ${exp.startDate} - ${exp.endDate || 'Atual'}`, 50);
      
      // Descrição
      doc.moveDown(0.3);
      doc.fontSize(10)
         .fillColor('#333')
         .text(exp.description, {
           width: 495,
           align: 'justify'
         });
    });
    
    // FORMAÇÃO ACADÊMICA
    doc.addPage(); // Nova página
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .fillColor('#2563eb')
       .text('FORMAÇÃO ACADÊMICA', 50, 60);
    
    userData.education.forEach(edu => {
      doc.moveDown(1);
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor('#1a1a1a')
         .text(edu.degree, 50);
      
      doc.fontSize(11)
         .font('Helvetica')
         .fillColor('#666')
         .text(`${edu.institution}  •  ${edu.startYear} - ${edu.endYear || 'Atual'}`, 50);
    });
    
    // HABILIDADES
    doc.moveDown(2);
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .fillColor('#2563eb')
       .text('HABILIDADES', 50);
    
    doc.moveDown(0.5);
    doc.fontSize(10)
       .font('Helvetica')
       .fillColor('#333')
       .text(userData.skills.join('  •  '), {
         width: 495
       });
    
    // IDIOMAS
    doc.moveDown(2);
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .fillColor('#2563eb')
       .text('IDIOMAS', 50);
    
    userData.languages.forEach(lang => {
      doc.moveDown(0.5);
      doc.fontSize(10)
         .font('Helvetica')
         .text(`${lang.language}: ${lang.proficiency.toUpperCase()}`, 50);
    });
    
    // FOOTER
    doc.fontSize(8)
       .fillColor('#999')
       .text('Currículo gerado por EMPREGA.AI', 50, 750, {
         align: 'center',
         width: 495
       });
    
    doc.end();
    
    doc.on('finish', () => resolve(filePath));
    doc.on('error', reject);
  });
};
```

**Criar múltiplos templates:**
```javascript
// src/services/cvTemplates/
// - modernTemplate.ts
// - classicTemplate.ts
// - creativeTemplate.ts
// - minimalTemplate.ts

export const generateCV = async (userData, template = 'modern') => {
  switch(template) {
    case 'modern':
      return generateModernCV(userData);
    case 'classic':
      return generateClassicCV(userData);
    case 'creative':
      return generateCreativeCV(userData);
    default:
      return generateModernCV(userData);
  }
};
```

#### **Opção 2: Canva API (Pago)**

**Canva Developer Platform:**
- Requer Canva Pro ($119.99/ano)
- API para automação
- $0.10 por PDF gerado

```javascript
// NÃO RECOMENDO para MVP - muito caro
```

#### **Opção 3: HTML → PDF com Puppeteer**

Criar template HTML/CSS bonito e converter para PDF:

```javascript
import puppeteer from 'puppeteer';

export const generateCVFromHTML = async (userData) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial; }
        .header { background: #2563eb; color: white; padding: 30px; }
        /* ...seus estilos Canva aqui */
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${userData.fullName}</h1>
      </div>
      <!-- ...resto do CV -->
    </body>
    </html>
  `;
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setContent(html);
  await page.pdf({
    path: `cv-${userData._id}.pdf`,
    format: 'A4',
    printBackground: true
  });
  
  await browser.close();
};
```

### 🎯 RECOMENDAÇÃO FINAL - CURRÍCULOS:

**Para o MVP, use PDFKit (Opção 1):**
1. Crie 3-4 templates bonitos no código
2. Inspire-se visualmente no Canva
3. Totalmente gratuito e sob seu controle
4. Mais rápido e escalável

---

## 4️⃣ INTEGRAÇÃO COM IA (ChatGPT / OpenAI)

### 🤖 RESUMO:
A IA otimiza currículos, gera cartas de apresentação e faz matching inteligente.

**Custo:** ~$0.002 por CV com GPT-3.5-turbo

**Veja implementação completa em:** `backend/src/config/openai.ts`

---

## 🚀 PRÓXIMOS PASSOS

1. Continuar criando o FRONTEND (Next.js)
2. Implementar todas as 10 páginas do fluxo
3. Integrar Stripe
4. Criar service de PDFs
5. Fazer deploy

**TUDO ESTÁ PRONTO PARA COMEÇAR! 🎉**
