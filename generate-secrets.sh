#!/bin/bash

# Generate secure secrets for Legal AI deployment

echo "🔐 Legal AI - Secret Generation Script"
echo "======================================"
echo ""

# Generate NEXTAUTH_SECRET
NEXTAUTH_SECRET=$(openssl rand -base64 32)
echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET"

# Generate session secret
SESSION_SECRET=$(openssl rand -base64 32)
echo "SESSION_SECRET=$SESSION_SECRET"

# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 32)
echo "JWT_SECRET=$JWT_SECRET"

echo ""
echo "✅ Secrets generated! Add them to your .env.local file"
echo ""
echo "For Vercel deployment, add these as environment variables:"
echo "  Settings → Environment Variables → Add the values above"