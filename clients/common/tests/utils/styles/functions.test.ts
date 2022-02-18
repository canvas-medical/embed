import {
  determineFontColor,
  generateBackgroundColor,
  generateColors,
  generateHoverColor,
} from '../../../src'

test('Finds light font color', () => {
  expect(determineFontColor('#2185D0')).toBe('#FFFFFF')
})

test('Finds dark font color', () => {
  expect(determineFontColor('#75FF66')).toBe('#000000')
})

test('Finds appropriate hover color', () => {
  expect(generateHoverColor('#2185D0')).toBe(
    'hsl(205.70000000000005, 72.6%, 37.8%)'
  )
})

test('Finds appropriate background color', () => {
  expect(generateBackgroundColor('#2185D0')).toBe(
    'hsla(205.70000000000005, 72.6%, 47.3%, 0.09999999999999998)'
  )
})

describe('generateColors', () => {
  it('generates colors from provided colors', () => {
    expect(generateColors('#2185D0', '#2185D0')).toStrictEqual({
      brand: {
        main: '#2185D0',
        hover: 'hsl(205.70000000000005, 72.6%, 37.8%)',
        font: '#FFFFFF',
      },
      accent: {
        main: '#2185D0',
        hover: 'hsl(205.70000000000005, 72.6%, 37.8%)',
        font: '#FFFFFF',
      },
      background: 'hsla(205.70000000000005, 72.6%, 47.3%, 0.09999999999999998)',
    })
  })

  it('generates colors from null', () => {
    expect(generateColors(null, null)).toStrictEqual({
      brand: {
        main: '#2185D0',
        hover: 'hsl(205.70000000000005, 72.6%, 37.8%)',
        font: '#FFFFFF',
      },
      accent: {
        main: '#2185D0',
        hover: 'hsl(205.70000000000005, 72.6%, 37.8%)',
        font: '#FFFFFF',
      },
      background: 'hsla(205.70000000000005, 72.6%, 47.3%, 0.09999999999999998)',
    })
  })
})
