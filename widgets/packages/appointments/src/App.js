import { h } from 'preact'
import { AppContainer, Header } from '@canvas/common'
import { AppointmentsView } from './components'

export const App = ({ bailoutURL, colors, shadowRoot }) => {
  return (
    <AppContainer>
      <Header
        colors={colors}
        bailoutURL={bailoutURL}
        title={'Your Appointments'}
      />
      <AppointmentsView colors={colors} shadowRoot={shadowRoot} />
    </AppContainer>
  )
}
