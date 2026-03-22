# 🔑 Getting API Keys - Step by Step

This guide walks through obtaining all required API keys for Legal AI.

---

## 1️⃣ OpenAI API Key

**Cost:** Free tier available ($5 credit), then pay-as-you-go (~$0.01-0.10 per chat)

### Get Your Key
1. Go to https://platform.openai.com/api-keys
2. Sign up / log in
3. Click "Create new secret key"
4. Copy the key starting with `sk-`
5. **⚠️ Never share this key!**

### Add to Your Project
```env
# In .env.local (local dev)
OPENAI_API_KEY=sk-your-key-here

# In Vercel dashboard (production)
# Settings → Environment Variables → Add OPENAI_API_KEY
```

### Test It Works
```bash
# Local - chat will work
http://localhost:3000/chat

# Production - after deploying
https://your-app.vercel.app/chat
```

---

## 2️⃣ Pinecone Vector Database

**Cost:** Free tier available (1M vectors, single index)

### Create Account & Index
1. Go to https://app.pinecone.io
2. Click "Sign up" (use Google or email)
3. Create an organization (name = your project)
4. Click "Create Index"
5. Fill in:
   - **Name:** `legal-docs`
   - **Dimensions:** `1536` (OpenAI dimension)
   - **Metric:** `cosine`
   - Click "Create Index"
6. Wait 1-2 minutes for it to initialize

### Get Your API Key
1. Click "API Keys" in left sidebar
2. Copy the key starting with `pcsk_`
3. Note the **environment** (likely "us-east-1-aws")

### Add to Your Project
```env
# In .env.local
PINECONE_API_KEY=pcsk-your-key-here
PINECONE_INDEX=legal-docs
PINECONE_ENVIRONMENT=us-east-1-aws

# In Vercel dashboard
# Settings → Environment Variables → Add both
```

### Test It Works
```bash
# Admin panel shows Pinecone status
http://localhost:3000/admin
```

---

## 3️⃣ MongoDB Connection String

**Cost:** Free Atlas tier available (512MB storage)

### Create MongoDB Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up (use Google or email)
4. Create an organization

### Create a Cluster
1. Click "Create a Deployment"
2. Choose "Free" tier
3. Select cloud provider (AWS recommended)
4. Select region closest to you
5. Click "Create"
6. Wait 2-3 minutes...

### Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. **Username:** admin
4. **Password:** Generate a strong one (save it!)
   - Click "Generate Secure Password"
5. Click "Create Database User"

### Get Connection String
1. Go back to "Overview" / "Database"
2. Click "Connect" button on your cluster
3. Choose "Drivers" (not Compass)
4. Select "Node.js" driver
5. Copy the connection string

The string looks like:
```
mongodb+srv://admin:<password>@cluster-name.mongodb.net/?retryWrites=true&w=majority
```

### Add to Your Project
```env
# Replace <password> with your actual password, <database> with your DB name
MONGO_URL=mongodb+srv://admin:your-password@cluster.mongodb.net/legal-ai

# In Vercel dashboard
# Settings → Environment Variables → Add MONGO_URL
```

### Whitelist Vercel IP (Important!)
1. Click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add Vercel IP)
4. Confirm

---

## 4️⃣ Google OAuth Credentials

**Cost:** Free

### Create Google Cloud Project
1. Go to https://console.cloud.google.com
2. Click project dropdown (top left)
3. Click "New Project"
4. **Project name:** Legal AI
5. Click "Create"
6. Wait for it to load...

### Enable Google+ API
1. In search bar, search "Google+ API"
2. Click on it
3. Click "Enable"

### Create OAuth Credentials
1. Click "Credentials" in left sidebar
2. Click "Create Credentials" → "OAuth client ID"
3. **You'll see:** "Configure OAuth consent screen first"
4. Click "Configure Consent Screen"
5. Choose **External**
6. Click "Create"

### Set Up Consent Screen
1. **User type:** External
2. **App name:** Legal AI
3. **User support email:** your-email@gmail.com
4. **Developer contact:** your-email@gmail.com
5. Click "Save and Continue"
6. Scopes page: Click "Save and Continue"
7. Summary: Click "Back to Dashboard"

### Create OAuth Client ID
1. Click "Credentials" again
2. Click "Create Credentials" → "OAuth client ID"
3. **Application type:** Web application
4. **Name:** Legal AI Web
5. **Authorized JavaScript origins:** Add both:
   - `http://localhost:3000` (local development)
