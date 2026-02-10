# 🚀 EMPREGA.AI - SaaS de Currículos Premium com IA

> A melhor plataforma de empregos em Portugal. Taxa de 92% de empregabilidade em 2025.

## 📋 Sobre o Projeto

**EMPREGA.AI** é um SaaS inovador que combina criação de currículos premium com inteligência artificial para conectar candidatos às melhores oportunidades de emprego em Portugal.

### 🎯 Objetivo Principal

Ajudar pessoas desempregadas ou em empregos emergentes (restauração, obras, limpeza) a conseguirem oportunidades de carreira profissional de qualidade.

### ✨ Funcionalidades Principais

- ✅ **Criação de Currículo Gratuito**: 1 currículo premium sem custo
- 🤖 **IA Inteligente**: Currículos personalizados para cada vaga
- 📧 **Envio Automático**: Até 50 currículos/dia para vagas compatíveis
- 💳 **Assinatura Premium**: €3,99/mês (cancelamento gratuito)
- 📊 **Dashboard Completo**: Acompanhamento em tempo real
- 🎓 **Cartas de Apresentação**: Geradas automaticamente pela IA

---

## 🛠️ Stack Tecnológica

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS + DaisyUI
- **Autenticação**: NextAuth.js
- **Formulários**: React Hook Form + Zod
- **Requisições**: Axios / SWR

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **Database**: MongoDB + Mongoose
- **Autenticação**: JWT + bcrypt
- **Validação**: Joi / Zod
- **IA**: OpenAI API (GPT-4)
- **Pagamentos**: Stripe
- **Email**: SendGrid / Resend

### DevOps & Deploy
- **Frontend**: Vercel
- **Backend**: Railway / Render
- **Database**: MongoDB Atlas
- **CDN**: Cloudinary (para fotos de perfil)
- **Monitoramento**: Sentry

---

## 📁 Estrutura do Projeto

```
emprega-ai-saas/
├── frontend/                # Aplicação Next.js
│   ├── src/
│   │   ├── app/            # App Router (Pages)
│   │   ├── components/     # Componentes React
│   │   ├── lib/            # Utilitários e configs
│   │   ├── hooks/          # Custom hooks
│   │   ├── types/          # TypeScript types
│   │   └── styles/         # CSS Global
│   ├── public/             # Assets estáticos
│   └── package.json
│
├── backend/                # API Node.js
│   ├── src/
│   │   ├── config/         # Configurações
│   │   ├── models/         # Models Mongoose
│   │   ├── routes/         # Rotas Express
│   │   ├── controllers/    # Controllers
│   │   ├── middleware/     # Middlewares
│   │   ├── services/       # Lógica de negócio
│   │   └── utils/          # Utilitários
│   ├── .env.example
│   └── package.json
│
└── README.md               # Este arquivo
```

---

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 20+ instalado
- MongoDB instalado localmente ou MongoDB Atlas
- Conta Stripe (chaves de API)
- Conta OpenAI (chave de API)

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/emprega-ai-saas.git
cd emprega-ai-saas
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/emprega-ai
# Ou MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/emprega-ai

# JWT
JWT_SECRET=seu_secret_super_seguro_aqui_min_32_caracteres
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
STRIPE_PRICE_ID=price_xxxxxxxxxxxx

# Email (SendGrid ou Resend)
SENDGRID_API_KEY=SG.xxxxxxxxxxxx
FROM_EMAIL=noreply@emprega.ai

# Cloudinary (Upload de fotos)
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=xxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxx

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

Inicie o servidor:

```bash
npm run dev
```

### 3. Configurar Frontend

```bash
cd frontend
npm install
```

Crie o arquivo `.env.local`:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu_secret_nextauth_aqui

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=xxxxxxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxx
```

Inicie o projeto:

```bash
npm run dev
```

Acesse: `http://localhost:3000`

---

## 📱 Fluxo do Usuário

### 1. **Landing Page** (Página Inicial)
- Narrativa emocional sobre desemprego
- Benefícios da plataforma
- Logos de empresas parceiras
- CTAs para cadastro

### 2. **Cadastro/Login**
- Email + Senha
- Login com Google
- Validação e criação de conta

