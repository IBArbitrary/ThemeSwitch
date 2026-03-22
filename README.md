# Theme Toggle Extension

A Firefox extension that enables toggling between two themes (light and dark) with a single click.

## Features

- Toggle between two themes with one click
- Select any installed Firefox themes for light and dark modes
- Icon changes color to indicate current theme state
- Starts with dark theme by default
- Handles theme changes initiated outside the extension

## Installation

### Installing the Extension

1. Open Firefox
2. Navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Select the `manifest.json` file from this directory
5. The extension will now be installed

### First-Time Setup

1. Click on the "Theme Toggle" extension icon in your toolbar
2. The extension will open its options page (or right-click and select "Options")
3. Select your preferred theme from the "Dark Theme" dropdown
4. Select your preferred theme from the "Light Theme" dropdown
5. Click "Save Settings"
6. Your dark theme will be activated immediately

## Usage

### Toggling Between Themes

Click the Theme Toggle icon in your Firefox toolbar to switch between your selected light and dark themes. The extension icon will change color to indicate which theme is currently active:

- **Dark moon icon** (dark background): Dark theme is active
- **Light sun icon** (light background): Light theme is active

### Changing Theme Preferences

1. Right-click the Theme Toggle icon
2. Select "Options"
3. Select new themes from the dropdowns
4. Click "Save Settings"
5. The extension will switch to your new dark theme

## Technical Details

### Extension Structure

- `manifest.json` - Extension manifest with permissions and configuration
- `background.js` - Background script handling toggle logic and state management
- `options.html` - Preferences page HTML
- `options.js` - Preferences page logic
- `options.css` - Preferences page styling
- `icons/` - Directory containing extension icons

### APIs Used

- `browser.management` - To list and enable installed themes
- `browser.storage` - To persist theme preferences and current state
- `browser.action` - To handle toolbar button clicks and icon updates

### Browser Compatibility

- Requires Firefox 109+ (Manifest V3 support)
- Uses modern WebExtension APIs

### Data Stored

The extension stores the following data in `browser.storage.local`:

```json
{
  "lightThemeId": "theme-extension-id",
  "darkThemeId": "another-theme-extension-id",
  "currentTheme": "dark"
}
```

## Troubleshooting

### Extension icon not responding

Ensure both light and dark themes are selected in the options page. The toggle will not work if themes are not configured.

### Theme not switching

Check that:
- Both themes are selected and saved
- The themes have not been uninstalled from Firefox
- There are no console errors (F12 to open developer tools)

### Icon not updating

If the icon doesn't change color after toggling, try reloading the extension or restarting Firefox.

## Development

To modify and reload the extension during development:

1. Make your changes to the files
2. In `about:debugging#/runtime/this-firefox`, find the Theme Toggle extension
3. Click the "Reload" button
4. Refresh any open extension pages (like options)

## License

This extension is provided as-is for educational and personal use.
