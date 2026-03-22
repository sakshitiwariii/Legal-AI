# 🚀 Quick Start - Next 15 Minutes

Follow these steps to get Legal AI running locally with Docker, then deploy to Vercel.

---

## Step 1: Environment Setup (2 min)

```bash
# Copy the example to local
cp .env.example .env.local

# Generate secret
openssl rand -base64 32
# Copy the output and add to .env.local as NEXTAUTH_SECRET
```

Edit `.env.local`:
```env
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000

# For MongoDB locally (will be created by Docker)
MONGO_URL=mongodb://admin:admin@mongodb:27017/legal-ai?authSource=admin

# Placeholder - get real keys from services
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=pcsk_...
GOOGLE_CLIENT_ID=your-google-id
GOOGLE_CLIENT_SECRET=your-google-secret
```

---

## Step 2: Run with Docker (2 min)

```bash
# Start everything
docker-compose up -d

# Check it's running
docker-compose ps

# View logs
docker-compose logs -f app
```

**Once you see "ready started server on..."** → Continue!

---

## Step 3: Test Locally (5 min)

1. Open browser: http://localhost:3000
2. Click "Home" → should load
3. Click "AI Chatbot" → should load
4. Try Google Login (will fail without real credentials, that's OK for now)
5. Click "Admin" → should load
6. Check MongoDB: http://localhost:8081 (admin/admin)

✅ If all pages load → Docker is working!

---

## Step 4: Push to GitHub (2 min)

```bash
# Check what changes exist
git status

# Add everything
git add .

# Commit
git commit -m "Initial setup: Docker + RAG + MongoDB"

# Push to main branch
git push origin main
```

---

## Step 5: Deploy to Vercel (4 min)

### 5.1: Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub
- Click "Import Project"

### 5.2: Import Repository
- Select your GitHub repo
- Click "Import"
- Click "Deploy"

**Wait 2-3 minutes...**

### 5.3: Add Environment Variables
1. In Vercel dashboard: Click "Settings" → "Environment Variables"
2. Add these variables:

```env
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=https://your-project.vercel.app
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/legal-ai
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=pcsk_...
GOOGLE_CLIENT_ID=your-google-id
GOOGLE_CLIENT_SECRET=your-google-secret
```

### 5.4: Redeploy
1. Click "Deployments"
2. Click the three dots (...)
3. Click "Redeploy"
4. Wait 2-3 minutes

✅ Done! Your app is live!

---

## Database: MongoDB Atlas (Free)

Get a real database for production:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account (free)
3. Create a cluster
4. Create database user (username + password)
5. Get connection string
6. Add to Vercel: `MONGO_URL=mongodb+srv://...`

---

## OAuth: Google Login

Get Google OAuth credentials:

1. Go to https://console.cloud.google.com
2. Create new project
3. Enable "Google+ API"
4. Create OAuth credentials:
   - Type: Web app
   - Add redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (local)
     - `https://your-project.vercel.app/api/auth/callback/google` (production)
5. Copy Client ID & Secret
6. Add to `.env.local` and Vercel

---

## AI Services: OpenAI & Pinecone

Get free/cheap API keys:

### OpenAI
1. https://platform.openai.com/api-keys
2. Create new key
3. Add to `.env.local` and Vercel: `OPENAI_API_KEY=sk-...`
4. ⚠️ Keep this secret! Don't commit!

### Pinecone
1. https://app.pinecone.io
2. Create free account
3. Create index named: `legal-docs` (dimension: 1536)
4. Get API key
5. Add to `.env.local` and Vercel: `PINECONE_API_KEY=pcsk_...`

---

## Test Everything Works

### Local Test
```bash
docker-compose up -d

# Visit these URLs:
# http://localhost:3000          → Home page
# http://localhost:3000/chat     → Chatbot
# http://localhost:3000/admin    → Admin panel
# http://localhost:8081          → MongoDB visualization
```

### Production Test
Visit `https://your-project.vercel.app`:
- ✅ Home page loads
- ✅ Admin page loads
- ✅ Chat page loads
- ✅ Can upload documents
- ✅ Can ask questions

---

## Troubleshooting

### Docker won't start?
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Vercel build fails?
- Check "Deployments" → "Build logs"
- Ensure all env vars are set
- Make sure `npm run build` works locally

### App won't run locally?
```bash
# Kill Node processes
pkill node

# Clear cache
rm -rf .next node_modules

# Reinstall
npm install --legacy-peer-deps
npm run dev
```

---

## What's Included? 📦

| Component | Purpose | Status |
|-----------|---------|--------|
| Next.js | Web framework | ✅ Setup |
| React | UI library | ✅ Setup |
| MongoDB | Database | ✅ Docker |
| NextAuth | Authentication | ✅ Configured |
| OpenAI | Chat completions | 🔧 Needs key |
| Pinecone | Vector database | 🔧 Needs key |
| LangChain | RAG framework | ✅ Installed |
| Vercel | Hosting | 🔧 Deploy now |

---

## Next Steps

1. ✅ Local development with Docker
2. ✅ Deploy to Vercel (TODAY)
3. 🔜 Get MongoDB Atlas (this week)
4. 🔜 Get OAuth keys (this week)
5. 🔜 Get AI API keys (this week)
6. 🔜 Ingest legal documents (next week)
7. 🔜 Launch to users (next week)

---

## Support

- **Docker issues?** → See DEPLOYMENT.md
- **Vercel questions?** → See DEPLOYMENT.md
- **Setup checklist?** → See SETUP_CHECKLIST.md
- **RAG setup?** → See README.md

---

**You're 15 minutes away from a deployed legal AI platform! Let's go! 🚀**