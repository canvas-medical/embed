import Color from 'color'

export const styles = {
  minWidth: '345px', // 375 - 16px
  maxWidth: '650px', // 768 - 59px
  default: {
    primary: '#2185d0',
    accent: '#e8f2fa',
    focus: '#0d2c4c',
  },
  buttons: {
    primary: {
      background: '#29933C',
      focus: '#0E3214',
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
