import { supabase } from './supabaseClient';

export interface Usuario {
  id: string;
  email: string;
  nome: string;
}

// Validar formato de email
export function validarEmail(email: string): { valido: boolean; erro?: string } {
  if (!email || email.trim() === '') {
    return { valido: false, erro: 'Email é obrigatório' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valido: false, erro: 'Formato de email inválido' };
  }

  return { valido: true };
}

// Registrar novo usuário
export async function registrarUsuario(
  email: string, 
  nome: string, 
  senha: string
): Promise<{ sucesso: boolean; usuario?: Usuario; erro?: string }> {
  try {
    // Validar email
    const validacaoEmail = validarEmail(email);
    if (!validacaoEmail.valido) {
      return { sucesso: false, erro: validacaoEmail.erro };
    }

    // Validar senha
    if (!senha || senha.length < 6) {
      return { sucesso: false, erro: 'A senha deve ter pelo menos 6 caracteres' };
    }

    // Validar nome
    if (!nome || nome.trim().length < 2) {
      return { sucesso: false, erro: 'O nome deve ter pelo menos 2 caracteres' };
    }

    // Registrar no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password: senha,
      options: {
        data: {
          nome: nome.trim(),
        },
        emailRedirectTo: undefined, // Não redirecionar para email
      }
    });

    if (authError) {
      // Tratar erros comuns
      if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
        return { sucesso: false, erro: 'Este email já está cadastrado' };
      }
      if (authError.message.includes('rate limit') || authError.message.includes('50 seconds')) {
        return { sucesso: false, erro: 'Muitas tentativas. Aguarde alguns segundos antes de tentar novamente.' };
      }
      if (authError.message.includes('email')) {
        return { sucesso: false, erro: 'Erro com o email. Verifique se está correto.' };
      }
      console.error('Erro ao registrar:', authError);
      return { sucesso: false, erro: authError.message || 'Erro ao criar conta' };
    }

    if (!authData.user) {
      return { sucesso: false, erro: 'Erro ao criar usuário. Verifique suas credenciais.' };
    }

    // Aguardar um pouco para garantir que o usuário foi criado
    await new Promise(resolve => setTimeout(resolve, 500));

    // Criar registro na tabela de usuários
    const { error: dbError } = await supabase
      .from('usuarios')
      .insert({
        id: authData.user.id,
        email: email.toLowerCase().trim(),
        nome: nome.trim(),
      });

    if (dbError) {
      console.error('Erro ao criar registro na tabela usuarios:', dbError);
      // Se o erro for de duplicata, tentar buscar o usuário existente
      if (dbError.message.includes('duplicate') || dbError.code === '23505') {
        const { data: usuarioExistente } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', authData.user.id)
          .single();
        
        if (usuarioExistente) {
          return {
            sucesso: true,
            usuario: {
              id: usuarioExistente.id,
              email: usuarioExistente.email,
              nome: usuarioExistente.nome,
            }
          };
        }
      }
      // Se não for duplicata, retornar erro
      return { sucesso: false, erro: 'Erro ao salvar dados do usuário: ' + dbError.message };
    }

    const usuario: Usuario = {
      id: authData.user.id,
      email: email.toLowerCase().trim(),
      nome: nome.trim(),
    };

    return { sucesso: true, usuario };
  } catch (error: any) {
    console.error('Erro ao registrar usuário:', error);
    return { sucesso: false, erro: error.message || 'Erro ao registrar usuário' };
  }
}

// Fazer login
export async function fazerLogin(
  email: string, 
  senha: string
): Promise<{ sucesso: boolean; usuario?: Usuario; erro?: string }> {
  try {
    if (!email || !senha) {
      return { sucesso: false, erro: 'Email e senha são obrigatórios' };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password: senha,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return { sucesso: false, erro: 'Email ou senha incorretos' };
      }
      return { sucesso: false, erro: error.message };
    }

    if (!data.user) {
      return { sucesso: false, erro: 'Erro ao fazer login' };
    }

    // Buscar dados do usuário na tabela
    const { data: usuarioData, error: usuarioError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (usuarioError && !usuarioError.message.includes('No rows')) {
      console.error('Erro ao buscar dados do usuário:', usuarioError);
    }

    const usuario: Usuario = {
      id: data.user.id,
      email: data.user.email || email,
      nome: usuarioData?.nome || (data.user.user_metadata?.nome as string) || 'Usuário',
    };

    return { sucesso: true, usuario };
  } catch (error: any) {
    console.error('Erro ao fazer login:', error);
    return { sucesso: false, erro: error.message || 'Erro ao fazer login' };
  }
}

// Fazer logout
export async function fazerLogout(): Promise<void> {
  await supabase.auth.signOut();
}

// Obter usuário atual
export async function obterUsuarioAtual(): Promise<Usuario | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }

    // Buscar dados do usuário na tabela
    const { data: usuarioData } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', user.id)
      .single();

    return {
      id: user.id,
      email: user.email || '',
      nome: usuarioData?.nome || (user.user_metadata?.nome as string) || 'Usuário',
    };
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return null;
  }
}

// Verificar se há sessão ativa
export async function verificarSessao(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

