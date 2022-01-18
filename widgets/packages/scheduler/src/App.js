import { h } from 'preact'
import { useState } from 'preact/hooks'
import { AppContainer, Body, Header } from '@canvas/common'
import { DateSelect, TimeSlotSelect } from './components'
import { useAppContext } from './hooks'

export const App = () => {
  const { colors } = useAppContext()
  const [screen, setScreen] = useState('SELECT')

  return (
    <AppContainer>
      <Header colors={colors} bailoutURL={'https://viget.com'} />
      {screen === 'SELECT' ? (
        <Body>
          <DateSelect />
          <TimeSlotSelect setScreen={() => setScreen('CONFIRM')} />
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
