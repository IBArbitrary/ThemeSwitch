# Theme Switch (Statefile Edition)

A Firefox extension to toggle between light and dark themes, with support for external control via a statefile for system theme integration.

## Features

- One-click theme switching between two configured themes
- **External control via statefile** - integrate with your system theme (KDE, GNOME, etc.)
- Select any installed Firefox themes for light and dark modes
- Icon color changes to indicate current theme state
- Persists your theme preferences across sessions
- Reads `~/Data/.theme-state` on startup to sync with system theme
- Manifest V3 compatible (Firefox 142+)

## Statefile Integration

This edition supports external control through a statefile:

1. Create a file at `~/Data/.theme-state`
2. Write `D` for dark theme or `L` for light theme
3. The extension will automatically switch to match

### Example Integration Script

```bash
#!/bin/bash
# Sync Firefox theme with KDE theme
if [ "$KDE_SESSION_UID" ]; then
    kwriteconfig5 --file ~/.config/kdeglobals --group KDE --key ColorScheme "BreezeDark"
    echo "D" > ~/Data/.theme-state
    qdbus org.kde.KWin /KWin reconfigure
fi
```

## Installation

### Prerequisites

```bash
# Install inotify-tools (required for statefile watching)
sudo apt install inotify-tools

# Create the state directory
mkdir -p ~/Data
echo "D" > ~/Data/.theme-state  # Start with dark theme
```

### Native Messaging Setup

```bash
# Create native messaging hosts directory
mkdir -p ~/.mozilla/native-messaging-hosts

# Link the native manifest (adjust path as needed)
ln -sf $(pwd)/native/theme-toggle.json ~/.mozilla/native-messaging-hosts/theme_toggle.json
```

### From Source
1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Select the `manifest.json` file
5. Configure your themes in the extension options

## Usage

### First-Time Setup
1. Right-click the toolbar icon and select "Options"
2. Select your preferred dark theme from the dropdown
3. Select your preferred light theme from the dropdown
4. Click "Save Settings"

### Manual Toggle
Click the toolbar icon to instantly switch between your configured themes.

### Automatic Toggle (via Statefile)
Write to the statefile to trigger automatic theme switching:
```bash
echo "L" > ~/Data/.theme-state  # Switch to light theme
echo "D" > ~/Data/.theme-state  # Switch to dark theme
```

The icon changes color to indicate the active theme:
- White icon: Dark theme is active
- Black icon: Light theme is active

## Permissions

| Permission | Purpose |
|------------|---------|
| `management` | List and enable installed themes |
| `storage` | Save your theme preferences |
| `nativeMessaging` | Communicate with native script for statefile watching |

## Compatibility

- Firefox 142.0 or later
- Linux only (native messaging requires shell script)
- Requires `inotify-tools` package

## Project Structure

```
theme-switch/
├── manifest.json              # Extension manifest
├── background.js              # Toggle logic + native messaging
├── options.html               # Preferences page
├── options.js                 # Preferences logic
├── options.css                # Preferences styling
├── icons/                     # Extension icons
└── native/
    ├── theme-toggle-native.sh # Statefile watcher
    └── theme-toggle.json      # Native manifest
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

**Rajeshkumar Kumar**
