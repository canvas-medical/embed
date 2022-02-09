import styled from 'styled-components'
import { Button, hoverColor, backgroundColor } from '@canvas/common'

export const TimeSlotButton = styled(Button)`
  ${backgroundColor}
  ${hoverColor}

  font-size: 0.875rem;
  max-width: 196px;
  padding: 0 1.25rem;
  width: stretch;
`

export const TimeSlotList = styled.ul`
  clear: both;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, minmax(138px, 1fr));
  margin: 1rem 0 0;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(138px, 1fr));
  }
`

export const TimeSlotItem = styled.li`
  height: 43px;
  position: relative;
`
