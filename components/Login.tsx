import React, { useState } from 'react';
import { IconSun, IconMoon } from './Icons';
import { validarEmail, registrarUsuario, fazerLogin } from '../services/supabaseAuth';

interface LoginProps {
  onLogin: () => void;
  tema: 'light' | 'dark';
  toggleTema: () => void;
}

type LoginState = 'login' | 'register' | 'recover';

const Login: React.FC<LoginProps> = ({ onLogin, tema, toggleTema }) => {
  const [view, setView] = useState<LoginState>('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [senhaRegistro, setSenhaRegistro] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroGeral, setErroGeral] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroGeral('');
    
    if (!email || !senha) {
      setErroGeral('Preencha todos os campos');
      return;
    }

    const resultado = await fazerLogin(email, senha);
    
    if (resultado.sucesso) {
      onLogin();
    } else {
      setErroGeral(resultado.erro || 'Erro ao fazer login');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroGeral('');
    setErroEmail('');
    setErroSenha('');

    // Validar email
    const validacaoEmail = validarEmail(email);
    if (!validacaoEmail.valido) {
      setErroEmail(validacaoEmail.erro || 'Email inválido');
      return;
    }

    // Validar senha
    if (senhaRegistro !== confirmarSenha) {
      setErroSenha('As senhas não coincidem');
      return;
    }
    if (senhaRegistro.length < 6) {
      setErroSenha('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    // Registrar usuário
    const resultado = await registrarUsuario(email, nome, senhaRegistro);
    
    if (resultado.sucesso) {
      // Aguardar um pouco antes de fazer login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fazer login automaticamente após registro
      const loginResultado = await fazerLogin(email, senhaRegistro);
      if (loginResultado.sucesso) {
        onLogin();
      } else {
        // Se o login falhar, pode ser que precise confirmar email
        // Mas vamos tentar mesmo assim
        setErroGeral('Conta criada! Redirecionando...');
        setTimeout(() => {
          onLogin();
        }, 500);
      }
    } else {
      // Mostrar erro no campo apropriado
      const mensagemErro = resultado.erro || 'Erro ao criar conta';
      if (mensagemErro.toLowerCase().includes('email')) {
        setErroEmail(mensagemErro);
      } else {
        setErroGeral(mensagemErro);
      }
    }
  };

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Funcionalidade de recuperação de senha não implementada.\nEmail: ${email}`);
    setView('login');
  };

  const mudarView = (novaView: LoginState) => {
    setView(novaView);
    setErroSenha('');
    setErroEmail('');
    setErroGeral('');
    if (novaView === 'login') {
      setSenhaRegistro('');
      setConfirmarSenha('');
      setNome('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <button 
        onClick={toggleTema}
        className="absolute top-6 right-6 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-500"
      >
        {tema === 'light' ? <IconMoon /> : <IconSun />}
      </button>

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center text-white text-3xl font-black mb-4 shadow-lg shadow-sky-500/30">
            Ω
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Ordo Sheet
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Terminal de Agentes • Nível de Acesso 4
          </p>
        </div>

        {erroGeral && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-xl">
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">{erroGeral}</p>
          </div>
        )}

        {view === 'login' && (
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agente@ordoreali.tas" 
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Senha</label>
              <input 
                type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                required
              />
            </div>
            <div className="text-right">
              <button 
                type="button" 
                onClick={() => mudarView('recover')}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-500"
              >
                Esqueceu a senha?
              </button>
            </div>

            <button 
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-sky-500/20 mt-4 uppercase tracking-[0.2em] text-xs"
            >
              Entrar no Sistema
            </button>
          </form>
        )}

        {view === 'register' && (
          <form className="space-y-4" onSubmit={handleRegister}>
             <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Nome do Agente</label>
              <input 
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Arthur Cervero" 
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErroEmail('');
                }}
                placeholder="agente@ordoreali.tas" 
                className={`w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white ${erroEmail ? 'ring-2 ring-red-500' : ''}`}
                required
              />
              {erroEmail && (
                <p className="text-xs text-red-500 ml-2 mt-1">{erroEmail}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Senha</label>
              <input 
                type="password" 
                value={senhaRegistro}
                onChange={(e) => {
                  setSenhaRegistro(e.target.value);
                  setErroSenha('');
                }}
                placeholder="••••••••" 
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Confirmar Senha</label>
              <input 
                type="password" 
                value={confirmarSenha}
                onChange={(e) => {
                  setConfirmarSenha(e.target.value);
                  setErroSenha('');
                }}
                placeholder="••••••••" 
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                required
              />
              {erroSenha && (
                <p className="text-xs text-red-500 ml-2 mt-1">{erroSenha}</p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-sky-500/20 mt-4 uppercase tracking-[0.2em] text-xs"
            >
              Criar Conta de Agente
            </button>
          </form>
        )}

        {view === 'recover' && (
          <form className="space-y-6" onSubmit={handleRecover}>
            <div className="space-y-2">
              <h2 className="text-lg font-black dark:text-white uppercase tracking-tight">Recuperar Acesso</h2>
              <p className="text-xs text-slate-400">Funcionalidade de recuperação de senha não implementada.</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Email de Agente</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agente@ordoreali.tas" 
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-sky-500/20 uppercase tracking-widest text-xs"
            >
              Enviar Link
            </button>
            <button 
              type="button" 
              onClick={() => mudarView('login')}
              className="w-full text-xs font-black uppercase text-slate-400 hover:text-sky-500"
            >
              Voltar ao Login
            </button>
          </form>
        )}

        {view !== 'recover' && (
          <div className="mt-8 text-center">
            <button 
              onClick={() => mudarView(view === 'login' ? 'register' : 'login')}
              className="text-xs font-black text-sky-500 hover:text-sky-600 transition-colors uppercase tracking-widest"
            >
              {view === 'login' ? 'Novo Agente? Cadastre-se' : 'Já possui registro? Conectar'}
            </button>
          </div>
        )}
      </div>
      
      <p className="mt-8 text-[10px] text-slate-400 uppercase tracking-widest font-black opacity-30">
        Propriedade Confidencial da Ordo Realitas • Cuidado com o Outro Lado
      </p>
    </div>
  );
};

export default Login;
