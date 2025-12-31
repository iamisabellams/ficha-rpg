
import React, { useState } from 'react';
import { Pericia, GrauTreinamento } from '../types';
import { BONUS_TREINAMENTO } from '../constants';
import ModalInfo from './ModalInfo';
import { IconInfo } from './Icons';

interface Props {
  pericias: Pericia[];
  atualizarPericias: (p: Pericia[]) => void;
}

const GRAUS: GrauTreinamento[] = ['Leigo', 'Treinado', 'Veterano', 'Expert'];

const PericiasTab: React.FC<Props> = ({ pericias, atualizarPericias }) => {
  const [showGrauInfo, setShowGrauInfo] = useState(false);

  const toggleGrau = (idx: number) => {
    const novas = [...pericias];
    const atualIdx = GRAUS.indexOf(novas[idx].treinamento);
    const proxIdx = (atualIdx + 1) % GRAUS.length;
    novas[idx].treinamento = GRAUS[proxIdx];
    atualizarPericias(novas);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
        <h2 className="text-xl font-black uppercase tracking-tighter dark:text-white flex items-center gap-3">
          <div className="w-2 h-8 bg-sky-500 rounded-full"></div>
          Lista de Perícias
        </h2>
        <button 
          onClick={() => setShowGrauInfo(true)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors"
        >
          <IconInfo className="w-4 h-4" />
          Como Funciona?
        </button>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black border-b border-slate-100 dark:border-slate-800">
              <th className="px-10 py-6">Perícia</th>
              <th className="px-10 py-6">Bônus</th>
              <th className="px-10 py-6">Treinamento</th>
              <th className="px-10 py-6">Atrib.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {pericias.map((p, idx) => (
              <tr key={p.nome} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                <td className="px-10 py-6">
                  <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight text-sm">{p.nome}</span>
                </td>
                <td className="px-10 py-6">
                  <span className={`text-lg font-black font-mono ${BONUS_TREINAMENTO[p.treinamento] > 0 ? 'text-sky-500' : 'text-slate-200 dark:text-slate-700'}`}>
                    +{BONUS_TREINAMENTO[p.treinamento]}
                  </span>
                </td>
                <td className="px-10 py-6">
                  <button 
                    onClick={() => toggleGrau(idx)}
                    className={`text-[10px] px-5 py-2 rounded-2xl font-black uppercase tracking-widest border transition-all active:scale-95 ${
                      p.treinamento === 'Leigo' ? 'border-slate-200 dark:border-slate-800 text-slate-400' : 
                      p.treinamento === 'Treinado' ? 'border-sky-500/40 bg-sky-500/10 text-sky-500' :
                      p.treinamento === 'Veterano' ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-500' :
                      'border-purple-500/40 bg-purple-500/10 text-purple-500 shadow-lg shadow-purple-500/20'
                    }`}
                  >
                    {p.treinamento}
                  </button>
                </td>
                <td className="px-10 py-6">
                   <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-tighter">{p.atributo}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalInfo 
        isOpen={showGrauInfo} 
        onClose={() => setShowGrauInfo(false)} 
        titulo="Graus de Treinamento" 
        descricao="Em Ordem Paranormal, existem 4 graus: Leigo (+0), Treinado (+5), Veterano (+10) e Expert (+15). Você ganha bônus conforme seu agente se especializa em certas áreas." 
      />
    </div>
  );
};

export default PericiasTab;
