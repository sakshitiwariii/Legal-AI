 # LegalAI - RAG Chatbot Setup Guide

## ⚡ Quick Navigation

| Need | Document | Time |
|------|----------|------|
| **Get Running Now** | [QUICKSTART.md](./QUICKSTART.md) | 15 min |
| **Get API Keys** | [GETTING_API_KEYS.md](./GETTING_API_KEYS.md) | 30 min |
| **Something Broken?** | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | varies |
| **Full Details** | [DEPLOYMENT.md](./DEPLOYMENT.md) | 30 min |
| **Verify Setup** | [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) | 60 min |
| **All Docs** | [DOCS.md](./DOCS.md) | - |

**👉 [START HERE: QUICKSTART.md](./QUICKSTART.md)** - Get the app running locally with Docker and deployed to Vercel in 15 minutes!

---

## 🚀 Tech Stack

### Your Tech Stack
- **Frontend**: Next.js 15 with React
- **Backend**: Node.js API Routes
- **Database**: MongoDB (document-based, flexible schema)
- **Authentication**: NextAuth (OAuth + Session management)
- **RAG Engine**: LangChain + Pinecone + OpenAI
- **Deployment**: Docker + Vercel

---

## 📚 Database & Authentication Guide

### Database: MongoDB ✅ Why?
```
✅ Already installed (mongoose v7.5.0)
✅ Flexible schema for user data, cases, chat history
✅ Easy to scale horizontally
✅ Perfect for document storage (legal texts, PDFs)
✅ Free tier available (MongoDB Atlas)
```

**Your setup:**
- Mongoose ORM already configured
- User model in `model/User.ts`
- Connection in `lib/dbConnect.ts`

### Authentication: NextAuth ✅ Why?
```
✅ Already configured in your project
✅ OAuth support (Google, GitHub, etc.)
✅ Secure session management
✅ Works perfectly with Next.js
✅ No additional service needed
```

**Features:**
- Google OAuth login
- Email/password authentication
- JWT tokens
- Session persistence in MongoDB

---

## 🐳 Docker & Vercel Deployment

### **Complete Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

Quick summary:
```bash
# Local development with Docker
docker-compose up -d

# Access points:
# - App: http://localhost:3000
# - MongoDB: localhost:27017
# - Mongo Express: http://localhost:8081
```

**Deploy to Vercel in 3 minutes:**
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables
4. Deploy! ✅

---

## 🚀 RAG (Retrieval-Augmented Generation) Implementation

This guide will help you set up the RAG-powered legal chatbot for accurate, source-cited legal responses.

### Prerequisites

1. **OpenAI API Key** - For embeddings and chat completion
2. **Pinecone Account** - Vector database for document storage
3. **Legal Documents** - PDF files containing legal texts

### Step 1: Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Add your API keys to `.env.local`:
```env
OPENAI_API_KEY=your_openai_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=your_pinecone_environment_here
PINECONE_INDEX=legal-docs
```

### Step 2: Install Dependencies

```bash
npm install @langchain/openai @langchain/pinecone @langchain/textsplitters @langchain/community langchain uuid --legacy-peer-deps
```

### Step 3: Set up Pinecone Index

1. Create a new index in Pinecone:
   - Name: `legal-docs`
   - Dimension: `1536` (for OpenAI embeddings)
   - Metric: `cosine`

### Step 4: Ingest Legal Documents

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `/admin` in your browser

3. Upload legal documents (PDF format):
   - Constitution of India
   - BNSS 2023
   - BNS 2023
   - Consumer Protection Act 2019
   - RTI Act 2005
   - PWDVA 2005

### Step 5: Test the RAG Chatbot

1. Go to `/chat` in your browser
2. Ask legal questions like:
   - "What are my rights during arrest?"
   - "Explain Article 21 of the Constitution"
   - "What is the procedure for consumer complaints?"

The chatbot will now provide accurate, source-cited answers based on the ingested legal documents.

## 📁 Project Structure

```
Legal-AI/
├── app/
│   ├── api/
│   │   ├── chat/          # Existing chat API (Groq)
│   │   ├── rag-chat/      # NEW: RAG-powered chat
│   │   └── ingest/        # NEW: Document ingestion
│   ├── admin/             # NEW: Admin panel
│   └── chat/              # Updated with RAG integration
├── lib/
│   ├── rag.ts            # NEW: RAG utilities
│   └── pdf.ts            # Document processing
└── components/
    └── DocumentIngestor.tsx # NEW: Document upload component
```

## 🔧 API Endpoints

### Document Ingestion
```
POST /api/ingest
- Uploads and processes legal documents
- Creates vector embeddings
- Stores in Pinecone vector database
```

