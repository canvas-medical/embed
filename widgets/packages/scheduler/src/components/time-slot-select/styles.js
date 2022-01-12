import styled from 'styled-components'
import { styles, Button } from '@canvas/common'

export const TimeSlotButton = styled(Button)`
  background-color: ${p => p.backgroundColor || styles.default.primary};
  font-size: 0.875rem;
  width: stretch;

  &:focus,
  &:hover {
    background-color: ${p => p.focusColor || styles.default.focus};
  }
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
