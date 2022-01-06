import { h } from 'preact'
import { Demo, StyledDemo } from '@canvas/common'
import styled from 'styled-components'

const StyledExample = styled.div`
  display: flex;
  flex-direction: column;
  background-color: green;
`

export const App = () => {
  return (
    <StyledExample>
      <h1>Scheduler</h1>
      <StyledDemo>This is the scheduler app</StyledDemo>
      <Demo text="electric boogie" />
    </StyledExample>
  )
}
