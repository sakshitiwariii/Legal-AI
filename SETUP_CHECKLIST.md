# 📋 Setup Checklist - Legal AI

## Phase 1: Local Development Setup ✅

### Environment Configuration
- [ ] Copy `.env.example` to `.env.local`
- [ ] Generate `NEXTAUTH_SECRET`:
  ```bash
  openssl rand -base64 32
  ```
- [ ] Add to `.env.local`:
  ```env
  NEXTAUTH_SECRET=your-generated-secret
  NEXTAUTH_URL=http://localhost:3000
  ```

### Database (MongoDB)
- [ ] MongoDB running locally OR MongoDB Atlas account created
- [ ] Connection string added: `MONGO_URL=...`
- [ ] Database user created with password

### AI Services
- [ ] OpenAI API key obtained: `OPENAI_API_KEY=sk-...`
- [ ] Pinecone account created
- [ ] Pinecone index created: `legal-docs`
- [ ] Pinecone API key: `PINECONE_API_KEY=pcsk_...`

### OAuth Setup (Google)
- [ ] Google Cloud project created
- [ ] OAuth 2.0 credentials generated
- [ ] Redirect URI added: `http://localhost:3000/api/auth/callback/google`
- [ ] `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` added

### Local Testing
- [ ] Run `npm install --legacy-peer-deps`
- [ ] Run `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] Test authentication (Google login)
- [ ] Visit `/admin` to ingest documents
- [ ] Test chat in `/chat`

---

## Phase 2: Dockerization ✅

### Docker Configuration
- [ ] `Dockerfile` reviewed and updated
- [ ] `.dockerignore` file created
- [ ] `docker-compose.yml` created
- [ ] MongoDB service configured in docker-compose

### Local Docker Testing
- [ ] Create `.env.docker` file
- [ ] Run `docker-compose build`
- [ ] Run `docker-compose up -d`
- [ ] Test app at http://localhost:3000
- [ ] Test MongoDB at localhost:27017
- [ ] View logs with `docker-compose logs -f app`
- [ ] Run `docker-compose down` to stop

### Verify Docker Setup
- [ ] App starts without errors
- [ ] Database connection successful
- [ ] All API endpoints working
- [ ] Authentication working
- [ ] RAG pipeline working

---

## Phase 3: Repository & Deployment Prep

### Git Repository
- [ ] Repository initialized
- [ ] `.gitignore` includes:
  - [ ] `.env.local`
  - [ ] `.env.*.local`
  - [ ] `node_modules`
  - [ ] `.next`
  - [ ] `.env.docker`
- [ ] Code committed: `git add .`
- [ ] Initial commit: `git commit -m "Initial Legal AI setup"`
- [ ] Pushed to GitHub: `git push origin main`

### Vercel Setup
- [ ] GitHub repository linked
- [ ] Vercel account created at [vercel.com](https://vercel.com)
- [ ] New project created from GitHub repo
- [ ] Import successful

---

## Phase 4: Vercel Deployment Environment

### Environment Variables in Vercel
Add all variables in: **Project Settings → Environment Variables**

**Database:**
- [ ] `MONGO_URL` = MongoDB Atlas connection string
  Example: `mongodb+srv://user:pass@cluster.mongodb.net/legal-ai`

**Authentication:**
- [ ] `NEXTAUTH_URL` = Your Vercel domain
  Example: `https://legal-ai.vercel.app`
- [ ] `NEXTAUTH_SECRET` = Generate new: `openssl rand -base64 32`

**OAuth (Google):**
- [ ] Update Google Cloud Console with redirect URI:
  `https://your-domain.vercel.app/api/auth/callback/google`
- [ ] Add `GOOGLE_CLIENT_ID`
- [ ] Add `GOOGLE_CLIENT_SECRET`

**AI Services:**
- [ ] `OPENAI_API_KEY` = Your OpenAI key
- [ ] `PINECONE_API_KEY` = Your Pinecone key
- [ ] `PINECONE_ENVIRONMENT` = Your Pinecone environment
- [ ] `PINECONE_INDEX` = `legal-docs`

**Other Services:**
- [ ] `GROQ_API_KEY` = (if using Groq)
- [ ] `EMAIL_USER` = Sender email address
- [ ] `EMAIL_PASS` = Email app password

### Production MongoDB Setup

