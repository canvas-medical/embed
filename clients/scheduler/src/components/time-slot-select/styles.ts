import styled from 'styled-components'
import { Button } from '@canvas/embed-common'

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

export const TimeSlotButton = styled(Button)`
  font-size: 0.875rem;
  font-weight: 400;
  max-width: 196px;
  padding: 0 1.25rem;
  width: stretch;
`
