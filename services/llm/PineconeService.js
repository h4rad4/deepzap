import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';

export class PineconeService {
  constructor(config) {
    this.pinecone = new Pinecone();
    this.config = config;
    this.index = this.pinecone.index(this.config.pinecone.index);
  }

  async saveVectors(documents, embeddings) {
    return PineconeStore.fromDocuments(
      documents,
      embeddings,
      {
        pineconeIndex: this.index,
        ...this.config.pinecone
      }
    );
  }

  async getVectorStore(embeddings) {
    return PineconeStore.fromExistingIndex(
      embeddings,
      {
        pineconeIndex: this.index,
        ...this.config.pinecone
      }
    );
  }
}