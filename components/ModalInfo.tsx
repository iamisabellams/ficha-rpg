
import React from 'react';

interface ModalInfoProps {
  titulo: string;
  descricao: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalInfo: React.FC<ModalInfoProps> = ({ titulo, descricao, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-sky-50 dark:bg-sky-500/10 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">{titulo}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-8">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
            {descricao}
          </p>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 text-center">
          <button 
            onClick={onClose}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;
