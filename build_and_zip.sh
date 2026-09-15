#!/bin/bash

# ==========================================
# Aurix AI Solutions - Build Artifact Script
# ==========================================
# Usage: ./build_and_zip.sh
# Run this LOCALLY on your machine or build environment.

# 1. Install dependencies
echo "📦 Installing Dependencies..."
npm ci || npm install

# 2. Build for production (outputs to dist/)
echo "🚀 Building React Application..."
npm run build

# 3. Create deployment zip
echo "📦 Zipping Build Artifacts..."
if [ -d "dist" ]; then
    cd dist
    zip -r ../aurix_site.zip .
    cd ..
    echo "✅ Success! aurix_site.zip created in root directory."
    echo "Please upload 'aurix_site.zip' and 'deploy.sh' to your server."
else
    echo "❌ Error: 'dist/' directory not found. Build failed?"
    exit 1
fi
