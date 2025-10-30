# Bot WhatsApp com Baileys e ChatGPT

Projeto base em Node.js que cria um bot para WhatsApp usando a biblioteca [Baileys](https://github.com/WhiskeySockets/Baileys). O bot suporta:

- autenticacao via QR code;
- respostas prontas a palavras-chave;
- integracao com ChatGPT para respostas dinamicas;
- configuracao simples via arquivo `.env`.

> **Aviso**: Este projeto nao instala dependencias automaticamente. Verifique se voce tem Node.js 18+ e npm instalados.

## Como usar

1. Clone ou copie este projeto para sua maquina.
2. Duplique o arquivo `.env.example` e renomeie para `.env`.
3. Substitua `OPENAI_API_KEY` pela sua chave da OpenAI.
4. Instale as dependencias com `npm install`.
5. Inicie o bot com `npm start` (ou `npm run dev` para recarregar automaticamente via nodemon).
6. No primeiro acesso, escaneie o QR code exibido no terminal com o aplicativo WhatsApp.

## Estrutura

- `src/index.js`: ponto de entrada do bot e gerenciamento da sessao Baileys.
- `src/chatgpt.js`: cliente OpenAI e funcao utilitaria para solicitar respostas ao modelo.
- `src/keywords.js`: lista e regras das palavras-chave com respostas estaticas ou dinamicas.
- `src/config.js`: leitura de variaveis ambiente e valores default.
- `src/logger.js`: logger com Pino.
- `.env.example`: modelo de configuracao.

Os dados de autenticacao do WhatsApp sao gravados por padrao em `./session_data`. E possivel alterar definindo `SESSION_FOLDER` no `.env`.

## Configurando palavras-chave

Edite `src/keywords.js` para personalizar os gatilhos. Cada entrada aceita:

- `keywords`: array de palavras ou trechos a monitorar;
- `match`: estrategia de comparacao (`exact`, `startsWith` ou `includes`);
- `responseType`: `static` (texto pronto ou funcao) ou `gpt` (usa ChatGPT);
- `response`: string ou funcao async para respostas fixas;
- `prompt`: string ou funcao que monta o prompt enviado ao ChatGPT.

Exemplo de resposta estatica rapida:

```js
{
  keywords: ['horario'],
  match: 'includes',
  responseType: 'static',
  response: 'Nosso horario de atendimento e de 09h as 18h.'
}
```

Exemplo acionando a IA com o prefixo `gpt`:

```js
{
  keywords: ['gpt'],
  match: 'startsWith',
  responseType: 'gpt',
  prompt: (message, context) => {
    const pergunta = context.payload || 'Me de uma dica rapida.';
    return `Responda em portugues e de modo direto: "${pergunta}".`;
  }
}
```

## Variaveis de ambiente

| Nome            | Obrigatorio | Descricao                                                            |
|-----------------|-------------|----------------------------------------------------------------------|
| `OPENAI_API_KEY`| Sim         | Chave da API OpenAI para usar o ChatGPT.                             |
| `OPENAI_MODEL`  | Nao         | Modelo desejado (padrao `gpt-4o-mini`).                             |
| `SYSTEM_PROMPT` | Nao         | Prompt de sistema aplicado a todas as conversas.                     |
| `SESSION_FOLDER`| Nao         | Caminho da pasta onde a sessao do WhatsApp sera armazenada.          |
| `LOG_LEVEL`     | Nao         | Nivel de log do Pino (padrao `info`).                                |

## Desenvolvimento

- Execute `npm run dev` para rodar com `nodemon`.
- Pressione `Ctrl + C` para finalizar o bot com seguranca.
- Para reiniciar uma sessao, exclua o conteudo da pasta definida em `SESSION_FOLDER`.

## Possiveis evolucoes

- Persistir conversas em banco de dados.
- Adicionar comandos administrativos para grupos.
- Integrar com webhooks ou filas para back-end externos.
