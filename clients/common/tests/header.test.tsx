import '@testing-library/jest-dom'
import { h } from 'preact'
import { render } from '@testing-library/preact'
import { colorDefaults, generateColors, Header } from '../src'

test('Renders Header', () => {
  const bailoutURL = 'https://viget.com'
  const colors = generateColors(colorDefaults.brand, colorDefaults.brand)
  const title = 'Header Test'

  const { queryByText } = render(
    <Header bailoutURL={bailoutURL} colors={colors} title={title} />
  )

  expect(queryByText(title)).toBeInTheDocument()
})
