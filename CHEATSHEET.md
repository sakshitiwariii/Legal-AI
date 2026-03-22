# 🎯 Quick Reference Card

Print this or keep it in a browser tab for quick answers.

---

## 🐳 Docker Commands

```bash
# Start everything
docker compose up -d

# See status
docker compose ps

# View logs
docker compose logs -f app

# Stop everything
docker compose down

# Restart a service
docker compose restart app

# Access MongoDB from terminal
docker compose exec mongodb mongosh -u admin -p admin

# Rebuild images
docker compose build --no-cache
```

---

## 🌐 Local URLs

```
App:     http://localhost:3000
Admin:   http://localhost:3000/admin
Chat:    http://localhost:3000/chat
MongoDB: http://localhost:8081 (admin/admin)
```

---

## 📁 Key Files & Locations

| File | Purpose |
|------|---------|
| `.env.local` | Local secrets (git-ignored) |
| `app/chat/page.tsx` | Chat page UI |
| `app/api/rag-chat/route.ts` | Chat API endpoint |
| `app/api/ingest/route.ts` | Document upload API |
| `app/admin/page.tsx` | Admin dashboard |
| `lib/rag.ts` | RAG core utilities |
| `docker-compose.yml` | Local dev orchestration |
| `Dockerfile` | Production container |
| `vercel.json` | Vercel deployment config |

---

## 🔑 Required Environment Variables

### `.env.local` (Local Development)
```env
NEXTAUTH_SECRET=generate-with-openssl-rand
NEXTAUTH_URL=http://localhost:3000
MONGO_URL=mongodb://admin:admin@mongodb:27017/legal-ai?authSource=admin
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=pcsk_...
GOOGLE_CLIENT_ID=...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=...
```

### Vercel Environment (Production)
Same variables, different values:
```env
NEXTAUTH_SECRET=same-secret
NEXTAUTH_URL=https://your-app.vercel.app
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/legal-ai
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=pcsk_...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

---

## 🚀 Deployment Checklist

### Before Deploying to Vercel:
- [ ] Push code to GitHub: `git push origin main`
- [ ] All `.env.local` keys are valid (test locally first)
- [ ] `docker compose up -d` works locally
- [ ] Chat endpoint `/api/rag-chat` returns 200 status
- [ ] Can upload documents in `/admin`
- [ ] Local build succeeds: `npm run build`

### On Vercel Dashboard:
- [ ] Connect GitHub repository
- [ ] Add all 7 environment variables
- [ ] Trigger deploy: "Redeploy"
- [ ] Wait for build to complete (5-10 min)
- [ ] Check "View Deployment" URL

---

## 🐛 Emergency Fixes

### Docker won't start
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Port already in use
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID)
taskkill /PID 1234 /F
```

### MongoDB won't connect
```bash
# Check MongoDB is running
docker compose logs mongodb

# Restart it
docker compose restart mongodb

# Wait 5 seconds, try again
```

### OpenAI API errors
```bash
# Check key is set
echo %OPENAI_API_KEY%

# If empty, add to .env.local, restart docker
docker compose restart app
```

### Vercel build fails
1. Check "Deployments" → "View build logs"
2. Search for "error"
3. Most common: missing env var
4. Fix in Vercel dashboard → "Redeploy"

---

## 📊 API Endpoints

### Chat (RAG Query)
```
POST /api/rag-chat
{
  "question": "What are my legal rights?",
  "indexName": "legal-docs"
}
Response: { "answer": "...", "sources": [...] }
```

### Document Upload
```
POST /api/ingest
FormData: { "file": PDF file }
Response: { "message": "Success", "documents": N }
```

### Auth Endpoints
```
GET /api/auth/signin         (Sign in page)
POST /api/auth/callback/*    (OAuth callback)
GET /api/auth/session        (Get current session)
POST /api/auth/signout       (Sign out)
```

---

## 🔑 API Key Locations

| Service | Get Key From | Cost |
|---------|--------------|------|
| **OpenAI** | platform.openai.com/api-keys | Free tier + pay-as-you-go |
| **Pinecone** | app.pinecone.io | Free tier (1M vectors) |
| **MongoDB** | mongodb.com/cloud/atlas | Free tier (512MB) |
| **Google** | console.cloud.google.com | Free |

---

## 🆘 Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Port 3000 in use` | Another app using it | Kill process or change port |
| `Cannot connect to MongoDB` | Not running | `docker compose restart mongodb` |
| `Invalid OpenAI key` | Wrong/missing key | Add to `.env.local`, restart |
| `Pinecone: not found` | Index doesn't exist | Create `legal-docs` index in Pinecone |
| `Google login loops` | OAuth misconfigured | Check redirect URIs |
| `502 Bad Gateway on Vercel` | Missing env var | Add to Vercel dashboard |
| `Chat returns same answer` | Empty knowledge base | Upload PDF in `/admin` |

---

## 📈 Monitoring

### Check Docker Health
```bash
docker compose ps
# Should show 3 containers: app, mongodb, mongo-express (all "Up")
```

### View Live Logs
```bash
docker compose logs -f app
# Shows real-time application logs
```

### Check Pinecone Health
```
https://app.pinecone.io → Click your index → Check "Total vectors"
Should be > 0 if documents uploaded
```

### Check MongoDB Data
```
http://localhost:8081 → admin/admin
Databases → legal-ai → Browse collections
```

---

## 🎯 Performance Tips

| Action | Impact |
|--------|--------|
| Use smaller PDFs | Faster upload |
| Index fewer docs | Faster search |
| Use GPT-3.5 Turbo | Lower cost, still good |
| Cache frequent questions | Reduce API calls |
| Monitor token usage | Keep costs in check |

---

## 📚 Documentation Map

```
🚀 Quick Start
  └─ QUICKSTART.md (15 min)

⚙️ Setup & Config
  ├─ GETTING_API_KEYS.md (30 min)
  ├─ DEPLOYMENT.md (30 min)
  └─ README.md (5 min)

✅ Verification
  └─ SETUP_CHECKLIST.md (60 min)

🆘 Troubleshooting
  └─ TROUBLESHOOTING.md (as needed)

📍 Navigation
  └─ DOCS.md (this index)
```

---

## 🔐 Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] Never paste key in Discord/Slack/GitHub issues
- [ ] Rotate keys every 90 days
- [ ] Use different keys for dev vs production
- [ ] Delete exposed keys immediately
- [ ] Enable IP whitelisting in MongoDB

---

## 💾 Backup Commands

```bash
# Backup MongoDB data
docker compose exec mongodb mongodump

# Backup Node modules (not recommended - reinstall instead)
# Do NOT commit node_modules to Git

# Backup .env
cp .env.local .env.local.backup

# Backup database connection string
# Save to password manager (1Password, LastPass, etc.)
```

---

## 🚦 Status Check Script

```bash
#!/bin/bash
echo "=== Legal AI Status ==="
echo ""
echo "Docker Containers:"
docker compose ps
echo ""
echo "API Health:"
curl -s http://localhost:3000 | head -c 100
echo ""
echo "MongoDB connection:"
docker compose exec mongodb mongosh -u admin -p admin --quiet --eval "db.adminCommand('ping')"
echo ""
echo "Done!"
```

---

## 📱 Mobile Testing

```bash
# Get your local IP
ipconfig getifaddr en0  # Mac
ipconfig  # Windows (look for IPv4)

# Test from phone on same WiFi
http://YOUR_IP:3000
```

---

**Last Updated:** 2024
**Status:** ✅ Production Ready
**Support:** See TROUBLESHOOTING.md or DOCS.md