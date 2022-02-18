import { generateColors } from '@canvas-medical/embed-common'
import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { AppointmentsView } from '../../src/components'

describe('AppointmentsView', () => {
  it('renders', () => {
    const colors = generateColors(null, null)

    expect(
      render(
        <AppointmentsView
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
