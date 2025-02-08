import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PromptTemplate } from '@langchain/core/prompts';

export class RAGService {
  constructor(pineconeService, ollamaService, config) {
    this.pinecone = pineconeService;
    this.ollama = ollamaService;
    this.config = config;
  }

  async ingest(filePath) {
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();
    
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: this.config.pdf.chunkSize,
      chunkOverlap: this.config.pdf.chunkOverlap
    });
    
    return splitter.splitDocuments(docs);
  }

  async generatePrompt(context, question) {
    const template = `
      Responda sempre em Português Brasileiro.

      Contexto:
      {context}
      ---
      Pergunta: {question}
      `;
      
    
    return PromptTemplate
      .fromTemplate(template)
      .format({ context, question });
  }

  async query(question) {
    const vectorStore = await this.pinecone.getVectorStore(this.ollama.embeddings);
    const retrievedDocs = await vectorStore.similaritySearch(question, 3);

    const context = retrievedDocs
    .map(doc => doc.pageContent)
    .join('\n');

    console.log(context)
    const prompt = await this.generatePrompt(context, question);
    const response = await this.ollama.generateResponse(prompt);
    return response.content;
  }
}