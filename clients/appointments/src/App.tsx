import { h } from 'preact'
import { AppContainer, Header } from '@canvas-medical/embed-common'
import { IAppProps } from './utils'
import { AppointmentsView } from './components'

const defaultCallbacks = {
  onClick: () => {},
  onChange: () => {},
  onError: () => {},
}

export const App = ({
  api,
  bailoutURL,
  locationId,
  patientId,
  patientKey,
  providerIds,
  shadowRoot,
  colors,
  fontFamily,
  callbacks,
}: IAppProps) => {
  const finalCallbacks = {
    ...defaultCallbacks,
    ...(callbacks || {}),
  }

  return (
    <AppContainer fontFamily={fontFamily}>
      <Header
        bailoutURL={bailoutURL}
        colors={colors}
        title="Your Appointments"
      />
      <AppointmentsView
        api={api}
        bailoutURL={bailoutURL}
        callbacks={finalCallbacks}
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
