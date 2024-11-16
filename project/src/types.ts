export enum ColorModes {
  Normal = 'normal',
  Protanopia = 'protanopia',
  Deuteranopia = 'deuteranopia',
  Tritanopia = 'tritanopia',
  Achromatopsia = 'achromatopsia'
}

export interface SiteSettings {
  [hostname: string]: {
    mode: ColorModes;
  };
}

export interface ColorFilter {
  name: string;
  matrix: number[];
  description: string;
}