**Option A: MongoDB Atlas (Recommended)**
- [ ] Account created at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Free cluster created
- [ ] Database user created
- [ ] Connection string obtained
- [ ] IP whitelist: Allow `0.0.0.0/0` (for Vercel)
- [ ] Connection string set in Vercel: `MONGO_URL=...`

**Option B: Self-hosted MongoDB**
- [ ] VPS/server prepared
- [ ] MongoDB installed and running
- [ ] Database user created
- [ ] Firewall rules configured
- [ ] Connection string in Vercel

---

## Phase 5: Pre-Deployment Testing

### Build Verification
```bash
npm run build  # Should complete without errors
npm run start  # Should start successfully
```

### Environment Variable Check
All these should be set in Vercel:
- [ ] Database connection working
- [ ] API endpoints accessible
- [ ] Authentication service ready
- [ ] AI services configured

### Local Production Build
```bash
# Build in production mode
npm run build

# Test production build locally
npm run start

# Visit http://localhost:3000 and test
```

---

## Phase 6: Deployment & Launch

### Vercel Deployment
- [ ] All commits pushed to GitHub
- [ ] Vercel detects new commits
- [ ] Build starts automatically
- [ ] Build completes successfully
- [ ] Deployment goes live

### Post-Deployment Testing
Visit your Vercel domain and test:
- [ ] Home page loads
- [ ] Navigation works
- [ ] Google login works
- [ ] Admin panel accessible
- [ ] Document upload works
- [ ] Chat with RAG works
- [ ] MongoDB data persists
- [ ] No console errors in browser DevTools

### Optimization (Optional)
- [ ] Enable analytics in Vercel
- [ ] Set up Vercel monitoring
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Enable Vercel caching

---

## Phase 7: Production Monitoring

### Ongoing Checks
- [ ] Monitor Vercel deployment logs daily
- [ ] Check MongoDB Atlas stats
- [ ] Monitor API error rates
- [ ] Track OpenAI API usage and costs
- [ ] Review authentication logs

### Maintenance Schedule
- [ ] Weekly: Check error logs
- [ ] Monthly: Review API costs
- [ ] Quarterly: Rotate secrets and API keys
- [ ] Annually: Major dependency updates

---

## Troubleshooting Reference

### Local Issues
| Issue | Solution |
|-------|----------|
| Docker won't build | `docker-compose build --no-cache` |
| MongoDB connection fails | Check `MONGO_URL`, ensure MongoDB running |
| Port 3000 in use | `lsof -i :3000` then `kill -9 <PID>` |
| Node modules error | `rm -rf node_modules pnpm-lock.yaml && npm install` |

### Vercel Issues
| Issue | Solution |
|-------|----------|
| Build fails | Check build logs in Vercel dashboard |
| Static files missing | Ensure `/public` folder exists |
| Environment variables not working | Verify in Project Settings → Environment Variables |
| 504 timeout | Increase function timeout in `vercel.json` |
| NextAuth not working | Check `NEXTAUTH_URL` matches domain |

### Database Issues
| Issue | Solution |
|-------|----------|
| Connection refused | Check IP whitelist in MongoDB Atlas |
| auth failed | Verify username/password credentials |
| Document size error | Split large documents into chunks |
| Connection pooling | Ensure `MONGO_URL` has correct parameters |

---

## Quick Command Reference

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Test production build
npm run lint                   # Check for errors

# Docker
docker-compose up -d          # Start all services
docker-compose logs -f        # View logs
docker-compose down           # Stop all services
docker-compose down -v        # Clean everything

# MongoDB
mongo "mongodb://localhost:27017" # Connect to local MongoDB
db.users.find()                    # View users
db.cases.find()                    # View cases

# Secrets
openssl rand -base64 32        # Generate NEXTAUTH_SECRET
```

---

## Success Criteria ✅

Your Legal AI deployment is successful when:

1. ✅ App loads at `https://your-domain.vercel.app`
2. ✅ Users can login with Google
3. ✅ Admin can upload documents
4. ✅ Chatbot responds to legal questions with sources
5. ✅ Data persists in MongoDB
6. ✅ No errors in production logs
7. ✅ API endpoints respond correctly
8. ✅ Performance is acceptable (< 3s load time)

---

## Next Steps

1. Complete all phases above
2. Share your deployment URL
3. Gather user feedback
4. Iterate on features
5. Monitor and optimize

**🎉 Happy Deploying! You've got this! 🚀**