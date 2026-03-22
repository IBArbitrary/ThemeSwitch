# Theme Switch Extension - Project State Save

**Date Created:** March 19, 2026
**Last Updated:** March 20, 2026
**Project:** Firefox Theme Switch Extension with Native Messaging
**Developer:** Rajeshkumar Kumar
**Contact:** k.rajeshkumar.1411@gmail.com

---

## Project Overview

A Firefox extension that toggles between two themes (light and dark) via:
1. **Manual toggle** - Click toolbar button
2. **External control** - Native messaging reads `~/Data/.theme-state` file

**Key Features:**
- Toggle between any two Firefox themes with one click
- Icon changes color to indicate current theme state
- External script integration via native messaging
- Starts with dark theme by default
- Persists theme preferences in browser storage
- Handles theme changes triggered outside the extension
- Manifest V3 compliant (Firefox 109+)
- Custom icons with proper visibility (white on dark, black on light)

---

## What Was Accomplished

### Phase 1-5: Initial Development ✅ (March 19)
- Created complete extension structure
- Implemented theme toggle functionality
- Built preferences page with theme selection
- Installed Node.js, npm, web-ext
- Created initial icons
- Fixed Manifest V3 compatibility issues
- Documentation created

### Phase 6: Native Messaging Integration ✅ (March 20)
- Added `nativeMessaging` permission to manifest.json
- Created `native/theme-toggle-native.sh` - Shell script using inotifywait
- Created `native/theme-toggle.json` - Firefox native messaging manifest
- Installed native manifest symlink to `~/.mozilla/native-messaging-hosts/`
- Updated background.js with native port connection and message handler
- Fixed printf hex escaping for Firefox native messaging protocol
- Fixed inotifywait event syntax (`-e modify -e close_write`)

### Phase 7: Custom Icons ✅ (March 20)
- User provided custom SVG icons
- Generated PNG sizes: 48px, 96px, 128px using Inkscape (transparency preserved)
- Swapped icon filenames to fix visibility:
  - `icon-dark` = white icon (visible on dark theme toolbar)
  - `icon-light` = black icon (visible on light theme toolbar)

### Phase 8: AMO Signing ✅ (March 20)
- Successfully signed multiple versions with JWT credentials
- Resolved version conflicts by bumping versions

---

## Current Project Structure

```
/home/kumarr/Temp/theme-toggle/
├── manifest.json                    # v1.0.5, nativeMessaging permission
├── background.js                    # Toggle logic + native messaging
├── options.html                     # Preferences page
├── options.js                       # Preferences logic
├── options.css                      # Preferences styling
├── native/
│   ├── theme-toggle-native.sh       # Watches ~/Data/.theme-state
│   └── theme-toggle.json            # Native manifest
├── icons/
│   ├── icon-dark.svg                # White icon (for dark toolbar)
│   ├── icon-light.svg               # Black icon (for light toolbar)
│   ├── icon-dark-48.png
│   ├── icon-dark-96.png
│   ├── icon-dark-128.png
│   ├── icon-light-48.png
│   ├── icon-light-96.png
│   └── icon-light-128.png
├── README.md                        # Extension usage instructions
├── PUBLISHING.md                    # AMO publishing guide
├── SIGNING.md                       # Extension signing instructions
├── STATE.md                         # THIS FILE
├── .sign-credentials                # JWT credentials
├── .gitignore                       
├── build-extension.sh               # Quick build script
├── sign-extension.sh                # AMO signing script
└── web-ext-artifacts/
    └── themetogglenew-1.0.5.xpi     # Latest signed extension (80 KB)

Additional:
├── ~/.mozilla/native-messaging-hosts/
│   └── theme_toggle.json -> /home/kumarr/Temp/theme-toggle/native/theme-toggle.json
└── ~/Data/.theme-state              # External state file (L or D)
```

---

## Current Extension Details

**Manifest Version:** 3
**Extension Name:** Theme Switch
**Developer:** Rajeshkumar Kumar
**Version:** 1.0.5
**Extension ID:** theme-toggle@extension.local
**Minimum Firefox Version:** 109+ (Manifest V3)

**Permissions:**
- `management` - To access installed themes
- `storage` - To persist theme preferences
- `nativeMessaging` - To communicate with local script

