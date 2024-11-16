// Mock implementation for development environment
const mockStorage = {
  settings: {}
};

export const isExtensionEnvironment = () => typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;

export const chromeApi = {
  tabs: {
    query: async (queryInfo: chrome.tabs.QueryInfo) => {
      if (isExtensionEnvironment()) {
        return new Promise((resolve) => chrome.tabs.query(queryInfo, resolve));
      }
      // Mock response for development
      return [{
        id: 1,
        url: 'http://localhost:5173',
        active: true,
        currentWindow: true
      }];
    }
  },
  storage: {
    sync: {
      get: async (key: string) => {
        if (isExtensionEnvironment()) {
          return new Promise((resolve) => chrome.storage.sync.get(key, resolve));
        }
        return { [key]: mockStorage[key as keyof typeof mockStorage] };
      },
      set: async (items: { [key: string]: any }) => {
        if (isExtensionEnvironment()) {
          return new Promise((resolve) => chrome.storage.sync.set(items, resolve));
        }
        Object.assign(mockStorage, items);
        return Promise.resolve();
      }
    }
  },
  runtime: {
    sendMessage: async (message: any) => {
      if (isExtensionEnvironment()) {
        return new Promise((resolve) => chrome.runtime.sendMessage(message, resolve));
      }
      console.log('Mock sendMessage:', message);
      return Promise.resolve();
    }
  }
};