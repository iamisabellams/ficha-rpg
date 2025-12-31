
import React, { useState } from 'react';
import ModalInfo from './ModalInfo';
import { IconInfo } from './Icons';

interface BarraProps {
  label: string;
  cor: string;
  atual: number;
  max: number;
  onChange: (val: number) => void;
  info: string;
}

const BarraRecurso: React.FC<BarraProps> = ({ label, cor, atual, max, onChange, info }) => {
  const [showInfo, setShowInfo] = useState(false);
  const porcentagem = (atual / max) * 100;
  
  return (
    <div className="space-y-1 sm:space-y-1.5 group">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-1">
          <span className="text-[8px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</span>
          <button 
            onClick={() => setShowInfo(true)}
            className="opacity-100 sm:opacity-0 group-hover:opacity-100 text-slate-300 hover:text-sky-500 transition-all"
          >
            <IconInfo className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <input 
            type="number" 
            value={atual} 
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            className="w-7 sm:w-10 bg-slate-100 dark:bg-slate-800 rounded px-0.5 sm:px-1 text-right font-black text-xs sm:text-sm focus:ring-1 focus:ring-sky-500 border-none p-0 dark:text-white transition-colors"
          />
          <span className="text-[9px] sm:text-xs text-slate-400 font-bold">/ {max}</span>
        </div>
      </div>
      <div className="h-2 sm:h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
        <div 
          className={`h-full ${cor} transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]`} 
          style={{ width: `${Math.min(100, Math.max(0, porcentagem))}%` }}
        />
      </div>

      <ModalInfo 
        isOpen={showInfo} 
        onClose={() => setShowInfo(false)} 
        titulo={label} 
        descricao={info} 
      />
    </div>
  );
};

export default BarraRecurso;
