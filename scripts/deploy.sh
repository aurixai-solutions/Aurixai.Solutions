#!/bin/bash

# Aurix Deployment Script
# Usage: ./scripts/deploy.sh
# Requires: Node.js 18+

echo "--- Deploying Aurix Site ---"

# 1. Install dependencies
echo "Installing dependencies..."
npm install

# 2. Sync CMS content (Images & JSON)
echo "Syncing CMS content..."
node scripts/sync.js

if [ $? -eq 0 ]; then
  echo "Sync successful."
else
  echo "Sync failed! Check logs."
  exit 1
fi

# 3. Build the project
echo "Building static site..."
npm run build

# 4. Serve (Optional, adjust based on your host)
# npm install -g serve
# serve -s dist

echo "--- Deployment Complete ---"
