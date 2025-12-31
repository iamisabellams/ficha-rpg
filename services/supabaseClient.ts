import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
// Essas variáveis devem ser configuradas no Cloudflare Pages ou .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL e Anon Key não configurados. Configure as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
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

