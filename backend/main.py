import fitz
import jwt
from datetime import datetime, timedelta

from fastapi import (
    FastAPI,
    UploadFile,
    File,
    HTTPException,
    Depends,
    status
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
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
JWT_SECRET = os.getenv("JWT_SECRET", "supersecretjwtkey")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRES_MINUTES = int(os.getenv("JWT_EXPIRES_MINUTES", "60"))
AUTH_EMAIL = os.getenv("AUTH_EMAIL", "demo@legal.ai")
AUTH_PASSWORD = os.getenv("AUTH_PASSWORD", "Demo1234!")

security = HTTPBearer()

# =========================
# AUTH HELPERS
# =========================

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=JWT_EXPIRES_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if "sub" not in payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token",
            )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
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

class AuthRequest(BaseModel):
    email: str
    password: str


class ChatRequest(BaseModel):
    messages: list[dict]
    model: str = "gpt-3.5-turbo"
    chat_id: str


@app.post("/auth/login")
async def login(auth_request: AuthRequest):
    if auth_request.email != AUTH_EMAIL or auth_request.password != AUTH_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    access_token = create_access_token({"sub": auth_request.email})
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# =========================
# CHAT ROUTE
# =========================

@app.post("/chat")
async def chat(
    request: ChatRequest,
    token_data: dict = Depends(verify_token)
):

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
