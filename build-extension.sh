#!/bin/bash

# Theme Switch Extension - Build Script
# Creates a local .xpi package without AMO signing

echo "=== Theme Switch Extension Build Script ==="
echo ""

# Load NVM and Node.js
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd /home/kumarr/Temp/theme-toggle || exit 1

# Check if web-ext is installed
if ! command -v web-ext &> /dev/null; then
    echo "❌ Error: web-ext not found"
    echo "Install with: npm install -g web-ext"
    exit 1
fi

echo "✓ Building extension..."
echo ""

# Build the extension (optimized, without docs)
web-ext build \
    --overwrite-dest \
    --ignore-files "*.md" "sign-extension.sh" ".sign-credentials" ".gitignore"

if [ $? -eq 0 ]; then
    echo ""
    echo "=== Build Complete! ==="
    echo ""
    # Create .xpi copy
    cp web-ext-artifacts/theme_toggle-*.zip web-ext-artifacts/theme-toggle-latest.xpi
    
    echo "✓ Extension built successfully!"
    echo ""
    echo "Files created:"
    ls -lh web-ext-artifacts/theme-toggle-*.xpi | awk '{print "  " $9 " (" $5 ")"}'
    echo ""
    echo "To install:"
    echo "  1. Open Firefox about:debugging#/runtime/this-firefox"
    echo "  2. Click 'Load Temporary Add-on...'"
    echo "  3. Navigate to web-ext-artifacts/"
    echo "  4. Select theme-toggle-latest.xpi"
    echo ""
else
    echo ""
    echo "❌ Build failed"
    exit 1
fi
