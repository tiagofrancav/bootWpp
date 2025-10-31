import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState
} from '@whiskeysockets/baileys';
import qrcode from 'qrcode-terminal';
import config from './config.js';
import logger from './logger.js';
import askChatGPT from './chatgpt.js';
import { matchKeyword } from './keywords.js';

const cleanExitHandlers = new Set();

function registerCleanExit(callback) {
  cleanExitHandlers.add(callback);
}

async function shutdown() {
  logger.info('Encerrando bot...');
  for (const handler of cleanExitHandlers) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await handler();
    } catch (error) {
      logger.error({ err: error }, 'Erro ao finalizar handler.');
    }
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function extractMessageText(message) {
  if (!message) return null;

  const msg = message.message;

  const textMessage =
    msg?.conversation ??
    msg?.extendedTextMessage?.text ??
    msg?.imageMessage?.caption ??
    msg?.videoMessage?.caption ??
    msg?.buttonsResponseMessage?.selectedButtonId ??
    msg?.listResponseMessage?.singleSelectReply?.selectedRowId ??
    msg?.templateButtonReplyMessage?.selectedId ??
    msg?.documentMessage?.caption;

  return textMessage ?? null;
}

const normalizeForMatch = value =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const buildContext = (text, keywordMatch, message) => {
  const remoteJid = message.key.remoteJid;
  const isGroup = remoteJid?.endsWith('@g.us');

  const normalizedText = normalizeForMatch(text);
  const keywordIndex = keywordMatch.index ?? normalizedText.indexOf(keywordMatch.keyword);

  const matchedTextLength = keywordMatch.matchedText
    ? keywordMatch.matchedText.length
    : keywordMatch.keyword.length;

  let payload = text;
  if (keywordMatch.match === 'startsWith' && keywordIndex === 0) {
    payload = text.slice(matchedTextLength).trim();
  }

  return {
    text,
    remoteJid,
    isGroup,
    keyword: keywordMatch.keyword,
    keywordIndex,
    normalizedText,
    matchedText: keywordMatch.matchedText,
    payload,
    message
  };
};

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(config.sessionFolder);

  registerCleanExit(async () => {
    logger.info('Salvando credenciais antes de sair.');
    await saveCreds();
  });

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    printQRInTerminal: true,
    version,
    auth: state,
    logger
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async update => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      logger.info('QR code gerado. Escaneie com o WhatsApp para conectar.');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        logger.warn({ statusCode }, 'Conexao fechada. Tentando reconectar...');
        setTimeout(startBot, 5_000);
      } else {
        logger.error(
          { statusCode },
          'Conexao encerrada. Remova a pasta de sessao e reinicie o bot para gerar um novo QR code.'
        );
      }
    } else if (connection === 'open') {
      logger.info('Bot conectado ao WhatsApp');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    const [message] = messages;
    const remoteJid = message.key.remoteJid;
    const fromMe = message.key.fromMe;

    if (fromMe || !remoteJid) return;

    const text = extractMessageText(message);
    if (!text) return;

    logger.info({ remoteJid, text }, 'Mensagem recebida');

    const keywordMatch = matchKeyword(text);

    if (!keywordMatch) return;

    const context = buildContext(text, keywordMatch, message);

    try {
      let reply;

      if (keywordMatch.responseType === 'static') {
        if (typeof keywordMatch.response === 'function') {
          reply = await keywordMatch.response(context);
        } else {
          reply = keywordMatch.response;
        }
      } else if (keywordMatch.responseType === 'random') {
        const pool =
          typeof keywordMatch.response === 'function'
            ? await keywordMatch.response(context)
            : keywordMatch.response;

        if (Array.isArray(pool)) {
          const available = pool.filter(Boolean);
          if (available.length === 0) {
            logger.warn({ context }, 'Handler random sem opcoes disponiveis.');
            return;
          }
          const index = Math.floor(Math.random() * available.length);
          reply = available[index];
        } else if (typeof pool === 'string') {
          reply = pool;
        } else {
          logger.warn({ context }, 'Handler random retornou formato invalido.');
          return;
        }
      } else if (keywordMatch.responseType === 'gpt') {
        const prompt =
          typeof keywordMatch.prompt === 'function'
            ? await keywordMatch.prompt(context.text, context)
            : keywordMatch.prompt;

        if (!prompt) {
          logger.warn(
            { context },
            'Palavra-chave configurada com GPT, mas nenhum prompt foi definido.'
          );
          return;
        }

        const typing = sock.sendPresenceUpdate('composing', remoteJid);

        try {
          reply = await askChatGPT(prompt);
        } finally {
          await typing;
          await sock.sendPresenceUpdate('paused', remoteJid);
        }
      }

      if (!reply) return;

      await sock.sendMessage(remoteJid, { text: reply });
      logger.info({ remoteJid }, 'Resposta enviada');
    } catch (error) {
      logger.error({ err: error }, 'Falha ao processar mensagem.');

      await sock.sendMessage(remoteJid, {
        text: 'Ops! Tive um problema ao gerar sua resposta. Tente novamente mais tarde.'
      });
    }
  });
}

startBot().catch(error => {
  logger.error({ err: error }, 'Erro ao iniciar o bot');
  process.exit(1);
});
