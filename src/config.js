import dotenv from 'dotenv';

dotenv.config();

const config = {
  openaiApiKey: process.env.OPENAI_API_KEY ?? '',
  openaiModel: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
  systemPrompt:
    process.env.SYSTEM_PROMPT ??
    'Voce e um assistente virtual integrado a um bot de WhatsApp. Responda de maneira direta e util.',
  sessionFolder: process.env.SESSION_FOLDER ?? './session_data',
  keywords: {
    matchMode: process.env.KEYWORD_MATCH_MODE ?? 'includes'
  }
};

export default config;
