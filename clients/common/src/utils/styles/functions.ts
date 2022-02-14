import Color from 'color'
import { colorDefaults } from './colors'
import { GeneratedColorsType } from './types'

export const determineFontColor = (color: string): string => {
  return Color(color).isLight() ? '#000000' : '#FFFFFF'
}

export const generateBackgroundColor = (color: string): string => {
  return Color(color).fade(0.9).hsl().toString()
}

export const generateHoverColor = (color: string): string => {
  return Color(color).darken(0.2).hsl().toString()
}

export const generateColors = (
  brandColor: string | null,
  accentColor: string | null
): GeneratedColorsType => {
  const brand = brandColor || colorDefaults.brand
  const accent = accentColor || colorDefaults.brand

  return {
    brand: {
      main: brand,
      hover: generateHoverColor(brand),
      font: determineFontColor(brand),
    },
    accent: {
      main: accent,
      hover: generateHoverColor(accent),
      font: determineFontColor(accent),
    },
    background: generateBackgroundColor(accent),
  }
}