---

## How It Works

### Manual Toggle
1. Click toolbar button
2. Extension switches between configured light/dark themes
3. Icon changes to opposite color for visibility

### Native Messaging (External Control)
1. External script writes `"L"` or `"D"` to `~/Data/.theme-state`
2. Native script (`theme-toggle-native.sh`) detects file change via inotifywait
3. Native script sends `{ "theme": "L" }` or `{ "theme": "D" }` to extension
4. Extension reads message, applies corresponding theme from preferences

### User's Integration Script
```bash
#!/bin/bash
# User's system theme script
echo "L" > ~/Data/.theme-state   # 'L' for light, 'D' for dark
qdbus org.kde.KWin /KWin reconfigure
```

---

## Key Files Content

### manifest.json
```json
{
  "manifest_version": 3,
  "name": "Theme Switch",
  "version": "1.0.5",
  "description": "Toggle between two Firefox themes with a single click",
  "developer": {
    "name": "Rajeshkumar Kumar"
  },
  "browser_specific_settings": {
    "gecko": {
      "id": "theme-toggle@extension.local"
    }
  },
  "permissions": [
    "management",
    "storage",
    "nativeMessaging"
  ],
  "action": {
    "default_title": "Toggle Theme",
    "default_icon": {
      "48": "icons/icon-dark-48.png",
      "96": "icons/icon-dark-96.png"
    }
  },
  "options_ui": {
    "page": "options.html"
  },
  "background": {
    "scripts": ["background.js"]
  },
  "icons": {
    "48": "icons/icon-dark-48.png",
    "96": "icons/icon-dark-96.png",
    "128": "icons/icon-dark-128.png"
  }
}
```

### native/theme-toggle-native.sh
```bash
#!/bin/bash
set -euo pipefail

STATE_FILE="$HOME/Data/.theme-state"

send_message() {
    local json="$1"
    local len=${#json}
    local b0=$(printf '%02x' $((len & 0xff)))
    local b1=$(printf '%02x' $(((len >> 8) & 0xff)))
    local b2=$(printf '%02x' $(((len >> 16) & 0xff)))
    local b3=$(printf '%02x' $(((len >> 24) & 0xff)))
    printf "\\x${b0}\\x${b1}\\x${b2}\\x${b3}%s" "$json"
}

cleanup() { exit 0; }
trap cleanup TERM EXIT

if [[ -f "$STATE_FILE" ]]; then
    theme=$(tr -d '\n\r' < "$STATE_FILE")
    if [[ "$theme" == "L" || "$theme" == "D" ]]; then
        send_message "{\"theme\":\"$theme\"}"
    fi
fi

while inotifywait -q -e modify -e close_write "$STATE_FILE" >/dev/null 2>&1; do
    theme=$(tr -d '\n\r' < "$STATE_FILE")
    if [[ "$theme" == "L" || "$theme" == "D" ]]; then
        send_message "{\"theme\":\"$theme\"}"
    fi
done
```

### native/theme-toggle.json
```json
{
  "name": "theme_toggle",
  "description": "Theme Switch Native Helper",
  "path": "/home/kumarr/Temp/theme-toggle/native/theme-toggle-native.sh",
  "type": "stdio",
  "allowed_extensions": ["theme-toggle@extension.local"]
}
```

