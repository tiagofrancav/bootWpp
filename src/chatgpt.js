import OpenAI from 'openai';
import config from './config.js';
import logger from './logger.js';

let client = null;

if (config.openaiApiKey) {
  client = new OpenAI({
    apiKey: config.openaiApiKey
  });
} else {
  logger.warn('OPENAI_API_KEY nao encontrado. As respostas dinamicas do ChatGPT ficarao desativadas.');
}

export async function askChatGPT(prompt, options = {}) {
  if (!client) {
    throw new Error(
      'ChatGPT indisponivel: defina a variavel de ambiente OPENAI_API_KEY antes de usar respostas dinamicas.'
    );
  }

  const {
    temperature = 0.6,
    model = config.openaiModel,
    systemPrompt = config.systemPrompt
  } = options;

  const completion = await client.chat.completions.create({
    model,
    temperature,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ]
  });

  const choice = completion.choices?.[0]?.message?.content;

  if (!choice) {
    throw new Error('Nao recebi resposta do modelo.');
  }

  return choice.trim();
}

export default askChatGPT;
