import Color from 'color'

export type GeneratedColorsType = {
  brand: {
    main: string
    hover: string
    font: string
  }
  accent: {
    main: string
    hover: string
    font: string
  }
  background: string
}

export type BackgroundColorPropType = {
  bc: string
}

export type HoverColorPropType = {
  hc: string
}

export type FontColorPropType = {
  fc?: string
}

export type MarginPropsType = {
  m?: string
  mx?: string
  my?: string
  mt?: string
  mr?: string
  mb?: string
  ml?: string
}
