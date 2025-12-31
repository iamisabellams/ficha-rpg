
import React, { useState, useRef } from 'react';
import { Personagem, Atributos, Classe } from '../types';
import AtributoCard from './AtributoCard';
import BarraRecurso from './BarraRecurso';
import Inventario from './Inventario';
import PericiasTab from './PericiasTab';
import ModalInfo from './ModalInfo';
import AbaClasse from './AbaClasse';
import AbaConsulta from './AbaConsulta';
import { IconEdit, IconSave, IconUser, IconTarget, IconBriefcase, IconNote, IconInfo, IconDice, IconShield, IconBook } from './Icons';

interface FichaProps {
  personagem: Personagem;
  atualizarPersonagem: (dados: Partial<Personagem>) => void;
}

type Aba = 'geral' | 'pericias' | 'classe' | 'inventario' | 'notas' | 'consulta';

const FichaPersonagem: React.FC<FichaProps> = ({ personagem, atualizarPersonagem }) => {
  const [abaAtiva, setAbaAtiva] = useState<Aba>('geral');
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [editandoDetalhes, setEditandoDetalhes] = useState(false);
  const [showNEXInfo, setShowNEXInfo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAtributoChange = (attr: keyof Atributos, val: number) => {
    atualizarPersonagem({ atributos: { ...personagem.atributos, [attr]: val } });
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => atualizarPersonagem({ fotoURL: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6 max-w-5xl mx-auto px-1 sm:px-0">
      {/* Perfil Compacto */}
      <div className="bg-white dark:bg-slate-900 rounded-[1.2rem] sm:rounded-[2.5rem] p-3.5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
        <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-8">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-32 sm:h-32 rounded-[1rem] sm:rounded-[2rem] bg-slate-100 dark:bg-slate-800 overflow-hidden border-2 sm:border-4 border-sky-500/20 shadow-xl">
              <img src={personagem.fotoURL} className="w-full h-full object-cover" alt="Avatar" />
            </div>
            <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-1 -right-1 bg-sky-500 text-white p-1 rounded-md border-2 border-white dark:border-slate-900">
              <IconEdit className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFotoUpload} />
          </div>

          <div className="flex-1 space-y-3 sm:space-y-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2">
              <div className="space-y-0.5 text-center sm:text-left">
                {editandoPerfil ? (
                  <div className="space-y-2 w-full max-w-xs mx-auto sm:mx-0">
                    <input value={personagem.nome} onChange={e => atualizarPersonagem({ nome: e.target.value })} className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-1.5 font-black dark:text-white uppercase text-xs" />
                    <div className="flex gap-2">
                      <select value={personagem.classe} onChange={e => atualizarPersonagem({ classe: e.target.value as Classe })} className="bg-slate-100 dark:bg-slate-800 rounded-lg px-2 py-1 text-[9px] font-bold dark:text-white border-none flex-1">
                        <option value="Nenhuma">Nenhuma</option>
                        <option value="Combatente">Combatente</option>
                        <option value="Especialista">Especialista</option>
                        <option value="Ocultista">Ocultista</option>
                      </select>
                      <input type="number" value={personagem.nex} onChange={e => atualizarPersonagem({ nex: parseInt(e.target.value) || 0 })} className="w-8 bg-slate-100 dark:bg-slate-800 rounded-lg font-black text-[9px] text-sky-500 text-center border-none" />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-base sm:text-3xl font-black dark:text-white uppercase tracking-tighter truncate max-w-[200px]">{personagem.nome}</h1>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                      <div className="flex items-center gap-1 bg-sky-50 dark:bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-100 dark:border-sky-500/20">
                        <span className="text-[7px] sm:text-[10px] font-black text-sky-500 uppercase">NEX {personagem.nex}%</span>
                        <button onClick={() => setShowNEXInfo(true)} className="text-sky-300 hover:text-sky-500"><IconInfo className="w-2.5 h-2.5 sm:w-3 sm:h-3" /></button>
                      </div>
                      <span className="text-[8px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{personagem.classe}</span>
                    </div>
                  </>
                )}
              </div>
              <button onClick={() => setEditandoPerfil(!editandoPerfil)} className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-2xl text-[8px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${editandoPerfil ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-sky-500'}`}>
                {editandoPerfil ? <IconSave className="w-3 h-3 sm:w-4 sm:h-4" /> : <IconEdit className="w-3 h-3 sm:w-4 sm:h-4" />} {editandoPerfil ? 'Salvar' : 'Perfil'}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6">
              <BarraRecurso label="PV" cor="bg-rose-500" atual={personagem.pv.atual} max={personagem.pv.max} onChange={v => atualizarPersonagem({ pv: { ...personagem.pv, atual: v }})} info="Pontos de Vida." />
              <BarraRecurso label="SAN" cor="bg-purple-500" atual={personagem.san.atual} max={personagem.san.max} onChange={v => atualizarPersonagem({ san: { ...personagem.san, atual: v }})} info="Sanidade." />
              <BarraRecurso label="PE" cor="bg-amber-400" atual={personagem.pe.atual} max={personagem.pe.max} onChange={v => atualizarPersonagem({ pe: { ...personagem.pe, atual: v }})} info="Pontos de Esforço." />
            </div>
          </div>
        </div>
      </div>

      {/* Navegação Compacta Sticky */}
      <div className="flex justify-start sm:justify-center bg-white dark:bg-slate-900 p-1 rounded-[0.8rem] sm:rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto no-scrollbar gap-1 sticky top-1 sm:top-4 z-40 mx-1">
        {[
          { id: 'geral', label: 'Geral', icon: <IconUser className="w-3 h-3 sm:w-4 sm:h-4" /> },
          { id: 'pericias', label: 'Perícias', icon: <IconTarget className="w-3 h-3 sm:w-4 sm:h-4" /> },
          { id: 'classe', label: 'Classe', icon: <IconShield className="w-3 h-3 sm:w-4 sm:h-4" /> },
          { id: 'inventario', label: 'Itens', icon: <IconBriefcase className="w-3 h-3 sm:w-4 sm:h-4" /> },
          { id: 'notas', label: 'Notas', icon: <IconNote className="w-3 h-3 sm:w-4 sm:h-4" /> },
          { id: 'consulta', label: 'Manual', icon: <IconBook className="w-3 h-3 sm:w-4 sm:h-4" /> }
        ].map(aba => (
          <button 
            key={aba.id} 
            onClick={() => setAbaAtiva(aba.id as Aba)} 
            className={`px-3 py-2 sm:px-6 sm:py-4 rounded-[0.6rem] sm:rounded-[1.5rem] text-[7px] sm:text-[10px] font-black transition-all uppercase tracking-widest flex items-center gap-1.5 flex-shrink-0 ${abaAtiva === aba.id ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-sky-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            {aba.icon} <span className="hidden md:inline">{aba.label}</span>
          </button>
        ))}
        <button onClick={() => (window as any).abrirRoladorExterno()} className="px-3 py-2 sm:px-6 sm:py-4 rounded-[0.6rem] sm:rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 text-sky-500 hover:bg-sky-500 hover:text-white transition-all">
          <IconDice className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pb-12">
        {abaAtiva === 'geral' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8">
            <div className="lg:col-span-5 grid grid-cols-2 gap-2 sm:gap-5">
              <AtributoCard label="FOR" valor={personagem.atributos.FOR} onChange={v => handleAtributoChange('FOR', v)} cor="text-orange-500" />
              <AtributoCard label="AGI" valor={personagem.atributos.AGI} onChange={v => handleAtributoChange('AGI', v)} cor="text-sky-500" />
              <AtributoCard label="INT" valor={personagem.atributos.INT} onChange={v => handleAtributoChange('INT', v)} cor="text-indigo-500" />
              <AtributoCard label="PRE" valor={personagem.atributos.PRE} onChange={v => handleAtributoChange('PRE', v)} cor="text-emerald-500" />
              <div className="col-span-2"><AtributoCard label="VIG" valor={personagem.atributos.VIG} onChange={v => handleAtributoChange('VIG', v)} cor="text-rose-500" /></div>
            </div>
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[1.2rem] sm:rounded-[2.5rem] p-4 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b dark:border-slate-800 pb-2.5">
                <h2 className="text-[10px] sm:text-lg font-black uppercase dark:text-white tracking-widest">Registros de Agente</h2>
                <button onClick={() => setEditandoDetalhes(!editandoDetalhes)} className={`flex items-center gap-1 px-2 py-1 rounded text-[8px] font-black uppercase ${editandoDetalhes ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  {editandoDetalhes ? 'Salvar' : 'Editar'}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8">
                {['origem', 'patente', 'defesa', 'esquiva'].map(field => (
                  <div key={field} className="space-y-0.5 sm:space-y-2">
                    <label className="text-[7px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">{field}</label>
                    {editandoDetalhes ? (
                      <input value={(personagem as any)[field]} onChange={e => atualizarPersonagem({ [field]: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-2 py-1.5 dark:text-white font-bold text-[10px]" />
                    ) : (
                      <p className="px-2 py-1.5 bg-slate-50 dark:bg-slate-800/30 rounded-lg font-bold dark:text-white text-[11px] sm:text-base">{(personagem as any)[field]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {abaAtiva === 'pericias' && <PericiasTab pericias={personagem.pericias} atualizarPericias={p => atualizarPersonagem({ pericias: p })} />}
        {abaAtiva === 'classe' && <AbaClasse personagem={personagem} atualizarPersonagem={atualizarPersonagem} />}
        {abaAtiva === 'inventario' && <Inventario items={personagem.inventario} atualizarInventario={i => atualizarPersonagem({ inventario: i })} />}
        {abaAtiva === 'notas' && (
          <div className="bg-white dark:bg-slate-900 rounded-[1.2rem] sm:rounded-[2.5rem] p-4 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm h-[300px] sm:h-[600px] flex flex-col">
            <h2 className="text-[10px] sm:text-lg font-black uppercase dark:text-white mb-3">Diário de Campo</h2>
            <textarea value={personagem.notas} onChange={e => atualizarPersonagem({ notas: e.target.value })} className="flex-1 bg-slate-50 dark:bg-slate-800/30 rounded-xl p-4 focus:ring-1 focus:ring-sky-500 border-none outline-none resize-none dark:text-slate-300 text-[11px] sm:text-sm font-medium leading-relaxed" placeholder="Anote as pistas da investigação..." />
          </div>
        )}
        {abaAtiva === 'consulta' && <AbaConsulta />}
      </div>
      <ModalInfo isOpen={showNEXInfo} onClose={() => setShowNEXInfo(false)} titulo="NEX" descricao="Nível de Exposição Paranormal. Representa o quanto da membrana o agente já perfurou e o quanto de poder (e perigo) ele carrega." />
    </div>
  );
};

export default FichaPersonagem;
