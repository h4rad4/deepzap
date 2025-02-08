import config from './config/index.js';
import { WhatsAppClient } from './services/whatsapp/WhatsAppClient.js';
import { PineconeService } from './services/llm/PineconeService.js';
import { OllamaService } from './services/llm/OllamaService.js';
import { RAGService } from './services/rag/RAGService.js';
import { MessageController } from './controllers/MessageController.js';

async function bootstrap() {
  const pinecone = new PineconeService(config);
  const ollama = new OllamaService(config);
  const rag = new RAGService(pinecone, ollama, config);
  const whatsapp = new WhatsAppClient();

  new MessageController(whatsapp, rag);

  await whatsapp.initialize();
}

bootstrap().catch(console.error);