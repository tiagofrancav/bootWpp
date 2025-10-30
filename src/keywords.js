const keywordHandlers = [
  {
    keywords: ['oi', 'ola', 'hello', 'e ai', 'fala', 'bom dia', 'boa tarde', 'boa noite'],
    match: 'includes',
    responseType: 'static',
    response:
      'Ola! Eu sou IAgo, assistente virtual do Tiago. Posso adiantar informacoes, registrar pedidos ou chamar o Tiago quando voce quiser. Digite "menu" para ver atalhos.'
  },
  {
    keywords: ['tudo bem', 'como voce esta', 'como vai', 'como estao as coisas'],
    match: 'includes',
    responseType: 'static',
    response:
      'Tudo certo por aqui, sempre pronto para ajudar em nome do Tiago. Conta como posso facilitar para voce.'
  },
  {
    keywords: ['obrigado', 'obrigada', 'valeu', 'agradecido'],
    match: 'includes',
    responseType: 'static',
    response:
      'Disponha! O IAgo fica sempre de plantao. Se precisar de algo a mais, so mandar mensagem.'
  },
  {
    keywords: ['menu', 'ajuda'],
    match: 'exact',
    responseType: 'static',
    response: [
      '💼 *IAgo Online!*',
      '',
      'Aqui quem fala e o *IAgo*, braco direito (e esquerdo tambem 😅) do Tiago.',
      '',
      '📋 *Coisas que posso fazer:*',
      '- `oi`: pra comecar o papo.',
      '- `status`: ver como ta a fila de mensagens. (spoiler: cheia 😅)',
      '- `urgente`: (⚠️ cuidado… eu respondo com sinceridade 😂)',
      '- `piada`: rir um pouco antes de resolver a vida.',
      '- `motivacao`: frase pra aguentar a semana.',
      '- `gpt {pergunta}`: conversar direto comigo, modo IA ativado!',
      '',
      '👨‍💻 *Dica:* se quiser falar com o Tiago mesmo, digite `falar com tiago` — mas sem pressao, ele tambem toma cafe ☕'
    ].join('\n')
  },
  {
    keywords: ['status'],
    match: 'exact',
    responseType: 'static',
    response: () =>
      [
        '📊 *Status do IAgo*',
        'Tudo sob controle por aqui (com um pouco de cafe).',
        `Ultima sincronizacao com o Tiago: ${new Date().toLocaleString('pt-BR')}`
      ].join('\n')
  },
  {
    keywords: ['faq', 'perguntas frequentes', 'dicas rapidas'],
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
    keywords: ['servicos', 'servico', 'o que voces fazem', 'o que voce faz', 'solucoes', 'solucao', 'servicos oferecidos'],
    match: 'includes',
    responseType: 'static',
    response:
      'O Tiago atua com automacoes, integracoes e suporte em tecnologia. Me conte a necessidade e eu ja organizo tudo para ele avaliar.'
  },
  {
    keywords: ['sobre tiago', 'quem e tiago', 'quem e voce', 'quem e iago', 'sobre voce'],
    match: 'includes',
    responseType: 'static',
    response:
      'Eu sou o IAgo, assistente virtual do Tiago. Cuido das respostas rapidas e deixo tudo pronto para ele falar com voce pessoalmente quando quiser.'
  },
  {
    keywords: ['orcamento', 'quanto custa', 'preco', 'valor', 'investimento', 'cotacao'],
    match: 'includes',
    responseType: 'static',
    response:
      'Posso adiantar o seu pedido de orcamento para o Tiago. Me envia um resumo do que precisa, prazos e qualquer detalhe importante que eu repasso tudo pra ele.'
  },
  {
    keywords: ['pagamento', 'formas de pagamento', 'como pagar', 'aceita cartao', 'aceita pix'],
    match: 'includes',
    responseType: 'static',
    response:
      'O Tiago combina as formas de pagamento diretamente com voce. Posso pedir para ele retornar com as opcoes assim que estiver disponivel.'
  },
  {
    keywords: ['horario', 'horarios', 'expediente', 'quando atende'],
    match: 'includes',
    responseType: 'static',
    response:
      'O Tiago costuma atender de segunda a sexta, das 09h as 18h (horario de Brasilia). Fora desse horario posso anotar o recado para o proximo periodo util.'
  },
  {
    keywords: ['endereco', 'localizacao', 'onde fica', 'atende presencial', 'posso visitar'],
    match: 'includes',
    responseType: 'static',
    response:
      'No momento o atendimento e remoto, mas o Tiago pode combinar encontros presenciais sob demanda. Se quiser marcar algo, mande os detalhes que eu organizo.'
  },
  {
    keywords: ['agendar', 'agenda', 'marcar', 'reuniao', 'call', 'agendamento'],
    match: 'includes',
    responseType: 'static',
    response:
      'Me manda o melhor dia e horario para voce que eu verifico com o Tiago. Se tiver urgencia, use a palavra `urgente` para eu priorizar.'
  },
  {
    keywords: ['urgente', 'prioridade', 'preciso agora', 'emergencia', 'asap'],
    match: 'includes',
    responseType: 'static',
    response:
      [
        '🚨 *ALERTA DE URGENCIA DETECTADO!*',
        '',
        'Mas calma… respira 😌',
        '',
        '👉 *Nada e tao urgente que nao possa esperar um cafe e uma resposta com calma.*',
        'O Tiago ta atendendo por ordem de chegada ☕📋',
        '',
        '_Enquanto isso, aproveita pra mandar aquele meme que resume o dia 😂_'
      ].join('\n')
  },
  {
    keywords: [
      'falar com tiago',
      'falar com o tiago',
      'quero falar com tiago',
      'quero falar com voce',
      'falar com voce',
      'falar com humano',
      'falar com atendente',
      'quero atendimento humano'
    ],
    match: 'includes',
    responseType: 'static',
    response:
      'Claro! Aqui e o IAgo. Vou avisar o Tiago sobre o seu pedido e ele fala com voce pessoalmente assim que possivel. Se quiser deixar mais detalhes, pode me enviar.'
  },
  {
    keywords: ['piada', 'conta uma piada', 'me faz rir'],
    match: 'includes',
    responseType: 'random',
    response: [
      'Por que o computador foi ao medico? Porque estava com um virus 🤒💻',
      'Minha produtividade hoje ta igual senha de Wi-Fi errada: nao conecta 😅',
      'Se segunda-feira fosse gente, ja tava bloqueada 🚫',
      'Trabalho em equipe e lindo… ate alguem mandar "URGENTE" no grupo 😂'
    ]
  },
  {
    keywords: ['motivacao', 'me motiva', 'frase do dia', 'motivacional'],
    match: 'includes',
    responseType: 'random',
    response: [
      'Respira e vai: ate o codigo mais bugado resolve com paciencia (e cafe). ☕💪',
      'Hoje e um bom dia para fazer o futuro agradecer pelas escolhas de agora. 🚀',
      'Nem todo dia e epico, mas todo passo conta. Segue firme que o Tiago acredita em voce!',
      'Quando o plano A falha, o IAgo chama o Tiago e vira plano incrivel. 😉'
    ]
  },
  {
    keywords: ['gpt'],
    match: 'startsWith',
    responseType: 'gpt',
    prompt: (message, context) => {
      const question = context?.payload?.trim() || message.trim();
      return `Voce e IAgo, assistente virtual do Tiago. O usuario pediu: "${question}". Responda de forma objetiva, acolhedora e informe que pode acionar o Tiago se precisar.`;
    }
  },
  {
    keywords: ['duvida', 'pergunta', 'explica', 'como faz', 'tutorial', 'preciso de ajuda', 'ajuda com', 'me ajuda'],
    match: 'includes',
    responseType: 'gpt',
    prompt: (message, context) => {
      const question = context?.payload?.trim() || message.trim();
      return `Voce e IAgo, assistente virtual do Tiago. Ajude com a seguinte duvida: "${question}". Traga orientacoes claras, passo a passo quando fizer sentido, e ofereca encaminhar ao Tiago caso precise de acompanhamento humano.`;
    }
  },
  {
    keywords: ['news', 'novidades'],
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

export function matchKeyword(message) {
  const normalizedMessage = normalize(message);

  for (const handler of keywordHandlers) {
    for (const keyword of handler.keywords) {
      const normalizedKeyword = normalize(keyword);
      const keywordIndex = normalizedMessage.indexOf(normalizedKeyword);
      const shouldTrigger = (() => {
        switch (handler.match) {
          case 'exact':
            return normalizedMessage === normalizedKeyword;
          case 'startsWith':
            return normalizedMessage.startsWith(normalizedKeyword);
          case 'includes':
          default:
            return normalizedMessage.includes(normalizedKeyword);
        }
      })();

      if (shouldTrigger) {
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
