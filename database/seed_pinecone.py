import json
import os
from dotenv import load_dotenv

from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_core.documents import Document

load_dotenv()

# =========================
# LOAD DATASET
# =========================

with open(
    "processed_legal_rag.json",
    "r",
    encoding="utf-8"
) as f:

    data = json.load(f)

# =========================
# CREATE DOCUMENTS
# =========================

documents = []

for item in data:

    doc = Document(
        page_content=item["text"],
        metadata=item["metadata"]
    )

    documents.append(doc)

print(f"Loaded {len(documents)} documents")

# =========================
# EMBEDDINGS
# =========================

embeddings = OpenAIEmbeddings(
    openai_api_key=os.environ.get("OPENAI_API_KEY")
)

# =========================
# PINECONE VECTOR STORE
# =========================

vector_store = PineconeVectorStore(
    index_name="legal-docs",
    embedding=embeddings
)

# =========================
# ADD TO PINECONE
# =========================

vector_store.add_documents(documents)

print("Documents uploaded successfully!")