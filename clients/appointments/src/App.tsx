import { h } from 'preact'
import { AppContainer, Header } from '@canvas/embed-common'
import { IAppProps } from './utils'
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
}: IAppProps) => {
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
