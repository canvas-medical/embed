import Color from 'color'

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
}

export const generateColors = brandColor => {
  if (brandColor)
    return {
      accent: Color(brandColor).lighten(0.99),
      focus: Color(brandColor).darken(0.66),
    }
  return {
    accent: null,
    focus: null,
  }
}

export const primaryBackgoundColor = `
  background-color: var(--bg, ${styles.default.primary});
`

export const accentBackgoundColor = `
  background-color: var(--bg, ${styles.default.accent});
`

export const hoverAndFocusColor = `
  &:focus {
    background-color: var(--fc, ${styles.default.focus});
  }
  &:hover {
    background-color: var(--hc, ${styles.default.hover});
  }
`

export const margin = `
  margin-top: var(--mt, var(--my, var(--m, 0)));
  margin-bottom: var(--mb, var(--my, var(--m, 0)));
  margin-left: var(--ml, var(--mx, var(--m, 0)));
  margin-right: var(--ml, var(--mx, var(--m, 0)));
`
