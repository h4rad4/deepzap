const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('bot ready!');
});

async function query(message) {

  const context = rag(message);
  try {
    const response = await axios.post('http://localhost:1234/v1/chat/completions', {
      model: 'deepseek-r1-distill-qwen-7b',
      messages: [
        { role: 'system', content: `You are a helpful assistant. Always answer in Brazilian Portuguese. 
                                    Consider the following context to provide precise and relevant answers.
                                    If you are not sure about something, just say 'Não sei responder a isso'.
                                    
                                    Context: `, context },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30s
    });

    console.log('API repsonse:', response.data);
    rawResponse = response.data.choices[0].message.content;
    const cleanResponse = rawResponse
    .replace(/<think>[\s\S]*?<\/think>/g, '')
    .trim();

    return cleanResponse
  } catch (error) {
    console.error('error while querying: ', error);
    return 'Estou tendo dificuldades para processar isso no momento.';
  }
}

client.on('message_create', async (msg) => {
  if (msg.fromMe) return;
  
  console.log(`mensagem de ${msg.from}: ${msg.body}`);
  
  try {
    const chat = await msg.getChat();
    await chat.sendStateTyping();
    
    const response = await query(msg.body);
    await msg.reply(response);
  } catch (error) {
    console.error('erro no handler:', error);
    await msg.reply('⚠️ Ocorreu um erro interno.');
  }
});

async function rag() {
  console.log('TODO()');
}

client.initialize();