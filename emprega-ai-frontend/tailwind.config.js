import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Aqui podemos adicionar as cores personalizadas do seu CSS se quiser usar como classe
      // Ex: 'bg-primary-blue' em vez de usar o código hex direto
      colors: {
        primary: {
          blue: '#2563EB',
          purple: '#7C3AED',
        },
        action: {
          green: '#10B981',
          dark: '#059669',
        }
      }
    },
  },
  plugins: [],
};
export default config;