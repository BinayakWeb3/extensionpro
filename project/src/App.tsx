import React, { useState, useEffect } from 'react';
import { Eye, Settings, Monitor, Save, RefreshCw } from 'lucide-react';
import { ColorModes, type SiteSettings } from './types';
import { ColorModeSelector } from './components/ColorModeSelector';
import { SiteSettingsPanel } from './components/SiteSettingsPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { chromeApi } from './utils/chromeApi';

function App() {
  const [currentTab, setCurrentTab] = useState<string>('localhost');
  const [activeMode, setActiveMode] = useState<ColorModes>(ColorModes.Normal);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    const initializeTab = async () => {
      const tabs = await chromeApi.tabs.query({ active: true, currentWindow: true });
      if (tabs[0]?.url) {
        const hostname = new URL(tabs[0].url).hostname;
        setCurrentTab(hostname);
        await loadSiteSettings(tabs[0].url);
      }
    };

    initializeTab();
  }, []);

  const loadSiteSettings = async (url: string) => {
    const hostname = new URL(url).hostname;
    const { settings = {} } = await chromeApi.storage.sync.get('settings');
    setSiteSettings(settings);
    setActiveMode(settings[hostname]?.mode || ColorModes.Normal);
  };

  const saveSiteSettings = async () => {
    const updatedSettings = {
      ...siteSettings,
      [currentTab]: { mode: activeMode }
    };
    await chromeApi.storage.sync.set({ settings: updatedSettings });
    setSiteSettings(updatedSettings);

    // Apply changes to the current tab
    const tabs = await chromeApi.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]?.id) {
      await chromeApi.runtime.sendMessage({
        type: 'UPDATE_COLOR_MODE',
        mode: activeMode
      });
    }
  };

  return (
    <div className="w-[400px] min-h-[500px] bg-white text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
        <div className="flex items-center space-x-2">
          <Eye className="w-6 h-6" />
          <h1 className="text-xl font-bold">Color Blind Mode</h1>
        </div>
        <p className="text-sm mt-1 opacity-90">Enhance web accessibility</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Mode Selector */}
        <ColorModeSelector
          activeMode={activeMode}
          onChange={setActiveMode}
          isPreviewMode={isPreviewMode}
        />

        {/* Preview Toggle */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Monitor className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Preview Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isPreviewMode}
              onChange={(e) => setIsPreviewMode(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Site Settings */}
        <SiteSettingsPanel
          currentTab={currentTab}
          siteSettings={siteSettings}
          activeMode={activeMode}
        />

        {/* Preview Panel */}
        {isPreviewMode && (
          <PreviewPanel mode={activeMode} />
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={saveSiteSettings}
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
          <button
            onClick={() => setActiveMode(ColorModes.Normal)}
            className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Settings className="w-4 h-4" />
            <span>Shortcut: Ctrl/⌘ + Shift + C</span>
          </div>
          <a
            href="#"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;