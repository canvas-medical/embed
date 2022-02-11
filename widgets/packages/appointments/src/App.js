import { h } from 'preact'
import { AppContainer, Header } from '@canvas/common'
import { AppointmentsView } from './components'

export const App = ({
  api,
  bailoutURL,
  colors,
  locationId,
  patientId,
  patientKey,
  providers,
  shadowRoot,
}) => {
  return (
    <AppContainer>
      <Header
        colors={colors}
        bailoutURL={bailoutURL}
        title={'Your Appointments'}
      />
      <AppointmentsView
        api={api}
        locationId={locationId}
        patientId={patientId}
        patientKey={patientKey}
        providers={providers}
        colors={colors}
        shadowRoot={shadowRoot}
      />
    </AppContainer>
  )
}
