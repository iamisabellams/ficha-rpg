
import { Ritual, Trilha, GrauTreinamento } from './types';

export const ATRIBUTOS_INFO: Record<string, string> = {
  'FOR': 'FORÇA: Luta, Atletismo, Carga física e dano corpo-a-corpo.',
  'AGI': 'AGILIDADE: Pontaria, Furtividade, Reflexos, Pilotagem e Iniciativa.',
  'INT': 'INTELECTO: Investigação, Tecnologia, Medicina, Conhecimento e rituais.',
  'PRE': 'PRESENÇA: Vontade, Diplomacia, Enganação, Percepção e Diplomacia.',
  'VIG': 'VIGOR: Fortitude, Pontos de Vida iniciais e resistência física.'
};

export const BONUS_TREINAMENTO: Record<GrauTreinamento, number> = {
  'Leigo': 0,
  'Treinado': 5,
  'Veterano': 10,
  'Expert': 15
};

export const LISTA_PERICIAS_NOMES = [
  { nome: 'Acrobacia', attr: 'AGI' }, { nome: 'Adestramento', attr: 'PRE' },
  { nome: 'Artes', attr: 'PRE' }, { nome: 'Atletismo', attr: 'FOR' },
  { nome: 'Atualidades', attr: 'INT' }, { nome: 'Ciências', attr: 'INT' },
  { nome: 'Crime', attr: 'AGI' }, { nome: 'Diplomacia', attr: 'PRE' },
  { nome: 'Enganação', attr: 'PRE' }, { nome: 'Fortitude', attr: 'VIG' },
  { nome: 'Furtividade', attr: 'AGI' }, { nome: 'Intimidação', attr: 'PRE' },
  { nome: 'Intuição', attr: 'PRE' }, { nome: 'Investigação', attr: 'INT' },
  { nome: 'Luta', attr: 'FOR' }, { nome: 'Medicina', attr: 'INT' },
  { nome: 'Ocultismo', attr: 'INT' }, { nome: 'Percepção', attr: 'PRE' },
  { nome: 'Pilotagem', attr: 'AGI' }, { nome: 'Pontaria', attr: 'AGI' },
  { nome: 'Religião', attr: 'PRE' }, { nome: 'Reflexos', attr: 'AGI' },
  { nome: 'Sobrevivência', attr: 'INT' }, { nome: 'Tática', attr: 'INT' },
  { nome: 'Tecnologia', attr: 'INT' }, { nome: 'Vontade', attr: 'PRE' }
];

