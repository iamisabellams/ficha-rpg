
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
      descricao: 'Alguns ocultistas preferem ficar fechados em suas bibliotecas estudando livros e rituais. Outros preferem investigar fenômenos paranormais em sua fonte. Já você, prefere usar o paranormal como uma arma. Você aprendeu e dominou técnicas de luta mesclando suas habilidades de conjuração com suas capacidades de combate.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Lâmina Maldita', 
          descricao: 'Você recebe proficiência em armas táticas e aprende o ritual *Amaldiçoar Arma*. Se já o conhece, seu custo é reduzido em –1 PE. Além disso, quando conjura esse ritual, você pode usar Ocultismo, em vez de Luta ou Pontaria, para testes de ataque com a arma amaldiçoada.' 
        },
        { 
          nex: 40, 
          nome: 'Fúria Paranormal', 
          descricao: 'Sempre que acerta um ataque crítico em um inimigo, você recebe PE temporários equivalentes ao seu limite de PE. PE temporários desaparecem no final da cena.' 
        },
        { 
          nex: 65, 
          nome: 'Retaliação Ocultista', 
          descricao: 'Ao ser alvo de um ataque, você pode usar sua reação e 3 PE para somar sua vontade à sua defesa. Se o inimigo errar, você pode conjurar um ritual como contra-ataque (os 3 PE gastos para usar esse poder contam no limite de PE ao conjurar o ritual).' 
        },
        { 
          nex: 99, 
          nome: 'Lâmina do Medo', 
          descricao: 'Você aprende o ritual *Lâmina do Medo*.' 
        }
      ]
    },
    {
      nome: 'Protetor',
      descricao: 'Muitos ocultistas ficam cegos com o poder que o paranormal oferece, usando-o apenas como uma arma, que pode atingi-los eventualmente. Você usa o outro lado como uma proteção para si e seus aliados, explorando esse poder misterioso sem morrer no processo.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Último Esforço', 
          descricao: 'Ao ficar machucado, você recebe resistência a dano paranormal 2 e +5 em vontade até sair da condição. Enquanto estiver nesse estado, toda vez que conseguir desviar de um ataque, você ganha 1 PE. Em NEX 30%, aumenta a resistência a dano paranormal para 5 e em NEX 60% aumenta para 10.' 
        },
        { 
          nex: 40, 
          nome: 'Atrair Rituais', 
          descricao: 'Você pode atrair rituais que tenham como alvo 1 ser ou seres escolhidos (incluindo rituais que tenham alcance "toque"), fazendo com que seus efeitos sejam aplicados em você ao invés do alvo original. Você deve gastar 2 PE +2 por círculo do ritual e fazer um teste de ocultismo com um bônus de +5 contra a DT de rituais do conjurador. Se passar, os efeitos são aplicados em você. Você só pode usar esta habilidade no momento da conjuração e ela não funciona contra rituais de Medo.' 
        },
        { 
          nex: 65, 
          nome: 'Protegido pelo Paranormal', 
          descricao: 'Enquanto estiver sustentando a duração de um ritual, você pode gastar 3 PE no início do turno para receber +10 de defesa até o fim do ritual.' 
        },
        { 
          nex: 99, 
          nome: 'Proteção do Medo', 
          descricao: 'Você aprende o ritual *Proteção do Medo*.' 
        }
      ]
    },
    {
      nome: 'Flagelador',
      descricao: 'A dor é um poderoso catalisador paranormal e você aprendeu a transformá-la em poder para seus rituais. Para você, seu corpo é apenas uma moeda de troca que você negocia com o outro lado.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'O Poder do Flagelo', 
          descricao: 'Em uma cena de interlúdio, você pode absorver a dor dos ferimentos e focar na sua mente. Ao realizar a ação dormir em um interlúdio, você pode escolher não recuperar PV e receber o dobro de PE ou SAN caso use a outra ação para relaxar. Além disso, uma vez por cena, ao ficar machucado, você recebe 3x VIG em PE temporários.' 
        },
        { 
          nex: 40, 
          nome: 'Abraçar a Dor', 
          descricao: 'Sempre que sofrer dano não paranormal, você pode gastar PE para não perder vida e absorver o dano, ao custo de 2 PE a cada 5 de dano.' 
        },
        { 
          nex: 65, 
          nome: 'Sacrificar Vitalidade', 
          descricao: 'Você pode gastar 2 PE e 10 PV para aumentar em +4 o seu limite de PE por uma cena.' 
        },
        { 
          nex: 99, 
          nome: 'Medo Tangível', 
          descricao: 'Você aprende o ritual *Medo Tangível*.' 
        }
      ]
    },
    {
      nome: 'Brutamonte',
      descricao: 'Você é comum, uma trilha que ajuda um pouco pessoas que não querem ser grupo de conjurar armas. Além disso, você se aproveita da fraqueza física.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Crescimento Inconsciente', 
          descricao: 'A cada 5 de NEX, jogue 1d6 e receba +1d6 de PV adicional (se cair em quantidade de PV adicional que você já possui, role novamente). Além disso, você recebe +1 PV a cada 2% de NEX.' 
        },
        { 
          nex: 40, 
          nome: 'Pulo de Força', 
          descricao: 'Você recebe +5 de RD Balístico e +5 de RD Impacto de Perfuração. Além disso, você também recebe +5 de RD de Elementos escolhidos em Ensinamentos do Outro Lado.' 
        },
        { 
          nex: 65, 
          nome: 'Algum Anexo', 
          descricao: 'Quando você faz um ataque em investida que falha, você pode atacar todos os alvos que ficam adjacentes a você até o início do seu próximo turno.' 
        },
        { 
          nex: 99, 
          nome: 'Último Golpe', 
          descricao: 'Você automaticamente ganha um bônus de dano igual ao seu valor de Força. Sua defesa diminui em 10, mas você recebe +5 de fortitude e +50 PV.' 
        }
      ]
    },
    {
      nome: 'Terrorista Oculto',
      descricao: 'Você é responsável pelas práticas terroristas do ocultismo, espalhando medo para enfraquecer a mente. Sua especialidade é causar terror e desestabilizar o psicológico.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Fuga da Memória', 
          descricao: 'Você pode gastar uma ação de interlúdio para enfraquecer a memória local em um alvo vivo. Com sucesso de ocultismo, você causa 1d6 de dano mental e o alvo sofre perda de PE. Além disso, quando você causa dano de medo, recebe PE temporários.' 
        },
        { 
          nex: 40, 
          nome: 'Vinculação', 
          descricao: 'Você aprende o ritual *Invocar Criatura* do elemento escolhido em Ensinamentos do Outro Lado.' 
        },
        { 
          nex: 65, 
          nome: 'Fortificar Conjuração', 
          descricao: 'Quando está em um combate em um ambiente com medo, você recebe +2 em vontade e +2 em ocultismo, além de receber 2 PE temporários por turno.' 
        },
        { 
          nex: 99, 
          nome: 'Conhecendo o Medo', 
          descricao: 'Você aprende o ritual *Conhecendo o Medo*.' 
        }
      ]
    },
    {
      nome: 'Cozinheiro Paranormal',
      descricao: 'Quase todos os ocultistas estudam por suas vidas todas, como conjurar rituais insanamente poderosos, com efeitos bizarros e insanamente destrutivos... Já você... focou em descobrir como fazer maravilhas usando seus conhecimentos ocultos e poderes sobrenaturais. Cozinheiros paranormais são ocultistas que usam seus conhecimentos paranormais não para conjurar rituais, mas sim para preparar, criar e recriar receitas insanamente poderosas e deliciosas.',
      requisitoEspecial: 'Para escolher essa trilha, você precisa ser treinado em Ofício (cozinha ou outro que faça sentido).',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Receitas do Outro Lado', 
          descricao: 'Você aprende duas Receitas Paranormais, e aprende uma nova receita a cada 10% de NEX.' 
        },
        { 
          nex: 40, 
          nome: 'Sempre Cabe Mais Um', 
          descricao: 'Você pode levar uma quantidade de receitas prontas com você igual ao seu Intelecto, em vez de seu valor de INT. Aumenta o dano de uma das receitas em 1D.' 
        },
        { 
          nex: 65, 
          nome: 'Chefe do Outro Lado', 
          descricao: 'A DT para preparar receitas do seu elemento de afinidade é reduzida em -2 e você não gasta componentes para usá-las. Aumenta o dano de uma das receitas em +1D.' 
        },
        { 
          nex: 99, 
          nome: 'Maravilhas do Outro Lado', 
          descricao: 'Você Aprende o ritual "Maravilhas do Outro Lado" e o dano Aumenta o dano de uma das receitas em 1D.' 
        }
      ]
    },
    {
      nome: 'Fortalecido',
      descricao: 'Você se conecta com o outro lado de forma mais intensa que outros ocultistas, podendo manipulá-lo à sua vontade. Seus processos podem parecer demorados, mas seus resultados são extremamente poderosos.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Meditação Paranormal', 
          descricao: 'Em uma cena de interlúdio, você pode gastar uma ação para se concentrar e focar no outro lado, ganhando um bônus de +1d6 na sua DT de rituais por uma cena que pode ser usado até o fim da missão. Você pode acumular um número máximo de bônus igual à sua Presença, mas só pode usar um deles por cena.' 
        },
        { 
          nex: 40, 
          nome: 'Amaldiçoar', 
          descricao: 'Você aprende o ritual *Corrupção Maldita*.' 
        },
        { 
          nex: 65, 
          nome: 'Reaproveitar Potencial', 
          descricao: 'Ao tentar conjurar em condições ruins, mesmo que o ritual não funcione, você não perde todos os esforços. Além disso, quando um inimigo resistir a um ritual seu, você pode repetir os mesmos gastos e esforços na conjuração.' 
        },
        { 
          nex: 99, 
          nome: 'O Poder do Medo', 
          descricao: 'Você aprende o ritual *Poder do Medo*.' 
        }
      ]
    }
  ],
  'Combatente': [
    {
      nome: 'Aniquilador',
      descricao: 'Você é treinado para abater alvos com eficiência e velocidade. Suas armas são suas melhores amigas e você cuida tão bem delas quanto de seus companheiros de equipe. Talvez até melhor.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'A Favorita', 
          descricao: 'Escolha uma de suas armas para ser sua arma favorita. A categoria da arma escolhida é reduzida em I e ela ocupa 1 espaço a menos em seu inventário (mínimo de 0 espaço). Em NEX 40%, a categoria é reduzida em II, em 65% reduzida em III e em 99% reduzida em IV (mínimo de 0).' 
        },
        { 
          nex: 40, 
          nome: 'Técnica Secreta', 
          descricao: 'Quando faz um ataque com sua arma favorita, você pode gastar 2 PE para executar um dos efeitos abaixo como parte do ataque. Você pode adicionar mais efeitos gastando +2 PE por efeito adicional. *Amplo*: O ataque pode atingir um alvo adicional em seu alcance e adjacente ao original (use o mesmo teste de ataque para ambos). *Destruidor*: Aumenta o multiplicador de crítico da arma em +1.' 
        },
        { 
          nex: 65, 
          nome: 'Técnica Sublime', 
          descricao: 'Você adiciona os seguintes efeitos à lista de sua Técnica Secreta: *Letal*: Aumenta a margem de ameaça em +2. Você pode escolher este efeito até duas vezes para aumentar a margem de ameaça em +5. *Perfurante*: Ignora até 5 pontos de redução de dano de qualquer tipo do alvo.' 
        },
        { 
          nex: 99, 
          nome: 'Máquina de Matar', 
          descricao: 'Sua arma favorita recebe +2 na margem de ameaça e seu dano aumenta em um passo.' 
        }
      ]
    },
    {
      nome: 'Lutador Amaldiçoado',
      descricao: 'Às vezes, a mera técnica e poder físico não é suficiente na luta contra o paranormal e os lutadores amaldiçoados entendem bem isso, incorporando rituais em seu arsenal. Esses combatentes tiveram que refinar sua mente conforme utilizavam da dor causada pelo paranormal como arma.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Mente e Corpo Sobrenatural', 
          descricao: 'A dor física e a adrenalina do combate é o seu combustível para rituais: Você aprende um número de rituais igual ao seu Intelecto, mas ao conjurar, você utiliza Vigor como atributo base para o teste de sanidade e para definir a DT dos seus rituais. Ademais, quando você transcende, você ganha +2 RD mental níveis e te adiciona Vigor a partir de agora quando aumentar seus Pontos de Esforço em NEXs pares.' 
        },
        { 
          nex: 40, 
          nome: 'Conjurador de Combate', 
          descricao: 'Os seus rituais voltados para defesa e combate são aprimorados: Quando conjurar um ritual que se conclua em uma Ação, você pode gastar 3PE para aumentar tal bônus em +2 (não se aumenta o efeito do ritual). Além disso, rituais que precisem de concentração, como *Desarmar* ou *Decadência mental*, não precisam de testes adicionais. Já rituais que modificam armas, como *Arma do amaldiçoado*, têm uma redução de custo reduzida em -1PE. Caso não tenha o ritual *Arma do amaldiçoado*, você pode conjurar qualquer ritual que use em 2PE (o desconto de -1PE não se aplica aqui) para conjurar como ação livre.' 
        },
        { 
          nex: 65, 
          nome: 'Contra-ataque Paranormal', 
          descricao: 'Quando sofre dano, você pode usar uma reação defensiva para conjurar um ritual que cause dano com resposta ao seu atacante, desde que ele esteja ao alcance médio.' 
        },
        { 
          nex: 99, 
          nome: 'Armas do Paranormal', 
          descricao: 'Suas armas são tocadas pelo Medo e pelo paranormal, toda arma que você empunha tem um ritual específico que pode conjurar, que modifica a arma e a polimorfia de forma única. Você pode escolher um ritual de modificação de arma e polimorfia para cada arma que empunhar. Além disso, você pode conjurar rituais como ação livre, desde que tenha sofrido dano no turno anterior. Se você tiver o ritual *Arma do amaldiçoado*, pode "utilizar rituais como ataque múltiplo", ou seja, se você tiver 3 ataques por turno, os dados do ritual também são multiplicados, o crítico sempre será 2x.' 
        }
      ]
    },
    {
      nome: 'Duelista',
      descricao: 'Você é um combatente especializado em combater com duas armas ao mesmo tempo, sua maestria com suas armas é invejável, e seus ataques são letais.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Estilo Duas Armas', 
          descricao: 'Você aprende o poder "Combater com Duas Armas", mas com a exceção de que você pode usar armas pesadas e não sofrer a penalidade de -1d20. *Pré-requisitos:* Agi 3, For 3, e treinado em luta.' 
        },
        { 
          nex: 40, 
          nome: 'Duelo Veloz', 
          descricao: 'Você pode fazer um número de ataques extras por turno igual à sua Agilidade, mas esses ataques precisam ser ataques normais.' 
        },
        { 
          nex: 65, 
          nome: 'Duelo Solo', 
          descricao: 'Sempre que você estiver enfrentando apenas um inimigo no mano a mano, você recebe +2d20 para atacá-lo e o inimigo vai sempre estar desprevenido contra seus ataques.' 
        },
        { 
          nex: 99, 
          nome: 'Duelo Final', 
          descricao: 'Quando faz um acerto crítico (20 natural) com suas armas corpo a corpo, o seu multiplicador de crítico aumenta em +1, e sua Força é dobrada no dano.' 
        }
      ]
    },
    {
      nome: 'Mercenário',
      descricao: 'Um tiro, uma morte, quem sabe até mais. Você não tem medo de morrer e treinou para que isso não acontecesse, ou pelo menos não tão cedo. Armas de fogo, armas brancas, explosivos e artes marciais fazem parte do arsenal e são a sua especialidade. Você acha estranho que os outros tenham medo do outro lado — na verdade, você pensa que deveria ser o contrário.',
      requisitoEspecial: 'Para escolher esta trilha, você deve ter a origem militar ou policial. Caso não seja o caso, deve ser treinado por alguém que as possua ou por alguém que seja expert nas perícias Luta, Pontaria e Tática.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Queridinha do papai', 
          descricao: 'Você treinou e se especializou em diversos tipos de armas, mas você tem a sua favorita e é com essa que você tem total habilidade. Você escolhe uma arma, não importa o tipo, você recebe +1D com a arma que escolheu e agora é capaz de atirar usando seu Intelecto.' 
        },
        { 
          nex: 40, 
          nome: 'Carregado e preparado', 
          descricao: 'Seu arsenal é imenso e você precisa de espaço. Seu inventário passa a ser somado pela sua Força e Intelecto conjuntamente. Além disso, você carrega consigo 1 unidade de todos os modificadores aprimorados. Você pode os equipar como ação completa, mas seus companheiros só podem os equipar em cenas de interlúdio.' 
        },
        { 
          nex: 65, 
          nome: 'Escolhido pelo outro lado', 
          descricao: 'O Outro Lado te escolheu para portar a mais pura representação do que eles chamam de elementos. Você deve escolher um dos bônus abaixo: *SANGUE*: Você foi escolhido pela entidade do Sangue. Sua arma favorita representa tudo que este elemento acredita: ódio, amor, fome, raiva. Sua arma é encoberta pelo sangue e pode mudar de forma, além disso ela se torna indestrutível. Ao acertar um valor crítico, o alvo toma 2d6 de dano hemorrágico até o fim da cena e você recebe este dano em PV. *MORTE*: Você foi escolhido pela entidade da Morte. Sua arma representa tudo que este elemento acredita: lodo, tempo, espirais. O tempo para esta arma é totalmente desregulado — menos para você, que se torna o único que pode a empunhar. Enquanto porta esta arma, o usuário pode prender a respiração por 5 segundos. Ao fazer isso, o tempo ao seu redor para. Afinal, a entidade te permite. Você pode atirar com uma ação de movimento. *CONHECIMENTO*: Você foi escolhido pela entidade do Conhecimento. Sua arma favorita representa tudo que este elemento acredita: desespero, consciência, a própria mente. Sua arma se torna capaz de atingir a mente do alvo. Ao acertar um valor crítico, o atirador pode usar 5 PE para atribuir uma condição psicológica ao alvo. *ENERGIA*: Você foi escolhido pela entidade da Energia. Sua arma favorita representa tudo que este elemento acredita: desordem, fogo, caos, água, vento. O caos te escolheu — e você é o caos. A energia da sua arma favorita é ampliada. Além disso, você é o único que pode a empunhar. Caso acerte um valor crítico, adicione 2d6 de dano. O caos é incontrolável, e você pode usar 5 PE para aumentar todo o dano da energia. As condições atribuídas são escolhidas pelo mestre.' 
        }
      ]
    },
    {
      nome: 'Comandante dos Mares',
      descricao: 'Ninguém conhece mais os perigos do mar como você, sabendo lidar com navios inimigos e perigos paranormais em meio ao oceano com maior rapidez.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Tática dos Mares', 
          descricao: 'Sempre que entrar em batalhas navais e você estiver em meio à tripulação, você comanda a arte da guerra, comandando as ações do navio. Por ser um jogador a comandar, você recebe adicionais do que seria um NPC comandando. Você recebe a habilidade de comandar, podendo ordenar todas as ações de combate de um navio, menos a ação de movimento. Além disso, recebe bônus adicionais em três desses principais comandos: *Fogo*: A tripulação efetua um disparo fervoroso com os canhões do navio. Uma vez por turno, pode gastar 2 PE para aumentar em +1D o dano dos canhões ou do morteiro. *Protejam-se*: A tripulação se segura pelo convés e pelos dormitórios durante o turno, e pode gastar 1 PE por nível de comando para que seu navio receba RD 5 adicional. Em NEX 30% a RD aumenta para 10 e o custo para 2 PE. Em NEX 65% aumenta para 15 e o custo para 3 PE. Em NEX 99% aumenta para 30 e o custo para 4 PE. *Abordar*: Quando o navio inimigo chegar a uma medida de sua vida, você pode ver o bordo, podendo fazer sua abordagem com a tripulação invasora. Pode gastar 2 PE para somar seu valor de PRE como bônus em perícias Luta e Pontaria no primeiro turno de cada jogador. Em NEX 65%, o bônus dura até o fim da cena e o custo de PE aumenta para 6.' 
        },
        { 
          nex: 40, 
          nome: 'Visão de Águia', 
          descricao: 'Uma vez por viagem, você pode gastar 3 PE para identificar com precisão alguma ameaça em alto-mar. Ao identificar, seu navio recebe +10 no teste de iniciativa e uma ação padrão adicional na primeira rodada de combate. Em casos de criaturas paranormais, além do normal, você define a ameaça antecipadamente de acordo com o critério do mestre para o combate. Caso use a Visão de Águia e não haja ameaça alguma, você recebe +5 de Percepção até o fim da viagem.' 
        },
        { 
          nex: 65, 
          nome: 'Gestão Marítima', 
          descricao: 'Enquanto estiver no barco, sua gestão influencia no conforto e no lazer da tripulação. Você pode melhorar os alimentos e suas opções de conforto nos dormitórios, disponibilizando formas de lazer adicionais. Em viagens onde a tripulação esteja descansada e satisfeita, todos os testes sociais dos jogadores se tornam uma categoria acima e recebem +1 à ação de interação. Além disso, você recebe +5 em testes de PRE que envolvam comunicação e interpessoal com qualquer membro da tripulação.' 
        },
        { 
          nex: 99, 
          nome: 'Terror dos Sete Mares', 
          descricao: 'Sua experiência marítima lhe torna um verdadeiro capitão, e no primeiro imediato ou até mesmo o capitão do navio, todos os testes de combate aumentam em +5 por todos. Enquanto estiver no navio, todos os testes realizados por sua tripulação aumentam em +5, incluindo todos os testes de perícias treinadas, além de tornar capaz de ter livremente um *Man O\' War*.' 
        }
      ]
    },
    {
      nome: 'Versátil',
      descricao: 'Você treinou sua mente e principalmente seu corpo para enfrentar todo tipo de situação. Sua inteligência te guia pelo campo de batalha, e seu físico te permite superar qualquer obstáculo.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Posicionamento Tático', 
          descricao: 'Ao ficar em cobertura, o bônus fornecido aumenta para +7 na defesa. Você também pode gastar 2 PE para ganhar +1D ao flanquear ou atacar em posição elevada.' 
        },
        { 
          nex: 40, 
          nome: 'Esforço Extra', 
          descricao: 'Você pode gastar 3 PE para ignorar a penalidade de carga em um teste ou deslocamento por 1 turno. Você ainda sofre -5 na defesa por estar sobrecarregado.' 
        },
        { 
          nex: 65, 
          nome: 'Arma Caseira', 
          descricao: 'Você não sofre mais penalidade de -1D por utilizar objetos como armas improvisadas. Você pode produzir uma arma improvisada com armas improvisadas usando até 3 PE, mas 2 PE normalmente. Ela segue as regras da cena e categoria normalmente. No final da cena, sua arma improvisada se torna inútil.' 
        },
        { 
          nex: 99, 
          nome: 'Corpo Robusto', 
          descricao: 'Você pode gastar 2 PE para ignorar os efeitos das condições exausto, debilitado, doente, fadigado, fraco, lento, ou vulnerável por 1 rodada (se estiver sofrendo mais de uma condição ao mesmo tempo, você gasta 2 PE por cada uma).' 
        }
      ]
    }
  ],
  'Especialista': [
    {
      nome: 'Virtuoso',
      descricao: 'Em um mundo cruel e cheio de horrores, aqueles que mantêm a mente intacta acabam sobrevivendo mais que a maioria das pessoas. Você talvez não tenha as melhores capacidades físicas para enfrentar o outro lado, mas o paranormal não irá enlouquecê-lo tão facilmente.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Tratamento Psicológico', 
          descricao: 'Em uma cena de interlúdio, você pode gastar uma ação e 2 PE para conversar com um aliado que esteja perturbado, e remover um efeito de insanidade dele, além de ambos recuperarem SAN equivalente ao limite de PE (esta habilidade não gasta as ações de interlúdio do aliado). Além disso, ao relaxar em um interlúdio, você pode remover um efeito de insanidade seu, mas recupera apenas metade do seu limite de PE em SAN.' 
        },
        { 
          nex: 40, 
          nome: 'Presença Motivadora', 
          descricao: 'Você pode gastar uma ação completa e 4 PE para motivar um aliado, que fica imune a condições mentais ou de medo e recebe +5 em vontade por 2 rodadas. Você pode executar esta habilidade por cena um número de vezes igual à sua presença.' 
        },
        { 
          nex: 65, 
          nome: 'Mente Blindada', 
          descricao: 'Ao entrar no estado de enlouquecimento, você leva 4 rodadas para ficar insano ao invés de 3. Além disso, toda vez que você falhar em um teste para evitar enlouquecer, role 1d6. Se tirar 6, você evita a insanidade.' 
        },
        { 
          nex: 99, 
          nome: 'Última Motivação', 
          descricao: 'Ao ficar com menos da metade da sua sanidade máxima pela primeira vez em uma cena, você pode gastar uma ação para ignorar condições mentais ou de medo e ganhar +10 em vontade até o fim da cena. Você não entra em estado de enlouquecimento nesta cena. A habilidade só pode ser usada uma vez por cena e apenas se o personagem tiver PE e limitado a uma vez por vida de personagem.' 
        }
      ],
      informacoesExtras: 'Presença:\nVocê recebe +1 em presença e escolhe uma dessas estéticas ao fim da cena:\n✔ Revigorador: Recupera 2d4+6 PV.\n✔ Esperançoso: Recebe resistência mental 10 até o fim da cena.\n✔ Atencioso: Recebe +1d4 em defesa até o fim da cena.'
    },
    {
      nome: 'Atirador de Elite',
      descricao: 'Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando o combate antes mesmo que ele comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Mira de Elite', 
          descricao: 'Você recebe proficiência com armas de fogo longas e soma seu Intelecto em rolagens de dano com essas armas.' 
        },
        { 
          nex: 40, 
          nome: 'Disparo Letal', 
          descricao: 'Quando faz a ação mirar, você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.' 
        },
        { 
          nex: 65, 
          nome: 'Disparo Impactante', 
          descricao: 'Se estiver usando uma arma de fogo com calibre médio ou pesado, você pode gastar 2 PE para fazer as manobras derrubar ou empurrar, e empurrar usando um ataque à distância.' 
        },
        { 
          nex: 99, 
          nome: 'Atirar para Matar', 
          descricao: 'Quando faz um ataque crítico com uma arma de fogo, você causa o dobro do dano.' 
        }
      ]
    },
    {
      nome: 'Infiltrador',
      descricao: 'Você é um mestre da infiltração e sabe neutralizar defesas, mesmo quando a missão parece impossível.',
      habilidades: [
        { 
          nex: 10, 
          nome: 'Ataque Furtivo', 
          descricao: 'Você sabe atingir os pontos vitais de um inimigo distraído. Uma vez por rodada, quando atinge um alvo desprevenido com um ataque corpo a corpo ou em alcance curto, ou um alvo que você esteja flanqueando, você pode gastar 1 PE para causar +1d6 pontos de dano do mesmo tipo da arma. Em NEX 40% o dano adicional aumenta para +2d6. Em NEX 65% aumenta para +3d6. Em NEX 99% aumenta para +4d6.' 
        },
        { 
          nex: 40, 
          nome: 'Gatuno', 
          descricao: 'Você recebe +5 em Atletismo e Crime e pode percorrer seu deslocamento normal por terrenos difíceis sem penalidade.' 
        },
        { 
          nex: 65, 
          nome: 'Assassinar', 
          descricao: 'Você pode gastar uma ação de movimento e 2 PE para fazer um ataque com vantagem contra um alvo desprevenido. Se acertar, o ataque é um acerto crítico.' 
        },
        { 
          nex: 99, 
          nome: 'Sombra Fugaz', 
          descricao: 'Quando está em uma área de penumbra ou escuridão, você recebe +2 na Defesa e não sofre penalidade por estar em movimento.' 
        }
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
