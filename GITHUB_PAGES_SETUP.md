# Configuração para GitHub Pages

## Problema Resolvido

O projeto estava aparecendo em branco no GitHub Pages porque os caminhos absolutos (`/index.css`, `/index.tsx`) não funcionam quando o site é servido em um subdiretório.

## Soluções Aplicadas

1. ✅ Configurado `base` no `vite.config.ts` para GitHub Pages
2. ✅ Ajustados caminhos no `index.html` para serem relativos
3. ✅ Criado arquivo `404.html` para suporte a SPAs no GitHub Pages

## Como Configurar

### 1. Ajustar o Nome do Repositório ⚠️ IMPORTANTE

**O nome do repositório no GitHub deve corresponder ao configurado no `vite.config.ts`!**

Para descobrir o nome do seu repositório:
1. Acesse seu repositório no GitHub
2. Veja a URL: `https://github.com/usuario/NOME-DO-REPOSITORIO`
3. O nome do repositório é a última parte da URL

Se o nome do seu repositório **não** é `ficha-rpg`, você precisa ajustar o `base` no `vite.config.ts`:

```typescript
// No arquivo vite.config.ts, linha ~13
const base = env.VITE_BASE_PATH || (mode === 'production' ? '/SEU-NOME-REPOSITORIO/' : '/');
```

Substitua `SEU-NOME-REPOSITORIO` pelo nome real do seu repositório no GitHub.

**Exemplo:** Se seu repositório é `https://github.com/usuario/minha-ficha-rpg`, use `/minha-ficha-rpg/`

⚠️ **ATENÇÃO**: O nome do repositório deve corresponder EXATAMENTE, incluindo maiúsculas/minúsculas!

### 2. Fazer Deploy no GitHub Pages

1. Faça commit das alterações:
   ```bash
   git add .
   git commit -m "Fix: Configuração para GitHub Pages"
   git push
   ```

2. No GitHub, vá em **Settings** > **Pages**

3. Configure:
   - **Source**: Selecione a branch (geralmente `main` ou `master`)
   - **Folder**: Selecione `/ (root)` ou `/dist` dependendo de como você configurou o deploy

4. Se estiver usando GitHub Actions, certifique-se de que o workflow está configurado para:
   - Fazer build: `npm run build`
   - Publicar a pasta `dist`

### 3. Verificar se Funcionou

Após o deploy, acesse: `https://seu-usuario.github.io/nome-do-repositorio/`

Se ainda estiver em branco:
- Verifique o console do navegador (F12) para erros
- Confirme que o nome do repositório no `vite.config.ts` está correto
- Verifique se o build foi feito corretamente

## Alternativa: Usar Variável de Ambiente

Você também pode definir a variável `VITE_BASE_PATH` no GitHub Actions ou nas configurações do GitHub Pages:

```yaml
# No seu workflow do GitHub Actions
env:
  VITE_BASE_PATH: '/nome-do-repositorio/'
```

Ou crie um arquivo `.env.production`:

```env
VITE_BASE_PATH=/nome-do-repositorio/
```

## Notas Importantes

- O arquivo `404.html` é necessário para que o GitHub Pages redirecione corretamente para o `index.html` em rotas SPA
- Os caminhos no `index.html` foram alterados para relativos (`./` em vez de `/`)
- O `base` no Vite garante que todos os assets sejam carregados do caminho correto

