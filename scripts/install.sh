#!/bin/bash

# Aurix AI Installation & Setup Script
# Usage: ./scripts/install.sh

set -e

echo "=========================================="
echo "   Aurix AI Server Installation Helper"
echo "=========================================="

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed."
    echo "   Please install Node.js 18+ and try again."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v) detected."

# Check for .env file
if [ -f .env ]; then
    echo "✅ .env file found. Loading environment variables..."
    # Attempt to source .env if it's shell-compatible, otherwise warn
    set -a
    source .env || echo "⚠️  Warning: Could not source .env file directly."
    set +a
else
    echo "⚠️  Warning: .env file not found."
    echo "   If your CMS is protected, create a .env file with SUPABASE_ANON_KEY."
fi

# Install dependencies
echo "📦 Installing dependencies..."
if command -v pnpm &> /dev/null; then
    echo "   Using pnpm..."
    pnpm install
else
    echo "   Using npm..."
    npm install
fi

# Sync Content
echo "🔄 Syncing CMS content..."
node scripts/sync.js

# Build Project
echo "🏗️  Building application..."
npm run build

echo "=========================================="
echo "   Installation Complete! 🎉"
echo "=========================================="
echo ""
echo "To serve the application:"
echo "  1. npm install -g serve"
echo "  2. serve -s dist -l 3000"
echo ""
echo "Or using PM2 (Recommended for Production):"
echo "  1. npm install -g pm2"
echo "  2. pm2 serve dist 3000 --name 'aurix-ai' --spa"
echo ""
