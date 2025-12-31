import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
// Essas variáveis devem ser configuradas no Cloudflare Pages ou .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase URL e Anon Key não configurados.');
  console.warn('📝 Crie um arquivo .env.local na raiz do projeto com:');
  console.warn('   VITE_SUPABASE_URL=https://seu-projeto.supabase.co');
  console.warn('   VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui');
  console.warn('💡 A aplicação continuará funcionando, mas sem persistência de dados.');
}

// Criar cliente apenas se tiver as credenciais válidas
// Se não tiver, usar valores placeholder que não quebram a aplicação
const finalUrl = supabaseUrl || 'https://placeholder.supabase.co';
const finalKey = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder';

export const supabase = createClient(finalUrl, finalKey, {
  auth: {
    persistSession: !!supabaseUrl && !!supabaseAnonKey,
    autoRefreshToken: !!supabaseUrl && !!supabaseAnonKey,
    detectSessionInUrl: !!supabaseUrl && !!supabaseAnonKey
  }
});

// Tipos para o banco de dados
export interface UsuarioDB {
  id: string;
  email: string;
  nome: string;
  created_at: string;
  updated_at: string;
}

export interface PersonagemDB {
  id: string;
  usuario_id: string;
  dados: any; // JSON com todos os dados do personagem
  created_at: string;
  updated_at: string;
}