export const TRILHAS: Record<string, Trilha[]> = {
  'Ocultista': [
    {
      nome: 'Lâmina Paranormal',
      descricao: 'Usa o paranormal como uma arma de combate. Mescla conjuração com luta.',
      habilidades: [
        { nex: 10, nome: 'Lâmina Maldita', descricao: 'Proficiência em armas táticas e ritual Amaldiçoar Arma. Usa Ocultismo para ataques.' },
        { nex: 40, nome: 'Fúria Paranormal', descricao: 'Críticos geram PE temporários equivalentes ao limite de PE.' },
        { nex: 65, nome: 'Retaliação Ocultista', descricao: 'Reação: soma Vontade na Defesa. Se erro, contra-ataca com ritual.' },
        { nex: 99, nome: 'Lâmina do Medo', descricao: 'Aprende o ritual Lâmina do Medo.' }
      ]
    },
    {
      nome: 'Protetor',
      descricao: 'Usa o Outro Lado para proteger a si e aliados.',
      habilidades: [
        { nex: 10, nome: 'Último Esforço', descricao: 'Machucado: RD paranormal 2 e +5 Vontade. Ganha PE ao desviar.' },
        { nex: 40, nome: 'Atrair Rituais', descricao: 'Pode redirecionar rituais de aliados para si com teste de Ocultismo.' },
        { nex: 65, nome: 'Protegido pelo Paranormal', descricao: '+10 de Defesa enquanto sustenta rituais.' },
        { nex: 99, nome: 'Proteção do Medo', descricao: 'Aprende o ritual Proteção do Medo.' }
      ]
    },
    {
      nome: 'Flagelador',
      descricao: 'Transforma dor e sacrifício em poder ritualístico.',
      habilidades: [
        { nex: 10, nome: 'O Poder do Flagelo', descricao: 'Pode não recuperar PV no interlúdio para dobrar PE/SAN.' },
        { nex: 40, nome: 'Abraçar a Dor', descricao: 'Gasta PE para absorver dano não paranormal (2 PE para 5 dano).' },
        { nex: 65, nome: 'Sacrificar Vitalidade', descricao: 'Gasta 2 PE e 10 PV para aumentar limite de PE em +4 na cena.' },
        { nex: 99, nome: 'Medo Tangível', descricao: 'Aprende o ritual Medo Tangível.' }
      ]
    },
    {
      nome: 'Brutamonte',
      descricao: 'Focado em força física e resistência bruta. Ganha muito PV.',
      habilidades: [
        { nex: 10, nome: 'Crescimento Inconsciente', descricao: 'Ganha 1d6 PV adicional a cada 5% de NEX.' },
        { nex: 40, nome: 'Pulo de Força', descricao: 'Recebe +5 RD Balístico, Impacto e Perfuração.' },
        { nex: 65, nome: 'Algum Anexo', descricao: 'Ataques em investida falhos permitem atacar alvos adjacentes.' },
        { nex: 99, nome: 'Último Golpe', descricao: 'Dano bônus igual a FOR. Recebe +50 PV, Defesa cai 10.' }
      ]
    }
  ],
  'Combatente': [
    {
      nome: 'Aniquilador',
      descricao: 'Especialista em abater alvos com eficiência. Mestre em sua arma favorita.',
      habilidades: [
        { nex: 10, nome: 'A Favorita', descricao: 'Categoria da arma reduzida em I e ocupa 1 espaço a menos.' },
        { nex: 40, nome: 'Técnica Secreta', descricao: 'Gasta PE para efeitos Amplo ou Destruidor no ataque.' },
        { nex: 65, nome: 'Técnica Sublime', descricao: 'Adiciona efeitos Letal (+2 margem) ou Perfurante (ignora 5 RD).' },
        { nex: 99, nome: 'Máquina de Matar', descricao: 'Arma favorita recebe +2 margem e aumenta passo de dano.' }
      ]
    },
    {
      nome: 'Lutador Amaldiçoado',
      descricao: 'Incorpora rituais no arsenal físico. Usa Vigor como atributo de conjuração.',
      habilidades: [
        { nex: 10, nome: 'Mente e Corpo Sobrenatural', descricao: 'Usa Vigor para DT e sanidade de rituais. Ganha rituais = INT.' },
        { nex: 40, nome: 'Conjurador de Combate', descricao: 'Aprimora rituais de defesa. Conjura Arma Amaldiçoada mais barato.' },
        { nex: 65, nome: 'Contra-ataque Paranormal', descricao: 'Reação: conjura ritual de dano em resposta ao sofrer dano.' },
        { nex: 99, nome: 'Armas do Paranormal', descricao: 'Armas polimórficas. Pode usar rituais como ataque múltiplo.' }
      ]
    },
    {
      nome: 'Duelista',
      descricao: 'Mestre em combater com duas armas simultaneamente.',
      habilidades: [
        { nex: 10, nome: 'Estilo Duas Armas', descricao: 'Usa armas pesadas em par sem penalidade de dados.' },
        { nex: 40, nome: 'Duelo Veloz', descricao: 'Ataques extras por turno iguais à sua Agilidade.' },
        { nex: 65, nome: 'Duelo Solo', descricao: 'Bônus massivo (+2d20) contra inimigo único em x1.' },
        { nex: 99, nome: 'Duelo Final', descricao: 'Crítico 20 natural dobra a Força no dano.' }
      ]
    }
  ],
  'Especialista': [
    {
      nome: 'Virtuoso',
      descricao: 'Mantém a mente intacta e motiva o grupo.',
      habilidades: [
        { nex: 10, nome: 'Tratamento Psicológico', descricao: 'Remove insanidade de aliados no interlúdio.' },
        { nex: 40, nome: 'Presença Motivadora', descricao: 'Aliado fica imune a condições mentais e ganha +5 Vontade.' },
        { nex: 65, nome: 'Mente Blindada', descricao: 'Demora mais para enlouquecer. Chance de evitar insanidade.' },
        { nex: 99, nome: 'Última Motivação', descricao: 'Ignora condições e ganha +10 Vontade em crise.' }
      ]
    },
    {
      nome: 'Atirador de Elite',
      descricao: 'Um tiro, uma morte. Especialista em longa distância.',
      habilidades: [
        { nex: 10, nome: 'Mira de Elite', descricao: 'Soma Intelecto no dano de armas de fogo longas.' },
        { nex: 40, nome: 'Disparo Letal', descricao: 'Gasta PE ao mirar para aumentar margem de ameaça em +2.' },
        { nex: 65, nome: 'Disparo Impactante', descricao: 'Permite manobras derrubar/empurrar com tiro.' },
        { nex: 99, nome: 'Atirar para Matar', descricao: 'Dobra o dano total em acertos críticos.' }
      ]
    },
    {
      nome: 'Infiltrador',
      descricao: 'Mestre da furtividade e ataques letais em alvos distraídos.',
      habilidades: [
        { nex: 10, nome: 'Ataque Furtivo', descricao: 'Causa +1d6 de dano em alvos desprevenidos ou flanqueados.' },
        { nex: 40, nome: 'Gatuno', descricao: '+5 em Atletismo e Crime. Ignora terreno difícil.' },
        { nex: 65, nome: 'Assassinar', descricao: 'Gasto de PE garante acerto crítico contra desprevenido.' },
        { nex: 99, nome: 'Sombra Fugaz', descricao: '+2 na Defesa em penumbra e sem penalidade de movimento.' }
      ]
    }
  ]
};

export const RITUAIS_BASE: Ritual[] = [
  { nome: 'Armadura Hemática', circulo: 1, elemento: 'Sangue', descricao: '+5 na Defesa até o fim da cena.' },
  { nome: 'Decadência', circulo: 1, elemento: 'Morte', descricao: 'Causa 2d8 + INT de dano de Morte.' },
  { nome: 'Revelar o Invisível', circulo: 1, elemento: 'Conhecimento', descricao: 'Revela entidades e ilusões.' },
  { nome: 'Eletrocussão', circulo: 1, elemento: 'Energia', descricao: 'Raio que causa 3d6 de dano.' }
];
