async function getStorageData() {
  return await browser.storage.local.get(['lightThemeId', 'darkThemeId', 'currentTheme']);
}

async function setStorageData(data) {
  await browser.storage.local.set(data);
}

async function enableTheme(themeId) {
  try {
    await browser.management.setEnabled(themeId, true);
    return true;
  } catch (error) {
    console.error('Failed to enable theme:', error);
    return false;
  }
}

async function updateIcon(isDarkTheme) {
  const iconPath = isDarkTheme ? 'icons/icon-dark' : 'icons/icon-light';
  await browser.action.setIcon({
    path: {
      '48': `${iconPath}-48.png`,
      '96': `${iconPath}-96.png`
    }
  });
}

async function toggleTheme() {
  const data = await getStorageData();
  const { lightThemeId, darkThemeId, currentTheme = 'dark' } = data;

  if (!lightThemeId || !darkThemeId) {
    console.error('Themes not configured. Please select themes in options.');
    return;
  }

  const nextTheme = currentTheme === 'dark' ? lightThemeId : darkThemeId;
  const newCurrentTheme = currentTheme === 'dark' ? 'light' : 'dark';

  const success = await enableTheme(nextTheme);

  if (success) {
    await setStorageData({ currentTheme: newCurrentTheme });
    await updateIcon(newCurrentTheme === 'dark');
  }
}

let initializedFromStateFile = false;
let initTimeoutId = null;

async function initializeExtension() {
  const data = await getStorageData();
  const { lightThemeId, darkThemeId } = data;

  if (darkThemeId && lightThemeId) {
    updateIcon(true);
    initTimeoutId = setTimeout(async () => {
      if (!initializedFromStateFile) {
        console.log('No statefile detected, defaulting to dark theme');
        await enableTheme(darkThemeId);
        await setStorageData({ currentTheme: 'dark' });
        await updateIcon(true);
      }
    }, 2000);
  } else {
    await updateIcon(true);
  }
}

browser.action.onClicked.addListener(async () => {
  await toggleTheme();
});

browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    await initializeExtension();
  }
});

browser.management.onEnabled.addListener(async (info) => {
  if (info.type === 'theme') {
    const data = await getStorageData();
    const { lightThemeId, darkThemeId } = data;

    if (info.id === lightThemeId) {
      await setStorageData({ currentTheme: 'light' });
      await updateIcon(false);
    } else if (info.id === darkThemeId) {
      await setStorageData({ currentTheme: 'dark' });
      await updateIcon(true);
    }
  }
});

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
        
        initializedFromStateFile = true;
        if (initTimeoutId) {
          clearTimeout(initTimeoutId);
          initTimeoutId = null;
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
