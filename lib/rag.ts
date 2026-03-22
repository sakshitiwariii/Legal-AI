import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { ChatOpenAI } from '@langchain/openai';
import { RetrievalQAChain } from 'langchain/chains';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY!,
});

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

export async function createVectorStore(documents: string[], indexName: string) {
  // Create or get existing index
  const index = pinecone.index(indexName);

  // Split documents into chunks
  const docs = await textSplitter.createDocuments(documents);

  // Create vector store
  const vectorStore = await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex: index,
  });

  return vectorStore;
}

export async function queryRAG(question: string, indexName: string) {
  const index = pinecone.index(indexName);
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
  });

  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY!,
    modelName: 'gpt-4',
  });

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  const result = await chain.call({
    query: question,
  });

  return result;
}