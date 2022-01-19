import { h } from 'preact'
import { AppContainer, Header } from '@canvas/common'
import { AppointmentsView } from './components'

export const App = ({ bailoutURL, colors }) => {
  return (
    <AppContainer>
      <Header
        colors={colors}
        bailoutURL={bailoutURL}
        title={'Your Appointments'}
      />
      <AppointmentsView colors={colors} />
    </AppContainer>
  )
}
