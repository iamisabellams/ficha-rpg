-- Schema do banco de dados Supabase para Ordo Sheet

-- Tabela de usuários (dados adicionais além do auth.users)
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Tabela de personagens
CREATE TABLE IF NOT EXISTS personagens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  dados JSONB NOT NULL, -- Todos os dados do personagem em JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_personagens_usuario_id ON personagens(usuario_id);
CREATE INDEX IF NOT EXISTS idx_personagens_created_at ON personagens(created_at DESC);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN 
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER update_usuarios_updated_at
  BEFORE UPDATE ON usuarios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_personagens_updated_at
  BEFORE UPDATE ON personagens
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Habilitar RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE personagens ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios
-- Usuários podem ver apenas seus próprios dados
CREATE POLICY "Usuários podem ver seus próprios dados"
  ON usuarios FOR SELECT
  USING (auth.uid() = id);

-- Usuários podem atualizar apenas seus próprios dados
CREATE POLICY "Usuários podem atualizar seus próprios dados"
  ON usuarios FOR UPDATE
  USING (auth.uid() = id);

-- Políticas para personagens
-- Usuários podem ver apenas seus próprios personagens
CREATE POLICY "Usuários podem ver seus próprios personagens"
  ON personagens FOR SELECT
  USING (auth.uid() = usuario_id);

-- Usuários podem criar seus próprios personagens
CREATE POLICY "Usuários podem criar seus próprios personagens"
  ON personagens FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

-- Usuários podem atualizar apenas seus próprios personagens
CREATE POLICY "Usuários podem atualizar seus próprios personagens"
  ON personagens FOR UPDATE
  USING (auth.uid() = usuario_id);

-- Usuários podem deletar apenas seus próprios personagens
CREATE POLICY "Usuários podem deletar seus próprios personagens"
  ON personagens FOR DELETE
  USING (auth.uid() = usuario_id);

