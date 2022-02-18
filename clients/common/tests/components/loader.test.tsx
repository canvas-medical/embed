import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { Loader, generateColors, colorDefaults } from '../../src'

describe('Loader', () => {
  it('renders', () => {
    const colors = generateColors(colorDefaults.brand, colorDefaults.brand)

    expect(render(<Loader colors={colors} />)).toMatchSnapshot()
  })
})
