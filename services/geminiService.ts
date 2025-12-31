
import { GoogleGenAI } from "@google/genai";
import { Personagem } from "../types";

export async function consultarOrdo(personagem: Personagem, pergunta: string) {
  // Fix: Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key from the environment.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    Você é a inteligência artificial do sistema de RPG "Ordem Paranormal". 
    Sua função é auxiliar o jogador com base na sua ficha e no cenário do jogo.
    Seja conciso, direto e use o clima de mistério e investigação do RPG.
    Fale como se fosse um analista da Ordo Realitas (a Ordem).
    
    Dados atuais do agente:
    Nome: ${personagem.nome}
    Classe: ${personagem.classe}
    Origem: ${personagem.origem}
    Atributos: FOR ${personagem.atributos.FOR}, AGI ${personagem.atributos.AGI}, INT ${personagem.atributos.INT}, PRE ${personagem.atributos.PRE}, VIG ${personagem.atributos.VIG}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: pergunta,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });
    
    // Fix: Accessed .text property directly (it's not a method) to extract text output from GenerateContentResponse.
    return response.text;
  } catch (error) {
    console.error("Erro ao consultar Gemini:", error);
    return "Desculpe, a conexão com o servidor da Ordo foi interrompida.";
  }
}
