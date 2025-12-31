# Configuração do Projeto

## Problema: Página em Branco

Se você está vendo uma página em branco, provavelmente é porque o Supabase não está configurado.

## Solução Rápida (Desenvolvimento Local)

Para desenvolvimento local sem Supabase, a aplicação agora funciona automaticamente. Você pode:

1. **Usar a aplicação sem Supabase** (modo desenvolvimento)
   - A aplicação permitirá acesso direto sem autenticação
   - Os dados não serão salvos permanentemente
   - Perfeito para testar a interface

2. **Configurar o Supabase** (recomendado para produção)
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione as seguintes variáveis:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

## Como Obter as Credenciais do Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Crie um novo projeto
4. Vá em **Settings** > **API**
5. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## Estrutura do Banco de Dados

Execute o script SQL em `supabase/schema.sql` no SQL Editor do Supabase para criar as tabelas necessárias.

## Reiniciar o Servidor

Após criar o arquivo `.env.local`:

1. Pare o servidor (Ctrl+C)
2. Inicie novamente: `npm run dev`

## Nota

- O arquivo `.env.local` não deve ser commitado no Git (já está no .gitignore)
- Use `.env.local.example` como referência
- Para produção, configure as variáveis no Cloudflare Pages ou seu provedor de hospedagem


