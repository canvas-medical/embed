import styled from 'styled-components'
import {
  Button,
  primaryBackgoundColor,
  hoverAndFocusBackgroundColor,
} from '@canvas/common'

export const TimeSlotButton = styled(Button)`
  ${primaryBackgoundColor}
  ${hoverAndFocusBackgroundColor}

  font-size: 0.875rem;
  width: stretch;
`

export const TimeSlotList = styled.ul`
  clear: both;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(138px, 1fr));
  margin: 1rem 0 0;
  padding: 0;
`

export const TimeSlotItem = styled.li`
  height: 43px;
  position: relative;
`
