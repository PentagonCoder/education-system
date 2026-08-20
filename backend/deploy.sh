#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Step 1 — Pull latest code
echo "📥 Pulling latest code..."
git pull

# Step 2 — Build Docker image
echo "🐳 Building Docker image..."
docker build -t assignment-backend .

# Step 3 — Stop & remove old container
echo "🛑 Stopping old container..."
docker stop assignment-backend || true
docker rm assignment-backend || true

# Step 4 — Run new container
echo "▶️ Starting new container..."
docker run -d -p 3000:3000 --env-file .env --name assignment-backend assignment-backend

echo "✅ Deployment complete!"
