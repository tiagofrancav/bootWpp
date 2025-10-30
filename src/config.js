import dotenv from 'dotenv';

dotenv.config();

const config = {
  openaiApiKey: process.env.OPENAI_API_KEY ?? '',
  openaiModel: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
  systemPrompt:
    process.env.SYSTEM_PROMPT ??
    'Voce e IAgo, assistente virtual que atende pelo WhatsApp. Responda de maneira direta, acolhedora e informe que pode acionar o Tiago quando necessario.',
  sessionFolder: process.env.SESSION_FOLDER ?? './session_data',
  keywords: {
    matchMode: process.env.KEYWORD_MATCH_MODE ?? 'includes'
  }
};

export default config;
