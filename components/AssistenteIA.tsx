
import React, { useState } from 'react';
import { Personagem } from '../types';
import { consultarOrdo } from '../services/geminiService';

interface Props {
  fechar: () => void;
  personagem: Personagem;
}

const AssistenteIA: React.FC<Props> = ({ fechar, personagem }) => {
  const [mensagem, setMensagem] = useState('');
  const [conversa, setConversa] = useState<{ texto: string; de: 'ia' | 'user' }[]>([]);
  const [carregando, setCarregando] = useState(false);

  const enviar = async () => {
    if (!mensagem.trim() || carregando) return;
    
    const pergunta = mensagem;
    setMensagem('');
    setConversa(prev => [...prev, { texto: pergunta, de: 'user' }]);
    setCarregando(true);

    const resposta = await consultarOrdo(personagem, pergunta);
    setConversa(prev => [...prev, { texto: resposta || '...', de: 'ia' }]);
    setCarregando(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl h-[600px] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-300">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-purple-500 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h2 className="font-bold leading-none">Consultoria da Ordem</h2>
              <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Protocolo IA Gemini-3</p>
            </div>
          </div>
          <button onClick={fechar} className="hover:bg-black/10 p-1 rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-slate-50 dark:bg-slate-950/50">
          {conversa.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
              <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              <p className="text-sm">Agente, do que você precisa?<br/>Peça sugestões de rituais, ajuda com as regras ou ideias para sua história.</p>
            </div>
          )}
          {conversa.map((c, i) => (
            <div key={i} className={`flex ${c.de === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                c.de === 'user' 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}>
                {c.texto}
              </div>
            </div>
          ))}
          {carregando && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <input 
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviar()}
            placeholder="Digite sua dúvida para a Ordem..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none text-sm dark:text-white"
          />
          <button 
            onClick={enviar}
            disabled={carregando}
            className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white p-3 rounded-xl transition-all shadow-lg shadow-purple-500/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistenteIA;
