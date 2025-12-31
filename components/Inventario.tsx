
import React from 'react';
import { Item } from '../types';

interface Props {
  items: Item[];
  atualizarInventario: (items: Item[]) => void;
}

const Inventario: React.FC<Props> = ({ items, atualizarInventario }) => {
  const totalEspacos = items.reduce((acc, curr) => acc + curr.espacos, 0);

  const adicionarItem = () => {
    const novo: Item = { id: Date.now().toString(), nome: 'Novo Item', espacos: 1, categoria: 0, descricao: '' };
    atualizarInventario([...items, novo]);
  };

  const removerItem = (id: string) => {
    atualizarInventario(items.filter(i => i.id !== id));
  };

  const editItem = (id: string, field: keyof Item, val: any) => {
    atualizarInventario(items.map(i => i.id === id ? { ...i, [field]: val } : i));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/20">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-black uppercase tracking-tighter dark:text-white flex items-center gap-2">
            <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
            Inventário
          </h2>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
            {totalEspacos} Espaços
          </span>
        </div>
        <button onClick={adicionarItem} className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-xl transition-all shadow-lg shadow-sky-500/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>
      
      <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto no-scrollbar">
        {items.length === 0 ? (
          <div className="text-center py-10 text-slate-400 italic text-sm">Seu inventário está vazio.</div>
        ) : (
          items.map(item => (
            <div key={item.id} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 space-y-3 group">
              <div className="flex items-center gap-3">
                <input 
                  value={item.nome} 
                  onChange={e => editItem(item.id, 'nome', e.target.value)}
                  className="flex-1 bg-transparent border-none font-bold text-slate-800 dark:text-white focus:ring-0 p-0"
                  placeholder="Nome do Item"
                />
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                   <span className="text-[10px] font-black text-slate-400 uppercase">Espaços</span>
                   <input 
                    type="number" 
                    value={item.espacos} 
                    onChange={e => editItem(item.id, 'espacos', parseInt(e.target.value) || 0)}
                    className="w-8 bg-transparent border-none font-black text-xs text-sky-500 focus:ring-0 p-0 text-center"
                   />
                </div>
                <button onClick={() => removerItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
              <textarea 
                value={item.descricao}
                onChange={e => editItem(item.id, 'descricao', e.target.value)}
                placeholder="Descrição e efeitos do item..."
                className="w-full bg-transparent border-none text-xs text-slate-500 dark:text-slate-400 focus:ring-0 p-0 resize-none min-h-[40px]"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inventario;
