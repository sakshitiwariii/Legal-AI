import os
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv

load_dotenv()

# Initialize Pinecone
pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))

index_name = "legal-docs"

# Create the index if it doesn't exist
if index_name not in pc.list_indexes().names():
    print(f"Creating index: {index_name}")
    pc.create_index(
        name=index_name,
        dimension=1536, # OpenAI embedding dimension
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )
    print("Index created successfully!")
else:
    print(f"Index {index_name} already exists.")
