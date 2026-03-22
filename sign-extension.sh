#!/bin/bash

# Theme Toggle Extension - Signing Script
# This script signs your extension for distribution

echo "=== Theme Toggle Extension Signing Script ==="
echo ""

# Load NVM and Node.js
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Check if web-ext is installed
if ! command -v web-ext &> /dev/null; then
    echo "❌ Error: web-ext is not installed"
    echo "Please run: npm install -g web-ext"
    exit 1
fi

echo "✓ web-ext is installed (version: $(web-ext --version))"
echo ""

# Navigate to project directory
cd /home/kumarr/Temp/theme-toggle || {
    echo "❌ Error: Cannot navigate to project directory"
    exit 1
}

echo "✓ Current directory: $(pwd)"
echo ""

# Check for credentials
if [ -z "$WEB_EXT_API_KEY" ] || [ -z "$WEB_EXT_API_SECRET" ]; then
    # Try to load from .sign-credentials file
    if [ -f .sign-credentials ]; then
        echo "Loading credentials from .sign-credentials file..."
        source .sign-credentials
    fi

    # Still no credentials?
    if [ -z "$WEB_EXT_API_KEY" ] || [ -z "$WEB_EXT_API_SECRET" ]; then
        echo "❌ Error: JWT credentials not found"
        echo ""
        echo "Please set credentials using one of these methods:"
        echo ""
        echo "Method 1: Set environment variables"
        echo "  export WEB_EXT_API_KEY='your-jwt-issuer'"
        echo "  export WEB_EXT_API_SECRET='your-jwt-secret'"
        echo ""
        echo "Method 2: Edit .sign-credentials file"
        echo "  Replace YOUR_JWT_ISSUER_HERE and YOUR_JWT_SECRET_HERE"
        echo ""
        echo "Method 3: Pass credentials in command line"
        echo "  bash sign-extension.sh --api-key YOUR_ISSUER --api-secret YOUR_SECRET"
        echo ""
        echo "Get your credentials from: https://addons.mozilla.org/developers/addon/api/key/"
        exit 1
    fi
fi

# Sign the extension
echo "=== Signing Extension ==="
echo ""
echo "✓ JWT Issuer: ${WEB_EXT_API_KEY:0:8}***"
echo "✓ API URL: ${WEB_EXT_API_URL:-https://addons.mozilla.org/api/v4/}"
echo "✓ Extension ID: theme-toggle@extension.local"
echo "✓ Channel: unlisted (for self-distribution)"
echo ""

web-ext sign \
    --api-key "$WEB_EXT_API_KEY" \
    --api-secret "$WEB_EXT_API_SECRET" \
    --channel unlisted

# Check result
if [ $? -eq 0 ]; then
    echo ""
    echo "=== Success! ==="
    echo ""
    echo "✓ Extension signed successfully!"
    echo ""
    echo "Signed file location:"
    find web-ext-artifacts -name "*.xpi" -printf "  %p\n"

    echo ""
    echo "To install:"
    echo "  1. Open Firefox"
    echo "  2. Navigate to about:addons"
    echo "  3. Click gear icon → 'Install Add-on From File'"
    echo "  4. Select the .xpi file from web-ext-artifacts/"
    echo ""
else
    echo ""
    echo "=== Error: Signing failed ==="
    echo "Please check your credentials and try again"
    exit 1
fi
