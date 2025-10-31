const keywordHandlers = [
  {
    id: 'talk-to-tiago',
    keywords: [
      'falar com tiago',
      'falar com o tiago',
      'quero falar com tiago',
      'quero falar com o tiago',
      'preciso falar com tiago',
      'preciso falar com o tiago',
      'chamar tiago',
      'chama o tiago',
      'chama tiago',
      'aciona tiago',
      'acione o tiago',
      'acionar tiago',
      'falar com voce',
      'falar com voce mesmo',
      'quero falar com voce',
      'quero falar com voce mesmo',
      'falar com atendente',
      'falar com humano',
      'quero atendimento humano',
      'quero atendimento com humano',
      'quero atendimento com pessoa',
      'quero atendimento com alguem',
      'falar com pessoa',
      'falar com pessoa de verdade',
      'quero falar com alguem',
      'quero falar com alguem de verdade',
      'operador',
      'operadora',
      'atendente humano',
      'atendimento humano',
      'preciso do tiago',
      'chama uma pessoa',
      'chamar humano',
      'me chama o tiago',
      'me chama alguem'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'Claro! Aqui e o IAgo. Vou avisar o Tiago sobre o seu pedido e ele fala com voce assim que possivel. Se quiser deixar mais detalhes, pode me enviar.'
  },
  {
    id: 'greeting',
    keywords: [
      'oi',
      'oii',
      'oiii',
      'ola',
      'olaa',
      'ola boa tarde',
      'ola boa noite',
      'ola bom dia',
      'ole',
      'oie',
      'oiee',
      'opa',
      'opa tudo bem',
      'opa boa tarde',
      'opa boa noite',
      'opa bom dia',
      'salve',
      'fala',
      'fala ai',
      'fala ae',
      'falae',
      'fala comigo',
      'fala tu',
      'hey',
      'hey ia go',
      'hello',
      'hi',
      'hi there',
      'e ai',
      'eae',
      'eai',
      'e ai tudo bem',
      'e ai ia go',
      'bom dia',
      'bom dia ia go',
      'bom dia tiago',
      'bom dia gente',
      'bom dia pessoal',
      'bom dia equipe',
      'boa tarde',
      'boa tarde ia go',
      'boa tarde tiago',
      'boa tarde pessoal',
      'boa tarde equipe',
      'boa noite',
      'boa noite ia go',
      'boa noite tiago',
      'boa noite pessoal',
      'boa madrugada',
      'boas',
      'cheguei',
      'cheguei aqui',
      'tem alguem ai',
      'tem alguem ai?',
      'tem gente',
      'tem gente ai',
      'teste',
      'testando',
      'alo',
      'aloo',
      'alooo',
      'alou',
      'alou ia go',
      'saudacoes',
      'saudacao',
      'oi pessoal',
      'oi equipe',
      'oi time',
      'oi gente',
      'oi turma',
      'oi ia go',
      'oi tiago',
      'oi tudo bem',
      'oi tudo certo',
      'oi td bem',
      'oi td bom',
      'e nois',
      'chegando agora'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'Ola! Eu sou IAgo, assistente virtual do Tiago. Posso adiantar informacoes e acionar o Tiago quando voce quiser. Digite "menu" para ver atalhos.'
  },
  {
    id: 'check-in',
    keywords: [
      'tudo bem',
      'como voce esta',
      'como vai',
      'como estao as coisas',
      'como vc ta',
      'como vc esta',
      'tudo certo',
      'tudo ok',
      'tudo bom',
      'como voce ta',
      'beleza',
      'suave',
      'de boa',
      'como vai voce',
      'como voce vai',
      'como tamo',
      'tudo legal'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'Tudo certo por aqui, sempre pronto para ajudar em nome do Tiago. Conta como posso facilitar para voce.'
  },
  {
    id: 'gratitude',
    keywords: [
      'obrigado',
      'obrigada',
      'muito obrigado',
      'muito obrigada',
      'valeu',
      'vlw',
      'agradecido',
      'agradecida',
      'grato',
      'grata',
      'thanks',
      'thank you',
      'obrigadao',
      'obrigadao mesmo'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'Disponha! O IAgo fica sempre de plantao. Se precisar de algo a mais, so mandar mensagem.'
  },
  {
    id: 'gpt-help',
    keywords: [
      'duvida',
      'pergunta',
      'explica',
      'como faz',
      'tutorial',
      'preciso de ajuda',
      'ajuda com',
      'me ajuda',
      'me ajuda com',
      'dificuldade',
      'orientacao',
      'pode explicar',
      'explicacao',
      'como resolver',
      'passo a passo',
      'como configuro',
      'como ajustar',
      'como corrigir'
    ],
    match: 'includes',
    responseType: 'gpt',
    prompt: (message, context) => {
      const question = context?.payload?.trim() || message.trim();
      return `Voce e IAgo, assistente virtual do Tiago. Ajude com a seguinte duvida: "${question}". Traga orientacoes claras, passo a passo quando fizer sentido, e ofereca encaminhar ao Tiago caso precise de acompanhamento humano.`;
    }
  },
  {
    id: 'menu',
    keywords: [
      'menu',
      'ajuda',
      'help',
      'comandos',
      'atalhos',
      'opcoes',
      'opcoes do bot',
      'quais opcoes',
      'quais sao as opcoes',
      'quais comandos',
      'mostra o menu',
      'mostrar menu',
      'ver menu',
      'ver os comandos',
      'lista de comandos',
      'lista de opcoes',
      'quero o menu',
      'me manda o menu',
      'me mostra os comandos',
      'pode mostrar o menu',
      'preciso do menu',
      'manual',
      'guia rapido',
      'guia do bot'
    ],
    match: 'includes',
    responseType: 'static',
    response: [
      'IAgo Online!',
      '',
      'Aqui quem fala e o IAgo, braco direito (e esquerdo tambem rs) do Tiago.',
      '',
      'Coisas que posso fazer:',
      '- `oi`: pra comecar o papo.',
      '- `status`: ver como ta a fila de mensagens (spoiler: cheia rs).',
      '- `urgente`: priorizo o recado sem drama.',
      '- `piada`: rir um pouco antes de resolver a vida.',
      '- `motivacao`: frase pra aguentar a semana.',
      '- `gpt {pergunta}`: conversar direto comigo, modo IA ativado!',
      '',
      'Dica: se quiser falar com o Tiago mesmo, digite `falar com tiago`.'
    ].join('\n')
  },
  {
    id: 'status',
    keywords: [
      'status',
      'qual o status',
      'como esta ai',
      'como ta ai',
      'qual a fila',
      'como esta a fila',
      'como esta o atendimento',
      'como ta o atendimento',
      'situacao',
      'andamento',
      'atualizacao do atendimento'
    ],
    match: 'includes',
    responseType: 'static',
    response: () =>
      [
        'Status do IAgo',
        'Tudo sob controle por aqui (com um pouco de cafe).',
        `Ultima sincronizacao com o Tiago: ${new Date().toLocaleString('pt-BR')}`
      ].join('\n')
  },
  {
    id: 'faq',
    keywords: [
      'faq',
      'perguntas frequentes',
      'dicas rapidas',
      'dicas',
      'duvidas comuns',
      'o que posso perguntar',
      'perguntas comuns',
      'perguntas basicas',
      'ajuda rapida'
    ],
    match: 'includes',
    responseType: 'static',
    response: [
      'FAQ IAgo',
      '1. Use `gpt {pergunta}` para tirar duvidas rapidas.',
      '2. Envie `servicos` para entender como o Tiago pode ajudar.',
      '3. Se for urgente, escreva `urgente` que eu priorizo o recado.',
      '4. Para falar com o Tiago, mande `falar com tiago`.'
    ].join('\n')
  },
  {
    id: 'services',
    keywords: [
      'servicos',
      'servico',
      'servicos oferecidos',
      'servicos prestados',
      'servicos disponiveis',
      'o que voces fazem',
      'o que voce faz',
      'o que sua equipe faz',
      'solucoes',
      'solucao',
      'quais solucoes',
      'consultoria',
      'trabalho de voces',
      'como podem ajudar',
      'o que voce entrega'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'O Tiago atua com automacoes, integracoes e suporte em tecnologia. Me conte a necessidade e eu ja organizo tudo para ele avaliar.'
  },
  {
    id: 'about',
    keywords: [
      'sobre tiago',
      'quem e tiago',
      'quem e o tiago',
      'quem e voce',
      'quem e iago',
      'quem fala',
      'quem ta ai',
      'quem esta ai',
      'quem esta respondendo',
      'quem esta falando',
      'quem me responde',
      'quem atende',
      'quem ta do outro lado',
      'qual e o seu nome',
      'quem e voce mesmo'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'Eu sou o IAgo, assistente virtual do Tiago. Cuido das respostas rapidas e deixo tudo pronto para ele falar com voce pessoalmente quando quiser.'
  },
  {
    id: 'pricing',
    keywords: [
      'orcamento',
      'quanto custa',
      'preco',
      'valor',
      'investimento',
      'cotacao',
      'quero um orcamento',
      'pode passar preco',
      'quanto fica',
      'quanto cobra',
      'quanto sai',
      'valor do servico',
      'preciso de orcamento',
      'passar valores'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'Posso adiantar o seu pedido de orcamento para o Tiago. Me envia um resumo do que precisa, prazos e qualquer detalhe importante que eu repasso tudo pra ele.'
  },
  {
    id: 'payment',
    keywords: [
      'pagamento',
      'formas de pagamento',
      'como pagar',
      'aceita cartao',
      'aceita pix',
      'parcelamento',
      'pode ser boleto',
      'cartao de credito',
      'cartao de debito',
      'pix',
      'metodos de pagamento',
      'pagar como',
      'forma de pagamento',
      'condicoes de pagamento'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'O Tiago combina as formas de pagamento diretamente com voce. Posso pedir para ele retornar com as opcoes assim que estiver disponivel.'
  },
  {
    id: 'hours',
    keywords: [
      'horario',
      'horarios',
      'horario de atendimento',
      'horario de funcionamento',
      'qual horario',
      'quais horarios',
      'quando atende',
      'ate que horas',
      'que horas atendem',
      'qual o expediente',
      'expediente',
      'agenda de atendimento'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'O Tiago costuma atender de segunda a sexta, das 09h as 18h (horario de Brasilia). Fora desse horario posso anotar o recado para o proximo periodo util.'
  },
  {
    id: 'location',
    keywords: [
      'endereco',
      'qual o endereco',
      'onde fica',
      'localizacao',
      'localizacao de voces',
      'onde voces estao',
      'qual cidade',
      'atende presencial',
      'posso visitar',
      'posso ir ai',
      'atendimento presencial',
      'onde atende'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'No momento o atendimento e remoto, mas o Tiago pode combinar encontros presenciais sob demanda. Se quiser marcar algo, mande os detalhes que eu organizo.'
  },
  {
    id: 'scheduling',
    keywords: [
      'agendar',
      'agenda',
      'marcar',
      'marcar reuniao',
      'marcar call',
      'agendamento',
      'agendar horario',
      'agendar atendimento',
      'agendar conversa',
      'agendar reuniao',
      'agendar papo',
      'agendar bate papo',
      'consultar agenda',
      'quero agendar',
      'preciso agendar'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'Me manda o melhor dia e horario para voce que eu verifico com o Tiago. Se tiver urgencia, use a palavra `urgente` para eu priorizar.'
  },
  {
    id: 'urgent',
    keywords: [
      'urgente',
      'urgencia',
      'prioridade',
      'preciso agora',
      'preciso pra agora',
      'emergencia',
      'asap',
      'pra hoje',
      'para hoje',
      'pra ja',
      'para ja',
      'correria',
      'socorro urgente',
      'e urgente',
      'muito urgente'
    ],
    match: 'includes',
    responseType: 'static',
    response: [
      'Alerta de urgencia recebido!',
      '',
      'Respira fundo que vamos resolver juntos.',
      'Eu separo seu pedido para o Tiago com prioridade, mas seguimos a ordem de chegada para garantir atendimento justo.',
      '',
      'Se surgir algum detalhe a mais, pode me mandar que eu acompanho daqui.'
    ].join('\n')
  },
  {
    id: 'joke',
    keywords: [
      'piada',
      'conta uma piada',
      'conta piada',
      'conta uma piadinha',
      'me faz rir',
      'rir um pouco',
      'quero rir',
      'solta uma piada',
      'manda uma piada',
      'piadinha',
      'piada nova'
    ],
    match: 'includes',
    responseType: 'random',
    response: [
      'Por que o computador foi ao medico? Porque estava com um virus rs.',
      'Minha produtividade hoje ta igual senha de Wi-Fi errada: nao conecta rs.',
      'Se segunda-feira fosse gente, ja tava bloqueada rs.',
      'Trabalho em equipe e lindo ate alguém mandar "URGENTE" no grupo rs.'
    ]
  },
  {
    id: 'motivation',
    keywords: [
      'motivacao',
      'motivacional',
      'me motiva',
      'frase do dia',
      'frase motivacional',
      'inspiracao',
      'me inspira',
      'me anima',
      'preciso de motivacao',
      'manda motivacao',
      'motivacao do dia'
    ],
    match: 'includes',
    responseType: 'random',
    response: [
      'Respira e vai: ate o codigo mais bugado resolve com paciencia (e cafe).',
      'Hoje e um bom dia para fazer o futuro agradecer pelas escolhas de agora.',
      'Nem todo dia e epico, mas todo passo conta. Segue firme que o Tiago acredita em voce!',
      'Quando o plano A falha, o IAgo chama o Tiago e vira plano incrivel.'
    ]
  },
  {
    id: 'gpt-command',
    keywords: ['gpt'],
    match: 'startsWith',
    responseType: 'gpt',
    prompt: (message, context) => {
      const question = context?.payload?.trim() || message.trim();
      return `Voce e IAgo, assistente virtual do Tiago. O usuario pediu: "${question}". Responda de forma objetiva, acolhedora e informe que pode acionar o Tiago se precisar.`;
    }
  },
  {
    id: 'news',
    keywords: [
      'news',
      'novidades',
      'novidade',
      'atualizacoes',
      'atualizacao',
      'noticia',
      'noticias',
      'tendencias',
      'tendencia'
    ],
    match: 'includes',
    responseType: 'gpt',
    prompt: () =>
      'Voce e IAgo, assistente virtual do Tiago. Traga uma noticia de tecnologia recente em ate 3 frases, em portugues, com tom amigavel e profissional. Use emojis com moderacao.'
  }
];

const normalize = value => {
  if (!value) return '';
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

const isWordChar = char => /[a-z0-9]/.test(char);

const findKeywordIndex = (message, keyword, matchMode = 'includes') => {
  switch (matchMode) {
    case 'exact':
      return message === keyword ? 0 : -1;
    case 'startsWith':
      return message.startsWith(keyword) ? 0 : -1;
    case 'includes':
    default: {
      let fromIndex = 0;

      while (fromIndex <= message.length) {
        const index = message.indexOf(keyword, fromIndex);

        if (index === -1) {
          return -1;
        }

        const beforeChar = index === 0 ? '' : message[index - 1];
        const afterPosition = index + keyword.length;
        const afterChar = afterPosition >= message.length ? '' : message[afterPosition];

        const beforeOk = !beforeChar || !isWordChar(beforeChar);
        const afterOk = !afterChar || !isWordChar(afterChar);

        if (beforeOk && afterOk) {
          return index;
        }

        fromIndex = index + 1;
      }

      return -1;
    }
  }
};

export function matchKeyword(message) {
  const normalizedMessage = normalize(message);

  for (const handler of keywordHandlers) {
    for (const keyword of handler.keywords) {
      const normalizedKeyword = normalize(keyword);
      const keywordIndex = findKeywordIndex(normalizedMessage, normalizedKeyword, handler.match);

      if (keywordIndex > -1) {
        return {
          ...handler,
          keyword: normalizedKeyword,
          index: keywordIndex,
          matchedText:
            keywordIndex > -1
              ? message.slice(keywordIndex, keywordIndex + normalizedKeyword.length)
              : keyword
        };
      }
    }
  }

  return null;
}

export default keywordHandlers;
