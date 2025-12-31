
import React, { useState } from 'react';
import { Atributos } from '../types';

interface Props {
  fechar: () => void;
  atributos: Atributos;
}

const RoladorDados: React.FC<Props> = ({ fechar, atributos }) => {
  const [historico, setHistorico] = useState<{ id: number; result: number[]; bonus: number; final: number; label: string }[]>([]);
  const [bonusManual, setBonusManual] = useState(0);

  const rolar = (atrib: keyof Atributos | number, label: string) => {
    const qtdDados = typeof atrib === 'number' ? atrib : atributos[atrib];
    const resultados: number[] = [];
    
    // Em Ordem Paranormal, rola-se N dados e pega o maior. Se 0 dados, rola 2 e pega o menor.
    const numD20 = qtdDados <= 0 ? 2 : qtdDados;
    for (let i = 0; i < numD20; i++) {
      resultados.push(Math.floor(Math.random() * 20) + 1);
    }

    let final = 0;
    if (qtdDados <= 0) {
      final = Math.min(...resultados) + bonusManual;
    } else {
      final = Math.max(...resultados) + bonusManual;
    }

    const novo = { id: Date.now(), result: resultados, bonus: bonusManual, final, label };
    setHistorico([novo, ...historico].slice(0, 5));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-xl font-black italic text-sky-500 uppercase tracking-tighter">Terminal de Dados</h2>
          <button onClick={fechar} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-wrap gap-2">
            {(['FOR', 'AGI', 'INT', 'PRE', 'VIG'] as (keyof Atributos)[]).map(attr => (
              <button 
                key={attr}
                onClick={() => rolar(attr, attr)}
                className="flex-1 min-w-[70px] bg-sky-50 dark:bg-sky-500/10 hover:bg-sky-500 hover:text-white border border-sky-100 dark:border-sky-500/20 px-3 py-3 rounded-xl transition-all font-bold text-sky-600 dark:text-sky-400"
              >
                {attr}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>Bônus Adicional</span>
              <input 
                type="number" 
                value={bonusManual} 
                onChange={(e) => setBonusManual(parseInt(e.target.value) || 0)}
                className="w-16 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-center p-1 focus:ring-sky-500"
              />
            </div>
            
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
              {historico.length === 0 ? (
                <div className="py-8 text-center text-slate-400 italic text-sm">
                  Role os dados para ver os resultados aqui.
                </div>
              ) : (
                historico.map(h => (
                  <div key={h.id} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h.label}</p>
                      <div className="flex gap-1 mt-1">
                        {h.result.map((r, i) => (
                          <span key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-mono font-bold ${r === 20 ? 'bg-sky-500 text-white shadow-lg' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Final</p>
                      <p className="text-2xl font-black text-sky-500 tabular-nums">{h.final}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoladorDados;
