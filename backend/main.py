import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import fitz  # PyMuPDF
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_pinecone import PineconeVectorStore
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain.text_splitter import RecursiveCharacterTextSplitter
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    messages: list[dict]
    model: str = "gpt-3.5-turbo"
    chat_id: str

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        embeddings = OpenAIEmbeddings(openai_api_key=os.environ.get("OPENAI_API_KEY"))
        vector_store = PineconeVectorStore(index_name="legal-docs", embedding=embeddings)
        retriever = vector_store.as_retriever()
        
        llm = ChatOpenAI(model=request.model, openai_api_key=os.environ.get("OPENAI_API_KEY"))
        
        contextualize_q_system_prompt = (
            "Given a chat history and the latest user question "
            "which might reference context in the chat history, "
            "formulate a standalone question which can be understood "
            "without the chat history. Do NOT answer the question, "
            "just reformulate it if needed and otherwise return it as is."
        )
        contextualize_q_prompt = ChatPromptTemplate.from_messages([
            ("system", contextualize_q_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}")
        ])
        
        history_aware_retriever = create_history_aware_retriever(llm, retriever, contextualize_q_prompt)
        
        qa_system_prompt = (
            "You are a legal AI assistant. You must be extremely helpful and professional. "
            "Use the following pieces of retrieved context to answer the question accurately based on Indian law. "
            "If you don't know the answer, say that you don't know.\n\n"
            "{context}"
        )
        qa_prompt = ChatPromptTemplate.from_messages([
            ("system", qa_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}")
        ])
        
        question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
        rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)
        
        chat_history = []
        for msg in request.messages[:-1]:
            if msg["role"] == "user":
                chat_history.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "assistant":
                chat_history.append(AIMessage(content=msg["content"]))
                
        user_input = request.messages[-1]["content"] if request.messages else ""
        
        response = rag_chain.invoke({"input": user_input, "chat_history": chat_history})
        
        return {"content": response["answer"]}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ingest")
async def ingest(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        
        text = ""
        if file.filename.endswith('.pdf'):
            doc = fitz.open(stream=contents, filetype="pdf")
            for page in doc:
                text += page.get_text()
        else:
            text = contents.decode("utf-8")
            
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = text_splitter.split_text(text)
        
        embeddings = OpenAIEmbeddings(openai_api_key=os.environ.get("OPENAI_API_KEY"))
        vector_store = PineconeVectorStore(index_name="legal-docs", embedding=embeddings)
        
        vector_store.add_texts(chunks)
        
        return {"success": True, "message": f"Ingested {len(chunks)} chunks from {file.filename}"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
