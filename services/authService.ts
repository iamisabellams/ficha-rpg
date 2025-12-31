// Serviço de autenticação local usando localStorage

export interface Usuario {
  email: string;
  nome: string;
  senha: string; // Em produção, isso deveria ser hash
}

const STORAGE_KEY = 'ordo_users';

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

// Obter todos os usuários
function obterUsuarios(): Usuario[] {
  const usuariosJson = localStorage.getItem(STORAGE_KEY);
  return usuariosJson ? JSON.parse(usuariosJson) : [];
}

// Salvar usuários
function salvarUsuarios(usuarios: Usuario[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

// Registrar novo usuário
export function registrarUsuario(email: string, nome: string, senha: string): { sucesso: boolean; erro?: string } {
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

  // Verificar se email já existe
  const usuarios = obterUsuarios();
  const usuarioExistente = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (usuarioExistente) {
    return { sucesso: false, erro: 'Este email já está cadastrado' };
  }

  // Criar novo usuário
  const novoUsuario: Usuario = {
    email: email.toLowerCase().trim(),
    nome: nome.trim(),
    senha: senha // Em produção, usar hash (bcrypt, etc)
  };

  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  return { sucesso: true };
}

// Fazer login
export function fazerLogin(email: string, senha: string): { sucesso: boolean; usuario?: Usuario; erro?: string } {
  if (!email || !senha) {
    return { sucesso: false, erro: 'Email e senha são obrigatórios' };
  }

  const usuarios = obterUsuarios();
  const usuario = usuarios.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
  );

  if (!usuario) {
    return { sucesso: false, erro: 'Email ou senha incorretos' };
  }

  // Salvar usuário logado
  localStorage.setItem('ordo_current_user', JSON.stringify(usuario));

  return { sucesso: true, usuario };
}

// Obter usuário logado
export function obterUsuarioLogado(): Usuario | null {
  const usuarioJson = localStorage.getItem('ordo_current_user');
  return usuarioJson ? JSON.parse(usuarioJson) : null;
}

// Fazer logout
export function fazerLogout(): void {
  localStorage.removeItem('ordo_current_user');
}

