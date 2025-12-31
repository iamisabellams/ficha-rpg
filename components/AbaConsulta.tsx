
import React, { useState } from 'react';

const CONTEUDO = [
  { 
    titulo: 'Fundamentos', 
    cor: 'border-sky-500', 
    texto: 'Testes: Role d20 igual ao atributo e pegue o MAIOR. DTs variam de 15 (Fácil) a 35 (Impossível). 20 Natural é Crítico. 1 Natural em todos os dados é Desastre.' 
  },
  { 
    titulo: 'Elementos', 
    cor: 'border-purple-500', 
    texto: 'SANGUE: Dor e instinto. MORTE: Tempo e entropia. CONHECIMENTO: Lógica proibida. ENERGIA: Caos e luz. MEDO: Pânico e portais.' 
  },
  { 
    titulo: 'Categorias de Itens', 
    cor: 'border-emerald-500', 
    texto: 'Cat. I: Recruta. Cat. II: Operador. Cat. III: Agente Especial. Cat. IV: Elite. O acesso depende da sua Patente na Ordo Realitas.' 
  },
  { 
    titulo: 'Sanidade', 
    cor: 'border-rose-500', 
    texto: 'Abalado: 50% SAN. Enlouquecendo: 0 SAN. Se chegar a 0, Catatonia ou Surto psicótico ocorre até o fim da cena.' 
  }
];

const AbaConsulta: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {CONTEUDO.map(c => (
        <div key={c.titulo} className={`bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border-l-8 ${c.cor} shadow-sm border-y border-r border-slate-100 dark:border-slate-800`}>
          <h3 className="text-lg font-black uppercase dark:text-white mb-4 tracking-tighter">{c.titulo}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">{c.texto}</p>
        </div>
      ))}
      <div className="md:col-span-2 bg-slate-900 p-12 rounded-[3rem] text-center space-y-4">
        <h3 className="text-sky-500 font-black uppercase tracking-[0.2em] text-xs">Aviso de Administrador</h3>
        <p className="text-white font-bold text-xl">Acesso restrito ao Nível 4.</p>
        <p className="text-slate-500 text-sm">Somente administradores podem alterar os registros oficiais do Protocolo Vaelmor.</p>
      </div>
    </div>
  );
};

export default AbaConsulta;
