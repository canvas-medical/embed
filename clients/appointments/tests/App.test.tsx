import { generateColors } from '@canvas-medical/embed-common'
import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { App } from '../src/App'

describe('App', () => {
  it('renders', () => {
    const colors = generateColors(null, null)

    expect(
      render(
        <App
          api="arbitrary.string"
          bailoutURL="arbitrary.com"
          locationId="1234"
          patientId="1234"
          patientKey="1234"
          shadowRoot="1234"
          colors={colors}
        />
      )
    ).toMatchSnapshot()
  })
})
