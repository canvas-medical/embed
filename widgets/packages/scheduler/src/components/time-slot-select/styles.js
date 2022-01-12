import styled from 'styled-components'
import { styles, Button } from '@canvas/common'

export const TimeSlotContainer = styled.div`
  margin: 0;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const TimeSlotButton = styled(Button)`
  margin: 7px;
  height: 40px;
  width: 148px;
  background-color: ${p => p.backgroundColor || styles.default.primary};
  font-size: 0.875rem;

  &:hover,
  &:focus {
    background-color: ${p => p.focusColor || styles.default.focus};
  }

  @media (min-width: 666px) {
    width: 185px;
  }
`
