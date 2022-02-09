import styled from 'styled-components'
import { accentBackgoundColor, margin } from '../utils/styles'

export const Box = styled.div`
  ${margin}

  align-items: var(--ai, center);
  display: flex;
  flex-direction: var(--fd, column);
  max-width: var(--mw);
  text-align: center;
  width: var(--width, 100%);
`

export const AccentBox = styled(Box)`
  ${accentBackgoundColor}

  border-radius: 5px;
  padding: 1rem;
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
  padding: 0;
  width: fit-content;
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
