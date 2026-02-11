import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// CORS - CRUCIAL! 🔥
// ============================================
// server.ts - Localize a lista allowedOrigins
const allowedOrigins = [
  'http://localhost:3000',
  'https://empregaai.vercel.app',
  'https://www.empregaai.vercel.app',
  'https://www.pablito.my', // Adicione o seu domínio principal aqui
  'https://pablito.my'       // Adicione também a versão sem o 'www'
];
app.use(cors({
  origin: function(origin, callback) {
    // Permitir requisições sem origin (Postman, mobile)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ Origin bloqueada:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware para requisições OPTIONS (preflight)
app.options('*', cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
  next();
});

// ============================================
// ROTAS
// ============================================

// Rota raiz
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'EMPREGA.AI Backend API',
    status: 'running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// ROTA DE REGISTRO (TEMPORÁRIA PARA TESTE)
// ============================================
// Adicione isso no seu server.ts antes das rotas
import authRoutes from './routes/authRoutes';
app.use('/api/auth', authRoutes); // Agora suas rotas terão o prefixo /api/auth
app.post('/api/auth/register', (req: Request, res: Response) => {
  try {
    console.log('📝 Tentativa de registro:', req.body);
    
    const { fullName, email, password } = req.body;
    
    // Validação básica
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }
    
    // TEMPORÁRIO: Retornar sucesso sem salvar no banco
    res.status(200).json({
      success: true,
      message: 'Conta criada com sucesso (mock)',
      data: {
        user: {
          id: '123',
          fullName,
          email
        },
        token: 'mock_token_123'
      }
    });
  } catch (error) {
    console.error('❌ Erro no registro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar conta'
    });
  }
});

// Rota 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.path
  });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Erro:', err);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: err.message
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log('\n╔════════════════════════════════════════════╗');
      console.log('║        🚀 EMPREGA.AI - Backend API 🚀      ║');
      console.log('╠════════════════════════════════════════════╣');
      console.log(`║  Servidor: http://localhost:${PORT}           ║`);
      console.log(`║  Ambiente: ${process.env.NODE_ENV || 'development'}                  ║`);
      console.log('╚════════════════════════════════════════════╝\n');
      console.log('✅ Origens permitidas:', allowedOrigins);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar:', error);
    process.exit(1);
  }
};

startServer();

export default app;