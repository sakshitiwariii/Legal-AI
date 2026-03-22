# 🛠️ Troubleshooting Guide

Common issues and how to fix them.

---

## Docker Issues

### Issue: "docker-compose: command not found"
**Problem:** Docker Compose not installed or not in PATH

**Solution:**
```bash
# Check if Docker Desktop is running
# On Windows: Docker Desktop must be running in background

# If using Docker CLI (recommended):
docker compose version

# Use `docker compose` instead of `docker-compose`
docker compose up -d
docker compose logs -f
docker compose down
```

---

### Issue: "Cannot connect to Docker daemon"
**Problem:** Docker is not running

**Solution:**
- **Windows:** Open Docker Desktop (icon in taskbar)
- Wait 1 minute for it to fully start
- Try again

---

### Issue: "Port 3000 already in use"
**Problem:** Another app is using port 3000

**Solution:**
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with the number shown)
taskkill /PID <PID> /F

# Or change the port in docker-compose.yml
# Change "3000:3000" to "3001:3000"
```

---

### Issue: "MongoDB connection refused"
**Problem:** MongoDB container is not running

**Solution:**
```bash
# Check container status
docker compose ps

# If mongodb not running:
docker compose logs mongodb

# Restart everything
docker compose down
docker compose up -d

# Wait 10 seconds for MongoDB to start
sleep 10
docker compose logs app
```

---

### Issue: Docker build is very slow
**Problem:** First build takes 3-5 minutes

**Solution:**
- Wait patiently (building Node.js image takes time)
- Or use pre-built image:

```bash
# Force rebuild
docker compose build --no-cache
docker compose up -d
```

---

## Environment Variables

### Issue: "Invalid OpenAI API key"
**Problem:** OpenAI key is wrong or not set

**Solution:**
```bash
# Check .env.local has the key
cat .env.local | grep OPENAI_API_KEY

# If missing:
# 1. Get key from https://platform.openai.com/api-keys
# 2. Add to .env.local:
OPENAI_API_KEY=sk-...

# 3. Restart docker
docker compose restart app
```

---

### Issue: "Cannot find module 'pinecone'"
**Problem:** Environment variable missing

**Solution:**
```bash
# Ensure .env.local has:
PINECONE_API_KEY=pcsk_...
PINECONE_INDEX=legal-docs
PINECONE_ENVIRONMENT=us-east-1-aws

# Then restart
docker compose restart app
```

---

### Issue: "MONGO_URL not set"
**Problem:** Environment variable missing

**Solution:**
```bash
# .env.local should have:
MONGO_URL=mongodb://admin:admin@mongodb:27017/legal-ai?authSource=admin

# If you changed MongoDB password in docker-compose.yml:
# Make sure .env.local matches!

# Restart docker
docker compose restart app
```

---

## Chat & RAG Issues

### Issue: "Chat endpoint returns 500 error"
**Problem:** API error in rag-chat

**Solution:**
```bash
# Check logs
docker compose logs app | tail -50

# Common causes:
# 1. Missing OpenAI key → Add to .env.local
# 2. Missing Pinecone key → Add to .env.local
# 3. Empty knowledge base → Upload docs in /admin
# 4. OpenAI API down → Check https://status.openai.com
```

---

### Issue: "No documents found in knowledge base"
**Problem:** Haven't uploaded any documents yet

**Solution:**
1. Go to http://localhost:3000/admin
2. Upload a PDF (Legal document recommended)
3. Wait for "Upload successful"
4. Try asking about it in chat

---

### Issue: "Chat returns same answer for every question"
**Problem:** Pinecone index not initialized or empty

**Solution:**
```bash
# Check Pinecone dashboard
# 1. Go to https://app.pinecone.io
# 2. Click your index "legal-docs"
# 3. Check "Total vectors" → should be > 0

# If 0 vectors:
# 1. Go to http://localhost:3000/admin
# 2. Upload a PDF file
# 3. Wait for success message
```

---

### Issue: "Upload fails silently on /admin"
**Problem:** File too large or format not supported

**Solution:**
- Maximum file size: 10MB
- Supported formats: PDF only
- Try a smaller PDF first

```bash
# Or upload via API
curl -X POST http://localhost:3000/api/ingest \
  -F "file=@document.pdf"
```

---

## Authentication Issues

### Issue: "Google login redirects back to login page"
**Problem:** Google OAuth not configured correctly

**Solution:**
1. Check `.env.local` has:
```env
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=http://localhost:3000
```

2. In Google Cloud Console:
   - Go to Credentials
   - Check redirect URI includes: `http://localhost:3000/api/auth/callback/google`
   - Save changes

3. Restart docker:
```bash
docker compose restart app
```

---

### Issue: "Session not persisting after login"
**Problem:** NextAuth secret not set

**Solution:**
```bash
# Generate new secret
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET=your-new-secret

# Restart
docker compose restart app
docker compose logs app
```

---

## Vercel Deployment Issues