6. **Authorized redirect URIs:** Add both:
   - `http://localhost:3000/api/auth/callback/google` (local)
7. Click "Create"
8. Copy the displayed credentials:
   - **Client ID:** Keep this safe
   - **Client Secret:** Keep this secret!

### Add Production URLs (Later)
After deploying to Vercel:
1. Go back to OAuth client settings
2. Under "Authorized redirect URIs", add:
   - `https://your-app.vercel.app/api/auth/callback/google`
3. Click "Save"

### Add to Your Project
```env
# In .env.local
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# In Vercel dashboard
# Settings → Environment Variables → Add both
```

### Test It Works
```bash
# Local
http://localhost:3000
# Click login, try "Continue with Google"

# Production (after deploying)
https://your-app.vercel.app
# Click login, try "Continue with Google"
```

---

## 5️⃣ NextAuth Secret

**Cost:** Free (just a random string)

### Generate a Secret
```bash
# Run this in terminal
openssl rand -base64 32

# Output will be something like:
# 8K7hF9xM2Q5vL3pJ8nB6cD4gH2wE...
```

### Add to Your Project
```env
# In .env.local
NEXTAUTH_SECRET=your-random-secret-from-above

# In Vercel dashboard
# Settings → Environment Variables → Add NEXTAUTH_SECRET
```

### Test It Works
```bash
# Login redirects should work properly
http://localhost:3000/auth
```

---

## 📋 Checklist: Order to Get Keys

### Step 1: Local Dev (Today)
- [ ] OpenAI API key
- [ ] Pinecone API key + index
- [ ] MongoDB connection string
- [ ] Google OAuth Client ID + Secret
- [ ] NextAuth secret

✅ Add all to `.env.local`

### Step 2: Deploy to Vercel (Today)
- [ ] Push code to GitHub
- [ ] Connect to Vercel
- [ ] Add all 5 keys to Vercel environment variables

✅ Redeploy on Vercel

---

## 🚨 Security Best Practices

### ✅ DO:
- Keep API keys in `.env.local` (never commit)
- Rotate keys monthly
- Use free tiers first, upgrade as needed
- Different keys for dev/production if possible
- Add to `.gitignore` (already done)

### ❌ DON'T:
- Paste keys in Discord/Slack/GitHub
- Use same key for dev and production
- Commit keys to GitHub
- Share `.env.local`
- Put keys in frontend code

### If You Accidentally Exposed a Key:
1. **Immediately** revoke it in that service's dashboard
2. Generate a new one
3. Update `.env.local` and Vercel
4. Redeploy

---

## 💰 Cost Estimate (Monthly)

| Service | Free Tier | Estimated Cost |
|---------|-----------|-----------------|
| OpenAI | $5 credit | $10-50 (if popular) |
| Pinecone | 1M vectors | Free (if <1M vectors) |
| MongoDB | 512MB storage | Free (if <512MB) |
| Google Cloud | Free | Free |
| Vercel | 100GB bandwidth | Free (if <100GB) |
| **Total** | | **$10-50/month** |

---

## 🎯 Common Issues

### "Invalid API key"
- [ ] Copy the whole key (including prefix like `sk-` or `pcsk_`)
- [ ] No spaces before/after
- [ ] For OpenAI: Key starts with `sk-`
- [ ] For Pinecone: Key starts with `pcsk_`

### "Index not found"
- [ ] Index name is exactly `legal-docs` (case-sensitive)
- [ ] Pinecone index is fully initialized (wait 2+ min after creation)
- [ ] Check environment matches (us-east-1-aws, etc.)

### "MongoDB connection refused"
- [ ] MongoDB user password is correct
- [ ] Vercel IP is whitelisted in MongoDB Atlas
- [ ] Connection string has the database name (legal-ai)

### "Google OAuth not working"
- [ ] Redirect URIs are exact (including http:// vs https://)
- [ ] OAuth screen is configured (External)
- [ ] Client ID/Secret are not swapped

---

## 📞 Support

- **OpenAI Help:** https://help.openai.com
- **Pinecone Help:** https://docs.pinecone.io
- **MongoDB Help:** https://docs.mongodb.com
- **Google Cloud Help:** https://cloud.google.com/support
- **NextAuth Help:** https://next-auth.js.org

---

**All keys obtained? You're ready to deploy! 🚀**

Next: Follow QUICKSTART.md to deploy!