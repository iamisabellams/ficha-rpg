
export type Classe = 'Combatente' | 'Especialista' | 'Ocultista' | 'Nenhuma';
export type GrauTreinamento = 'Leigo' | 'Treinado' | 'Veterano' | 'Expert';

export interface Atributos {
  FOR: number;
  AGI: number;
  INT: number;
  PRE: number;
  VIG: number;
}

export interface Recurso {
  atual: number;
  max: number;
}

export interface Habilidade {
  nome: string;
  descricao: string;
  nex: number;
}

export interface Trilha {
  nome: string;
  descricao: string;
  habilidades: Habilidade[];
}

export interface Ritual {
  nome: string;
  circulo: number;
  elemento: 'Sangue' | 'Morte' | 'Conhecimento' | 'Energia' | 'Medo' | 'Intenção';
  descricao: string;
}

export interface Item {
  id: string;
  nome: string;
  espacos: number;
  categoria: number;
  descricao: string;
}

export interface Pericia {
  nome: string;
  treinamento: GrauTreinamento;
  atributo: keyof Atributos;
}

export interface Personagem {
  id: string;
  nome: string;
  jogador: string;
  origem: string;
  classe: Classe;
  trilha?: string;
  nex: number;
  patente: string;
  atributos: Atributos;
  pv: Recurso;
  san: Recurso;
  pe: Recurso;
  defesa: number;
  esquiva: number;
  pericias: Pericia[];
  inventario: Item[];
  rituais: Ritual[];
  notas: string;
  fotoURL: string;
}