### Issue: "Build fails on Vercel"
**Problem:** Environment variables not set

**Solution:**
1. Go to Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add all these:
```env
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://your-app.vercel.app
MONGO_URL=mongodb+srv://...
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=pcsk_...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

4. Click "Deployments" → Three dots (...)  → "Redeploy"

---

### Issue: "Production: 502 Bad Gateway"
**Problem:** API error in production

**Solution:**
1. Check Vercel function logs:
   - Dashboard → Deployments → Latest → Logs
2. Common issues:
   - Missing environment variable
   - API key expired
   - MongoDB IP not whitelisted

---

### Issue: "Google OAuth fails in production"
**Problem:** Redirect URI not configured

**Solution:**
1. In Google Cloud Console:
   - Credentials → OAuth 2.0 Client IDs
   - Edit the web app client
   - Add redirect URI:
     ```
     https://your-app.vercel.app/api/auth/callback/google
     ```
   - Save

2. In Vercel:
   - Make sure `NEXTAUTH_URL=https://your-app.vercel.app` is set

---

## Vercel MongoDB Connection Issue

### Issue: "MongoDB connection refused on Vercel"
**Problem:** MongoDB Atlas IP not whitelisted

**Solution:**
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click "Network Access"
3. Click "Add IP Address"
4. Choose one of:
   - **Option A:** "Allow Access from Anywhere" (less secure)
   - **Option B:** Add Vercel IP address
     - Vercel IPs: https://vercel.com/docs/concepts/functions/serverless-functions#additional-request-capabilities
5. Confirm

---

## Performance Issues

### Issue: "Chat response is very slow"
**Problem:** Pinecone index or OpenAI API slow

**Solution:**
- First time: Expected to be slow (1-3 seconds)
- Every other time: Should be <1 second
- If consistently slow:
  1. Check OpenAI API status: https://status.openai.com
  2. Check Pinecone status: https://status.pinecone.io
  3. Try a different question

---

### Issue: "Upload is very slow"
**Problem:** Large PDF or slow internet

**Solution:**
- Only upload documents <10MB
- Check internet speed
- Try uploading a smaller document

---

## Windows-Specific Issues

### Issue: PowerShell: "docker-compose: command not found"
**Problem:** PowerShell doesn't recognize docker-compose

**Solution:**
```powershell
# Use full path or use 'docker compose'
docker compose up -d

# Or install with winget
winget install Docker.DockerDesktop
```

---

### Issue: Line endings causing issues (CRLF vs LF)
**Problem:** Windows line endings in files

**Solution:**
```bash
# Use Git to fix
git config core.autocrlf true

# Or in VS Code:
# Bottom right: "CRLF" → Click → "LF"
```

---

### Issue: File paths with spaces in terminal
**Problem:** Paths like "C:\Legal Ai" cause issues

**Solution:**
```bash
# Use quotes
cd "C:\Legal Ai\Legal-AI"

# Or use backslashes
cd C:\Legal\ Ai\Legal-AI
```

---

## Git Issues

### Issue: "git command not found"
**Problem:** Git not installed

**Solution:**
- Download from https://git-scm.com
- Install (accept all defaults)
- Restart terminal

---

### Issue: "Cannot push to GitHub"
**Problem:** SSH key or credentials not configured

**Solution:**
```bash
# Use HTTPS instead:
git remote set-url origin https://github.com/YOUR_USERNAME/legal-ai.git

# Or set up SSH:
# https://docs.github.com/en/authentication/connecting-to-github-with-ssh

# Test connection
git push origin main
```

---

### Issue: ".env.local accidentally committed"
**Problem:** Secret keys exposed on GitHub

**Solution:**
1. **Immediately revoke all exposed keys:**
   - OpenAI: https://platform.openai.com/api-keys → Delete the key
   - Pinecone: https://app.pinecone.io → Regenerate key
   - Google: https://console.cloud.google.com → Regenerate
   - MongoDB: Change password

2. Generate new keys (see GETTING_API_KEYS.md)

3. Remove from Git history:
```bash
# Add to .gitignore (should already be there)
echo ".env.local" >> .gitignore

# Remove from history
git filter-branch --tree-filter 'rm -f .env.local' -- --all
git push origin main --force
```

---

## Still Stuck?

### Quick Diagnostics
```bash
# Check Docker status
docker compose ps

# View all logs
docker compose logs

# Check specific service
docker compose logs app
docker compose logs mongodb

# Check application version
docker compose exec app npm list next react

# Check environment
docker compose exec app env | grep -E "OPENAI|PINECONE|MONGO|GOOGLE|NEXTAUTH"
```

### Get Help
1. **Check logs first:** `docker compose logs -f`
2. **Search your error:** Copy the error message, search Google
3. **Check SETUP_CHECKLIST.md:** Phase-by-phase verification
4. **Check DEPLOYMENT.md:** Detailed troubleshooting section

---

**Still not working? Save the diagnostic output and share it!** 🆘