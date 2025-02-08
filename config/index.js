import dotenv from 'dotenv';

dotenv.config();

export default {
  pinecone: {
    index: process.env.PINECONE_INDEX,
    namespace: process.env.PINECONE_INDEX,
    textKey: 'pageContent'
  },
  ollama: {
    baseUrl: 'http://localhost:11434',
    model: 'deepseek-r1:1.5b'
  },
  pdf: {
    chunkSize: 500,
    chunkOverlap: 0
  }
};