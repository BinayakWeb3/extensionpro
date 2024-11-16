import { ColorModes, ColorFilter } from '../types';

const colorFilters: Record<ColorModes, ColorFilter> = {
  [ColorModes.Normal]: {
    name: 'Normal',
    matrix: [
      1, 0, 0, 0, 0,
      0, 1, 0, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 0, 1, 0
    ],
    description: 'No color adjustment'
  },
  [ColorModes.Protanopia]: {
    name: 'Protanopia',
    matrix: [
      0.567, 0.433, 0, 0, 0,
      0.558, 0.442, 0, 0, 0,
      0, 0.242, 0.758, 0, 0,
      0, 0, 0, 1, 0
    ],
    description: 'Red-blind color vision'
  },
  [ColorModes.Deuteranopia]: {
    name: 'Deuteranopia',
    matrix: [
      0.625, 0.375, 0, 0, 0,
      0.7, 0.3, 0, 0, 0,
      0, 0.3, 0.7, 0, 0,
      0, 0, 0, 1, 0
    ],
    description: 'Green-blind color vision'
  },
  [ColorModes.Tritanopia]: {
    name: 'Tritanopia',
    matrix: [
      0.95, 0.05, 0, 0, 0,
      0, 0.433, 0.567, 0, 0,
      0, 0.475, 0.525, 0, 0,
      0, 0, 0, 1, 0
    ],
    description: 'Blue-blind color vision'
  },
  [ColorModes.Achromatopsia]: {
    name: 'Achromatopsia',
    matrix: [
      0.299, 0.587, 0.114, 0, 0,
      0.299, 0.587, 0.114, 0, 0,
      0.299, 0.587, 0.114, 0, 0,
      0, 0, 0, 1, 0
    ],
    description: 'Complete color blindness'
  }
};

export const getColorMatrix = (mode: ColorModes): number[] => {
  return colorFilters[mode]?.matrix || colorFilters[ColorModes.Normal].matrix;
};