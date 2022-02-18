import { determineFontColor, generateHoverColor } from './functions'

export const colorDefaults = {
  primary: '#29933C',
  secondary: '#E0E1E2',
  destructive: '#D02121',
  brand: '#2185D0',
}

export const colors = {
  primary: {
    main: colorDefaults.primary,
    hover: generateHoverColor(colorDefaults.primary),
    font: determineFontColor(colorDefaults.primary),
  },
  secondary: {
    main: colorDefaults.secondary,
    hover: generateHoverColor(colorDefaults.secondary),
    font: determineFontColor(colorDefaults.secondary),
  },
  destructive: {
    main: colorDefaults.destructive,
    hover: generateHoverColor(colorDefaults.destructive),
    font: determineFontColor(colorDefaults.destructive),
  },
  font: {
    white: '#FFFFFF',
    grey25: '#C0C0C0',
    grey50: '#7F7F7F',
    grey75: '#262626',
    black: '#000000',
  },
}
