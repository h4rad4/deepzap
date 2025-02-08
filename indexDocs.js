import fs from 'fs/promises';
import path from 'path';
import config from './config/index.js';
import { RAGService } from './services/rag/RAGService.js';
import { PineconeService } from './services/llm/PineconeService.js';
import { OllamaService } from './services/llm/OllamaService.js';

export async function indexDocs() {
  try {
    const uploadsDir = path.resolve('uploads');
    const files = await fs.readdir(uploadsDir);

    if (files.length === 0) {
      console.log('No documents to index.');
      return;
    }

    const pineconeService = new PineconeService(config);
    const ollamaService = new OllamaService(config);
    const ragService = new RAGService(pineconeService, ollamaService, config);

    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      console.log(`Indexing ${filePath}...`);
      const docs = await ragService.ingest(filePath);
      await pineconeService.saveVectors(docs, ollamaService.embeddings);
    }

    console.log('Finished.');
  } catch (error) {
    console.error('Error while indexing:', error);
  }
}

indexDocs();
