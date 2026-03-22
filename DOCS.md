# 📚 Documentation Overview

Welcome to Legal AI! Here's what's available:

---

## 📍 Where to Start?

### 🚀 I'm Ready to Run It Now
→ **[QUICKSTART.md](./QUICKSTART.md)** (15 minutes)
- Docker setup and local testing
- Deploy to Vercel
- Test it works

### 🔑 I Need API Keys First
→ **[GETTING_API_KEYS.md](./GETTING_API_KEYS.md)**
- OpenAI API key
- Pinecone setup
- MongoDB Atlas
- Google OAuth
- Security best practices

### 🛠️ Something Broke
→ **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**
- Docker issues
- Environment variables
- Chat not working
- Login problems
- Vercel deployment errors

### 📖 I Want the Full Details
→ **[DEPLOYMENT.md](./DEPLOYMENT.md)** (7-part guide)
- Database selection & setup
- Docker configuration
- Vercel deployment
- OAuth detailed setup
- Production testing
- Monitoring & logs
- Debugging guide

### ✅ Show Me the Checklist
→ **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** (7 phases)
- Phase 1-2: Local environment setup
- Phase 3-4: Docker verification
- Phase 5: Vercel deployment
- Phase 6-7: Production verification & monitoring
- Troubleshooting reference table

---

## 🗺️ Complete Navigation

### Getting Started
| Document | Purpose | Duration |
|----------|---------|----------|
| **[QUICKSTART.md](./QUICKSTART.md)** | Run it locally + deploy | 15 min |
| **[README.md](./README.md)** | Project overview | 5 min |

### Configuration & Setup
| Document | Purpose | Audience |
|----------|---------|----------|
| **[GETTING_API_KEYS.md](./GETTING_API_KEYS.md)** | Obtain all required API keys | Everyone |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Comprehensive deployment guide | Advanced |
| **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** | Verification checklist | Step-followers |

### Troubleshooting & Support
| Document | Purpose | When to Use |
|----------|---------|-------------|
| **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** | Common issues & fixes | Something breaks |
| **[contributing.md](./contributing.md)** | Contributing to the project | Development help |

---

## 🎯 Quick Answers

### "I have 15 minutes"
Just follow **[QUICKSTART.md](./QUICKSTART.md)**

### "I need to deploy today"
1. Get keys: **[GETTING_API_KEYS.md](./GETTING_API_KEYS.md)**
2. Deploy: **[QUICKSTART.md](./QUICKSTART.md)** Step 5
3. Stuck? Check **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**

### "I want details on everything"
Read in this order:
1. **[README.md](./README.md)** - Overview
2. **[GETTING_API_KEYS.md](./GETTING_API_KEYS.md)** - Setup requirements
3. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Full deployment guide
4. **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** - Verification

### "Something's broken"
Go directly to **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**

---

## 🚀 Typical User Journey

```
1. Read README.md          (5 min)
   ↓
2. Follow QUICKSTART.md    (15 min)
   ├─ Docker local test
   ├─ Verify pages load
   └─ Deploy to Vercel
   ↓
3. Get API Keys            (10 min each)
   (GETTING_API_KEYS.md)
   ├─ OpenAI
   ├─ Pinecone
   ├─ MongoDB
   └─ Google OAuth
   ↓
4. Configure Environment   (5 min)
   └─ Add keys to Vercel
   ↓
5. Run Production Test      (5 min)
   └─ Verify all features
   ↓
✅ Live & Running!
```

---

## 📊 File Sizes (What to Expect)

| Document | Length | Read Time |
|----------|--------|-----------|
| QUICKSTART.md | 300 lines | 15 min |
| GETTING_API_KEYS.md | 400 lines | 20 min |
| TROUBLESHOOTING.md | 300 lines | 15 min (as needed) |
| DEPLOYMENT.md | 400+ lines | 30 min |
| SETUP_CHECKLIST.md | 200+ items | 60 min (to complete) |

---

## 🔍 Finding Specific Info

### "How do I..."

#### ...run it locally?
→ **[QUICKSTART.md](./QUICKSTART.md)** Step 2

#### ...get OpenAI key?
→ **[GETTING_API_KEYS.md](./GETTING_API_KEYS.md)** Section 1

#### ...deploy to Vercel?
→ **[QUICKSTART.md](./QUICKSTART.md)** Step 5 or **[DEPLOYMENT.md](./DEPLOYMENT.md)** Part 2

#### ...set up Google login?
→ **[GETTING_API_KEYS.md](./GETTING_API_KEYS.md)** Section 4 or **[DEPLOYMENT.md](./DEPLOYMENT.md)** Part 4

#### ...upload documents?
→ **[QUICKSTART.md](./QUICKSTART.md)** Step 3 or **[DEPLOYMENT.md](./DEPLOYMENT.md)** Part 6

#### ...fix a problem?
→ **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**

#### ...verify setup is correct?
→ **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)**

---

## 💡 Pro Tips

1. **First time?** Use QUICKSTART.md - it's designed to be painless
2. **Lost?** This file shows you what to read
3. **Stuck?** Check TROUBLESHOOTING.md before asking for help
4. **Details matter?** DEPLOYMENT.md has all the why's and how's
5. **Need proof?** SETUP_CHECKLIST.md verifies everything works

---

## 🆘 Still Need Help?

### Before asking for help, please:
1. ✅ Check **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**
2. ✅ Run the relevant diagnostic commands
3. ✅ Check **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** for your phase
4. ✅ Copy the error message and relevant logs

### When asking for help, include:
- What you were doing when it broke
- The full error message (from logs)
- Output of: `docker compose ps`
- Output of: `docker compose logs app | tail -50`

---

## 📝 Document Index

```
.
├── README.md                 (Project overview, tech stack)
├── QUICKSTART.md             (15-min guide to running locally + Vercel)
├── GETTING_API_KEYS.md       (Step-by-step for each API service)
├── TROUBLESHOOTING.md        (Common issues & solutions)
├── DEPLOYMENT.md             (7-part comprehensive guide)
├── SETUP_CHECKLIST.md        (7-phase verification checklist)
├── THIS_FILE (DOCS.md)       (Navigation guide)
│
└── Code Organization
    ├── app/                  (Next.js pages & API routes)
    │   ├── chat/            (AI chatbot page)
    │   ├── admin/           (Document management)
    │   └── api/
    │       ├── auth/        (NextAuth setup)
    │       ├── rag-chat/    (RAG query endpoint)
    │       └── ingest/      (Document upload endpoint)
    │
    ├── lib/
    │   ├── rag.ts           (RAG utilities)
    │   ├── dbConnect.ts     (MongoDB setup)
    │   └── supabase.ts      (Optional features)
    │
    ├── components/
    │   ├── DocumentIngestor.tsx  (Upload component)
    │   └── ui/              (Reusable UI components)
    │
    ├── Dockerfile           (Production container)
    ├── docker-compose.yml   (Local dev orchestration)
    └── vercel.json          (Vercel deployment config)
```

---

**📌 Remember: Start with [QUICKSTART.md](./QUICKSTART.md) - you'll be live in 15 minutes!** 🚀