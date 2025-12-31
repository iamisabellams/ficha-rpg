
import React, { useState } from 'react';
import ModalInfo from './ModalInfo';
import { IconInfo } from './Icons';
import { ATRIBUTOS_INFO } from '../constants';

interface AtributoProps {
  label: string;
  valor: number;
  onChange: (val: number) => void;
  cor: string;
}

const AtributoCard: React.FC<AtributoProps> = ({ label, valor, onChange, cor }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center group hover:border-sky-500/50 transition-all relative">
      <button 
        onClick={() => setShowInfo(true)}
        className="absolute top-1 right-1 sm:top-2 sm:right-2 text-slate-300 hover:text-sky-500 transition-all"
      >
        <IconInfo className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>

      <span className={`text-[8px] sm:text-[10px] font-black tracking-widest uppercase mb-0.5 sm:mb-1 ${cor}`}>{label}</span>
      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          onClick={() => onChange(Math.max(0, valor - 1))}
          className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-md sm:rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-sky-500 transition-colors text-xs font-bold"
        >
          -
        </button>
        <span className="text-lg sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums leading-none min-w-[1ch] text-center">{valor}</span>
        <button 
          onClick={() => onChange(valor + 1)}
          className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-md sm:rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-sky-500 transition-colors text-xs font-bold"
        >
          +
        </button>
      </div>

      <ModalInfo 
        isOpen={showInfo} 
        onClose={() => setShowInfo(false)} 
        titulo={label} 
        descricao={ATRIBUTOS_INFO[label] || "Atributo do agente."} 
      />
    </div>
  );
};

export default AtributoCard;
