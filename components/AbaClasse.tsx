
import React, { useState } from 'react';
import { Personagem } from '../types';
import { TRILHAS, RITUAIS_BASE } from '../constants';
import { IconShield, IconSave, IconInfo } from './Icons';

interface Props {
  personagem: Personagem;
  atualizarPersonagem: (p: Partial<Personagem>) => void;
}

const AbaClasse: React.FC<Props> = ({ personagem, atualizarPersonagem }) => {
  const [trilhaTemp, setTrilhaTemp] = useState<string | undefined>(undefined);
  
  const trilhasDisponiveis = TRILHAS[personagem.classe] || [];
  const jaTemTrilha = !!personagem.trilha;
  const nexSuficiente = personagem.nex >= 10;
  
  const trilhaAtiva = jaTemTrilha 
    ? trilhasDisponiveis.find(t => t.nome === personagem.trilha)
    : trilhasDisponiveis.find(t => t.nome === trilhaTemp);

  const confirmarTrilha = () => {
    if (!trilhaTemp) return;
    if (window.confirm(`Você selecionou a trilha "${trilhaTemp}". Esta escolha é PERMANENTE e define seu futuro na Ordem. Confirmar especialização?`)) {
      atualizarPersonagem({ trilha: trilhaTemp });
    }
  };

  if (personagem.classe === 'Nenhuma') {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-8 text-center border border-slate-200 dark:border-slate-800 shadow-sm">
        <IconShield className="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
        <h3 className="text-slate-800 dark:text-white font-black uppercase text-sm mb-2">Classe Indefinida</h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
          Defina sua classe no Perfil para desbloquear as especializações da Ordem.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Bloco Principal de Trilha */}
      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${jaTemTrilha ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
              <IconShield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Especialização de {personagem.classe}</h2>
              <p className="text-xs sm:text-sm font-black dark:text-white uppercase italic">
                {jaTemTrilha ? personagem.trilha : (nexSuficiente ? 'Seleção Obrigatória' : 'Aguardando Despertar')}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          {!nexSuficiente ? (
            <div className="py-8 text-center space-y-4">
              <p className="text-slate-500 italic text-xs leading-relaxed max-w-xs mx-auto">
                Você ainda não atingiu o <span className="text-sky-500 font-bold">NEX 10%</span> necessário para escolher sua trilha operacional.
              </p>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden max-w-[200px] mx-auto">
                <div className="bg-sky-500 h-full transition-all duration-1000" style={{ width: `${(personagem.nex / 10) * 100}%` }}></div>
              </div>
            </div>
          ) : jaTemTrilha ? (
            <div className="animate-in fade-in duration-500">
              <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-500/5 border border-sky-500/10 mb-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  {trilhaAtiva?.descricao}
                </p>
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black uppercase text-sky-500 bg-sky-500/10 w-fit px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse"></div>
                Trilha Fixada no Terminal
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl">
                <p className="text-[10px] sm:text-xs text-amber-700 dark:text-amber-400 font-bold uppercase tracking-tight">
                  Ação Necessária: Selecione uma trilha para prosseguir com seu treinamento.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trilhasDisponiveis.map(t => (
                  <button 
                    key={t.nome}
                    onClick={() => setTrilhaTemp(t.nome)}
                    className={`text-left p-4 rounded-xl border-2 transition-all relative group ${
                      trilhaTemp === t.nome 
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10' 
                        : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <h3 className={`font-black uppercase text-[10px] sm:text-xs tracking-tight ${
                      trilhaTemp === t.nome ? 'text-sky-600 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {t.nome}
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                      {t.descricao}
                    </p>
                  </button>
                ))}
              </div>

              {trilhaTemp && (
                <button 
                  onClick={confirmarTrilha}
                  className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-black uppercase text-[10px] py-4 rounded-xl shadow-xl shadow-sky-500/20 transition-all active:scale-95 animate-in slide-in-from-top-2"
                >
                  <IconSave className="w-3 h-3" />
                  Confirmar Especialização
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Grid de Habilidades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30">
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Poderes da Trilha</h3>
          </div>
          <div className="p-4 sm:p-6 space-y-3">
            {trilhaAtiva ? (
              trilhaAtiva.habilidades.map(h => (
                <div key={h.nome} className={`p-4 rounded-xl border-l-4 transition-all ${
                  personagem.nex >= h.nex 
                    ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-500/5' 
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/30 opacity-50'
                }`}>
                  <div className="flex justify-between items-start mb-1.5">
                    <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${
                      personagem.nex >= h.nex ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-800'
                    }`}>
                      NEX {h.nex}%
                    </span>
                    {personagem.nex < h.nex && <span className="text-[8px] font-bold text-slate-400 uppercase">Bloqueado</span>}
                  </div>
                  <h4 className="text-[10px] sm:text-xs font-black dark:text-white uppercase mb-1">{h.nome}</h4>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {h.descricao}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400 italic text-[10px] uppercase tracking-widest">
                Selecione uma trilha para ver seus poderes.
              </div>
            )}
          </div>
        </div>

        {/* Rituais para Ocultista */}
        {personagem.classe === 'Ocultista' && (
          <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-purple-500/10">
              <h3 className="text-[10px] font-black uppercase text-purple-500 tracking-widest">Grimório Ritualístico</h3>
            </div>
            <div className="p-4 sm:p-6 space-y-3">
              {RITUAIS_BASE.map(r => (
                <div key={r.nome} className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-800 dark:text-white text-[10px] sm:text-xs uppercase">{r.nome}</h4>
                    <span className="text-[8px] font-black uppercase text-purple-500 bg-purple-500/10 px-1.5 py-0.5 rounded">
                      {r.elemento} • C1
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-snug">
                    {r.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbaClasse;