### background.js (Native Messaging Section)
```javascript
let nativePort = null;

function connectNative() {
  try {
    nativePort = browser.runtime.connectNative('theme_toggle');
    
    nativePort.onMessage.addListener(async (response) => {
      if (response.theme) {
        const data = await getStorageData();
        const { lightThemeId, darkThemeId } = data;
        
        if (!lightThemeId || !darkThemeId) {
          console.log('Themes not configured yet');
          return;
        }
        
        const themeId = response.theme === 'L' ? lightThemeId : darkThemeId;
        const newCurrentTheme = response.theme === 'L' ? 'light' : 'dark';
        
        const success = await enableTheme(themeId);
        
        if (success) {
          await setStorageData({ currentTheme: newCurrentTheme });
          await updateIcon(newCurrentTheme === 'dark');
        }
      }
    });
    
    nativePort.onDisconnect.addListener(() => {
      if (browser.runtime.lastError) {
        console.log('Native disconnected:', browser.runtime.lastError.message);
      }
      setTimeout(connectNative, 3000);
    });
  } catch (e) {
    console.log('Failed to connect native:', e);
    setTimeout(connectNative, 3000);
  }
}

connectNative();
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.1 | Mar 19 | Initial working extension |
| 1.0.2 | Mar 20 | Added native messaging support |
| 1.0.4 | Mar 20 | Custom icons, transparency preserved |
| 1.0.5 | Mar 20 | Fixed icon colors (swapped filenames) |

---

## Installation Steps

### Prerequisites
```bash
sudo apt install inotify-tools
```

### Install Extension
```bash
firefox /home/kumarr/Temp/theme-toggle/web-ext-artifacts/themetogglenew-1.0.5.xpi
```

### Configure
1. Right-click toolbar icon → Options
2. Select light and dark themes from dropdowns
3. Click "Save Settings"

### Create State File
```bash
mkdir -p ~/Data
echo "D" > ~/Data/.theme-state
```

---

## Build Commands

### Sign Extension
```bash
cd /home/kumarr/Temp/theme-toggle
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

WEB_EXT_API_KEY="user:16564706:34" \
WEB_EXT_API_SECRET="886f933b6a92b26fbfc811cabae2feb4b8e485ebf06de90983fc1513be3fbb42" \
web-ext sign --channel unlisted --timeout 300000
```

### Generate Icons
```bash
cd icons
inkscape icon-dark.svg --export-type=png --export-filename=icon-dark-48.png -w 48 -h 48
inkscape icon-dark.svg --export-type=png --export-filename=icon-dark-96.png -w 96 -h 96
inkscape icon-dark.svg --export-type=png --export-filename=icon-dark-128.png -w 128 -h 128
inkscape icon-light.svg --export-type=png --export-filename=icon-light-48.png -w 48 -h 48
inkscape icon-light.svg --export-type=png --export-filename=icon-light-96.png -w 96 -h 96
inkscape icon-light.svg --export-type=png --export-filename=icon-light-128.png -w 128 -h 128
```

---

## Credentials

**JWT Credentials** (stored in `.sign-credentials`):
- API Key: `user:16564706:34`
- API Secret: `886f933b6a92b26fbfc811cabae2feb4b8e485ebf06de90983fc1513be3fbb42`

---

## Dependencies

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | v20.20.1 | JavaScript runtime |
| npm | v10.8.2 | Package manager |
| web-ext | v10.0.0 | Mozilla extension tool |
| NVM | - | Node version manager |
| inotify-tools | - | File watching (native script) |
| Inkscape | - | SVG to PNG conversion |

---

## Testing

### Test Manual Toggle
1. Click toolbar icon
2. Verify theme switches
3. Verify icon changes color

### Test Native Messaging
```bash
# Test light theme
echo "L" > ~/Data/.theme-state

# Test dark theme
echo "D" > ~/Data/.theme-state
```

### Debug
- Open Firefox Browser Console (`Ctrl+Shift+J`)
- Look for native connection messages
- Check for errors starting with `theme_toggle`

---

## Known Working State

- Extension loads and installs correctly
- Manual toggle works
- Native messaging works (file watching)
- Icons display correctly on both light/dark toolbars
- State file integration works with user's KDE theme script

---

## Icon Visibility Logic

| Current Theme | Icon Displayed | Icon Color | Visible On |
|---------------|----------------|------------|------------|
| Dark | icon-dark | White | Dark toolbar |
| Light | icon-light | Black | Light toolbar |

---

## Resume Development

### Step 1: Open Project
```bash
cd /home/kumarr/Temp/theme-toggle
```

### Step 2: Load Node.js Environment
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Step 3: Make Changes
- Edit source files as needed
- Bump version in manifest.json if signing
- Re-sign with web-ext

---

## Summary

Theme Switch Extension is **complete and fully functional** with:
- Manual theme toggling via toolbar button
- External control via native messaging (reads `~/Data/.theme-state`)
- Custom icons with proper visibility
- AMO-signed for permanent installation

**Status: Complete & Functional**

---

**End of State Save**
**Last Updated:** March 20, 2026
**Current Version:** 1.0.5
