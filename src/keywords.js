import { addNote, listNotes, clearNotes } from './storage.js';

const NOTE_LABEL = {
  recado: 'Recado',
  reminder: 'Lembrete',
  favor: 'Favor',
  link: 'Link'
};

function extractNoteText(context) {
  const text = context?.text?.trim();
  if (!text) return '';

  const matched = context?.matchedText?.trim();
  if (!matched) return text;

  const index = text.toLowerCase().indexOf(matched.toLowerCase());
  if (index === -1) return text;

  const remaining = text.slice(index + matched.length).trim();
  return remaining || text;
}

async function storeNote(type, context, messages = {}) {
  const noteText = extractNoteText(context);
  const matched = context?.matchedText?.trim()?.toLowerCase();
  const normalized = noteText.toLowerCase();
  const keywordOnly = !noteText || (matched && normalized === matched);

  if (keywordOnly) {
    return messages.askMore ?? 'Me conta o que devo anotar?';
  }

  const { stored } = await addNote(context.remoteJid, { type, text: noteText });
  if (!stored) {
    return messages.error ?? 'Nao consegui anotar. Pode tentar de novo, por favor?';
  }

  return (
    messages.success ??
    'Anotado por aqui. Quando quiser conferir tudo, manda "lista".'
  );
}

function formatDateLabel(isoString) {
  if (!isoString) return '';

  try {
    return new Date(isoString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } catch (error) {
    return isoString;
  }
}

function formatNotesSummary(notes) {
  if (!notes.length) {
    return 'Nada guardado por aqui ainda. Quando mandar um recado, lembrete ou link eu salvo pra voce.';
  }

  const lines = notes.map((note, index) => {
    const label = NOTE_LABEL[note.type] ?? 'Nota';
    const timestamp = formatDateLabel(note.createdAt);
    return `${index + 1}. [${label}] ${note.text} (${timestamp})`;
  });

  return [
    'Resumo do que anotei para voce:',
    ...lines,
    '',
    'Se quiser zerar a lista depois de revisar, mande "limpar lista".'
  ].join('\n');
}

const keywordHandlers = [
  {
    id: 'talk-to-tiago',
    keywords: [
      'falar com tiago',
      'falar com o tiago',
      'quero falar com tiago',
      'quero falar com o tiago',
      'me chama o tiago',
      'chama o tiago',
      'chama tiago',
      'aciona tiago',
      'acione o tiago',
      'acionar tiago',
      'chamar tiago',
      'falar com voce',
      'falar com voce mesmo',
      'quero falar com voce',
      'quero falar com voce mesmo',
      'falar com humano',
      'quero atendimento humano',
      'chama uma pessoa',
      'quero falar com alguem',
      'quero falar com alguem de verdade',
      'operador',
      'operadora'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'Pode deixar! Vou avisar o Tiago e ele volta assim que estiver livre. Se quiser, ja me manda o recado que eu guardo pra ele.'
  },
  {
    id: 'greeting',
    keywords: [
      'oi',
      'oii',
      'oiii',
      'ola',
      'oie',
      'oiee',
      'opa',
      'opa tudo bem',
      'salve',
      'fala',
      'fala ai',
      'fala ae',
      'falae',
      'fala comigo',
      'fala tu',
      'hey',
      'hello',
      'hi',
      'hi there',
      'e ai',
      'eae',
      'eai',
      'e ai tudo bem',
      'bom dia',
      'boa tarde',
      'boa noite',
      'boa madrugada',
      'cheguei',
      'chegando agora',
      'tem alguem ai',
      'tem gente ai',
      'teste',
      'testando',
      'alo',
      'aloo',
      'saudacoes',
      'oi pessoal',
      'oi time',
      'oi gente',
      'oi turma',
      'oi tiago',
      'oi tudo bem',
      'oi tudo certo',
      'oi td bem',
      'oi td bom'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      [
        'Oi! Aqui e o IAgo, assistente virtual que o Tiago montou para organizar os recados pessoais.',
        'Se quiser ver ideias de mensagens, digite `menu`.'
      ].join('\n')
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
      'obrigadao mesmo',
      'tmj'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'Imagina! Qualquer coisa me chama aqui que eu guardo pro Tiago. Estamos juntos.'
  },
  {
    id: 'menu',
    keywords: [
      'menu',
      'ajuda',
      'help',
      'opcoes',
      'opcao',
      'comandos',
      'atalhos',
      'como funciona',
      'o que voce faz',
      'o que pode fazer',
      'me lembra o menu',
      'me mostra o menu',
      'quais opcoes',
      'quais comandos',
      'mostrar menu',
      'ver menu'
    ],
    match: 'includes',
    responseType: 'static',
    response: [
      '*IAgo na escuta!*',
      '',
      '*Comandos uteis:*',
      '- `recado {texto}` anota um recado pro Tiago;',
      '- `lembrete {texto}` guarda algo pra lembrar depois;',
      '- `favor {texto}` registra um pedido rapido;',
      '- `link {texto}` salva links, arquivos ou referencias;',
      '- `lista` mostra tudo que eu ja guardei;',
      '- `limpar lista` zera o que voce viu;',
      '- `gpt {pergunta}` liga o modo IA pra duvidas.',
      '',
      'Pra falar direto com o Tiago e so mandar `falar com tiago`.'
    ].join('\n')
  },
  {
    id: 'status',
    keywords: [
      'status',
      'como esta ai',
      'como ta ai',
      'como esta por ai',
      'cade o tiago',
      'onde esta o tiago',
      'tiago ta por ai',
      'o tiago ta online',
      'tiago ta on',
      'ta disponivel',
      'ele ta disponivel',
      'vai demorar',
      'ele demora',
      'ele responde quando'
    ],
    match: 'includes',
    responseType: 'static',
    response: () =>
      [
        'Status IAgo',
        'O Tiago nao esta no celular agora, mas eu guardo tudo por aqui.',
        `Ultima vez que repassei algo pra ele: ${new Date().toLocaleString('pt-BR')}`,
        'Se quiser revisar o que ficou pendente, mande "lista".'
      ].join('\n')
  },
  {
    id: 'recado',
    keywords: [
      'recado',
      'anota pra mim',
      'anota isso',
      'anote isso',
      'deixar recado',
      'deixa recado',
      'passar recado',
      'quero deixar recado',
      'avisem',
      'avisa ele',
      'avisa o tiago',
      'anotar recado'
    ],
    match: 'includes',
    responseType: 'static',
    response: context =>
      storeNote('recado', context, {
        askMore: 'Me conta o recado que eu deixo separado pro Tiago.',
        success: 'Recado anotado! Quando quiser ver tudo, mande "lista".'
      })
  },
  {
    id: 'reminder',
    keywords: [
      'lembrete',
      'me lembra',
      'me lembrar',
      'lembrar disso',
      'lembrar ele',
      'nao deixar esquecer',
      'me avisa depois',
      'anota pra lembrar',
      'lembra o tiago',
      'lembra ele',
      'podemos lembrar',
      'me cobra depois'
    ],
    match: 'includes',
    responseType: 'static',
    response: context =>
      storeNote('reminder', context, {
        askMore: 'Pode mandar o lembrete (data ou horario ajudam bastante).',
        success: 'Lembrete guardado. Quando quiser, mande "lista" pra revisar.'
      })
  },
  {
    id: 'favor',
    keywords: [
      'favor',
      'faz um favor',
      'pede um favor',
      'preciso de um favor',
      'ajuda rapida',
      'quebra galho',
      'dar uma mao',
      'dar uma ajuda',
      'pode ajudar',
      'preciso que ele faca',
      'pode pedir pra ele'
    ],
    match: 'includes',
    responseType: 'static',
    response: context =>
      storeNote('favor', context, {
        askMore: 'Me diz qual favor voce precisa e eu guardo aqui.',
        success: 'Pedido anotado. Qualquer coisa manda "lista" pra ver o status.'
      })
  },
  {
    id: 'link',
    keywords: [
      'link',
      'manda link',
      'to mandando um link',
      'enviando link',
      'link importante',
      'link aqui',
      'te mando o link',
      'arquivo',
      'anexo',
      'documento',
      'foto',
      'imagem',
      'print',
      'referencia'
    ],
    match: 'includes',
    responseType: 'static',
    response: context =>
      storeNote('link', context, {
        askMore: 'Me manda o link ou referencia que eu salvo junto com suas notas.',
        success: 'Link guardado. Quando quiser checar tudo, use "lista".'
      })
  },
  {
    id: 'urgent',
    keywords: [
      'urgente',
      'urgencia',
      'preciso agora',
      'preciso pra agora',
      'pra agora',
      'para agora',
      'pra ja',
      'para ja',
      'importante demais',
      'muito importante',
      'emergencia',
      'socorro urgente',
      'prioridade maxima',
      'caos'
    ],
    match: 'includes',
    responseType: 'static',
    response: [
      'Recebido com prioridade maxima.',
      'Ja deixei o recado no topo da lista e avisei o Tiago assim que ele olhar o celular.'
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
      'Por que o celular foi ao psiquiatra? Porque tinha muitas notificacoes na cabeca.',
      'Minha memoria ta igual chat antigo: so lembra quando me mencionam.',
      'IA tambem descansa: desligo quando a bateria humana acaba.',
      'Se o dia ta corrido, manda recado pro IAgo que eu corro no lugar do Tiago.'
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
      'Respira fundo e manda ver. O Tiago confia em voce e eu tambem.',
      'Cada recado que voce manda aqui e um problema a menos pra lembrar depois.',
      'Um passo de cada vez: eu guardo, o Tiago resolve, e voce relaxa.',
      'Se o dia estiver puxado, manda as ideias pra ca que a gente organiza.'
    ]
  },
  {
    id: 'gpt-command',
    keywords: ['gpt'],
    match: 'startsWith',
    responseType: 'gpt',
    prompt: (message, context) => {
      const question = context?.payload?.trim() || message.trim();
      return `Voce e IAgo, assistente pessoal do Tiago. O usuario pediu: "${question}". Responda de forma objetiva, amigavel e, se fizer sentido, sugira avisar o Tiago.`;
    }
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
      'como corrigir',
      'o que significa',
      'como funciona',
      'porque acontece'
    ],
    match: 'includes',
    responseType: 'gpt',
    prompt: (message, context) => {
      const question = context?.payload?.trim() || message.trim();
      return `Voce e IAgo, assistente pessoal do Tiago. Ajude com a seguinte duvida: "${question}". Traga orientacoes claras, passo a passo quando fizer sentido, e ofereca avisar o Tiago caso seja algo que ele deva ver pessoalmente.`;
    }
  },
  {
    id: 'list-notes',
    keywords: [
      'lista',
      'resumo',
      'ver recados',
      'ver lista',
      'o que eu pedi',
      'meus recados',
      'ver lembretes',
      'quero ver a lista',
      'mostra a lista'
    ],
    match: 'includes',
    responseType: 'static',
    response: async context => {
      const notes = await listNotes(context.remoteJid);
      return formatNotesSummary(notes);
    }
  },
  {
    id: 'clear-notes',
    keywords: [
      'limpar lista',
      'limpa lista',
      'zerar lista',
      'limpar recados',
      'limpar lembretes',
      'apagar recados',
      'apagar lista',
      'limpa tudo',
      'limpar tudo'
    ],
    match: 'includes',
    responseType: 'static',
    response: async context => {
      const result = await clearNotes(context.remoteJid);
      return result.cleared
        ? 'Lista apagada. Pode mandar coisas novas a vontade!'
        : 'Nao havia nada guardado por aqui.';
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
      'Voce e IAgo, assistente pessoal do Tiago. Traga uma novidade legal sobre tecnologia ou curiosidade nerd em ate 3 frases, em portugues, com tom leve.'
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
