# Guia de Deploy no Cloudflare Pages

Este guia explica como fazer deploy da aplicação Ordo Sheet no Cloudflare Pages com Supabase.

## Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Conta no [Cloudflare](https://cloudflare.com)
3. Repositório Git (GitHub, GitLab ou Bitbucket)

## Passo 1: Configurar Supabase

### 1.1 Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login e clique em **New Project**
3. Preencha:
   - **Name**: ordo-sheet (ou outro nome)
   - **Database Password**: escolha uma senha forte
   - **Region**: escolha a região mais próxima
4. Aguarde o projeto ser criado (pode levar alguns minutos)

### 1.2 Configurar Banco de Dados

1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Copie e cole o conteúdo do arquivo `supabase/schema.sql`
4. Clique em **Run** para executar o SQL
5. Verifique se as tabelas foram criadas em **Table Editor**

### 1.3 Obter Credenciais

1. No dashboard do Supabase, vá em **Settings** > **API**
2. Copie as seguintes informações:
   - **Project URL** (será `VITE_SUPABASE_URL`)
   - **anon public** key (será `VITE_SUPABASE_ANON_KEY`)

## Passo 2: Preparar o Projeto

### 2.1 Variáveis de Ambiente Locais

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

**⚠️ IMPORTANTE**: Adicione `.env.local` ao `.gitignore` para não commitar as credenciais!

### 2.2 Testar Localmente

```bash
npm run dev
```

Teste o login e registro para garantir que está funcionando.

## Passo 3: Deploy no Cloudflare Pages

### 3.1 Conectar Repositório

1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Vá em **Pages** > **Create a project**
3. Conecte seu repositório Git (GitHub, GitLab ou Bitbucket)
4. Selecione o repositório do projeto

### 3.2 Configurar Build

**Build settings:**
- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (ou deixe vazio)

### 3.3 Configurar Variáveis de Ambiente

Na seção **Environment variables**, adicione:

- **Variable name**: `VITE_SUPABASE_URL`
  - **Value**: `https://seu-projeto.supabase.co`
  
- **Variable name**: `VITE_SUPABASE_ANON_KEY`
  - **Value**: `sua-chave-anon-aqui`

⚠️ **IMPORTANTE**: Configure essas variáveis para **Production**, **Preview** e **Branch previews**.

### 3.4 Fazer Deploy

1. Clique em **Save and Deploy**
2. Aguarde o build completar
3. Seu site estará disponível em `https://seu-projeto.pages.dev`

## Passo 4: Configurar Domínio Personalizado (Opcional)

1. No Cloudflare Pages, vá em **Custom domains**
2. Clique em **Set up a custom domain**
3. Digite seu domínio
4. Siga as instruções para configurar o DNS

## Passo 5: Configurar CORS no Supabase (Se necessário)

Se houver problemas de CORS:

1. No Supabase, vá em **Settings** > **API**
2. Em **CORS**, adicione seu domínio do Cloudflare Pages
3. Exemplo: `https://seu-projeto.pages.dev`

## Troubleshooting

### Erro: "Supabase URL e Anon Key não configurados"

- Verifique se as variáveis de ambiente estão configuradas no Cloudflare Pages
- Certifique-se de que os nomes das variáveis estão corretos: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

### Erro de CORS

- Adicione o domínio do Cloudflare Pages nas configurações de CORS do Supabase
- Verifique se o URL do Supabase está correto

### Erro ao fazer login/registro

- Verifique se o schema SQL foi executado corretamente no Supabase
- Verifique se as políticas RLS estão ativas
- Verifique os logs no Supabase Dashboard > Logs

### Build falha

- Verifique se todas as dependências estão no `package.json`
- Verifique os logs de build no Cloudflare Pages
- Teste o build localmente com `npm run build`

## Estrutura de Arquivos Importantes

```
├── .env.local              # Variáveis locais (não commitar)
├── .gitignore             # Deve incluir .env.local
├── supabase/
│   └── schema.sql         # Schema do banco de dados
├── services/
│   ├── supabaseClient.ts  # Cliente Supabase
│   ├── supabaseAuth.ts    # Autenticação
│   └── personagemService.ts # CRUD de personagens
└── cloudflare-pages.md    # Este guia
```

## Próximos Passos

- Configurar backup automático do banco de dados
- Configurar monitoramento e alertas
- Otimizar performance com cache
- Configurar CI/CD para deploy automático

## Recursos Úteis

- [Documentação Supabase](https://supabase.com/docs)
- [Documentação Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

