import React from 'react';
import { ColorModes } from '../types';
import { getColorMatrix } from '../utils/colorMatrices';

interface PreviewPanelProps {
  mode: ColorModes;
}

export function PreviewPanel({ mode }: PreviewPanelProps) {
  const matrix = getColorMatrix(mode);
  const matrixStyle = matrix ? `url(data:image/svg+xml,${encodeURIComponent(
    `<svg><filter id="colorize"><feColorMatrix type="matrix" values="${matrix.join(' ')}" /></filter></svg>`
  )}#colorize)` : 'none';

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Preview</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-20 rounded-lg bg-gradient-to-r from-red-500 via-green-500 to-blue-500" />
          <p className="text-sm text-center text-gray-600">Original</p>
        </div>
        <div className="space-y-2">
          <div 
            className="h-20 rounded-lg bg-gradient-to-r from-red-500 via-green-500 to-blue-500"
            style={{ filter: matrixStyle }}
          />
          <p className="text-sm text-center text-gray-600">Simulated</p>
        </div>
      </div>
    </div>
  );
}