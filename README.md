# DeepZap - A WhatsApp RAG Chatbot 🤖

A simple chatbot for WhatsApp that uses RAG (Retrieval-Augmented Generation) to answer questions based on documents, using **deepseek-r1:1.5b**. Built with Pinecone, Ollama and LangChain.

<img src="https://www.mermaidchart.com/raw/0debfb45-2bb5-4b31-ae29-c98fb6f32fb1?theme=light&version=v0.1&format=svg"/>


## 🚀 Features

- PDF document processing for embedding creation
- Vector storage with Pinecone
- Response generation using the DeepSeek-R1-1.5B model via Ollama
- Integration with WhatsApp
- RAG system for contextualized responses

## 📦 Prerequisites

- Node.js v18+
- [Pinecone](https://www.pinecone.io/) account
- Ollama installed and configured locally
- Active WhatsApp number

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/h4rad4/deepzap.git
cd deepzap
```

2. Install the dependencies:
```bash 
npm i
```
3. Create your .env:
```bash 
PINECONE_ENVIRONMENT=your-pinecone-env
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_INDEX=your-pinecone-index-name
```

4. Install the Ollama model:
```bash 
ollama pull deepseek-r1:1.5b
```

## ⚙️ Settings

```bash 
├── config/        # Application Settings
├── controllers/   # Message handling
├── services/      # Core services
├── uploads/       # PDFs to be upserted into Pinecone
└── utils/         
```

## ▶️ Usage

1. Index documents:

```bash 
node indexDocs.js
```

2. Start the bot:

```bash 
node app.js
```

3. Scan the QR code in the terminal with your WhatsApp
4. Send messages to the bot directly from WhatsApp

## ⚠️ Important Notes
- Keep Ollama running locally (ollama serve)

- First time login to WhatsApp requires QR code scanning

- WhatsApp session data is stored locally

- Adjust chunk parameters in config/index.js as needed