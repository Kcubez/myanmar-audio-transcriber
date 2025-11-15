#!/bin/bash

echo "Setting up Myanmar Audio Transcriber with Next.js 15..."

# Clean up old installation
echo "Cleaning up old installation..."
rm -rf node_modules package-lock.json

# Install dependencies
echo "Installing dependencies with Next.js 15..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Setting up environment file..."
    cp .env.local.example .env.local
fi

echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local and add your Gemini API key"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "To get a Gemini API key:"
echo "Visit: https://makersuite.google.com/app/apikey"
