import { h } from 'preact'
import { AppContainer, Body, Header } from '@canvas/common'
import { DateSelect, TimeSlotSelect } from './components'
import { useAppContext } from './hooks'

export const App = () => {
  const { screen, colors, setScreen, bailoutURL } = useAppContext()

  return (
    <AppContainer>
      <Header colors={colors} bailoutURL={bailoutURL} />
      {screen === 'SELECT' ? (
        <Body>
          <DateSelect />
          <TimeSlotSelect />
        </Body>
      ) : (
        <Body>
          Confirm Screen Inprogress
          <button onClick={() => setScreen('SELECT')}>Return to Select</button>
        </Body>
      )}
    </AppContainer>
  )
}
