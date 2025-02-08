import { removeThinking } from '../utils/helpers.js';

export class MessageController {
  constructor(client, ragService) {
    this.client = client;
    this.ragService = ragService;
    this.initialize();
  }

  initialize() {
    this.client.onMessage(async msg => {
      if (msg.fromMe) return;
      if (msg.from && msg.from.includes('@g.us')) return;
      
      console.log(`Message from ${msg.from}: ${msg.body}`);
      
      try {
        const chat = await msg.getChat();
        await chat.sendStateTyping();

        const response = await this.ragService.query(msg.body);
        await this.client.sendReply(msg, removeThinking(response));
      } catch (error) {
        console.error('Error:', error);
        await this.client.sendReply(msg, '⚠️ Error processing request');
      }
    });
  }
}