# Legal AI

Legal AI is a legal assistance web app with a Next.js frontend and a FastAPI backend. It includes a chat assistant backed by a retrieval-augmented generation pipeline, document ingestion, authentication, a legal help section, and a case-tracking dashboard.

## Features

- Legal chat assistant with authenticated requests
- Document ingestion for PDF and text files
- RAG-based answers using Pinecone and LangChain
- Login and signup flow
- Pages for simplifying legal content, understanding rights, and finding legal help
- Dashboard view for tracking cases

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- Backend: FastAPI, Uvicorn, Python
- Retrieval and AI services: LangChain, OpenAI, Pinecone
- Authentication and session handling: JWT, Supabase client utilities

## Project Structure

- `Legal-AI/frontend` - Next.js app and UI routes
- `Legal-AI/backend` - FastAPI server, auth, chat, and ingest endpoints
- `Legal-AI/app` - API route entry points used by the frontend
- `Legal-AI/database` - RAG data and seed scripts

## Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- A Pinecone account and index named `legal-docs`
- An OpenAI API key

## Environment Variables

### Backend

Set these in `Legal-AI/backend/.env` or in your shell:

- `OPENAI_API_KEY`
- `PINECONE_API_KEY`
- `PINECONE_ENVIRONMENT`
- `JWT_SECRET` - optional, defaults to `supersecretjwtkey`
- `JWT_ALGORITHM` - optional, defaults to `HS256`
- `JWT_EXPIRES_MINUTES` - optional, defaults to `60`
- `AUTH_EMAIL` - optional demo login email
- `AUTH_PASSWORD` - optional demo login password

### Frontend

Set these in `Legal-AI/frontend/.env.local`:

- `PYTHON_BACKEND_URL` - defaults to `http://localhost:8000`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXTAUTH_URL` - optional when running outside Docker
- `NEXTAUTH_SECRET` - optional when used by your deployment setup

## Run Locally

### Backend

```bash
cd Legal-AI/backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd Legal-AI/frontend
npm install
npm run dev
```

Open the app at `http://localhost:3000`.

## Docker

You can run both services with Docker Compose from the `Legal-AI` folder:

```bash
cd Legal-AI
docker compose up --build
```

This starts:

- Frontend on port `3000`
- Python backend on port `8000`

## API Endpoints

Backend endpoints used by the app:

- `POST /auth/signup`
- `POST /auth/login`
- `POST /chat`
- `POST /ingest`

## Notes

- The chat endpoint expects a bearer token.
- The ingest endpoint accepts a PDF or text file and adds chunks to the Pinecone index.
- The app is for informational use and should not be treated as formal legal advice.