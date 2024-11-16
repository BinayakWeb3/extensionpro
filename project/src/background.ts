chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ settings: {} });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-colorblind-mode') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE_COLOR_MODE' });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_SITE_SETTINGS') {
    chrome.storage.sync.get('settings', (data) => {
      sendResponse(data.settings || {});
    });
    return true;
  }
});