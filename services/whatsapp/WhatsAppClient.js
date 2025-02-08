import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';

export class WhatsAppClient {
  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });
  }

  initialize() {
    this.client.on('qr', qr => qrcode.generate(qr, { small: true }));
    this.client.on('ready', () => console.log('CLIENT READY!'));
    return this.client.initialize();
  }

  onMessage(handler) {
    this.client.on('message_create', async msg => {
      if (!msg.fromMe) handler(msg);
    });
  }

  async sendReply(msg, response) {
    const chat = await msg.getChat();
    await chat.sendMessage(response);
  }
}