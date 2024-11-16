import React from 'react';
import { Globe } from 'lucide-react';
import { ColorModes, SiteSettings } from '../types';

interface SiteSettingsPanelProps {
  currentTab: string;
  siteSettings: SiteSettings;
  activeMode: ColorModes;
}

export function SiteSettingsPanel({ currentTab, siteSettings, activeMode }: SiteSettingsPanelProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Site Settings</h2>
      <div className="p-4 bg-gray-50 rounded-lg space-y-2">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-700">{currentTab}</span>
        </div>
        <p className="text-sm text-gray-600">
          Current mode: {activeMode}
        </p>
      </div>
    </div>
  );
}