### 3. **Questionário de Perfil** (Onboarding)
- **Passo 1**: Objetivo profissional
  - Conseguir entrevista urgente
  - Mudar de trabalho/área
  
- **Passo 2**: Áreas de interesse (até 3)
  
- **Passo 3**: Modelo de trabalho (remoto/híbrido/presencial)
  
- **Passo 4**: Dados pessoais completos
  - Nome, email, telefone, localização
  - Foto de perfil
  - Experiências profissionais
  - Formação acadêmica
  - Habilidades
  - Idiomas
  - Projetos (opcional)

- **Passo 5**: Descrição pessoal (mínimo 100 caracteres)
  - Hobbies, objetivos, personalidade

### 4. **Processamento IA**
- Loading animado
- IA analisa perfil
- Busca vagas compatíveis
- Exibe número de vagas encontradas

### 5. **Paywall (€3,99/mês)**
- Explicação dos benefícios Premium
- Integração com Stripe
- Checkout seguro

### 6. **Dashboard Premium**
- Currículos gerados
- Vagas aplicadas
- Status de candidaturas
- Perfil editável
- Cancelamento de assinatura

---

## 🤖 Funcionalidades da IA

### Geração de Currículos

A IA analisa:
- Experiência profissional do candidato
- Formação acadêmica
- Habilidades e idiomas
- Descrição pessoal (objetivos, hobbies)
- Requisitos da vaga específica

E gera:
- **Currículo Premium** em PDF formatado
- **Carta de Apresentação** personalizada
- **Otimização ATS** (Applicant Tracking System)
- **Palavras-chave** relevantes para cada vaga

### Matching de Vagas

Sistema inteligente que:
- Busca vagas em portais de emprego (integração via API ou scraping)
- Filtra por compatibilidade de perfil
- Prioriza vagas com melhor salário e benefícios
- Evita empregos emergentes (restauração, obras, limpeza)
- Envia até 50 currículos/dia automaticamente

---

## 💳 Modelo de Negócio

### Plano Gratuito
- ✅ 1 currículo premium
- ❌ Sem envio automático
- ❌ Sem matching de vagas IA

### Plano Premium (€3,99/mês)
- ✅ Currículos ilimitados
- ✅ Até 50 envios automáticos/dia
- ✅ Cartas de apresentação personalizadas
- ✅ Matching inteligente de vagas
- ✅ Dashboard completo
- ✅ Cancelamento gratuito a qualquer momento

---

## 🔐 Segurança

- Senhas criptografadas com **bcrypt**
- Autenticação via **JWT**
- Validação de dados com **Zod/Joi**
- Proteção contra **SQL Injection** e **XSS**
- **Rate limiting** para evitar abusos
- **HTTPS** obrigatório em produção
- Compliance com **GDPR** (dados de usuários portugueses)

---

## 📊 Métricas de Sucesso

Objetivos:
- 92% de taxa de empregabilidade
- Média de 3 dias para primeira entrevista
- 1000+ usuários ativos no primeiro trimestre
- 500+ assinaturas Premium

---

## 🚧 Roadmap

### Fase 1 - MVP (2-3 semanas)
- [ ] Landing page completa
- [ ] Sistema de cadastro/login
- [ ] Formulário de perfil
- [ ] Integração Stripe
- [ ] Geração básica de currículos com IA
- [ ] Dashboard simples

### Fase 2 - Matching Inteligente (1 mês)
- [ ] Integração com portais de emprego
- [ ] Sistema de matching de vagas
- [ ] Envio automático de currículos
- [ ] Notificações por email

### Fase 3 - Otimizações (contínuo)
- [ ] Melhorias na IA
- [ ] A/B testing landing page
- [ ] Analytics avançado
- [ ] App mobile (React Native)

---

## 🤝 Contribuindo

Este é um projeto privado, mas sugestões são bem-vindas via Issues.

---

## 📄 Licença

© 2026 EMPREGA.AI - Todos os direitos reservados

---

## 📞 Suporte

- Email: suporte@emprega.ai
- Website: https://emprega.ai
- WhatsApp: +351 XXX XXX XXX

---

**Desenvolvido com ❤️ para ajudar pessoas a encontrarem o emprego dos sonhos em Portugal** 🇵🇹
