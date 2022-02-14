import { h } from 'preact'
import { AppContainer, Header } from '@canvas/embed-common'
import { iAppProps } from './types'
import { AppointmentsView } from './components'

export const App = ({
  api,
  bailoutURL,
  locationId,
  patientId,
  patientKey,
  providers,
  shadowRoot,
  colors,
}: iAppProps) => {
  return (
    <AppContainer>
      <Header
        bailoutURL={bailoutURL}
        colors={colors}
        title="Your Appointments"
      />
      <AppointmentsView
        api={api}
        colors={colors}
        locationId={locationId}
        patientId={patientId}
        patientKey={patientKey}
        providers={providers}
        shadowRoot={shadowRoot}
      />
    </AppContainer>
  )
}
