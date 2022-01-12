import { h } from 'preact'
import { useState } from 'preact/hooks'
import { AppContainer, Body, Header } from '@canvas/common'
import { DateSelect, TimeSlotSelect } from './components'
import { useAppContext } from './hooks'

export const App = ({ shadowRoot }) => {
  const { colors } = useAppContext()
  const [screen, setScreen] = useState('SELECT')
  const [date, setDate] = useState(new Date())

  return (
    <AppContainer>
      <Header colors={colors} bailoutURL={'https://viget.com'} />
      {screen === 'SELECT' ? (
        <Body>
          <DateSelect date={date} colors={colors} setDate={setDate} />
          <TimeSlotSelect
            shadowRoot={shadowRoot}
            colors={colors}
            setScreen={() => setScreen('CONFIRM')}
          />
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
