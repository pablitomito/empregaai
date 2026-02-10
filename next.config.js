/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // ✅ Configuração para permitir imagens externas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'seeklogo.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: '**',           // ← Temporário (permite qualquer domínio)
        // Remova esta linha quando for para produção
      },
    ],
  },

  // Configuração do Turbopack (caso ainda tenha o aviso anterior)
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;