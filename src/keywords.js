const keywordHandlers = [
  {
    keywords: ['oi', 'ola', 'hello'],
    match: 'includes',
    responseType: 'static',
    response:
      'Ola! Eu sou um bot automatico. Envie "menu" para ver opcoes ou fale comigo usando suas palavras-chave.'
  },
  {
    keywords: ['menu', 'ajuda'],
    match: 'exact',
    responseType: 'static',
    response: ['Menu de Comandos', '- `status`: status atual do bot.', '- `gpt {sua pergunta}`: conversa com a IA.', '- `news`: peca novidades.'].join(
      '\n'
    )
  },
  {
    keywords: ['status'],
    match: 'exact',
    responseType: 'static',
    response: () =>
      `Bot online\nUltima atualizacao: ${new Date().toLocaleString('pt-BR')}`
  },
  {
    keywords: ['gpt'],
    match: 'startsWith',
    responseType: 'gpt',
    prompt: (message, context) => {
      const question = context?.payload?.trim() || message.trim();
      return `O usuario esta utilizando o bot pelo WhatsApp e pediu: "${question}". Responda de forma objetiva e amigavel.`;
    }
  },
  {
    keywords: ['news', 'novidades'],
    match: 'includes',
    responseType: 'gpt',
    prompt: () =>
      'Traga uma noticia de tecnologia recente em ate 3 frases, em portugues. Use emojis com moderacao.'
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
