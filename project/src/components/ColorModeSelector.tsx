import React from 'react';
import { ColorModes } from '../types';
import { Eye, EyeOff } from 'lucide-react';

interface ColorModeSelectorProps {
  activeMode: ColorModes;
  onChange: (mode: ColorModes) => void;
  isPreviewMode: boolean;
}

const modeInfo = {
  [ColorModes.Normal]: {
    icon: Eye,
    label: 'Normal Vision',
    description: 'No color adjustment'
  },
  [ColorModes.Protanopia]: {
    icon: EyeOff,
    label: 'Protanopia',
    description: 'Red-blind color vision'
  },
  [ColorModes.Deuteranopia]: {
    icon: EyeOff,
    label: 'Deuteranopia',
    description: 'Green-blind color vision'
  },
  [ColorModes.Tritanopia]: {
    icon: EyeOff,
    label: 'Tritanopia',
    description: 'Blue-blind color vision'
  },
  [ColorModes.Achromatopsia]: {
    icon: EyeOff,
    label: 'Achromatopsia',
    description: 'Complete color blindness'
  }
};

export function ColorModeSelector({ activeMode, onChange, isPreviewMode }: ColorModeSelectorProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Color Vision Mode</h2>
      <div className="grid grid-cols-1 gap-2">
        {Object.entries(modeInfo).map(([mode, info]) => {
          const Icon = info.icon;
          const isActive = mode === activeMode;
          
          return (
            <button
              key={mode}
              onClick={() => onChange(mode as ColorModes)}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                  : 'border-2 border-gray-100 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <div className="flex-1 text-left">
                <div className="font-medium">{info.label}</div>
                <div className="text-sm text-gray-500">{info.description}</div>
              </div>
              {isActive && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}