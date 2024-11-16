import { ColorModes } from './types';

let currentMode: ColorModes = ColorModes.Normal;
let styleElement: HTMLStyleElement | null = null;

function applyColorFilter(mode: ColorModes) {
  if (!styleElement) {
    styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
  }

  const hostname = window.location.hostname;
  chrome.storage.sync.get('settings', (data) => {
    const settings = data.settings || {};
    const siteSettings = settings[hostname];
    
    if (siteSettings?.mode || mode !== ColorModes.Normal) {
      const activeMode = mode !== ColorModes.Normal ? mode : siteSettings?.mode;
      
      // Apply the color matrix filter
      styleElement!.textContent = `
        html {
          filter: url(data:image/svg+xml,${encodeURIComponent(
            `<svg><filter id="colorize"><feColorMatrix type="matrix" values="${getColorMatrix(activeMode).join(' ')}" /></filter></svg>`
          )}#colorize) !important;
        }
      `;
    } else {
      styleElement!.textContent = '';
    }
  });
}

function getColorMatrix(mode: ColorModes): number[] {
  // Import the matrix values from the colorMatrices utility
  const matrices: Record<ColorModes, number[]> = {
    [ColorModes.Normal]: [
      1, 0, 0, 0, 0,
      0, 1, 0, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 0, 1, 0
    ],
    [ColorModes.Protanopia]: [
      0.567, 0.433, 0, 0, 0,
      0.558, 0.442, 0, 0, 0,
      0, 0.242, 0.758, 0, 0,
      0, 0, 0, 1, 0
    ],
    [ColorModes.Deuteranopia]: [
      0.625, 0.375, 0, 0, 0,
      0.7, 0.3, 0, 0, 0,
      0, 0.3, 0.7, 0, 0,
      0, 0, 0, 1, 0
    ],
    [ColorModes.Tritanopia]: [
      0.95, 0.05, 0, 0, 0,
      0, 0.433, 0.567, 0, 0,
      0, 0.475, 0.525, 0, 0,
      0, 0, 0, 1, 0
    ],
    [ColorModes.Achromatopsia]: [
      0.299, 0.587, 0.114, 0, 0,
      0.299, 0.587, 0.114, 0, 0,
      0.299, 0.587, 0.114, 0, 0,
      0, 0, 0, 1, 0
    ]
  };
  
  return matrices[mode] || matrices[ColorModes.Normal];
}

// Listen for messages from the popup and background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'UPDATE_COLOR_MODE') {
    currentMode = message.mode;
    applyColorFilter(currentMode);
  } else if (message.type === 'TOGGLE_COLOR_MODE') {
    const modes = Object.values(ColorModes);
    const currentIndex = modes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    currentMode = modes[nextIndex];
    applyColorFilter(currentMode);
  }
});

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  const hostname = window.location.hostname;
  chrome.storage.sync.get('settings', (data) => {
    const settings = data.settings || {};
    const siteSettings = settings[hostname];
    if (siteSettings?.mode) {
      currentMode = siteSettings.mode;
      applyColorFilter(currentMode);
    }
  });
});