### RAG Chat
```
POST /api/rag-chat
- Accepts: { question: string, indexName?: string }
- Returns: { answer: string, sources: Source[] }
- Provides source-cited legal answers
```

## 🎯 How RAG Works

1. **Document Ingestion**: Legal PDFs are split into chunks and converted to vector embeddings
2. **Query Processing**: User questions are converted to embeddings
3. **Retrieval**: Similar document chunks are retrieved from vector database
4. **Generation**: LLM generates answers using retrieved context
5. **Citation**: Sources are provided for transparency

## 🚀 Deployment

The RAG system is fully integrated with your existing Next.js application and will work in production with the same environment variables.

## 📊 Monitoring

- Check `/admin` for system status
- Monitor Pinecone dashboard for vector storage
- Track API usage in OpenAI dashboard

---

## Original README Content

LegalAI is an AI-powered platform designed to demystify the Indian justice system, making legal knowledge accessible and understandable for everyone. By leveraging cutting-edge artificial intelligence tools, it provides clear language explanations, personalized legal guidance, and real-time assistance, empowering citizens to understand and exercise their legal rights effectively.

<<<<<<< HEAD
## **✨ Core Features**

LegalAI offers a comprehensive suite of intelligent tools to simplify your legal journey:
<img width="1909" height="905" alt="image" src="https://github.com/user-attachments/assets/34d11669-19a7-4eb9-9f58-bf831d354d3b" />


### **1. AI Legal Assistant**
Get instant, AI-powered responses to your legal queries. Our intelligent assistant can be configured with various language models (including LLaMA 3 8B for quick responses and LLaMA 3 70B for complex legal analysis) to match your specific needs for speed and depth of understanding.

<img width="1917" height="914" alt="image" src="https://github.com/user-attachments/assets/7f743b51-0c7a-4d3f-9181-a6f40c592c44" />


### **2. Smart Case Monitor**
Track and manage your legal cases with real-time updates. Stay informed about case statuses, upcoming hearing dates, and important developments. Features include advanced search capabilities, status-based filtering, and multiple sorting options for efficient case management.

<img width="1909" height="900" alt="image" src="https://github.com/user-attachments/assets/a51b8748-15bf-4ccb-bd97-fb78f1581e30" />


### **3. Interactive Rights Explorer**
Discover and understand your legal rights through intuitive, interactive visualizations. Explore comprehensive categories including Arrest Rights, Property Rights, Consumer Protection, Employment Rights, and Family Law Rights, all presented in simple, accessible language.

<img width="1919" height="903" alt="image" src="https://github.com/user-attachments/assets/69231ea6-78f4-4a93-a34f-fd01455f75c9" />


### **4. Document Intelligence**
Upload complex legal documents (supporting PDF, Word, and Text formats up to 10MB) and receive simplified, plain-language explanations of their content, helping you understand complex legal terminology and clauses with ease.

<img width="1918" height="908" alt="image" src="https://github.com/user-attachments/assets/ac82ec3c-4fdd-4843-9c5d-ae54c74d403a" />


### **5. Legal Connect Hub**
Connect with verified legal aid providers, experienced lawyers, and legal clinics across India. Search by professional name, area of specialization, or geographic location, with advanced filtering options by state and service type to find the perfect legal assistance.

<img width="1912" height="960" alt="image" src="https://github.com/user-attachments/assets/4439f0ef-33c5-4f51-b435-0eab2dd82489" />


## **🛠️ Technology Stack**

LegalAI is built on a robust MERN (MongoDB, Express, React, Node.js) architecture with Next.js powering the frontend, enhanced by cutting-edge libraries and AI services:

### **Frontend Architecture:**
- **Next.js**: Advanced React framework for server-side rendering and static generation
# LegalAI

LegalAI is a cleaned import of a Next.js + Node project focused on making legal information more accessible using AI-powered tools.

This repository contains a single initial import commit. The original commit history and author metadata were intentionally removed during the import.

Quick start (frontend)

1. Install dependencies:

```powershell
cd C:\D\Legal AI\legal-AI-clean
npm install
```

2. Create a local env file (`.env.local`) and set required variables (example):

```
OPENAI_API_KEY=your_openai_key
MONGO_URL=mongodb://127.0.0.1:27017/legalai
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=replace_with_a_secure_secret
```

3. Run the dev server:

```powershell
npm run dev
```

The app will be available at http://localhost:3001 (or the port printed by Next).

Notes
- This project requires environment variables for OpenAI, MongoDB, and NextAuth to enable full functionality. Without them, some API routes will return errors in dev (this is expected).
- Recommended deployment: Vercel (first-class Next.js support). You can also use Render or Netlify with appropriate configuration.

If you'd like, I can finish the rebase and push these changes for you.
### **1. Repository Setup:**
