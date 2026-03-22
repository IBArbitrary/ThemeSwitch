# Theme Switch

A Firefox extension to quickly toggle between light and dark themes with a single click.

## Features

- One-click theme switching between two configured themes
- Select any installed Firefox themes for light and dark modes
- Icon color changes to indicate current theme state
- Persists your theme preferences across sessions
- Starts with dark theme by default
- Manifest V3 compatible (Firefox 142+)

## Installation

### From Firefox Add-ons (Recommended)
*Coming soon to AMO*

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

### Toggling Themes
Click the toolbar icon to instantly switch between your configured themes.

The icon changes color to indicate the active theme:
- White icon: Dark theme is active
- Black icon: Light theme is active

## Permissions

This extension requires the following permissions:

| Permission | Purpose |
|------------|---------|
| `management` | List and enable installed themes |
| `storage` | Save your theme preferences |

## Compatibility

- Firefox 142.0 or later
- Manifest V3 compliant

## Development

### Project Structure
```
theme-switch/
├── manifest.json      # Extension manifest
├── background.js      # Toggle logic
├── options.html       # Preferences page
├── options.js         # Preferences logic
├── options.css        # Preferences styling
└── icons/             # Extension icons
```

### Building
```bash
# Using web-ext
npx web-ext build --overwrite-dest

# Signing for distribution
npx web-ext sign --api-key YOUR_KEY --api-secret YOUR_SECRET --channel unlisted
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

**Rajeshkumar Kumar**
