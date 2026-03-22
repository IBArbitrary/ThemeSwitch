const darkThemeSelect = document.getElementById('dark-theme');
const lightThemeSelect = document.getElementById('light-theme');
const saveButton = document.getElementById('save');
const resetButton = document.getElementById('reset');
const statusDiv = document.getElementById('status');

async function getThemes() {
  try {
    const extensions = await browser.management.getAll();
    return extensions.filter(ext => ext.type === 'theme');
  } catch (error) {
    console.error('Failed to get themes:', error);
    return [];
  }
}

async function loadPreferences() {
  try {
    const data = await browser.storage.local.get(['lightThemeId', 'darkThemeId']);
    const themes = await getThemes();

    populateThemeDropdowns(themes);

    if (data.lightThemeId) {
      lightThemeSelect.value = data.lightThemeId;
    }
    if (data.darkThemeId) {
      darkThemeSelect.value = data.darkThemeId;
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
    showStatus('Failed to load preferences', 'error');
  }
}

function populateThemeDropdowns(themes) {
  darkThemeSelect.innerHTML = '<option value="">-- Select a theme --</option>';
  lightThemeSelect.innerHTML = '<option value="">-- Select a theme --</option>';

  themes.forEach(theme => {
    const darkOption = document.createElement('option');
    darkOption.value = theme.id;
    darkOption.textContent = theme.name;
    darkThemeSelect.appendChild(darkOption);

    const lightOption = document.createElement('option');
    lightOption.value = theme.id;
    lightOption.textContent = theme.name;
    lightThemeSelect.appendChild(lightOption);
  });
}

async function savePreferences() {
  const lightThemeId = lightThemeSelect.value;
  const darkThemeId = darkThemeSelect.value;

  if (!lightThemeId || !darkThemeId) {
    showStatus('Please select both light and dark themes', 'error');
    return;
  }

  if (lightThemeId === darkThemeId) {
    showStatus('Light and dark themes must be different', 'error');
    return;
  }

  try {
    await browser.storage.local.set({
      lightThemeId,
      darkThemeId,
      currentTheme: 'dark'
    });

    showStatus('Settings saved successfully! Dark theme is now active.', 'success');

    const themes = await getThemes();
    const darkTheme = themes.find(t => t.id === darkThemeId);
    
    if (darkTheme) {
      await browser.management.setEnabled(darkThemeId, true);
    }
  } catch (error) {
    console.error('Failed to save preferences:', error);
    showStatus('Failed to save preferences', 'error');
  }
}

async function resetPreferences() {
  try {
    await browser.storage.local.clear();
    lightThemeSelect.value = '';
    darkThemeSelect.value = '';
    showStatus('Settings have been reset', 'success');
  } catch (error) {
    console.error('Failed to reset preferences:', error);
    showStatus('Failed to reset preferences', 'error');
  }
}

function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  
  setTimeout(() => {
    statusDiv.textContent = '';
    statusDiv.className = 'status';
  }, 3000);
}

saveButton.addEventListener('click', savePreferences);
resetButton.addEventListener('click', resetPreferences);

document.addEventListener('DOMContentLoaded', loadPreferences);
