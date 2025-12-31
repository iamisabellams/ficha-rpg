
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FichaPersonagem from './components/FichaPersonagem';
import RoladorDados from './components/RoladorDados';
import Login from './components/Login';
import { Personagem, Pericia, Atributos } from './types';
import { LISTA_PERICIAS_NOMES } from './constants';
import { obterUsuarioAtual, fazerLogout, verificarSessao } from './services/supabaseAuth';
import { supabase } from './services/supabaseClient';

// Fix: Removed 'bonusAdicional' which is not in Pericia type and cast 'p.attr' to 'keyof Atributos'
const PERICIAS_INICIAIS: Pericia[] = LISTA_PERICIAS_NOMES.map(p => ({
  nome: p.nome,
  treinamento: 'Leigo',
  atributo: p.attr as keyof Atributos
}));

// Fix: Added missing 'rituais' property required by the Personagem interface
const PERSONAGEM_INICIAL: Personagem = {
  id: '1',
  nome: 'Agente Desconhecido',
  jogador: 'Jogador',
  origem: 'Acadêmico',
  classe: 'Especialista',
  trilha: 'Infiltrador',
  nex: 5,
  patente: 'Recruta',
  atributos: { FOR: 1, AGI: 2, INT: 3, PRE: 2, VIG: 1 },
  pv: { atual: 14, max: 14 },
  san: { atual: 16, max: 16 },
  pe: { atual: 4, max: 4 },
  defesa: 12,
  esquiva: 12,
  pericias: PERICIAS_INICIAIS,
  inventario: [
    { id: '1', nome: 'Lanterna', espacos: 1, categoria: 0, descricao: 'Ilumina 6 metros.' }
  ],
  rituais: [],
  notas: 'Anotações sobre a missão atual...',
  fotoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Agente'
};

const App: React.FC = () => {
  const [tema, setTema] = useState<'light' | 'dark'>('dark');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [personagem, setPersonagem] = useState<Personagem>(PERSONAGEM_INICIAL);
  const [mostrarRolador, setMostrarRolador] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (tema === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [tema]);

  useEffect(() => {
    // Verificar se Supabase está configurado
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      // Se não estiver configurado, permitir acesso direto (modo desenvolvimento)
      console.warn('⚠️ Modo desenvolvimento: Supabase não configurado. Acesso direto permitido.');
      setIsLoggedIn(true);
      return;
    }

    // Verificar se há sessão ativa no Supabase
    const verificarAutenticacao = async () => {
      try {
        const temSessao = await verificarSessao();
        if (temSessao) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
      }
    };
    verificarAutenticacao();

    // Escutar mudanças na autenticação
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setIsLoggedIn(!!session);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Erro ao configurar listener de autenticação:', error);
    }
  }, []);

  useEffect(() => {
    // Permitir abertura do rolador via window para botões externos
    (window as any).abrirRoladorExterno = () => setMostrarRolador(true);
  }, []);

  const toggleTema = () => setTema(prev => prev === 'light' ? 'dark' : 'light');

  const atualizarPersonagem = (novosDados: Partial<Personagem>) => {
    setPersonagem(prev => ({ ...prev, ...novosDados }));
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} tema={tema} toggleTema={toggleTema} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header 
        tema={tema} 
        toggleTema={toggleTema} 
        personagem={personagem}
        onLogout={async () => {
          await fazerLogout();
          setIsLoggedIn(false);
        }}
      />
      
      <main className="container mx-auto px-4 py-8 pb-24">
        <FichaPersonagem 
          personagem={personagem} 
          atualizarPersonagem={atualizarPersonagem} 
        />
      </main>

      {mostrarRolador && (
        <RoladorDados 
          fechar={() => setMostrarRolador(false)} 
          atributos={personagem.atributos}
        />
      )}
    </div>
  );
};

export default App;
