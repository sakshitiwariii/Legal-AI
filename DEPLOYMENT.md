# 🚀 Complete Deployment Guide - Legal AI

## Part 1: Database & Authentication Selection

### **Database: MongoDB** ✅ (Already configured)

**Why MongoDB?**
- Document-based (flexible schema)
- Perfect for user profiles, case data, and chat history
- Mongoose already installed in your project
- Easy scalability

**Your current setup:**
- ✅ Mongoose installed
- ✅ User model in `model/User.ts`
- ✅ MongoDB connection in `lib/dbConnect.ts`

### **Authentication: NextAuth** ✅ (Already configured)

**Why NextAuth?**
- Built-in OAuth support (Google, GitHub, etc.)
- Session management
- JWT tokens
- Works perfectly with Next.js
- You already have it configured!

**Current OAuth providers:**
- Google OAuth
- Email/Password (optional)

---

## Part 2: Local Docker Setup

### Step 1: Create `.env.docker` file

```bash
cp .env.example .env.docker
```

Edit `.env.docker`:
```env
# Database
MONGO_URL=mongodb://admin:admin@mongodb:27017/legal-ai?authSource=admin
MONGO_ROOT_PASSWORD=admin

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this

# OAuth (Google)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI Services
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=pcsk_...
PINECONE_ENVIRONMENT=us-east-1
PINECONE_INDEX=legal-docs

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Other
GROQ_API_KEY=your_groq_key
```

### Step 2: Build and Run with Docker Compose

```bash
# Build the image
docker-compose build

# Start all services (app + MongoDB)
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop all services
docker-compose down

# Clean up volumes (careful!)
docker-compose down -v
```

### Step 3: Test Locally

- App: http://localhost:3000
- MongoDB: mongodb://localhost:27017
- Mongo Express: http://localhost:8081 (admin/admin)

---

## Part 3: Deploy to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Docker config and RAG chatbot"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"

### Step 3: Configure Environment Variables

In Vercel project settings, add all variables:

```env
# Database
MONGO_URL=your_mongodb_atlas_connection_string

# Authentication
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-new-secret-here

# OAuth Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI Services
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=pcsk_...
PINECONE_ENVIRONMENT=us-east-1
PINECONE_INDEX=legal-docs

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Other
GROQ_API_KEY=your_groq_key
```

### Step 4: Deploy

1. Vercel auto-deploys on git push
2. Or manually click "Deploy" in Vercel dashboard
3. Wait 1-2 minutes for build to complete

---

## Part 4: Production MongoDB Setup

### Option A: MongoDB Atlas (Recommended for Vercel)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Create database user (username + password)
5. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/legal-ai`
6. Add to Vercel environment: `MONGO_URL=...`

### Option B: Self-hosted MongoDB

```bash
# On your VPS/server
docker run -d \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=strong-password \
  mongo:7.0-alpine

# Connection string: mongodb://admin:password@your-server-ip:27017
```

---

## Part 5: Google OAuth Setup (for Login)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials:
   - Type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (local)
     - `https://your-domain.vercel.app/api/auth/callback/google` (production)
5. Copy Client ID and Secret
6. Add to environment variables

---

## Part 6: Testing Your Deployment

### Local Tests

```bash
# Start Docker
docker-compose up -d

# Test API endpoints
curl http://localhost:3000/api/hello
curl http://localhost:3000/api/chat

# Test auth
Visit http://localhost:3000/auth and try Google login
```

### Production Tests

1. Visit your Vercel domain
2. Test authentication (Google login)
3. Upload document in `/admin`
4. Ask a question in `/chat`
5. Check MongoDB Atlas to verify data is saving

---

## Part 7: Monitoring & Maintenance

### Vercel Dashboard
- Check deployments
- View logs
- Monitor performance

### MongoDB Atlas
- View database size
- Check backups
- Monitor connections

### Environment Variables
- Rotate API keys every 6 months
- Use secrets for sensitive data
- Never commit `.env.local`

---

## Troubleshooting

### Docker won't build
```bash
# Clean and rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### MongoDB connection fails
```bash
# Check MongoDB is running
docker-compose logs mongodb

# Verify connection string in .env.docker
MONGO_URL=mongodb://admin:admin@mongodb:27017/legal-ai?authSource=admin
```

### Vercel deployment fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `npm run build` works locally
- Check for TypeScript errors: `npm run build`

### NextAuth not working
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Ensure OAuth credentials are correct
- Check callback URLs in Google Console

---

## Final Checklist

- [ ] Dockerfile updated ✅
- [ ] Docker-compose.yml created ✅
- [ ] Local testing passed
- [ ] Repository pushed to GitHub
- [ ] Vercel project connected
- [ ] Environment variables configured
- [ ] MongoDB Atlas or self-hosted MongoDB running
- [ ] Google OAuth configured
- [ ] Production domain set up
- [ ] First deployment successful
- [ ] Admin panel accessible (/admin)
- [ ] RAG chatbot working
- [ ] Authentication working

---

## Quick Commands Reference

```bash
# Local Development
npm run dev                    # Development server
docker-compose up -d          # Docker Compose local
docker-compose logs -f app    # View app logs
docker-compose down           # Stop all services

# Docker
docker build -t legal-ai .    # Build image
docker run -p 3000:3000 legal-ai  # Run container
docker ps                     # List running containers
docker logs container-id      # View logs
docker exec -it container-id bash  # Access container shell

# Deployment
git push origin main          # Auto-deploy to Vercel
vercel deploy                 # Manual Vercel deploy
```

---

**🎉 Your Legal AI platform is now production-ready!**