import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Configurar base path para GitHub Pages
    // Para desenvolvimento local, use '/' (padrão)
    // Para GitHub Pages, use '/nome-do-repositorio/'
    // Você pode definir VITE_BASE_PATH no arquivo .env ou nas configurações do GitHub Actions
    // Se não definido, assume '/ficha-rpg/' (ajuste conforme seu repositório)
    const base = env.VITE_BASE_PATH || (mode === 'production' ? '/ficha-rpg/' : '/');
    
    return {
      base: base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      envPrefix: 'VITE_',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
