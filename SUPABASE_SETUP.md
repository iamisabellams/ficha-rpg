# Configuração do Supabase - Desabilitar Confirmação de Email

Para evitar o erro "For security purposes, you can only request this after 50 seconds", você precisa desabilitar a confirmação de email no Supabase.

## Passo a Passo

### 1. Acessar Configurações de Autenticação

1. No dashboard do Supabase, vá em **Authentication** > **Settings**
2. Role até a seção **Email Auth**

### 2. Desabilitar Confirmação de Email

1. Encontre a opção **"Enable email confirmations"**
2. **Desmarque** essa opção (deixe desabilitada)
3. Clique em **Save**

### 3. Configurar URLs de Redirecionamento (Opcional)

Se você quiser manter confirmação de email no futuro:

1. Em **Site URL**, adicione: `http://localhost:3000` (para desenvolvimento)
2. Em **Redirect URLs**, adicione:
   - `http://localhost:3000/**`
   - `https://seu-dominio.com/**` (para produção)

### 4. Verificar Configurações de Rate Limiting

1. Em **Authentication** > **Settings**, role até **Rate Limits**
2. Ajuste os limites se necessário:
   - **Email rate limit**: Aumente se estiver muito baixo
   - **SMS rate limit**: (se usar SMS)

## Alternativa: Usar Modo de Desenvolvimento

Se você está apenas testando localmente, pode usar o modo de desenvolvimento do Supabase que não requer confirmação de email.

## Verificar se está funcionando

Após desabilitar a confirmação de email:

1. Tente fazer um novo cadastro
2. O usuário deve ser criado imediatamente
3. O login deve funcionar sem precisar confirmar email

## Nota de Segurança

⚠️ **Importante**: Desabilitar confirmação de email reduz a segurança. Em produção, considere:
- Manter confirmação de email habilitada
- Implementar CAPTCHA
- Usar rate limiting adequado
- Monitorar tentativas de registro

