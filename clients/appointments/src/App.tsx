import { h } from 'preact'
import { AppContainer, Header } from '@canvas-medical/embed-common'
import { IAppProps } from './utils'
import { AppointmentsView } from './components'

export const App = ({
  api,
  bailoutURL,
  locationId,
  patientId,
  patientKey,
  providerIds,
  shadowRoot,
  colors,
  customFont,
}: IAppProps) => {
  return (
    <AppContainer customFont={customFont}>
      <Header
        bailoutURL={bailoutURL}
        colors={colors}
        title="Your Appointments"
      />
      <AppointmentsView
        api={api}
        bailoutURL={bailoutURL}
        colors={colors}
        locationId={locationId}
        patientId={patientId}
        patientKey={patientKey}
        providerIds={providerIds}
        shadowRoot={shadowRoot}
      />
    </AppContainer>
  )
}
