
import React from 'react';
import { Personagem } from '../types';
import { IconLogout, IconSun, IconMoon } from './Icons';

interface HeaderProps {
  tema: 'light' | 'dark';
  toggleTema: () => void;
  personagem: Personagem;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ tema, toggleTema, personagem, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-sky-500/20">
            Ω
          </div>
          <div className="hidden sm:block">
            <h1 className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 leading-tight">Terminal Ordo</h1>
            <p className="text-sm font-black text-slate-900 dark:text-white leading-tight truncate max-w-[150px] uppercase tracking-tighter italic">
              Agente {personagem.nome.split(' ')[0]}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={toggleTema}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {tema === 'light' ? <IconMoon className="w-5 h-5" /> : <IconSun className="w-5 h-5" />}
          </button>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

          <button 
            onClick={onLogout}
            className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
            title="Sair do Sistema"
          >
            <IconLogout className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
