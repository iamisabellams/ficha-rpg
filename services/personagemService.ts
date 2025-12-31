import { supabase } from './supabaseClient';
import { Personagem } from '../types';

// Salvar personagem no banco de dados
export async function salvarPersonagem(usuarioId: string, personagem: Personagem): Promise<{ sucesso: boolean; erro?: string }> {
  try {
    const { error } = await supabase
      .from('personagens')
      .upsert({
        id: personagem.id,
        usuario_id: usuarioId,
        nome: personagem.nome,
        dados: personagem,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'id'
      });

    if (error) {
      console.error('Erro ao salvar personagem:', error);
      return { sucesso: false, erro: error.message };
    }

    return { sucesso: true };
  } catch (error: any) {
    console.error('Erro ao salvar personagem:', error);
    return { sucesso: false, erro: error.message || 'Erro ao salvar personagem' };
  }
}

// Carregar personagem do banco de dados
export async function carregarPersonagem(usuarioId: string): Promise<{ sucesso: boolean; personagem?: Personagem; erro?: string }> {
  try {
    const { data, error } = await supabase
      .from('personagens')
      .select('*')
      .eq('usuario_id', usuarioId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Nenhum personagem encontrado
        return { sucesso: true };
      }
      console.error('Erro ao carregar personagem:', error);
      return { sucesso: false, erro: error.message };
    }

    if (data && data.dados) {
      return { sucesso: true, personagem: data.dados as Personagem };
    }

    return { sucesso: true };
  } catch (error: any) {
    console.error('Erro ao carregar personagem:', error);
    return { sucesso: false, erro: error.message || 'Erro ao carregar personagem' };
  }
}

// Listar todos os personagens do usuário
export async function listarPersonagens(usuarioId: string): Promise<{ sucesso: boolean; personagens?: Personagem[]; erro?: string }> {
  try {
    const { data, error } = await supabase
      .from('personagens')
      .select('*')
      .eq('usuario_id', usuarioId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Erro ao listar personagens:', error);
      return { sucesso: false, erro: error.message };
    }

    const personagens = data?.map(item => item.dados as Personagem) || [];
    return { sucesso: true, personagens };
  } catch (error: any) {
    console.error('Erro ao listar personagens:', error);
    return { sucesso: false, erro: error.message || 'Erro ao listar personagens' };
  }
}

// Deletar personagem
export async function deletarPersonagem(personagemId: string): Promise<{ sucesso: boolean; erro?: string }> {
  try {
    const { error } = await supabase
      .from('personagens')
      .delete()
      .eq('id', personagemId);

    if (error) {
      console.error('Erro ao deletar personagem:', error);
      return { sucesso: false, erro: error.message };
    }

    return { sucesso: true };
  } catch (error: any) {
    console.error('Erro ao deletar personagem:', error);
    return { sucesso: false, erro: error.message || 'Erro ao deletar personagem' };
  }
}

