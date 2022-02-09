import Color from 'color'

const generateHover = color => {
  return Color(color).darken(0.2)
}

const generateBackground = color => {
  return Color(color).fade(0.9)
}

const determineFontColor = color => {
  return Color(color).isLight() ? '#000000' : '#FFFFFF'
}

const COLOR_DEFAULTS = {
  PRIMARY: '#29933C',
  SECONDARY: '#E0E1E2',
  DESTRUCTIVE: '#D02121',
  BRAND: '#2185d0',
}

export const styles = {
  minWidth: '345px', // 375 - 16px
  maxWidth: '650px', // 768 - 59px
  default: {
    primary: '#2185d0',
    accent: '#e8f2fa',
    focus: '#0d2c4c',
    hover: '#0d2c4c',
  },
  buttons: {
    primary: {
      background: '#29933C',
      focus: '#0E3214',
      hover: '#0E3214',
    },
    secondary: {
      background: '#D02121',
      focus: '#470B0B',
      hover: '#470B0B',
    },
  },
  positive: {
    main: COLOR_DEFAULTS.PRIMARY,
    hover: generateHover(COLOR_DEFAULTS.PRIMARY),
  },
  secondary: {
    main: COLOR_DEFAULTS.SECONDARY,
    hover: generateHover(COLOR_DEFAULTS.SECONDARY),
  },
  destructive: {
    main: COLOR_DEFAULTS.DESTRUCTIVE,
    hover: generateHover(COLOR_DEFAULTS.DESTRUCTIVE),
  },
  font: {
    white: '#FFFFFF',
    grey25: '#C0C0C0',
    grey50: '#7F7F7F',
    grey75: '#262626',
    black: '#000000',
  },
}

export const generateColors = (brandColor, accentColor) => {
  return {
    brand: {
      main: brandColor || COLOR_DEFAULTS.BRAND,
      hover: brandColor
        ? generateHover(brandColor)
        : generateHover(COLOR_DEFAULTS.BRAND),
      font: brandColor ? determineFontColor(brandColor) : styles.font.white,
    },
    accent: {
      main: accentColor || COLOR_DEFAULTS.BRAND,
      hover: accentColor
        ? generateHover(accentColor)
        : generateHover(COLOR_DEFAULTS.BRAND),
      font: accentColor ? determineFontColor(accentColor) : styles.font.white,
    },
    background: accentColor
      ? generateBackground(accentColor)
      : generateBackground(COLOR_DEFAULTS.BRAND),
  }
}

export const backgroundColor = `
  background-color: var(--bg);
`

export const hoverColor = `
  &:hover {
    background-color: var(--hc, ${styles.default.hover});
  }
`

export const margin = `
  margin-top: var(--mt, var(--my, var(--m, 0)));
  margin-bottom: var(--mb, var(--my, var(--m, 0)));
  margin-left: var(--ml, var(--mx, var(--m, 0)));
  margin-right: var(--mr, var(--mx, var(--m, 0)));
`
