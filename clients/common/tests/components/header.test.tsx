import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { colorDefaults, generateColors, Header } from '../../src'

describe('Header', () => {
  it('renders', () => {
    const bailoutURL = 'https://canvasmedical.com'
    const colors = generateColors(colorDefaults.brand, colorDefaults.brand)
    const title = 'Header Test'

    expect(
      render(<Header bailoutURL={bailoutURL} colors={colors} title={title} />)
    ).toMatchSnapshot()
  })
})
