import styled from 'styled-components'
import { accentBackgoundColor, margin } from '../utils/styles'

export const Box = styled.div`
  ${margin}

  align-content: center;
  display: flex;
  flex-direction: var(--fd, column);
  text-align: center;
  width: var(--width, 100%);
`

export const Fieldset = styled.fieldset`
  ${accentBackgoundColor}

  border: none;
  border-radius: 5px;
  margin: 0 0 1rem;
  padding: 1rem;
`

export const Legend = styled.legend`
  float: left;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding: 0;
`

export const TzMessage = styled.p`
  font-size: 0.875rem;
  margin: 0.875rem 0;
  text-align: center;
`

export const IconBox = styled.div`
  height: 2.25rem;
  width: 2.25rem;
`
