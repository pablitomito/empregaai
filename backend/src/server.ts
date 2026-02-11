import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// Configurações
dotenv.config();
import connectDB from './config/database';

// Middlewares
import { errorHandler, notFound } from './middleware/errorHandler';

// Routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cvRoutes from './routes/cvRoutes';
import jobRoutes from './routes/jobRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import webhookRoutes from './routes/webhookRoutes';

// Inicializar app
const app: Application = express();

// Conectar ao MongoDB
connectDB();

// ============================================================================
// MIDDLEWARES GLOBAIS
// ============================================================================

// Segurança
app.use(helmet());

// CORS


// ... (outras configurações)

app.use(cors({
  origin: [
    'https://www.pablito.my',     // Seu domínio oficial
    'https://pablito.my',         // Variante sem www
    'https://empregaai.vercel.app' // Seu link da vercel para testes
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// As suas rotas vêm DEPOIS do app.use(cors)
app.use('/auth', authRoutes);

// Compressão de respostas
app.use(compression());

// Logger (apenas em desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 min
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Muitas requisições deste IP, tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================================
// ROTAS
// ============================================================================

// Health check


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/webhooks', webhookRoutes); // Stripe webhooks

// Root
app.get('/', (_, res) => {
  res.json({
    message: 'Bem-vindo à API EMPREGA.AI',
    version: '1.0.0',
    documentation: `${process.env.FRONTEND_URL}/docs`,
  });
});


// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 - Rota não encontrada
app.use(notFound);

// Error handler global
app.use(errorHandler);

// ============================================================================
// INICIAR SERVIDOR
// ============================================================================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════╗');
  console.log('║                                            ║');
  console.log('║        🚀 EMPREGA.AI - Backend API 🚀      ║');
  console.log('║                                            ║');
  console.log('╠════════════════════════════════════════════╣');
  console.log(`║  Servidor rodando na porta: ${PORT}           ║`);
  console.log(`║  Ambiente: ${process.env.NODE_ENV || 'development'}              ║`);
  console.log(`║  URL: http://localhost:${PORT}              ║`);
  console.log('╚════════════════════════════════════════════╝');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM recebido. Fechando servidor...');
  server.close(() => {
    console.log('✅ Servidor fechado com sucesso');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT recebido. Fechando servidor...');
  server.close(() => {
    console.log('✅ Servidor fechado com sucesso');
    process.exit(0);
  });
});

export default app;

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});