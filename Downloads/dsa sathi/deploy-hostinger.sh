#!/bin/bash
# ==============================================================================
# Hostinger SSH Production Deployment Script for LoanPilot CRM
# Target Domain: https://empireitxpert.in
# ==============================================================================

set -e

echo "🚀 Starting LoanPilot CRM Hostinger Production Deployment..."

# 1. Navigate to target website domain directory
# Adjust path if hosted in /home/username/public_html or /var/www/empireitxpert.in
DOMAIN_DIR="/home/u123456789/domains/empireitxpert.in/public_html"

if [ -d "$DOMAIN_DIR" ]; then
  cd "$DOMAIN_DIR"
  echo "📁 Navigated to $DOMAIN_DIR"
fi

# 2. Pull latest code (if using Git) or verify files
if [ -d ".git" ]; then
  echo "📥 Pulling latest repository commits..."
  git pull origin main
fi

# 3. Environment Variables Setup
if [ ! -f ".env" ]; then
  echo "⚙️ Creating production .env..."
  cat <<EOT > .env
DATABASE_URL="file:./prod.db"
JWT_SECRET="loanpilot-production-secure-jwt-key-2026"
NEXT_PUBLIC_APP_URL="https://empireitxpert.in"
NODE_ENV="production"
PORT=3000
EOT
fi

# 4. Install production dependencies
echo "📦 Installing npm dependencies..."
npm install

# 5. Prisma Database Setup & Client Generation
echo "🗄️ Generating Prisma database client & running migrations..."
npx prisma generate
npx prisma db push

# 6. Execute Next.js Production Build
echo "🏗️ Building Next.js production bundle..."
npm run build

# 7. Start or Reload PM2 Process Manager
if command -v pm2 &> /dev/null; then
  echo "🔄 Reloading PM2 process..."
  pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js
  pm2 save
else
  echo "ℹ️ Starting Next.js server with npm start..."
  nohup npm start -- -p 3000 > server.log 2>&1 &
fi

echo "✅ Deployment Successful! Your website is live at https://empireitxpert.in"
