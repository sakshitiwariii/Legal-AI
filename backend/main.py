import fitz

from fastapi import (
    FastAPI,
    UploadFile,
    File,
    HTTPException
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from pydantic import BaseModel

from langchain_openai import (
    OpenAIEmbeddings
)

from langchain_pinecone import (
    PineconeVectorStore
)

from langchain.text_splitter import (
    RecursiveCharacterTextSplitter
)

from rag_pipeline import (
    ask_legal_ai
)

from dotenv import load_dotenv

import os

# =========================
# LOAD ENV
# =========================

load_dotenv()

OPENAI_API_KEY = os.getenv(
    "OPENAI_API_KEY"
)

# =========================
# FASTAPI
# =========================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# REQUEST MODEL
# =========================

class ChatRequest(BaseModel):

    messages: list[dict]

    model: str = "gpt-3.5-turbo"

    chat_id: str

# =========================
# CHAT ROUTE
# =========================

@app.post("/chat")
async def chat(request: ChatRequest):

    try:

        response = ask_legal_ai(
            messages=request.messages,
            model_name=request.model
        )

        return {
            "content": response["answer"],
            "sources": response["sources"]
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# =========================
# INGEST ROUTE
# =========================

@app.post("/ingest")
async def ingest(
    file: UploadFile = File(...)
):

    try:

        contents = await file.read()

        text = ""

        # =========================
        # PDF PARSING
        # =========================

        if file.filename.endswith(".pdf"):

            doc = fitz.open(
                stream=contents,
                filetype="pdf"
            )

            for page in doc:

                text += page.get_text()

        else:

            text = contents.decode("utf-8")

        # =========================
        # SPLIT TEXT
        # =========================

        text_splitter = (
            RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200
            )
        )

        chunks = text_splitter.split_text(
            text
        )

        # =========================
        # EMBEDDINGS
        # =========================

        embeddings = OpenAIEmbeddings(
            openai_api_key=OPENAI_API_KEY
        )

        # =========================
        # VECTOR STORE
        # =========================

        vector_store = PineconeVectorStore(
            index_name="legal-docs",
            embedding=embeddings
        )

        # =========================
        # ADD CHUNKS
        # =========================

        vector_store.add_texts(chunks)

        return {
            "success": True,
            "chunks_added": len(chunks),
            "filename": file.filename
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
