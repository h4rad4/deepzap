import { OllamaEmbeddings, ChatOllama } from '@langchain/ollama';

export class OllamaService {
  constructor(config) {
    this.config = config.ollama;
    this.embeddings = new OllamaEmbeddings();
    this.llm = new ChatOllama(this.config);
  }

  async generateEmbeddings(text) {
    return this.embeddings.embedQuery(text);
  }

  async generateResponse(prompt) {
    return this.llm.invoke(prompt);
  }
}