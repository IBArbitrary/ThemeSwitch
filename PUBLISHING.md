# Publishing Guide for Theme Toggle Extension

## Changes Made to Manifest.json

✅ **All changes successfully applied:**

1. **Removed browser_style warning** - Removed deprecated `browser_style: true` from options_ui
2. **Added developer information** - Added "Rajeshkumar Kumar" as the developer
3. **Added browser_specific_settings** - Added gecko.id for AMO submission

**Updated manifest.json:**
```json
{
  "manifest_version": 3,
  "name": "Theme Toggle",
  "version": "1.0",
  "description": "Toggle between two Firefox themes with a single click",
  "developer": {
    "name": "Rajeshkumar Kumar"
  },
  "browser_specific_settings": {
    "gecko": {
      "id": "theme-toggle@extension.local"
    }
  },
  ...
}
```

---

## Packaging the Extension

### Method 1: Using web-ext (Recommended)

**Install web-ext:**
```bash
npm install -g web-ext
```

**Build the extension:**
```bash
cd /home/kumarr/Temp/theme-toggle
web-ext build
```

This creates: `web-ext-artifacts/theme-toggle-1.0.zip`

**Sign the extension (for distribution):**
```bash
web-ext sign --api-key YOUR_API_KEY --api-secret YOUR_API_SECRET
```

Get API keys from: https://addons.mozilla.org/developers/addon/api/key/

### Method 2: Manual Packaging

If npm is not available, create a zip file manually:

```bash
cd /home/kumarr/Temp/theme-toggle
zip -r theme-toggle-1.0.zip \
  manifest.json \
  background.js \
  options.html \
  options.js \
  options.css \
  icons/
```

---

## Publishing to AMO (Addons.mozilla.org)

### Step 1: Create Developer Account

1. Visit: https://addons.mozilla.org/developers/addons
2. Sign in with your Firefox account or create one
3. Verify your email if prompted

### Step 2: Prepare Submission Materials

**Required Information:**
- **Developer Name:** Rajeshkumar Kumar ✓
- **Contact Email:** k.rajeshkumar.1411@gmail.com
- **Extension Name:** Theme Toggle ✓
- **Version:** 1.0 ✓

**Files to Prepare:**

1. **Icons** (PNG format recommended):
   - 32x32 px
   - 64x64 px
   - 128x128 px
   - Use: `icons/icon-dark.png` and `icons/icon-light.png`

2. **Screenshots** (at least one, max 5):
   - Size: 1280x800 or 640x400 px
   - Show extension in action (preferences page, toolbar button)
   - PNG or JPG format

3. **Description Content:**
   ```
   A Firefox extension that enables toggling between two themes (light and dark) with a single toolbar button click.

   Features:
   - Toggle between any two installed Firefox themes
   - Icon changes color to indicate current theme state
   - Starts with dark theme by default
   - Simple preferences page to select your themes
   - Persists theme preferences

   Usage:
   1. Click the toolbar icon to toggle themes
   2. Right-click the icon and select "Options" to configure themes
   3. Select your preferred light and dark themes from the dropdowns
   4. Click "Save Settings"

   The icon indicates which theme is active:
   - Dark icon (dark background): Dark theme
   - Light icon (light background): Light theme

   Compatible with Firefox 109+ (Manifest V3)
   ```

4. **Categories:**
   - Primary: "Appearance" or "Other"

5. **Compatibility:**
   - Firefox 109+ (for Manifest V3)

### Step 3: Submit Extension

1. In the Developer Hub, click "Submit a New Add-on"
2. Upload your packaged file:
   - Method 1: Upload `web-ext-artifacts/theme-toggle-1.0.zip`
   - Method 2: Upload `theme-toggle-1.0.zip`
3. Fill in all required information:
   - Name, version, description
   - Developer name (Rajeshkumar Kumar)
   - Contact email (k.rajeshkumar.1411@gmail.com)
   - Upload icons and screenshots
   - Add keywords for search: theme, toggle, light, dark, switch
4. Select category: "Appearance"
5. Review and submit

### Step 4: Review Process

**Automated Review** (minutes to hours):
- Validates manifest syntax
- Checks for known issues
- Scans for security problems

**Manual Review** (days to weeks):
- Human reviewer examines the code
- Checks for policy compliance
- Tests functionality
- May request source code

**After Review:**
- If approved: Extension goes live on AMO
- If rejected: You'll receive feedback with required changes
- Make changes, increment version, resubmit

### Step 5: Updates (Future)

When updating the extension:

1. Increment version in manifest.json (e.g., "1.1")
2. Update build files if needed
3. Package new version
4. Upload to AMO Developer Hub
5. Submit new version for review

---

## Self-Distribution (Alternative)

If you don't want AMO review:

### Method 1: Signed Distribution

```bash
web-ext sign --api-key YOUR_KEY --api-secret YOUR_SECRET
```

This creates a signed `.xpi` file without AMO review.

### Method 2: Unsigned Distribution

Use your manually created zip file (not recommended).

**Distribution Methods:**
- Host on your own website
- Share via file sharing services
- Email to users

**Installation Instructions for Users:**
1. Download the `.xpi` file
2. Open Firefox
3. Go to `about:addons`
4. Click the gear icon (⋮) → "Install Add-on From File"
5. Select the downloaded `.xpi` file

**Limitations of Self-Distribution:**
- No automatic updates for users
- Users see security warnings
- Not in AMO search results
- Manual update process required

---

## Summary Checklist for AMO Submission

**Before Submitting:**
- [x] Manifest.json updated with developer info
- [x] browser_style warning removed
- [x] browser_specific_settings added
- [ ] Extension packaged (web-ext build or manual zip)
- [ ] Icons created in 32, 64, 128 px sizes
- [ ] Screenshots captured (1280x800 or 640x400)
- [ ] Description prepared
- [ ] Keywords defined
- [ ] Category selected

**During Submission:**
- [ ] Developer account created
- [ ] Package uploaded
- [ ] All fields filled in
- [ ] Contact email provided: k.rajeshkumar.1411@gmail.com
- [ ] Submission submitted

**After Submission:**
- [ ] Monitor review status in Developer Hub
- [ ] Respond to reviewer feedback if needed
- [ ] Celebrate when approved!

---

## Contact Mozilla Team

- **AMO Discussion Forum:** https://discourse.mozilla.org/c/add-ons
- **Support Email:** amo-admins@mozilla.com
- **Developer Documentation:** https://extensionworkshop.com/

---

## Quick Start Commands

**If npm/web-ext is available:**
```bash
cd /home/kumarr/Temp/theme-toggle
web-ext build        # Creates web-ext-artifacts/theme-toggle-1.0.zip
web-ext sign --api-key key --api-secret secret  # Creates signed .xpi
```

**Manual packaging:**
```bash
cd /home/kumarr/Temp/theme-toggle
zip -r theme-toggle-1.0.zip manifest.json background.js options.html options.js options.css icons/
```

---

**Good luck with your submission! Your extension is ready to publish.**
