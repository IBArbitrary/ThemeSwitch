# Signing Theme Toggle Extension

Your extension is ready to be signed! Here's how to do it:

## ✅ Installation Complete

**Tools Installed:**
- ✓ Node.js v20.20.1
- ✓ npm v10.8.2
- ✓ web-ext v10.0.0

**Extension Ready:**
- ✓ All source files complete
- ✓ Manifest V3 compliant
- ✓ Developer info added
- ✓ Warnings fixed

---

## 🔐 Getting Your JWT Credentials

If you haven't already, get your JWT credentials:

1. Visit: https://addons.mozilla.org/developers/addon/api/key/
2. Sign in with your Firefox account
3. You'll see:
   - **JWT Issuer** (sometimes called "Client ID")
   - **JWT Secret** (sometimes called "Client Secret")

Keep these safe! They're like passwords.

---

## 📝 Method 1: Edit Credentials File (Easiest)

1. Open the file: `.sign-credentials`
2. Replace the placeholders:
   ```
   # Your JWT Issuer (API Key) from AMO Developer Hub
   WEB_EXT_API_KEY=YOUR_JWT_ISSUER_HERE        ← Replace this line

   # Your JWT Secret from AMO Developer Hub
   WEB_EXT_API_SECRET=YOUR_JWT_SECRET_HERE    ← Replace this line
   ```
3. Save the file
4. Run:
   ```bash
   ./sign-extension.sh
   ```

---

## 📝 Method 2: Use Environment Variables

Run these commands in your terminal:

```bash
export WEB_EXT_API_KEY='your-jwt-issuer-here'
export WEB_EXT_API_SECRET='your-jwt-secret-here'
./sign-extension.sh
```

Or all in one line:
```bash
WEB_EXT_API_KEY='your-jwt-issuer' WEB_EXT_API_SECRET='your-jwt-secret' ./sign-extension.sh
```

---

## 📝 Method 3: Pass Credentials Directly

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
web-ext sign \
  --api-key YOUR_JWT_ISSUER \
  --api-secret YOUR_JWT_SECRET \
  --api-url https://addons.mozilla.org/api/v4/ \
  --id theme-toggle@extension.local
```

---

## 🚀 Running the Signing Process

**Quick Start:**
```bash
cd /home/kumarr/Temp/theme-toggle
./sign-extension.sh
```

**What Happens:**
1. Script loads Node.js and web-ext
2. Validates your credentials
3. Uploads extension to Mozilla AMO API
4. Mozilla signs and verifies the extension
5. Downloads the signed `.xpi` file
6. Location: `web-ext-artifacts/theme_toggle-1.0-fx.xpi`

**Expected Output:**
```
=== Theme Toggle Extension Signing Script ===

✓ web-ext is installed (version: 10.0.0)
✓ Current directory: /home/kumarr/Temp/theme-toggle

=== Signing Extension ===

✓ JWT Issuer: user:12345678***
✓ API URL: https://addons.mozilla.org/api/v4/
✓ Extension ID: theme-toggle@extension.local

Building web-ext-artifacts/theme-toggle-1.0.zip
Your extension has been signed
Successfully signed artifacts in:
  web-ext-artifacts/theme_toggle-1.0-fx.xpi

=== Success! ===

✓ Extension signed successfully!

Signed file location:
  web-ext-artifacts/theme_toggle-1.0-fx.xpi

To install:
  1. Open Firefox
  2. Navigate to about:addons
  3. Click gear icon → 'Install Add-on From File'
  4. Select the .xpi file from web-ext-artifacts/
```

---

## 📦 After Signing

**Your signed file location:**
```
web-ext-artifacts/theme_toggle-1.0-fx.xpi
```

You can now:
- Install it locally in Firefox
- Share it with others (they'll need to "Install Add-on From File")
- Upload to GitHub Releases
- Host on your website
- Keep it for personal use

---

## 🔧 Installing the Signed Extension

### Option A: About:addons (Recommended)
1. Open Firefox
2. Go to `about:addons`
3. Click the gear icon (⋮) → "Install Add-on From File"
4. Navigate to: `web-ext-artifacts/theme_toggle-1.0-fx.xpi`
5. Click "Add"

### Option B: Command Line
```bash
firefox /home/kumarr/Temp/theme-toggle/web-ext-artifacts/theme_toggle-1.0-fx.xpi
```

### Option C: Drag & Drop
1. Open Firefox
2. Drag the `.xpi` file into the browser window
3. Confirm installation

---

## ✅ Testing After Installation

1. **Verify Installation:**
   - Open `about:addons`
   - Look for "Theme Toggle" in the list
   - Confirm it's enabled

2. **Test Functionality:**
   - Right-click the toolbar icon → "Options"
   - Select light and dark themes
   - Click "Save"
   - Click the toolbar icon to toggle themes
   - Verify icon changes color

---

## ❌ Troubleshooting

**Error: "web-ext is not installed"**
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

**Error: "JWT credentials not found"**
- Check that you replaced the placeholders in `.sign-credentials`
- Verify no quotes around the values
- Ensure credentials are from https://addons.mozilla.org/developers/addon/api/key/

**Error: "Authentication failed"**
- Verify your JWT issuer and secret are correct
- Make sure there are no extra spaces or characters
- Regenerate credentials in AMO Developer Hub if needed

**Error: "Network error"**
- Check your internet connection
- Try again (AMO API may be temporarily slow)
- Verify using the production API URL

---

## 🔐 Security Tips

- Never commit `.sign-credentials` to version control (add to `.gitignore`)
- Don't share your JWT credentials publicly
- Rotate credentials periodically in AMO Developer Hub
- Store credentials in environment variables for better security

---

## 📊 What's Next?

After signing and installing, you can:

1. **Personal Use**
   - Enjoy your theme toggle extension!
   - All preferences are saved in browser storage

2. **Updates Later**
   - Update version in `manifest.json` (e.g., "1.1")
   - Make code changes
   - Run `./sign-extension.sh` again
   - Install new version (overwrites old one)

3. **Distribute to Others**
   - Share the `.xpi` file
   - Users install it via "Install Add-on From File"
   - Or upload to GitHub Releases / website

---

## 📞 Quick Reference

**Sign Extension:**
```bash
./sign-extension.sh
```

**With custom credentials:**
```bash
WEB_EXT_API_KEY='your-key' WEB_EXT_API_SECRET='your-secret' ./sign-extension.sh
```

**Check signed file:**
```bash
ls -lh web-ext-artifacts/
```

**Installation instructions in Firefox:**
- `about:addons` → Gear → "Install Add-on From File"

---

## 🎉 Summary

✓ All tools installed (Node.js, npm, web-ext)
✓ Extension ready for signing
✓ Signing script created
✓ Configuration file ready
✓ Documentation complete

**Next step:** Run `./sign-extension.sh` with your JWT credentials!

Get your credentials from: https://addons.mozilla.org/developers/addon/api/key/
